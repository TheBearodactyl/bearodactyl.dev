<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('reviews')->insert([
            'chapter' => random_int(1, 10000),
            'description' => Str::random(200),
            'rating' => random_int(1, 5),
            'thoughts' => Str::random(200),
        ]);
    }
}
