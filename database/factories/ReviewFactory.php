<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'chapter' => fake()->numberBetween(1, 10000),
            'description' => fake()->realText(),
            'rating' => fake()->numberBetween(1, 5),
            'thoughts' => fake()->realText()
        ];
    }
}
