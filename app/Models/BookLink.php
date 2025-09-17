<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'book_id',
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public static function rules(): array
    {
        return [
            'key' => 'required|string|max:255',
            'value' => 'required|string',
            'book_id' => 'required|exists:books,id',
        ];
    }
}
