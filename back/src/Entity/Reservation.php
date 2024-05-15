<?php
namespace App\Entity;

use App\Repository\ReservationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $numberOfTickets = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $reservationDate = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    private ?User $user = null;

    #[ORM\ManyToOne(targetEntity: EventsDates::class)]
    private ?EventsDates $eventDate = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumberOfTickets(): ?int
    {
        return $this->numberOfTickets;
    }

    public function setNumberOfTickets(?int $numberOfTickets): self
    {
        $this->numberOfTickets = $numberOfTickets;
        return $this;
    }

    public function getReservationDate(): ?\DateTimeInterface
    {
        return $this->reservationDate;
    }

    public function setReservationDate(?\DateTimeInterface $reservationDate): self
    {
        $this->reservationDate = $reservationDate;
        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function getEventDate(): ?EventsDates
    {
        return $this->eventDate;
    }

    public function setEventDate(?EventsDates $eventDate): self
    {
        $this->eventDate = $eventDate;
        return $this;
    }
}
