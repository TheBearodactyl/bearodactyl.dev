<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasUuids;

    /**
     * @var string
     */
    protected $table = 'reviews';

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'chapter',
        'description',
        'rating',
        'thoughts',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'id' => 'string',
        'chapter' => 'integer',
        'rating' => 'integer',
    ];

    public $timestamps = true;
}
