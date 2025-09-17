@extends('layouts.app')

@section('content')
    <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h1 class="text-2xl font-bold text-gray-900 mb-6">Edit Book: {{ $book->title }}</h1>

            <form method="POST" action="{{ route('books.update', $book) }}" id="book-form">
                @csrf
                @method('PUT')

                <div class="grid md:grid-cols-2 gap-6">
                    <!-- Title -->
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" id="title" name="title" value="{{ old('title', $book->title) }}"
                            class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('title') border-red-500 @enderror"
                            required>
                        @error('title')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Author -->
                    <div>
                        <label for="author" class="block text-sm font-medium text-gray-700 mb-1">Author</label>
                        <input type="text" id="author" name="author" value="{{ old('author', $book->author) }}"
                            class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('author') border-red-500 @enderror"
                            required>
                        @error('author')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Rating -->
                    <div>
                        <label for="rating" class="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <select id="rating" name="rating"
                            class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('rating') border-red-500 @enderror">
                            @for ($i = 1; $i <= 5; $i++)
                                <option value="{{ $i }}"
                                    {{ old('rating', $book->rating) == $i ? 'selected' : '' }}>
                                    {{ $i }} Star{{ $i != 1 ? 's' : '' }}
                                </option>
                            @endfor
                        </select>
                        @error('rating')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Status -->
                    <div>
                        <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select id="status" name="status"
                            class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('status') border-red-500 @enderror"
                            required>
                            <option value="planned" {{ old('status', $book->status) == 'planned' ? 'selected' : '' }}>
                                Planned</option>
                            <option value="reading" {{ old('status', $book->status) == 'reading' ? 'selected' : '' }}>
                                Reading</option>
                            <option value="completed" {{ old('status', $book->status) == 'completed' ? 'selected' : '' }}>
                                Completed</option>
                        </select>
                        @error('status')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <!-- Cover Image URL -->
                <div class="mt-6">
                    <label for="cover_image" class="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                    <input type="url" id="cover_image" name="cover_image"
                        value="{{ old('cover_image', $book->cover_image) }}"
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('cover_image') border-red-500 @enderror"
                        required>
                    @error('cover_image')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Genres -->
                <div class="mt-6">
                    <label for="genres_input" class="block text-sm font-medium text-gray-700 mb-1">
                        Genres (comma-separated)
                    </label>
                    <input type="text" id="genres_input"
                        value="{{ old('genres') ? implode(', ', old('genres')) : ($book->genres ? implode(', ', $book->genres) : '') }}"
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Fantasy, Adventure, Romance">
                </div>

                <!-- Tags -->
                <div class="mt-6">
                    <label for="tags_input" class="block text-sm font-medium text-gray-700 mb-1">
                        Tags (comma-separated)
                    </label>
                    <input type="text" id="tags_input"
                        value="{{ old('tags') ? implode(', ', old('tags')) : ($book->tags ? implode(', ', $book->tags) : '') }}"
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="must-read, favorite, series">
                </div>

                <!-- Description -->
                <div class="mt-6">
                    <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="description" name="description" rows="4"
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('description') border-red-500 @enderror"
                        required>{{ old('description', $book->description) }}</textarea>
                    @error('description')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <!-- My Thoughts -->
                <div class="mt-6">
                    <label for="my_thoughts" class="block text-sm font-medium text-gray-700 mb-1">My Thoughts</label>
                    <textarea id="my_thoughts" name="my_thoughts" rows="4"
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 @error('my_thoughts') border-red-500 @enderror"
                        required>{{ old('my_thoughts', $book->my_thoughts) }}</textarea>
                    @error('my_thoughts')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Existing Links -->
                <div class="mt-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">External Links</label>
                    <div id="links-container">
                        @foreach ($book->links as $index => $link)
                            <div class="flex gap-2 mb-2">
                                <input type="text" name="links[{{ $index }}][key]" value="{{ $link->key }}"
                                    placeholder="Link name"
                                    class="flex-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                <input type="url" name="links[{{ $index }}][value]" value="{{ $link->value }}"
                                    placeholder="https://..."
                                    class="flex-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                <button type="button" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
                                    onclick="this.parentElement.remove()">
                                    Remove
                                </button>
                            </div>
                        @endforeach
                    </div>
                    <button type="button" id="add-link"
                        class="mt-2 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm">
                        Add Link
                    </button>
                </div>

                <!-- Options -->
                <div class="mt-6 space-y-3">
                    <div class="flex items-center">
                        <input type="checkbox" id="explicit" name="explicit" value="1"
                            {{ old('explicit', $book->explicit) ? 'checked' : '' }}
                            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                        <label for="explicit" class="ml-2 text-sm text-gray-700">
                            Contains explicit content
                        </label>
                    </div>

                    <div>
                        <label for="color" class="block text-sm font-medium text-gray-700 mb-1">
                            Color Theme (optional)
                        </label>
                        <input type="color" id="color" name="color"
                            value="{{ old('color', $book->color ?? '#3B82F6') }}"
                            class="h-10 w-20 border border-gray-300 rounded-md">
                    </div>
                </div>

                <!-- Submit Buttons -->
                <div class="mt-8 flex gap-3">
                    <button type="submit"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium">
                        Update Book
                    </button>
                    <a href="{{ route('books.show', $book) }}"
                        class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md font-medium">
                        Cancel
                    </a>
                </div>
            </form>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Handle dynamic links (same as create form)
            let linkIndex = {{ $book->links->count() }};

            document.getElementById('add-link').addEventListener('click', function() {
                const container = document.getElementById('links-container');
                const linkDiv = document.createElement('div');
                linkDiv.className = 'flex gap-2 mb-2';
                linkDiv.innerHTML = `
            <input type="text"
                   name="links[${linkIndex}][key]"
                   placeholder="Link name (e.g., Amazon)"
                   class="flex-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <input type="url"
                   name="links[${linkIndex}][value]"
                   placeholder="https://..."
                   class="flex-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <button type="button"
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
                    onclick="this.parentElement.remove()">
                Remove
            </button>
        `;
                container.appendChild(linkDiv);
                linkIndex++;
            });

            // Handle comma-separated inputs for genres and tags (same as create form)
            document.getElementById('book-form').addEventListener('submit', function(e) {
                // Process genres
                const genresInput = document.getElementById('genres_input').value;
                const genresContainer = document.getElementById('genres_input').parentElement;
                genresContainer.querySelectorAll('input[name="genres[]"]').forEach(el => el.remove());

                if (genresInput.trim()) {
                    const genres = genresInput.split(',').map(g => g.trim()).filter(g => g);
                    genres.forEach(genre => {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = 'genres[]';
                        input.value = genre;
                        genresContainer.appendChild(input);
                    });
                }

                // Process tags
                const tagsInput = document.getElementById('tags_input').value;
                const tagsContainer = document.getElementById('tags_input').parentElement;
                tagsContainer.querySelectorAll('input[name="tags[]"]').forEach(el => el.remove());

                if (tagsInput.trim()) {
                    const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t);
                    tags.forEach(tag => {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = 'tags[]';
                        input.value = tag;
                        tagsContainer.appendChild(input);
                    });
                }
            });
        });
    </script>
@endsection
