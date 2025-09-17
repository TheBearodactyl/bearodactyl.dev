<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\BookLink;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        Book::factory(15)
            ->read()
            ->has(BookLink::factory()->count(rand(1, 4)), 'links')
            ->create();

        Book::factory(10)
            ->currentlyReading()
            ->has(BookLink::factory()->count(rand(1, 3)), 'links')
            ->create();

        Book::factory(20)
            ->has(BookLink::factory()->count(rand(1, 3)), 'links')
            ->create();

        Book::factory(8)
            ->rating(5)
            ->read()
            ->has(BookLink::factory()->count(rand(2, 5)), 'links')
            ->create();

        Book::factory(5)
            ->explicit()
            ->has(BookLink::factory()->count(rand(1, 2)), 'links')
            ->create();

        Book::factory(3)->create()->each(function ($book) {
            BookLink::factory()->amazon()->forBook($book)->create();
            BookLink::factory()->goodreads()->forBook($book)->create();
        });

        $this->command->info('Created ' . Book::count() . ' books with their associated links.');
    }
}
