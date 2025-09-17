@extends('layouts.app')

@section('content')
    <main class="container">
        <div style="margin-bottom: 1.5rem;">
            <h1>My Book Collection</h1>

            <form method="GET" action="{{ route('books.index') }}" class="filter-form">
                <div class="filter-grid">
                    <div class="form-group">
                        <input type="text" name="search" value="{{ request('search') }}" placeholder="Search books..."
                            class="form-input">
                    </div>

                    <div class="form-group">
                        <select name="status" class="form-select">
                            <option value="">All Statuses</option>
                            @foreach ($statuses as $status)
                                <option value="{{ $status }}" {{ request('status') == $status ? 'selected' : '' }}>
                                    {{ ucfirst($status) }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="form-group">
                        <select name="rating" class="form-select">
                            <option value="">All Ratings</option>
                            @foreach ($ratings as $rating)
                                <option value="{{ $rating }}" {{ request('rating') == $rating ? 'selected' : '' }}>
                                    {{ $rating }} Star{{ $rating != 1 ? 's' : '' }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="btn-group">
                    <button type="submit" class="btn btn-primary">
                        Filter
                    </button>
                    <a href="{{ route('books.index') }}" class="btn btn-secondary">
                        Clear
                    </a>
                </div>
            </form>
        </div>

        <div class="books-gallery">
            @forelse($books as $book)
                <div class="book-card">
                    <div class="book-cover">
                        <img src="{{ $book->cover_image }}" alt="{{ $book->title }}" loading="lazy">
                    </div>

                    <div class="book-info">
                        <h3 class="book-title">
                            {{ $book->title }}
                        </h3>

                        <p class="book-author">{{ $book->author }}</p>

                        <div class="book-rating">
                            <div class="book-stars">
                                @for ($i = 1; $i <= 5; $i++)
                                    @if ($i <= $book->rating)
                                        ⭐
                                    @else
                                        ☆
                                    @endif
                                @endfor
                            </div>

                            <span class="book-status status-{{ $book->status }}">
                                {{ ucfirst($book->status) }}
                            </span>
                        </div>

                        @if ($book->genres)
                            <div class="book-genres">
                                @foreach (array_slice($book->genres, 0, 2) as $genre)
                                    <span class="genre-tag">
                                        {{ $genre }}
                                    </span>
                                @endforeach
                                @if (count($book->genres) > 2)
                                    <span class="genre-tag">
                                        +{{ count($book->genres) - 2 }} more
                                    </span>
                                @endif
                            </div>
                        @endif

                        <div class="book-actions">
                            <a href="{{ route('books.show', $book) }}" class="btn btn-primary">
                                View
                            </a>
                            <a href="{{ route('books.edit', $book) }}" class="btn btn-secondary">
                                Edit
                            </a>

                            <form method="POST" action="{{ route('books.destroy', $book) }}" style="flex: 1;"
                                onsubmit="return confirmDelete('{{ addslashes($book->title) }}')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger" style="width: 100%;">
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            @empty
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <h3>No books found</h3>
                    <p>Start building your collection</p>
                    <a href="{{ route('books.create') }}" class="btn btn-primary">
                        Add your first book
                    </a>
                </div>
            @endforelse
        </div>

        @if ($books->hasPages())
            <div class="pagination">
                {{ $books->links() }}
            </div>
        @endif
    </main>

    <script>
        function confirmDelete(title) {
            return confirm(`Are you sure you want to delete "${title}"?`);
        }
    </script>
@endsection
