<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\BooksController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');
Route::get('/reviews/{review}', [ReviewController::class, 'show'])->name('reviews.show');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/reviews/create', [ReviewController::class, 'create'])->name('reviews.create');
    Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');
    Route::get('/reviews/{review}/edit', [ReviewController::class, 'edit'])->name('reviews.edit');
    Route::put('/reviews/{review}', [ReviewController::class, 'update'])->name('reviews.update');
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy'])->name('reviews.destroy');
});

Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::put('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');
});

Route::get('/books', [BooksController::class, 'index'])->name('books.index');
Route::get('/books/{book}', [BooksController::class, 'show'])->name('books.show');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/books/create', [BooksController::class, 'create'])->name('books.create');
    Route::post('/books', [BooksController::class, 'store'])->name('books.store');
    Route::get('/books/{book}/edit', [BooksController::class, 'edit'])->name('books.edit');
    Route::put('/books/{book}', [BooksController::class, 'update'])->name('books.update');
    Route::delete('/books/{book}', [BooksController::class, 'destroy'])->name('books.destroy');
});

require __DIR__ . '/auth.php';
