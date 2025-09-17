<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'genres' => 'sometimes|array',
            'genres.*' => 'string|max:255',
            'tags' => 'sometimes|array',
            'tags.*' => 'string|max:255',
            'rating' => 'sometimes|integer|between:1,5',
            'status' => 'required|string|max:255',
            'description' => 'required|string',
            'my_thoughts' => 'required|string',
            'cover_image' => 'required|string',
            'explicit' => 'sometimes|boolean',
            'color' => 'sometimes|string|max:7|nullable',
            'links' => 'sometimes|array',
            'links.*.key' => 'required_with:links|string|max:255',
            'links.*.value' => 'required_with:links|string',
        ];
    }
}
