<?php

use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\BooksController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/review', [ReviewController::class, 'index'])->name('api.reviews.index');
Route::get('/review/{review}', [ReviewController::class, 'show'])->name('api.reviews.show');
Route::get('/project', [ProjectController::class, 'index'])->name('api.projects.index');
Route::get('/project/{project}', [ProjectController::class, 'show'])->name('api.projects.show');

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/review', [ReviewController::class, 'store'])->name('api.reviews.store');
    Route::put('/review/{review}', [ReviewController::class, 'update'])->name('api.reviews.update');
    Route::delete('/review/{review}', [ReviewController::class, 'destroy'])->name('api.reviews.destroy');

    Route::post('/project', [ProjectController::class, 'store'])->name('api.projects.store');
    Route::put('/project/{project}', [ProjectController::class, 'update'])->name('api.projects.update');
    Route::delete('/project/{project}', [ProjectController::class, 'destroy'])->name('api.projects.destroy');
});

Route::prefix('read-watch')->name('api.books.')->group(function () {
    Route::get('/', [BooksController::class, 'index'])->name('index');
    Route::get('/search', [BooksController::class, 'index'])->name('search');
    Route::get('/{book}', [BooksController::class, 'show'])->name('show');

    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::post('/', [BooksController::class, 'store'])->name('store');
        Route::put('/{book}', [BooksController::class, 'update'])->name('update');
        Route::patch('/{book}', [BooksController::class, 'patch'])->name('patch');
        Route::delete('/{book}', [BooksController::class, 'destroy'])->name('destroy');
        Route::delete('/bulk/delete', [BooksController::class, 'bulkDelete'])->name('bulk.delete');
        Route::patch('/bulk/update', [BooksController::class, 'bulkUpdate'])->name('bulk.update');
    });
});
