<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReviewRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'chapter' => 'required|integer|min:1',
            'description' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:5',
            'thoughts' => 'required|string|max:2000',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'chapter.required' => 'Chapter number is required.',
            'chapter.min' => 'Chapter number must be at least 1.',
            'description.required' => 'Description is required.',
            'rating.required' => 'Rating is required.',
            'rating.min' => 'Rating must be between 1 and 5.',
            'rating.max' => 'Rating must be between 1 and 5.',
            'thoughts.required' => 'Thoughts are required.',
        ];
    }
}
