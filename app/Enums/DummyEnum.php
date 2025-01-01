<?php

declare(strict_types=1);

namespace App\Enums;

use App\Enums\Traits\EnumTrait;

enum DummyEnum: string
{
    use EnumTrait;

    case VALUE1 = 'VALUE1';
    case VALUE2 = 'VALUE2';
    case VALUE3 = 'VALUE3';

    public function getSomeExtraData(): string
    {
        return match ($this) {
            self::VALUE1 => 'Hodnota 1',
            self::VALUE2 => 'Hodnota 2',
            self::VALUE3 => 'Hodnota 3',
        };
    }
}