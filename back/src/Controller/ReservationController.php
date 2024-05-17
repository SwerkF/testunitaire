<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Form\ReservationType;
use App\Repository\ReservationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route; 
// user repository and entity
use App\Entity\User;
use App\Repository\UserRepository;

#[Route('/reservation')]
class ReservationController extends AbstractController
{
    public function __construct(
        private ReservationRepository $reservationRepository, 
        private EntityManagerInterface $entityManager,
        private UserRepository $userRepository)
    {

    }

    public function __invoke(Reservation $data): JsonResponse
    {
        $user = $this->userRepository->findOneBy(['id' => $data->getId()]);
        if (!$user) {
            throw $this->createNotFoundException();
        } else {
            $reservations = $this->reservationRepository->findReservationsByUser($user->getId());
            return $this->json($reservations);
        }
    }

    public function createNewReservation($data): JsonResponse
    {
      return $this->json($data);
    }

    // get all reservations
    public function getAll(): JsonResponse
    {
        $reservations = $this->reservationRepository->findAll();
        return $this->json($reservations);
    }


    // get events dates with reservations id
    public function getByDate(Request $request, ReservationRepository $reservationRepository): JsonResponse
    {
        $id = $request->get('id');
        $reservations = $reservationRepository->getEventDatesById($id);
        return $this->json($reservations);
    }

    #[Route('/', name: 'app_reservation_index', methods: ['GET'])]
    public function index(ReservationRepository $reservationRepository): Response
    {
        return $this->render('reservation/index.html.twig', [
            'reservations' => $reservationRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_reservation_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $reservation = new Reservation();
        $form = $this->createForm(ReservationType::class, $reservation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($reservation);
            $entityManager->flush();

            return $this->redirectToRoute('app_reservation_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('reservation/new.html.twig', [
            'reservation' => $reservation,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_reservation_show', methods: ['GET'])]
    public function show(Reservation $reservation): Response
    {
        return $this->render('reservation/show.html.twig', [
            'reservation' => $reservation,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_reservation_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Reservation $reservation, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(ReservationType::class, $reservation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_reservation_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('reservation/edit.html.twig', [
            'reservation' => $reservation,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_reservation_delete', methods: ['POST'])]
    public function delete(Request $request, Reservation $reservation, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$reservation->getId(), $request->getPayload()->get('_token'))) {
            $entityManager->remove($reservation);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_reservation_index', [], Response::HTTP_SEE_OTHER);
    }

    // get reservations with user id 
    #[Route('/user/{id}', name:'app_reservation_user_get', methods: ['GET'])]
    public function getReservation(Reservation $reservation, EntityManagerInterface $entityManager): Response
    {
        $reservation = $entityManager->getRepository(Reservation::class)->findBy(['user' => $reservation->getUserId()]);
        return $this->json($reservation);
    }
    
}
