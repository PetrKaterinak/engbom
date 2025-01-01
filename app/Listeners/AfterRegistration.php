<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Events\UserRegistered;
use App\Notifications\RegistrationNotification;

class AfterRegistration
{
    public function __construct()
    {
        //
    }

    public function handle(UserRegistered $event): void
    {
        $user = $event->user;

        // Send registration e-mail
        $user->notify(new RegistrationNotification($user));
    }
}
