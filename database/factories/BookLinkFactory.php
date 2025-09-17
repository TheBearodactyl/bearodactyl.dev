<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\BookLink;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookLinkFactory extends Factory
{
    protected $model = BookLink::class;

    public function definition(): array
    {
        $linkTypes = [
            'amazon' => 'https://www.amazon.com/dp/' . $this->faker->regexify('[A-Z0-9]{10}'),
            'goodreads' => 'https://www.goodreads.com/book/show/' . $this->faker->numberBetween(1000000, 99999999),
            'audible' => 'https://www.audible.com/pd/' . $this->faker->regexify('[A-Z0-9]{10}'),
            'barnes_noble' => 'https://www.barnesandnoble.com/w/' . $this->faker->slug(3) . '/' . $this->faker->numberBetween(1000000000, 9999999999),
            'kobo' => 'https://www.kobo.com/ebook/' . $this->faker->slug(4),
            'apple_books' => 'https://books.apple.com/book/id' . $this->faker->numberBetween(100000000, 999999999),
            'google_books' => 'https://books.google.com/books?id=' . $this->faker->regexify('[A-Za-z0-9_-]{12}'),
            'author_website' => $this->faker->url(),
            'publisher_page' => $this->faker->url(),
            'book_depository' => 'https://www.bookdepository.com/book/' . $this->faker->numberBetween(1000000000000, 9999999999999),
        ];

        $selectedLink = $this->faker->randomElement(array_keys($linkTypes));

        return [
            'key' => $selectedLink,
            'value' => $linkTypes[$selectedLink],
            'book_id' => Book::factory(),
        ];
    }

    public function amazon(): static
    {
        return $this->state(fn(array $attributes) => [
            'key' => 'amazon',
            'value' => 'https://www.amazon.com/dp/' . $this->faker->regexify('[A-Z0-9]{10}'),
        ]);
    }

    public function goodreads(): static
    {
        return $this->state(fn(array $attributes) => [
            'key' => 'goodreads',
            'value' => 'https://www.goodreads.com/book/show/' . $this->faker->numberBetween(1000000, 99999999),
        ]);
    }

    public function forBook(Book $book): static
    {
        return $this->state(fn(array $attributes) => [
            'book_id' => $book->id,
        ]);
    }
}
