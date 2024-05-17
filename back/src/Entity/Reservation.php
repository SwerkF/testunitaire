<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ReservationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\ReservationController;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;


#[ORM\Entity(repositoryClass: ReservationRepository::class)]
#[ApiResource(operations:[
    new Get(
        name:"get user reservation",
        uriTemplate:"/reservations/users/{id}",
        controller: ReservationController::class,
    ),
    new Get(
        name:"get_reservation_by_date",
        uriTemplate:"/reservations/date/{id}",
        controller: ReservationController::class,
    ),
    // get all
    new Get(),
    new Put(),
    new Patch(),
    new Post(),
    new Delete(),
 
])]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $number_of_tickets = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $reservation_date = null;

    #[ORM\OneToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: "user_id", referencedColumnName: "id")]
    private ?User $user_id = null;

    #[ORM\OneToOne(targetEntity: EventsDates::class)]
    #[ORM\JoinColumn(name: "event_date_id", referencedColumnName: "id")]
    private ?EventsDates $event_date_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumberOfTickets(): ?int
    {
        return $this->number_of_tickets;
    }

    public function setNumberOfTickets(?int $number_of_tickets): static
    {
        $this->number_of_tickets = $number_of_tickets;

        return $this;
    }

    public function getReservationDate(): ?\DateTimeInterface
    {
        return $this->reservation_date;
    }

    public function setReservationDate(?\DateTimeInterface $reservation_date): static
    {
        $this->reservation_date = $reservation_date;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(?User $user_id): static
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function getEventDateId(): ?EventsDates
    {
        return $this->event_date_id;
    }

    public function setEventDateId(?EventsDates $event_date_id): static
    {
        $this->event_date_id = $event_date_id;

        return $this;
    }
    public function setNumber_of_tickets(?int $number_of_tickets): self
{
    $this->number_of_tickets = $number_of_tickets;
    return $this;
}

public function setReservation_date(?\DateTimeInterface $reservation_date): self
{
    $this->reservation_date = $reservation_date;
    return $this;
}

public function setUser(?User $user_id): self
{
    $this->user_id = $user_id;
    return $this;
}

public function setEventDate(?EventsDates $event_date_id): self
{
    $this->event_date_id = $event_date_id;
    return $this;
}

}