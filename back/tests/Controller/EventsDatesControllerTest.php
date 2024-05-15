<?php

namespace App\Test\Controller;

use App\Entity\EventsDates;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class EventsDatesControllerTest extends WebTestCase
{
    private KernelBrowser $client;
    private string $path = '/events-dates/';

    protected function setUp(): void
    {
        $this->client = static::createClient();

        $entityManager = static::getContainer()->get('doctrine')->getManager();
        $entityManager->createQuery('DELETE FROM App\Entity\EventsDates')->execute();
    }

    public function testIndex(): void
    {
        $crawler = $this->client->request('GET', $this->path);

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('EventsDates index');
    }

    public function testNew(): void
    {
        $this->client->request('GET', $this->path . 'new');
    
        self::assertResponseStatusCodeSame(200);
    
        $this->client->submitForm('Save', [
            'events_dates[date]' => '2024-05-14',
            'events_dates[tickets]' => '34',
            'events_dates[is_cancelled]' => false,
            'events_dates[cancellation_reason]' => null,
            'events_dates[event]' => '1', 
        ]);
        
        self::assertResponseRedirects($this->path);
    
        $entityManager = static::getContainer()->get('doctrine')->getManager();
        $eventsDatesCount = $entityManager->getRepository(EventsDates::class)->count([]);
        self::assertSame(1, $eventsDatesCount);
    }

    
    public function testShow(): void
    {
        $entityManager = static::getContainer()->get('doctrine')->getManager();
        $eventDate = new EventsDates();

        $date = new \DateTime('2024-05-14');
        
        $eventDate->setDate($date);
        $eventDate->setTickets(34); 
        $eventDate->setIsCancelled(false);
        $eventDate->setCancellationReason(null);
        $eventDate->setEvent(null); 
        
        $entityManager->persist($eventDate);
        $entityManager->flush();
        
        $this->client->request('GET', $this->path . $eventDate->getId());
        
        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('EventsDate');

    }
    
    public function testEdit(): void
    {
        $entityManager = static::getContainer()->get('doctrine')->getManager();
        $eventDate = new EventsDates();
        $date = new \DateTime('2024-05-15');
        $eventDate->setDate($date);
        $eventDate->setTickets('12');
        $eventDate->setIsCancelled(false);
        $eventDate->setCancellationReason(null);
        $eventDate->setEvent(null); 
        $entityManager->persist($eventDate);
        $entityManager->flush();

        $this->client->request('GET', $this->path . $eventDate->getId() . '/edit');

        self::assertResponseStatusCodeSame(200);
       
        
        $this->client->submitForm('Update', [
            'events_dates[date]' => '2024-05-15', 
            'events_dates[tickets]' => '12', 
            'events_dates[is_cancelled]' => true, 
            'events_dates[cancellation_reason]' => 'COVID', 
            'events_dates[event]' => '1', 
        ]);
        
        self::assertResponseRedirects($this->path);

        $updatedEventDate = $entityManager->getRepository(EventsDates::class)->find($eventDate->getId());

        self::assertSame('2024-05-15', $updatedEventDate->getDate()->format('Y-m-d'));
        self::assertSame(12, $updatedEventDate->getTickets());
        self::assertTrue($updatedEventDate->getIsCancelled());
        self::assertSame('COVID', $updatedEventDate->getCancellationReason());
    }

    public function testRemove(): void
    {
        $entityManager = static::getContainer()->get('doctrine')->getManager();
        $eventDate = new EventsDates();
        $date = new \DateTime('2024-05-15');
        $eventDate->setDate($date);
        $eventDate->setTickets('12');
        $eventDate->setIsCancelled(false);
        $eventDate->setCancellationReason(null);
        $eventDate->setEvent(null); 
        $entityManager->persist($eventDate);
        $entityManager->flush();

        $this->client->request('GET', $this->path . $eventDate->getId());

        self::assertResponseStatusCodeSame(200);

        $this->client->submitForm('Delete');

        self::assertResponseRedirects($this->path);

        $removedEventDate = $entityManager->getRepository(EventsDates::class)->find($eventDate->getId());

        self::assertNull($removedEventDate);
    }
}
