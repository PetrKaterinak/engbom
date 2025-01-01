<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class RegistrationNotification extends Notification
{
    use Queueable;

    public function __construct(protected User $user)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('Potvrzujeme Vaši registraci do aplikace '.config('app.name'))
            ->action('Přejít na přihlášení', url(config('app.url').'/login'))
            ->line('Děkujeme za použití naší aplikace!');
    }
}
