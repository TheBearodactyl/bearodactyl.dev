<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->json('genres')->default('[]');
            $table->json('tags')->default('[]');
            $table->integer('rating')->default(1);
            $table->string('status');
            $table->text('description');
            $table->text('my_thoughts');
            $table->text('cover_image');
            $table->boolean('explicit')->default(false);
            $table->string('color')->nullable();
            $table->timestamps();

            $table->index(['title', 'author']);
            $table->index('status');
            $table->index('rating');
            $table->index('explicit');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
