<?php

namespace App\Test\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class UserControllerTest extends WebTestCase
{
    private KernelBrowser $client;
    private string $path = '/user/';

    protected function setUp(): void
    {
        $this->client = static::createClient();

        // Clearing the database before each test
        $entityManager = static::getContainer()->get('doctrine')->getManager();
        $entityManager->createQuery('DELETE FROM App\Entity\User')->execute();
    }

    public function testIndex(): void
    {
        $crawler = $this->client->request('GET', $this->path);

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('User index');
    }

    public function testNew(): void
    {
        $this->client->request('GET', $this->path . 'new');

        self::assertResponseStatusCodeSame(200);

        $this->client->submitForm('Save', [
            'user[email]' => 'Sarah@example.com',
            'user[password]' => 'Sarah_password',
            'user[firstname]' => 'Sarah',
            'user[name]' => 'Faye',
            'user[birthday]' => '2001-01-01',
        ]);

        self::assertResponseRedirects($this->path);

        // Check if the entity was actually persisted
        $entityManager = static::getContainer()->get('doctrine')->getManager();
        $usersCount = $entityManager->getRepository(User::class)->count([]);
        self::assertSame(1, $usersCount);
    }

    public function testShow(): void
    {
        $entityManager = static::getContainer()->get('doctrine')->getManager();
        $user = new User();
        $user->setEmail('Sarah@example.com');
        $user->setPassword('Sarah_password');
        $user->setFirstname('Sarah');
        $user->setName('Faye');
        $user->setBirthday(new \DateTime('2001-01-01'));
        $entityManager->persist($user);
        $entityManager->flush();

        $this->client->request('GET', $this->path . $user->getId());

        self::assertResponseStatusCodeSame(200);
        self::assertPageTitleContains('User');
    }

    public function testEdit(): void
    {
        $entityManager = static::getContainer()->get('doctrine')->getManager();
        $user = new User();
        $user->setEmail('Sarah@example.com');
        $user->setPassword('Sarah_password');
        $user->setFirstname('Sarah');
        $user->setName('Faye');
        $user->setBirthday(new \DateTime('2001-01-01'));
        $entityManager->persist($user);
        $entityManager->flush();

        $this->client->request('GET', $this->path . $user->getId() . '/edit');

        self::assertResponseStatusCodeSame(200);

        $this->client->submitForm('Update', [
            'user[email]' => 'Nvx_Sarah@example.com',
            'user[password]' => 'NvxSarah_password',
            'user[firstname]' => 'NVxSarah',
            'user[name]' => 'NvxFaye',
            'user[birthday]' => '2005-01-01',
        ]);

        self::assertResponseRedirects($this->path);

        $updatedUser = $entityManager->getRepository(User::class)->find($user->getId());

        self::assertSame('Nvx_Sarah@example.com', $updatedUser->getEmail());
        self::assertSame('NVxSarah', $updatedUser->getFirstname());
        self::assertSame('NvxFaye', $updatedUser->getName());
        self::assertEquals(new \DateTime('2005-01-01'), $updatedUser->getBirthday());
    }

    // public function testRemove(): void
    // {
    //     $entityManager = static::getContainer()->get('doctrine')->getManager();
    //     $user = new User();
    //     $user->setEmail('Sarah@example.com');
    //     $user->setPassword('Sarah_password');
    //     $user->setFirstname('Sarah');
    //     $user->setName('Faye');
    //     $user->setBirthday(new \DateTime('1990-01-01'));
    //     $entityManager->persist($user);
    //     $entityManager->flush();

    //     $this->client->request('GET', $this->path . $user->getId());

    //     self::assertResponseStatusCodeSame(200);

    //     $this->client->submitForm('Delete');

    //     self::assertResponseRedirects($this->path);

    //     $removedUser = $entityManager->getRepository(User::class)->find($user->getId());

    //     self::assertNull($removedUser);
    // }
}
