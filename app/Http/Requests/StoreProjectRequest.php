<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'tags' => 'required|array|min:1',
            'tags.*' => 'string|max:50',
            'source' => 'required|url|max:500',
            'cover_image' => 'required|url|max:500',
            'install_command' => 'required|string|max:1000',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Project name is required.',
            'description.required' => 'Project description is required.',
            'tags.required' => 'At least one tag is required.',
            'tags.min' => 'At least one tag is required.',
            'tags.*.string' => 'Each tag must be a string.',
            'source.required' => 'Source URL is required.',
            'source.url' => 'Source must be a valid URL.',
            'cover_image.required' => 'Cover image URL is required.',
            'cover_image.url' => 'Cover image must be a valid URL.',
            'install_command.required' => 'Install command is required.',
        ];
    }
}
