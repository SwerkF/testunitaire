<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EventsDatesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EventsDatesRepository::class)]
#[ApiResource]
class EventsDates
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(nullable: true)]
    private ?int $remaining_tickets = null;

    #[ORM\Column(nullable: true)]
    private ?bool $is_cancelled = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $cancellation_reason = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Events $event_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(?\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getRemainingTickets(): ?int
    {
        return $this->remaining_tickets;
    }

    public function setRemainingTickets(?int $remaining_tickets): static
    {
        $this->remaining_tickets = $remaining_tickets;

        return $this;
    }

    public function isCancelled(): ?bool
    {
        return $this->is_cancelled;
    }

    public function setCancelled(?bool $is_cancelled): static
    {
        $this->is_cancelled = $is_cancelled;

        return $this;
    }

    public function getCancellationReason(): ?string
    {
        return $this->cancellation_reason;
    }

    public function setCancellationReason(?string $cancellation_reason): static
    {
        $this->cancellation_reason = $cancellation_reason;

        return $this;
    }

    public function getEventId(): ?Events
    {
        return $this->event_id;
    }

    public function setEventId(?Events $event_id): static
    {
        $this->event_id = $event_id;

        return $this;
    }
}
