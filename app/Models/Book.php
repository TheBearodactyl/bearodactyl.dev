<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'genres',
        'tags',
        'rating',
        'status',
        'description',
        'my_thoughts',
        'cover_image',
        'explicit',
        'color',
    ];

    protected $casts = [
        'genres' => 'array',
        'tags' => 'array',
        'explicit' => 'boolean',
        'rating' => 'integer',
    ];

    protected $attributes = [
        'genres' => '[]',
        'tags' => '[]',
        'explicit' => false,
        'rating' => 1,
    ];

    public function links(): HasMany
    {
        return $this->hasMany(BookLink::class);
    }

    public static function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'genres' => 'sometimes|array',
            'tags' => 'sometimes|array',
            'rating' => 'sometimes|integer|between:1,5',
            'status' => 'required|string|max:255',
            'description' => 'required|string',
            'my_thoughts' => 'required|string',
            'cover_image' => 'required|string',
            'explicit' => 'sometimes|boolean',
            'color' => 'sometimes|string|max:7|nullable',
        ];
    }

    public function scopeByTitle($query, $title)
    {
        return $query->where('title', 'like', "%{$title}%");
    }

    public function scopeByAuthor($query, $author)
    {
        return $query->where('author', 'like', "%{$author}%");
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByRatingRange($query, $min = null, $max = null)
    {
        if ($min !== null) {
            $query->where('rating', '>=', $min);
        }
        if ($max !== null) {
            $query->where('rating', '<=', $max);
        }
        return $query;
    }

    public function scopeByExplicit($query, $explicit)
    {
        return $query->where('explicit', $explicit);
    }
}
