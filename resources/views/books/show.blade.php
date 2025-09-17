@extends('layouts.app')

@section('content')
    <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="md:flex">
                <!-- Book Cover -->
                <div class="md:w-1/3">
                    <img src="{{ $book->cover_image }}" alt="{{ $book->title }}" class="w-full h-96 md:h-full object-cover">
                </div>

                <!-- Book Details -->
                <div class="md:w-2/3 p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h1 class="text-3xl font-bold text-gray-900">{{ $book->title }}</h1>
                        @if ($book->explicit)
                            <span class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                                Explicit
                            </span>
                        @endif
                    </div>

                    <p class="text-xl text-gray-600 mb-4">by {{ $book->author }}</p>

                    <div class="flex items-center gap-4 mb-6">
                        <div class="flex text-yellow-400 text-xl">
                            @for ($i = 1; $i <= 5; $i++)
                                @if ($i <= $book->rating)
                                    ⭐
                                @else
                                    ☆
                                @endif
                            @endfor
                            <span class="text-gray-600 ml-2">{{ $book->rating }}/5</span>
                        </div>

                        <span
                            class="px-3 py-1 rounded-full text-sm font-medium
                                 {{ $book->status === 'completed' ? 'bg-green-100 text-green-800' : '' }}
                                 {{ $book->status === 'reading' ? 'bg-blue-100 text-blue-800' : '' }}
                                 {{ $book->status === 'planned' ? 'bg-gray-100 text-gray-800' : '' }}">
                            {{ ucfirst($book->status) }}
                        </span>
                    </div>

                    <!-- Genres -->
                    @if ($book->genres)
                        <div class="mb-4">
                            <h3 class="text-sm font-medium text-gray-700 mb-2">Genres</h3>
                            <div class="flex flex-wrap gap-2">
                                @foreach ($book->genres as $genre)
                                    <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                        {{ $genre }}
                                    </span>
                                @endforeach
                            </div>
                        </div>
                    @endif

                    <!-- Tags -->
                    @if ($book->tags)
                        <div class="mb-4">
                            <h3 class="text-sm font-medium text-gray-700 mb-2">Tags</h3>
                            <div class="flex flex-wrap gap-2">
                                @foreach ($book->tags as $tag)
                                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        {{ $tag }}
                                    </span>
                                @endforeach
                            </div>
                        </div>
                    @endif

                    <!-- Links -->
                    @if ($book->links->count() > 0)
                        <div class="mb-4">
                            <h3 class="text-sm font-medium text-gray-700 mb-2">Links</h3>
                            <div class="space-y-2">
                                @foreach ($book->links as $link)
                                    <div class="flex items-center gap-2">
                                        <span class="text-sm font-medium text-gray-600">{{ $link->key }}:</span>
                                        <a href="{{ $link->value }}" target="_blank"
                                            class="text-blue-600 hover:text-blue-800 underline text-sm">
                                            {{ $link->value }}
                                        </a>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    @endif

                    <!-- Action Buttons -->
                    <div class="flex gap-3 mt-6">
                        <a href="{{ route('books.edit', $book) }}"
                            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
                            Edit Book
                        </a>

                        <form method="POST" action="{{ route('books.destroy', $book) }}" class="inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" onclick="return confirm('Are you sure you want to delete this book?')"
                                class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md">
                                Delete Book
                            </button>
                        </form>

                        <a href="{{ route('books.index') }}"
                            class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md">
                            Back to List
                        </a>
                    </div>
                </div>
            </div>

            <!-- Description and Thoughts -->
            <div class="p-6 border-t bg-gray-50">
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                        <p class="text-gray-700 leading-relaxed">{{ $book->description }}</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">My Thoughts</h3>
                        <p class="text-gray-700 leading-relaxed">{{ $book->my_thoughts }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
