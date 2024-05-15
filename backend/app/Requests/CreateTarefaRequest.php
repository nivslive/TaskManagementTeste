<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateTarefaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "title" => "required|string",
            "description" => "string",
            // "assignee_id" => "unique:funcionarios"
        ];
    }

    public function messages(): array
    {
        return [
            'title.string' => 'O campo title deve ser uma string.',
            'title.required' => 'O campo title é requerido.',

            'description.string' => 'O campo description deve ser uma string.',
            'description.required' => 'O campo description é requerido.',
        ];
    }
}
