<?php

namespace App\Test\Controller;

use App\Entity\EventsDates;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class EventsDatesControllerTest extends WebTestCase
{
    private KernelBrowser $client;
    private EntityManagerInterface $manager;
    private EntityRepository $repository;
    private string $path = '/events-dates/';

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
        self::assertPageTitleContains('EventsDate index');

        // Use the $crawler to perform additional assertions e.g.
        // self::assertSame('Some text on the page', $crawler->filter('.p')->first());
    }

    public function testNew(): void
    {
        $this->markTestIncomplete();
        $this->client->request('GET', sprintf('%snew', $this->path));

        self::assertResponseStatusCodeSame(200);

        $this->client->submitForm('Save', [
            'events_date[date]' => 'Testing',
            'events_date[tickets]' => 'Testing',
            'events_date[is_cancelled]' => 'Testing',
            'events_date[cancellation_reason]' => 'Testing',
            'events_date[event_id]' => 'Testing',
        ]);

        self::assertResponseRedirects($this->path);

        self::assertSame(1, $this->repository->count([]));
    }

    public function testShow(): void
    {
        $this->markTestIncomplete();
        $fixture = new EventsDates();
        $fixture->setDate('My Title');
        $fixture->setTickets('My Title');
        $fixture->setIs_cancelled('My Title');
        $fixture->setCancellation_reason('My Title');
        $fixture->setEvent_id('My Title');

        $this->manager->persist($fixture);
        $this->manager->flush();

        $this->client->request('GET', sprintf('%s%s', $this->path, $fixture->getId()));

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('EventsDate');

        // Use assertions to check that the properties are properly displayed.
    }

    public function testEdit(): void
    {
        $this->markTestIncomplete();
        $fixture = new EventsDates();
        $fixture->setDate('Value');
        $fixture->setTickets('Value');
        $fixture->setIs_cancelled('Value');
        $fixture->setCancellation_reason('Value');
        $fixture->setEvent_id('Value');

        $this->manager->persist($fixture);
        $this->manager->flush();

        $this->client->request('GET', sprintf('%s%s/edit', $this->path, $fixture->getId()));

        $this->client->submitForm('Update', [
            'events_date[date]' => 'Something New',
            'events_date[tickets]' => 'Something New',
            'events_date[is_cancelled]' => 'Something New',
            'events_date[cancellation_reason]' => 'Something New',
            'events_date[event_id]' => 'Something New',
        ]);

        self::assertResponseRedirects('/events-dates/');

        $fixture = $this->repository->findAll();

        self::assertSame('Something New', $fixture[0]->getDate());
        self::assertSame('Something New', $fixture[0]->getTickets());
        self::assertSame('Something New', $fixture[0]->getIs_cancelled());
        self::assertSame('Something New', $fixture[0]->getCancellation_reason());
        self::assertSame('Something New', $fixture[0]->getEvent_id());
    }

    public function testRemove(): void
    {
        $this->markTestIncomplete();
        $fixture = new EventsDates();
        $fixture->setDate('Value');
        $fixture->setTickets('Value');
        $fixture->setIs_cancelled('Value');
        $fixture->setCancellation_reason('Value');
        $fixture->setEvent_id('Value');

        $this->manager->persist($fixture);
        $this->manager->flush();

        $this->client->request('GET', sprintf('%s%s', $this->path, $fixture->getId()));
        $this->client->submitForm('Delete');

        self::assertResponseRedirects('/events-dates/');
        self::assertSame(0, $this->repository->count([]));
    }
}
