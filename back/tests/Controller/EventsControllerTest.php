<?php 

// namespace App\Test\Controller;

// use App\Entity\Events;
// use Doctrine\ORM\EntityManagerInterface;
// use Doctrine\ORM\EntityRepository;
// use Symfony\Bundle\FrameworkBundle\KernelBrowser;
// use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

// class EventsControllerTest extends WebTestCase
// {
//     private KernelBrowser $client;
//     private EntityManagerInterface $manager;
//     private EntityRepository $repository;
//     private string $path = '/events/';

//     protected function setUp(): void
//     {
//         $this->client = static::createClient();
//         $this->manager = static::getContainer()->get('doctrine')->getManager();
//         $this->repository = $this->manager->getRepository(Events::class);

//         foreach ($this->repository->findAll() as $object) {
//             $this->manager->remove($object);
//         }

//         $this->manager->flush();
//     }

//     public function testNew(): void
//     {
//         $this->client->request('GET', sprintf('%snew', $this->path));
    
//         self::assertResponseStatusCodeSame(200);
    
//         $crawler = $this->client->submitForm('Save', [
//             'events[title]' => 'Concert',               
//             'events[description]' => 'Concert de 2h',   
//             'events[type]' => 'Concert',                
//             'events[image_url]' => 'Test.jpg',          
//             'events[minimum_age]' => '29',              
//         ]);
    
//         self::assertResponseRedirects($this->path);
    
//         $event = $this->repository->findOneBy(['title' => 'Concert']);
//         self::assertNotNull($event);
//         self::assertSame('Concert', $event->getTitle());
//     }
    
    

// public function testShow(): void
// {
// //     // Remove markTestIncomplete to enable the test
// //     $fixture = new Events();
// //     $fixture->setTitle('My Title');
// //     // Set other properties as needed
// //     $this->manager->persist($fixture);
// //     $this->manager->flush();

// //     $this->client->request('GET', sprintf('%s%s', $this->path, $fixture->getId()));

// //     self::assertResponseStatusCodeSame(200);
// //     self::assertPageTitleContains('Event');

// //     // Use assertions to check that the properties are properly displayed.
// //     $content = $this->client->getResponse()->getContent();
// //     self::assertStringContainsString('My Title', $content);
// //     // Assert other properties as needed
// }

// public function testEdit(): void
// {

//     $fixture = new Events();
//     $fixture->setTitle('Value');
  
//     $this->manager->persist($fixture);
//     $this->manager->flush();

//     $this->client->request('GET', sprintf('%s%s/edit', $this->path, $fixture->getId()));

//     $crawler = $this->client->submitForm('Update', [
//         'events[title]' => 'Nouveau Concert',                
//         'events[description]' => 'Nouveau Concert de 2h',    
//     ]);

//     self::assertResponseRedirects('/events/');

//     $event = $this->repository->find($fixture->getId());

//     self::assertSame('Nouveau Concert', $event->getTitle());                
//     self::assertSame('Nouveau Concert de 2h', $event->getDescription()); 
   
// }

// public function testRemove(): void
// {
   
//     $fixture = new Events();
//     $fixture->setTitle('Value');
   
//     $this->manager->persist($fixture);
//     $this->manager->flush();

//     $this->client->request('GET', sprintf('%s%s', $this->path, $fixture->getId()));
//     $this->client->submitForm('Delete');

//     self::assertResponseRedirects('/events/');
//     self::assertSame(0, $this->repository->count([]));
// }

// }