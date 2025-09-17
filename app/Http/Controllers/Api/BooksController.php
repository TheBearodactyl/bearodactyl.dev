<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class BooksController extends Controller
{
    public function index(Request $request)
    {
        $query = Book::with('links');

        if ($request->filled('title')) {
            $query->byTitle($request->title);
        }

        if ($request->filled('author')) {
            $query->byAuthor($request->author);
        }

        if ($request->filled('status')) {
            $query->byStatus($request->status);
        }

        if ($request->filled('explicit')) {
            $query->byExplicit($request->boolean('explicit'));
        }

        if ($request->filled('min_rating') || $request->filled('max_rating')) {
            $query->byRatingRange($request->min_rating, $request->max_rating);
        }

        $sortField = $request->input('sort', 'id');
        $sortDirection = $request->input('direction', 'asc');
        $allowedSorts = ['id', 'title', 'author', 'rating', 'created_at'];

        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection);
        }

        $books = $query->paginate(15);

        if ($request->filled('genre') || $request->filled('tag')) {
            $filteredBooks = $books->filter(function ($book) use ($request) {
                if ($request->filled('genre')) {
                    $genreOperations = $this->parseFilterOperations($request->input('genre', []));
                    if (!$this->matchesFilterOperations($book->genres, $genreOperations)) {
                        return false;
                    }
                }

                if ($request->filled('tag')) {
                    $tagOperations = $this->parseFilterOperations($request->input('tag', []));
                    if (!$this->matchesFilterOperations($book->tags, $tagOperations)) {
                        return false;
                    }
                }

                return true;
            });

            $books->setCollection($filteredBooks);
        }

        return BookResource::collection($books);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'author' => 'required|string|max:255',
                'genres' => 'sometimes|array',
                'genres.*' => 'string|max:255',
                'tags' => 'sometimes|array',
                'tags.*' => 'string|max:255',
                'rating' => 'sometimes|integer|between:1,5',
                'status' => 'required|string|max:255',
                'description' => 'required|string',
                'my_thoughts' => 'required|string',
                'cover_image' => 'required|string',
                'explicit' => 'sometimes|boolean',
                'color' => 'sometimes|string|max:7|nullable',
                'links' => 'sometimes|array',
                'links.*.key' => 'required_with:links|string|max:255',
                'links.*.value' => 'required_with:links|string',
            ]);

            $book = Book::create($validatedData);

            if ($request->filled('links')) {
                foreach ($request->input('links') as $linkData) {
                    $book->links()->create($linkData);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Book created successfully',
                'data' => new BookResource($book->load('links'))
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => "Failed to create book: {$e->getMessage()}"], 500);
        }
    }

    public function show(Book $book)
    {
        return new BookResource($book->load('links'));
    }

    public function update(BookRequest $request, Book $book)
    {
        DB::beginTransaction();

        try {
            $book->update($request->validated());

            if ($request->filled('links')) {
                $book->links()->delete();

                foreach ($request->input('links') as $linkData) {
                    $book->links()->create($linkData);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Book updated successfully',
                'data' => new BookResource($book->fresh(['links']))
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => "Failed to update book: $e"], 500);
        }
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return response()->json(['message' => 'Book deleted successfully']);
    }

    public function bulkDelete(Request $request)
    {
        $request->validate([
            'author' => 'sometimes|string',
            'status' => 'sometimes|string',
        ]);

        $query = Book::query();

        if ($request->filled('author')) {
            $query->where('author', $request->author);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $deletedCount = $query->count();
        $query->delete();

        return response()->json([
            'message' => 'Bulk delete complete',
            'deleted' => $deletedCount
        ]);
    }

    public function bulkUpdate(Request $request)
    {
        $request->validate([
            'filter' => 'required|array',
            'update' => 'required|array',
        ]);

        $query = Book::query();

        foreach ($request->input('filter') as $field => $value) {
            if (in_array($field, ['author', 'status'])) {
                $query->where($field, $value);
            }
        }

        $updateData = [];
        foreach ($request->input('update') as $field => $value) {
            if (in_array($field, ['status', 'rating'])) {
                $updateData[$field] = $value;
            }
        }

        $updatedCount = $query->count();
        $query->update($updateData);

        return response()->json([
            'message' => 'Bulk update complete',
            'updated' => $updatedCount
        ]);
    }

    public function patch(Request $request, Book $book)
    {
        $allowedFields = [
            'title',
            'author',
            'genres',
            'tags',
            'rating',
            'status',
            'description',
            'my_thoughts',
            'cover_image',
            'explicit',
            'color'
        ];

        $updateData = [];
        foreach ($allowedFields as $field) {
            if ($request->has($field)) {
                $updateData[$field] = $request->input($field);
            }
        }

        if (!empty($updateData)) {
            $book->update($updateData);
        }

        return response()->json(['message' => 'Book updated successfully']);
    }

    private function parseFilterOperations(array $filters): array
    {
        return collect($filters)->map(function ($filter) {
            if (str_starts_with($filter, '+')) {
                return ['type' => 'require', 'value' => substr($filter, 1)];
            } elseif (str_starts_with($filter, '-')) {
                return ['type' => 'exclude', 'value' => substr($filter, 1)];
            } else {
                return ['type' => 'include', 'value' => $filter];
            }
        })->toArray();
    }

    private function matchesFilterOperations(array $bookItems, array $operations): bool
    {
        $bookItemsLower = array_map('strtolower', $bookItems);

        foreach ($operations as $operation) {
            $value = strtolower($operation['value']);
            $type = $operation['type'];

            switch ($type) {
                case 'exclude':
                    foreach ($bookItemsLower as $item) {
                        if (str_contains($item, $value)) {
                            return false;
                        }
                    }
                    break;

                case 'require':
                    $found = false;
                    foreach ($bookItemsLower as $item) {
                        if (str_contains($item, $value)) {
                            $found = true;
                            break;
                        }
                    }
                    if (!$found) {
                        return false;
                    }
                    break;

                case 'include':
                    break;
            }
        }

        $includes = array_filter($operations, fn($op) => $op['type'] === 'include');
        if (!empty($includes)) {
            foreach ($includes as $include) {
                $value = strtolower($include['value']);
                foreach ($bookItemsLower as $item) {
                    if (str_contains($item, $value)) {
                        return true;
                    }
                }
            }
            return false;
        }

        return true;
    }
}
