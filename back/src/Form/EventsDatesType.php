<?php

namespace App\Form;

use App\Entity\Events;
use App\Entity\EventsDates;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EventsDatesType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('date', null, [
                'widget' => 'single_text',
            ])
            ->add('remaining_tickets')
            ->add('is_cancelled')
            ->add('cancellation_reason')
            ->add('event_id', EntityType::class, [
                'class' => Events::class,
                'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => EventsDates::class,
        ]);
    }
}
