<?php

namespace App\Form;

use App\Entity\EventsDates;
use App\Entity\Reservation;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType; // Import DateTimeType
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ReservationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('number_of_tickets')
            ->add('reservation_date', DateTimeType::class, [
                'widget' => 'single_text',
                'html5' => false, // Disable HTML5 rendering
                'format' => 'yyyy-MM-dd HH:mm', // Specify the format here
            ])
            
            ->add('user', EntityType::class, [
                'class' => User::class,
                'choice_label' => 'id', // Adjust based on your User entity property
            ])
            ->add('eventDate', EntityType::class, [
                'class' => EventsDates::class,
                'choice_label' => 'id', // Or adjust to a meaningful property of EventsDates
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Reservation::class,
        ]);
    }
}
