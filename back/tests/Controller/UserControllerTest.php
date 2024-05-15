<?php

// namespace App\Test\Controller;

// use App\Entity\User;
// use Symfony\Bundle\FrameworkBundle\KernelBrowser;
// use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

// class UserControllerTest extends WebTestCase
// {
//     private KernelBrowser $client;
//     private string $path = '/user/';

//     protected function setUp(): void
//     {
//         $this->client = static::createClient();

//         // Clearing the database before each test
//         $entityManager = static::getContainer()->get('doctrine')->getManager();
//         $entityManager->createQuery('DELETE FROM App\Entity\User')->execute();
//     }

//     public function testIndex(): void
//     {
//         $crawler = $this->client->request('GET', $this->path);

//         self::assertResponseStatusCodeSame(200);
//         self::assertPageTitleContains('User index');
//     }

//     public function testNew(): void
//     {
//         $this->client->request('GET', $this->path . 'new');

//         self::assertResponseStatusCodeSame(200);

//         $this->client->submitForm('Save', [
//             'user[email]' => 'test@example.com',
//             'user[password]' => 'test_password',
//             'user[firstname]' => 'John',
//             'user[name]' => 'Doe',
//             'user[birthday]' => '1990-01-01',
//         ]);

//         self::assertResponseRedirects($this->path);

//         // Check if the entity was actually persisted
//         $entityManager = static::getContainer()->get('doctrine')->getManager();
//         $usersCount = $entityManager->getRepository(User::class)->count([]);
//         self::assertSame(1, $usersCount);
//     }

//     public function testShow(): void
//     {
//         $entityManager = static::getContainer()->get('doctrine')->getManager();
//         $user = new User();
//         $user->setEmail('test@example.com');
//         $user->setPassword('test_password');
//         $user->setFirstname('John');
//         $user->setName('Doe');
//         $user->setBirthday(new \DateTime('1990-01-01'));
//         $entityManager->persist($user);
//         $entityManager->flush();

//         $this->client->request('GET', $this->path . $user->getId());

//         self::assertResponseStatusCodeSame(200);
//         self::assertPageTitleContains('User');
//         // Add assertions to check that the properties are properly displayed.
//     }

//     public function testEdit(): void
//     {
//         $entityManager = static::getContainer()->get('doctrine')->getManager();
//         $user = new User();
//         $user->setEmail('test@example.com');
//         $user->setPassword('test_password');
//         $user->setFirstname('John');
//         $user->setName('Doe');
//         $user->setBirthday(new \DateTime('1990-01-01'));
//         $entityManager->persist($user);
//         $entityManager->flush();

//         $this->client->request('GET', $this->path . $user->getId() . '/edit');

//         self::assertResponseStatusCodeSame(200);

//         $this->client->submitForm('Update', [
//             'user[email]' => 'updated@example.com',
//             'user[password]' => 'updated_password',
//             'user[firstname]' => 'Jane',
//             'user[name]' => 'Smith',
//             'user[birthday]' => '1985-01-01',
//         ]);

//         self::assertResponseRedirects($this->path);

//         $updatedUser = $entityManager->getRepository(User::class)->find($user->getId());

//         self::assertSame('updated@example.com', $updatedUser->getEmail());
//         self::assertSame('Jane', $updatedUser->getFirstname());
//         self::assertSame('Smith', $updatedUser->getName());
//         self::assertEquals(new \DateTime('1985-01-01'), $updatedUser->getBirthday());
//     }

//     public function testRemove(): void
//     {
//         $entityManager = static::getContainer()->get('doctrine')->getManager();
//         $user = new User();
//         $user->setEmail('test@example.com');
//         $user->setPassword('test_password');
//         $user->setFirstname('John');
//         $user->setName('Doe');
//         $user->setBirthday(new \DateTime('1990-01-01'));
//         $entityManager->persist($user);
//         $entityManager->flush();

//         $this->client->request('GET', $this->path . $user->getId());

//         self::assertResponseStatusCodeSame(200);

//         $this->client->submitForm('Delete');

//         self::assertResponseRedirects($this->path);

//         $removedUser = $entityManager->getRepository(User::class)->find($user->getId());

//         self::assertNull($removedUser);
//     }
// }
