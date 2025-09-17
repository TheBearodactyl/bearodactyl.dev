<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'author' => $this->author,
            'genres' => $this->genres,
            'tags' => $this->tags,
            'rating' => $this->rating,
            'status' => $this->status,
            'description' => $this->description,
            'my_thoughts' => $this->my_thoughts,
            'links' => $this->links->map(function ($link) {
                return [
                    'key' => $link->key,
                    'value' => $link->value,
                ];
            }),
            'cover_image' => $this->cover_image,
            'explicit' => $this->explicit,
            'color' => $this->color,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
