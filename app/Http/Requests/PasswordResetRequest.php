<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Elegant\Sanitizer\Laravel\SanitizesInput;
use Illuminate\Foundation\Http\FormRequest;

class PasswordResetRequest extends FormRequest
{
    use SanitizesInput;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'field' => 'rule',
        ];
    }

    public function filters(): array
    {
        return [
            'field' => 'trim|escape|lowercase|uppercase|capitalize|empty_string_to_null|strip_tags|digit|format_date:"m/d/Y","F j, Y"|cast:(integer,float,string,boolean,object,array,collection)'
        ];
    }
}
