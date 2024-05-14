<?php

namespace App\Controller;

use App\Entity\EventsDates;
use App\Form\EventsDatesType;
use App\Repository\EventsDatesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/events-dates')]
class EventsDatesController extends AbstractController
{
    #[Route('/', name: 'app_events_dates_index', methods: ['GET'])]
    public function index(EventsDatesRepository $eventsDatesRepository): Response
    {
        return $this->render('events_dates/index.html.twig', [
            'events_dates' => $eventsDatesRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_events_dates_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $eventsDate = new EventsDates();
        $form = $this->createForm(EventsDatesType::class, $eventsDate);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($eventsDate);
            $entityManager->flush();

            return $this->redirectToRoute('app_events_dates_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('events_dates/new.html.twig', [
            'events_date' => $eventsDate,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_events_dates_show', methods: ['GET'])]
    public function show(EventsDates $eventsDate): Response
    {
        return $this->render('events_dates/show.html.twig', [
            'events_date' => $eventsDate,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_events_dates_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, EventsDates $eventsDate, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(EventsDatesType::class, $eventsDate);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_events_dates_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('events_dates/edit.html.twig', [
            'events_date' => $eventsDate,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_events_dates_delete', methods: ['POST'])]
    public function delete(Request $request, EventsDates $eventsDate, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$eventsDate->getId(), $request->getPayload()->get('_token'))) {
            $entityManager->remove($eventsDate);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_events_dates_index', [], Response::HTTP_SEE_OTHER);
    }
}
