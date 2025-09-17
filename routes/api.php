<?php

use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\BooksController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResources([
    '/review' => ReviewController::class,
    '/project' => ProjectController::class
]);

Route::prefix('read-watch')->group(function () {
    Route::get('/', [BooksController::class, 'index']);
    Route::get('/search', [BooksController::class, 'index']);
    Route::get('/{book}', [BooksController::class, 'show']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/', [BooksController::class, 'store']);
        Route::put('/{book}', [BooksController::class, 'update']);
        Route::patch('/{book}', [BooksController::class, 'patch']);
        Route::delete('/{book}', [BooksController::class, 'destroy']);
        Route::delete('/bulk/delete', [BooksController::class, 'bulkDelete']);
        Route::patch('/bulk/update', [BooksController::class, 'bulkUpdate']);
    });
});
