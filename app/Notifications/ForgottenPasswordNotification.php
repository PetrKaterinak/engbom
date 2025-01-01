<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ForgottenPasswordNotification extends Notification
{
    use Queueable;

    public function __construct(protected User $user) { }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('Pro resetování hesla klikněte na tlačítko níže.')
            ->action('Resetovat heslo', url(config('app.url').'/password-reset/'.$this->user->getPasswordResetToken()));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
