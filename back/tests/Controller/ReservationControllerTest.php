<?php 

namespace App\Test\Controller;
use App\Entity\User;
use App\Entity\EventsDates;
use App\Entity\Reservation;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

class ReservationControllerTest extends WebTestCase
{
    private KernelBrowser $client;
    private string $path = '/reservation/';

    protected function setUp(): void
    {
        $this->client = static::createClient();

        // Clearing the database before each test
        $entityManager = static::getContainer()->get('doctrine')->getManager();
        $entityManager->createQuery('DELETE FROM App\Entity\Reservation')->execute();
    }

    public function testIndex(): void
    {
        $crawler = $this->client->request('GET', $this->path);

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('Reservation index');
    }

   


    public function testNew(): void
    {
        $this->client->request('GET', $this->path . 'new');
    
        // Create a DateTime object from the string date
        $reservationDate = new \DateTime('2024-05-14');
    
        self::assertResponseStatusCodeSame(200);
    
        // Fetch an existing User and EventsDates entity from the database
        $entityManager = static::getContainer()->get('doctrine')->getManager();
        $user = $entityManager->getRepository(User::class)->findOneBy([]); // Fetch any user
        $eventDate = $entityManager->getRepository(EventsDates::class)->findOneBy([]); // Fetch any event date
    
        $this->client->submitForm('Save', [
            'reservation[number_of_tickets]' => 5,
            'reservation[reservation_date]' => (new \DateTime('2024-05-14'))->format('Y-m-d'), // Format the date
            'reservation[user]' => $user->getId(),
            'reservation[eventDate]' => $eventDate->getId(),
        ]);
    
        self::assertResponseRedirects($this->path);
    
        // Check if the entity was actually persisted
        $reservationsCount = $entityManager->getRepository(Reservation::class)->count([]);
        self::assertSame(1, $reservationsCount);
    }
    
    

    
    // public function testShow(): void
    // {
    //     $entityManager = static::getContainer()->get('doctrine')->getManager();
    //     $reservation = new Reservation();
    //     $reservation->setNumberOfTickets(2);
    //     $reservation->setReservationDate(new \DateTime('2024-05-14'));
        
    //     // Assuming 'user' and 'eventDate' are relationship properties, set them using the correct method names
    //     $user = new User();
    //     // Fetch any existing user or create a new one
    //     // $user = $entityManager->getRepository(User::class)->findOneBy([]);
    //     $reservation->setUser($user);
        
    //     $eventDate = new EventsDates();
    //     // Fetch any existing event date or create a new one
    //     // $eventDate = $entityManager->getRepository(EventsDates::class)->findOneBy([]);
    //     $reservation->setEventDate($eventDate);
        
    //     $entityManager->persist($reservation);
    //     $entityManager->flush();
    
    //     $this->client->request('GET', $this->path . $reservation->getId());
    
    //     self::assertResponseStatusCodeSame(200);
    //     self::assertPageTitleContains('Reservation');
    // }
    

    

//     public function testEdit(): void
//     {
//         $entityManager = static::getContainer()->get('doctrine')->getManager();
//         $reservation = new Reservation();
//         $reservation->setNumber_of_tickets(2);
//         $reservation->setReservation_date(new \DateTime('2024-05-14'));
//         $reservation->setUser(null); // Assuming 'user' is a relationship property
//         $reservation->setEventDate(null); // Assuming 'eventDate' is a relationship property
//         $entityManager->persist($reservation);
//         $entityManager->flush();

//         $this->client->request('GET', $this->path . $reservation->getId() . '/edit');

//         self::assertResponseStatusCodeSame(200);

//         $this->client->submitForm('Update', [
//             'reservation[number_of_tickets]' => 3, // Updating number of tickets
//             'reservation[reservation_date]' => '2024-05-15', // Updating reservation date
//             'reservation[user]' => null, // Assuming 'user' is a relationship property
//             'reservation[eventDate]' => null, // Assuming 'eventDate' is a relationship property
//         ]);

//         self::assertResponseRedirects($this->path);

//         $updatedReservation = $entityManager->getRepository(Reservation::class)->find($reservation->getId());

//         self::assertSame(3, $updatedReservation->getNumber_of_tickets());
//         self::assertEquals(new \DateTime('2024-05-15'), $updatedReservation->getReservation_date());
//     }

//     public function testRemove(): void
//     {
//         $entityManager = static::getContainer()->get('doctrine')->getManager();
//         $reservation = new Reservation();
//         $reservation->setNumber_of_tickets(2);
//         $reservation->setReservation_date(new \DateTime('2024-05-14'));
//         $reservation->setUser(null); // Assuming 'user' is a relationship property
//         $reservation->setEventDate(null); // Assuming 'eventDate' is a relationship property
//         $entityManager->persist($reservation);
//         $entityManager->flush();

//         $this->client->request('GET', $this->path . $reservation->getId());

//         self::assertResponseStatusCodeSame(200);

//         $this->client->submitForm('Delete');

//         self::assertResponseRedirects($this->path);

//         $removedReservation = $entityManager->getRepository(Reservation::class)->find($reservation->getId());

//         self::assertNull($removedReservation);
//     }
}