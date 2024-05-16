<?php

namespace App\Repository;

use App\Entity\Reservation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Reservation>
 */
class ReservationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Reservation::class);
    }

    //    /**
    //     * @return Reservation[] Returns an array of Reservation objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('r')
    //            ->andWhere('r.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('r.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Reservation
    //    {
    //        return $this->createQueryBuilder('r')
    //            ->andWhere('r.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }

    public function findReservationsByUser($user_id) : array
    {
        // select * from reservation, inner join events dates and events
       /*
       #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $number_of_tickets = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $reservation_date = null;

    #[ORM\ManyToOne]
    private ?User $user_id = null;

    #[ORM\ManyToOne]
    private ?EventsDates $event_date_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }*/

        $qb = $this->createQueryBuilder('r')
            ->innerJoin('r.user_id', 'u')
            ->where('u.id = :user_id')
            ->setParameter('user_id', $user_id)
            ->getQuery();

        return $qb->getResult();

    }


    public function getEventDatesById($id)
    {
 
        $qb = $this->createQueryBuilder('r')
            ->where('r.event_date_id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getResult();


        return $qb;


    }
}
