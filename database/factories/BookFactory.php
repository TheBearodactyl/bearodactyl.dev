<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    protected $model = Book::class;

    public function definition(): array
    {
        $genres = [
            'Fantasy',
            'Science Fiction',
            'Mystery',
            'Thriller',
            'Romance',
            'Horror',
            'Historical Fiction',
            'Literary Fiction',
            'Young Adult',
            'Contemporary',
            'Adventure',
            'Crime',
            'Biography',
            'Non-fiction'
        ];

        $tags = [
            'magic',
            'dragons',
            'space',
            'detective',
            'love story',
            'dark',
            'coming-of-age',
            'war',
            'family saga',
            'dystopian',
            'steampunk',
            'vampires',
            'time travel',
            'pirates',
            'epic',
            'funny',
            'sad'
        ];

        $statuses = [
            'Want to Read',
            'Currently Reading',
            'Read',
            'Did Not Finish',
            'On Hold'
        ];

        return [
            'title' => $this->faker->sentence(rand(2, 6), false),
            'author' => $this->faker->name(),
            'genres' => $this->faker->randomElements($genres, rand(1, 3)),
            'tags' => $this->faker->randomElements($tags, rand(2, 5)),
            'rating' => $this->faker->numberBetween(1, 5),
            'status' => $this->faker->randomElement($statuses),
            'description' => $this->faker->paragraphs(rand(3, 6), true),
            'my_thoughts' => $this->faker->paragraphs(rand(2, 4), true),
            'cover_image' => $this->faker->imageUrl(400, 600, 'books', true, 'book cover'),
            'explicit' => $this->faker->boolean(20),
            'color' => $this->faker->optional(0.8)->hexColor(),
        ];
    }

    public function explicit(): static
    {
        return $this->state(fn(array $attributes) => [
            'explicit' => true,
        ]);
    }

    public function currentlyReading(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'Currently Reading',
        ]);
    }

    public function read(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'Read',
        ]);
    }

    public function rating(int $rating): static
    {
        return $this->state(fn(array $attributes) => [
            'rating' => $rating,
        ]);
    }
}
