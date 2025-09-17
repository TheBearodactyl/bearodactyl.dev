<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookRequest;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\View\View;

class BooksController extends Controller
{

    public function index(Request $request): View
    {
        $query = Book::with('links');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('author', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->byStatus($request->status);
        }

        if ($request->filled('rating')) {
            $query->where('rating', $request->rating);
        }

        $books = $query->paginate(12)->withQueryString();
        $statuses = Book::distinct()->pluck('status');
        $ratings = range(1, 5);

        return view('books.index', compact('books', 'statuses', 'ratings'));
    }

    public function create()
    {
        return view('books.create');
    }

    public function store(Request $request)
    {
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
                if (!empty($linkData['key']) && !empty($linkData['value'])) {
                    $book->links()->create($linkData);
                }
            }
        }

        return redirect()->route('books.show', $book)
            ->with('success', 'Book created successfully!');
    }

    public function show(Book $book): View
    {
        return view('books.show', compact('book'));
    }

    public function edit(Book $book)
    {
        return view('books.edit', compact('book'));
    }

    public function update(BookRequest $request, Book $book)
    {
        $book->update($request->validated());

        if ($request->filled('links')) {
            $book->links()->delete();

            foreach ($request->input('links') as $linkData) {
                if (!empty($linkData['key']) && !empty($linkData['value'])) {
                    $book->links()->create($linkData);
                }
            }
        }

        return redirect()->route('books.show', $book)
            ->with('success', 'Book updated successfully!');
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->route('books.index')
            ->with('success', 'Book deleted successfully!');
    }
}
