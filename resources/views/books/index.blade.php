@extends('layouts.app')

@section('content')
    <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">My Book Collection</h1>

        <form method="GET" action="{{ route('books.index') }}" class="bg-white p-4 rounded-lg shadow mb-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <input type="text" name="search" value="{{ request('search') }}" placeholder="Search books..."
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                </div>

                <div>
                    <select name="status"
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        <option value="">All Statuses</option>
                        @foreach ($statuses as $status)
                            <option value="{{ $status }}" {{ request('status') == $status ? 'selected' : '' }}>
                                {{ ucfirst($status) }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <select name="rating"
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        <option value="">All Ratings</option>
                        @foreach ($ratings as $rating)
                            <option value="{{ $rating }}" {{ request('rating') == $rating ? 'selected' : '' }}>
                                {{ $rating }} Star{{ $rating != 1 ? 's' : '' }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="mt-4 flex gap-2">
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                    Filter
                </button>
                <a href="{{ route('books.index') }}" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
                    Clear
                </a>
            </div>
        </form>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        @forelse($books as $book)
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div class="aspect-w-2 aspect-h-3 bg-gray-200">
                    <img src="{{ $book->cover_image }}" alt="{{ $book->title }}" class="book-cover-image"
                        style="width: 33%" loading="lazy">
                </div>

                <div class="p-4">
                    <h3 class="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
                        {{ $book->title }}
                    </h3>

                    <p class="text-gray-600 mb-2">{{ $book->author }}</p>

                    <div class="flex items-center justify-between mb-2">
                        <div class="flex text-yellow-400">
                            @for ($i = 1; $i <= 5; $i++)
                                @if ($i <= $book->rating)
                                    ⭐
                                @else
                                    ☆
                                @endif
                            @endfor
                        </div>

                        <span
                            class="px-2 py-1 text-xs rounded-full
                                 {{ $book->status === 'completed' ? 'bg-green-100 text-green-800' : '' }}
                                 {{ $book->status === 'reading' ? 'bg-blue-100 text-blue-800' : '' }}
                                 {{ $book->status === 'planned' ? 'bg-gray-100 text-gray-800' : '' }}">
                            {{ ucfirst($book->status) }}
                        </span>
                    </div>

                    @if ($book->genres)
                        <div class="flex flex-wrap gap-1 mb-3">
                            @foreach (array_slice($book->genres, 0, 2) as $genre)
                                <span class="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                                    {{ $genre }}
                                </span>
                            @endforeach
                            @if (count($book->genres) > 2)
                                <span class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                    +{{ count($book->genres) - 2 }} more
                                </span>
                            @endif
                        </div>
                    @endif

                    <div class="flex gap-2">
                        <a href="{{ route('books.show', $book) }}"
                            class="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-md text-sm">
                            View
                        </a>
                        <a href="{{ route('books.edit', $book) }}"
                            class="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-center py-2 rounded-md text-sm">
                            Edit
                        </a>

                        <form method="POST" action="{{ route('books.destroy', $book) }}" class="flex-1"
                            onsubmit="return confirmDelete('{{ addslashes($book->title) }}')">
                            @csrf
                            @method('DELETE')
                            <button type="submit"
                                class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm transition-colors duration-200">
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        @empty
            <div class="col-span-full text-center py-12">
                <div class="text-gray-500 text-lg mb-4">No books found</div>
                <a href="{{ route('books.create') }}"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
                    Add your first book
                </a>
            </div>
        @endforelse
    </div>

    @if ($books->hasPages())
        <div class="mt-8">
            {{ $books->links() }}
        </div>
    @endif
@endsection
