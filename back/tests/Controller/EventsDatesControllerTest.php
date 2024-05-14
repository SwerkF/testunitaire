<!-- <?php

// namespace App\Test\Controller;

// use App\Entity\EventsDates;
// use Symfony\Bundle\FrameworkBundle\KernelBrowser;
// use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

// class EventsDatesControllerTest extends WebTestCase
// {
//     private KernelBrowser $client;
//     private string $path = '/events-dates/';

//     protected function setUp(): void
//     {
//         $this->client = static::createClient();

//         // Clearing the database before each test
//         $entityManager = static::getContainer()->get('doctrine')->getManager();
//         $entityManager->createQuery('DELETE FROM App\Entity\EventsDates')->execute();
//     }

//     public function testIndex(): void
//     {
//         $crawler = $this->client->request('GET', $this->path);

//         self::assertResponseStatusCodeSame(200);
//         self::assertPageTitleContains('EventsDate index');
//     }

//     public function testNew(): void
//     {
//         $this->client->request('GET', $this->path . 'new');

//         self::assertResponseStatusCodeSame(200);

//         $this->client->submitForm('Save', [
//             'events_date[date]' => 'Testing',
//             'events_date[tickets]' => 'Testing',
//             'events_date[is_cancelled]' => false,
//             'events_date[cancellation_reason]' => null,
//             'events_date[event]' => null, // Assuming 'event' is a relationship property
//         ]);

//         self::assertResponseRedirects($this->path);

//         // Check if the entity was actually persisted
//         $entityManager = static::getContainer()->get('doctrine')->getManager();
//         $eventsDatesCount = $entityManager->getRepository(EventsDates::class)->count([]);
//         self::assertSame(1, $eventsDatesCount);
//     }

//     public function testShow(): void
//     {
//         $entityManager = static::getContainer()->get('doctrine')->getManager();
//         $eventDate = new EventsDates();
//         $eventDate->setDate('2024-05-14');
//         $eventDate->setTickets('My Tickets');
//         $eventDate->setIsCancelled(false);
//         $eventDate->setCancellationReason(null);
//         $eventDate->setEvent(null); // Assuming 'event' is a relationship property
//         $entityManager->persist($eventDate);
//         $entityManager->flush();

//         $this->client->request('GET', $this->path . $eventDate->getId());

//         self::assertResponseStatusCodeSame(200);
//         self::assertPageTitleContains('EventsDate');
//         // Add assertions to check that the properties are properly displayed.
//     }

//     public function testEdit(): void
//     {
//         $entityManager = static::getContainer()->get('doctrine')->getManager();
//         $eventDate = new EventsDates();
//         $eventDate->setDate('2024-05-14');
//         $eventDate->setTickets('My Tickets');
//         $eventDate->setIsCancelled(false);
//         $eventDate->setCancellationReason(null);
//         $eventDate->setEvent(null); // Assuming 'event' is a relationship property
//         $entityManager->persist($eventDate);
//         $entityManager->flush();

//         $this->client->request('GET', $this->path . $eventDate->getId() . '/edit');

//         self::assertResponseStatusCodeSame(200);

//         $this->client->submitForm('Update', [
//             'events_date[date]' => '2024-05-15', // Updating date
//             'events_date[tickets]' => 'Updated Tickets', // Updating tickets
//             'events_date[is_cancelled]' => true, // Marking as cancelled
//             'events_date[cancellation_reason]' => 'Some reason', // Adding cancellation reason
//             'events_date[event]' => null, // Assuming 'event' is a relationship property
//         ]);

//         self::assertResponseRedirects($this->path);

//         $updatedEventDate = $entityManager->getRepository(EventsDates::class)->find($eventDate->getId());

//         self::assertSame('2024-05-15', $updatedEventDate->getDate());
//         self::assertSame('Updated Tickets', $updatedEventDate->getTickets());
//         self::assertTrue($updatedEventDate->getIsCancelled());
//         self::assertSame('Some reason', $updatedEventDate->getCancellationReason());
//     }

//     public function testRemove(): void
//     {
//         $entityManager = static::getContainer()->get('doctrine')->getManager();
//         $eventDate = new EventsDates();
//         $eventDate->setDate('2024-05-14');
//         $eventDate->setTickets('My Tickets');
//         $eventDate->setIsCancelled(false);
//         $eventDate->setCancellationReason(null);
//         $eventDate->setEvent(null); // Assuming 'event' is a relationship property
//         $entityManager->persist($eventDate);
//         $entityManager->flush();

//         $this->client->request('GET', $this->path . $eventDate->getId());

//         self::assertResponseStatusCodeSame(200);

//         $this->client->submitForm('Delete');

//         self::assertResponseRedirects($this->path);

//         $removedEventDate = $entityManager->getRepository(EventsDates::class)->find($eventDate->getId());

//         self::assertNull($removedEventDate);
//     }
// } -->
