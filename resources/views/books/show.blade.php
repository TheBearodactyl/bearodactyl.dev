@extends('layouts.app')

@section('content')
    <main class="container">
        <div class="card">
            <div class="book-detail">

                <div class="book-detail-cover">
                    <img src="{{ $book->cover_image }}" alt="{{ $book->title }}">
                </div>


                <div class="book-detail-info">
                    <div
                        style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                        <h1>{{ $book->title }}</h1>
                        @if ($book->explicit)
                            <span class="explicit-badge">
                                Explicit
                            </span>
                        @endif
                    </div>

                    <p class="book-detail-author">by {{ $book->author }}</p>

                    <div class="book-detail-rating">
                        <div class="book-stars">
                            @for ($i = 1; $i <= 5; $i++)
                                @if ($i <= $book->rating)
                                    ⭐
                                @else
                                    ☆
                                @endif
                            @endfor
                            <span style="color: var(--rp-subtle); margin-left: 0.5rem;">{{ $book->rating }}/5</span>
                        </div>

                        <span class="book-status status-{{ $book->status }}">
                            {{ ucfirst($book->status) }}
                        </span>
                    </div>


                    @if ($book->genres)
                        <div class="book-detail-meta">
                            <div class="meta-section">
                                <h3>Genres</h3>
                                <div class="tag-list">
                                    @foreach ($book->genres as $genre)
                                        <span class="tag">
                                            {{ $genre }}
                                        </span>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    @endif


                    @if ($book->tags)
                        <div class="book-detail-meta">
                            <div class="meta-section">
                                <h3>Tags</h3>
                                <div class="tag-list">
                                    @foreach ($book->tags as $tag)
                                        <span class="tag"
                                            style="background-color: rgba(49, 116, 143, 0.2); color: var(--rp-pine);">
                                            {{ $tag }}
                                        </span>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    @endif


                    @if ($book->links->count() > 0)
                        <div class="book-detail-meta">
                            <div class="meta-section">
                                <h3>Links</h3>
                                <div>
                                    @foreach ($book->links as $link)
                                        <div class="link-item">
                                            <span
                                                style="font-weight: 500; color: var(--rp-subtle);">{{ $link->key }}:</span>
                                            <a href="{{ $link->value }}" target="_blank">
                                                {{ $link->value }}
                                            </a>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    @endif


                    <div class="btn-group" style="margin-top: 1.5rem;">
                        <a href="{{ route('books.edit', $book) }}" class="btn btn-primary">
                            Edit Book
                        </a>

                        <form method="POST" action="{{ route('books.destroy', $book) }}" style="display: inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" onclick="return confirm('Are you sure you want to delete this book?')"
                                class="btn btn-danger">
                                Delete Book
                            </button>
                        </form>

                        <a href="{{ route('books.index') }}" class="btn btn-secondary">
                            Back to List
                        </a>
                    </div>
                </div>
            </div>


            <div class="book-content">
                <div class="content-grid">
                    <div class="content-section">
                        <h3>Description</h3>
                        <p>{{ $book->description }}</p>
                    </div>

                    <div class="content-section">
                        <h3>My Thoughts</h3>
                        <p>{{ $book->my_thoughts }}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
@endsection
