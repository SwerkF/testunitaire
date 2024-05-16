<?php
namespace App\Test\Controller;
use App\Entity\Events;
use App\Entity\EventsDates;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class EventsDatesControllerTest extends WebTestCase
{
    private KernelBrowser $client;
    private EntityManagerInterface $manager;
    private string $path = '/events-dates/';
    private $repository; // Add repository property

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $this->manager = static::getContainer()->get('doctrine')->getManager();
        $this->repository = $this->manager->getRepository(EventsDates::class);

        foreach ($this->repository->findAll() as $object) {
            $this->manager->remove($object);
        }

        $this->manager->flush();
    }

    public function testIndex(): void
    {
        $crawler = $this->client->request('GET', $this->path);

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('EventsDates index');
    }

    public function testNew(): void
    {
        $this->client->request('GET', sprintf('%snew', $this->path));
        
        self::assertResponseStatusCodeSame(200);
    
        // Fetch an existing Events entity from the database
        $event = $this->manager->getRepository(Events::class)->findOneBy([]);
    
        $this->client->submitForm('Save', [
            'events_dates[date]' => (new \DateTime('2024-05-14'))->format('Y-m-d'), // Format DateTime object as string
            'events_dates[tickets]' => '34',
            'events_dates[is_cancelled]' => false,
            'events_dates[cancellation_reason]' => null,
            'events_dates[event]' => $event->getId(), // Set the event ID
        ]);
    
        self::assertResponseRedirects($this->path);
    
        self::assertSame(1, $this->repository->count([]));
    }
    
    

    public function testShow(): void
    {
        $fixture = new EventsDates();
        $fixture->setDate(new \DateTime('2024-05-14'));
        $fixture->setTickets(34);

        $this->manager->persist($fixture);
        $this->manager->flush();

        $this->client->request('GET', sprintf('%s%s', $this->path, $fixture->getId()));

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('EventsDate');
    }

    public function testEdit(): void
    {
        // Assuming there's an existing event entity in the database
        $event = $this->manager->getRepository(Events::class)->findOneBy([]);
        
        $fixture = new EventsDates();
        $fixture->setDate(new \DateTime('2024-05-14'));
        $fixture->setTickets(34);
        $fixture->setEvent($event); 
    
        $this->manager->persist($fixture);
        $this->manager->flush();
    
        $this->client->request('GET', sprintf('%s%s/edit', $this->path, $fixture->getId()));
    
        $this->client->submitForm('Update', [
            'events_dates[date]' => (new \DateTime('2024-05-15'))->format('Y-m-d'),
            'events_dates[tickets]' => 14,
            'events_dates[is_cancelled]' => true,
            'events_dates[cancellation_reason]' => 'COVID',
            'events_dates[event]' => $event->getId(), 
        ]);
    
        self::assertResponseRedirects($this->path);
    
        $updatedFixture = $this->repository->find($fixture->getId());
    
        self::assertSame('2024-05-15', $updatedFixture->getDate()->format('Y-m-d'));
        self::assertSame(14, $updatedFixture->getTickets());
        self::assertTrue($updatedFixture->getIsCancelled());
        self::assertSame('COVID', $updatedFixture->getCancellationReason());
    }
    

    public function testRemove(): void
    {
        $fixture = new EventsDates();
        $fixture->setDate(new \DateTime('2024-05-14'));
        $fixture->setTickets(34);

        $this->manager->persist($fixture);
        $this->manager->flush();

        $this->client->request('GET', sprintf('%s%s', $this->path, $fixture->getId()));
        $this->client->submitForm('Delete');

        self::assertResponseRedirects($this->path);
        self::assertSame(0, $this->repository->count([]));
    }
}
