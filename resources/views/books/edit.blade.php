@extends('layouts.app')

@section('content')
    <div class="min-h-screen px-4 py-8" style="background-color: var(--rp-base); color: var(--rp-text);">
        <div class="max-w-4xl mx-auto">
            <div class="rounded-xl shadow-2xl p-8"
                style="background-color: var(--rp-surface); border: 1px solid var(--rp-highlight-med);">
                <div class="flex items-center gap-4 mb-8">
                    <div class="p-3 rounded-lg" style="background-color: var(--rp-overlay);">
                        <svg class="w-8 h-8" style="color: var(--rp-foam);" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <div>
                        <h1 class="text-4xl font-bold" style="color: var(--rp-foam);">Edit Book</h1>
                        <p class="text-lg mt-1" style="color: var(--rp-subtle);">{{ $book->title }}</p>
                    </div>
                </div>

                <form method="POST" action="{{ route('books.update', $book) }}" id="book-form" class="space-y-8">
                    @csrf
                    @method('PUT')

                    <div class="grid md:grid-cols-2 gap-6">
                        <!-- Title -->
                        <div class="space-y-2">
                            <label for="title" class="block text-sm font-semibold" style="color: var(--rp-text);">
                                <span class="flex items-center gap-2">
                                    <span>Title</span>
                                    <span style="color: var(--rp-love);">*</span>
                                </span>
                            </label>
                            <input type="text" id="title" name="title" value="{{ old('title', $book->title) }}"
                                class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-20 @error('title') error-border @enderror"
                                style="background-color: var(--rp-overlay); border-color: var(--rp-highlight-med); color: var(--rp-text);"
                                required>
                            @error('title')
                                <p class="text-sm flex items-center gap-2" style="color: var(--rp-love);">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    {{ $message }}
                                </p>
                            @enderror
                        </div>

                        <!-- Author -->
                        <div class="space-y-2">
                            <label for="author" class="block text-sm font-semibold" style="color: var(--rp-text);">
                                <span class="flex items-center gap-2">
                                    <span>Author</span>
                                    <span style="color: var(--rp-love);">*</span>
                                </span>
                            </label>
                            <input type="text" id="author" name="author" value="{{ old('author', $book->author) }}"
                                class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-20 @error('author') error-border @enderror"
                                style="background-color: var(--rp-overlay); border-color: var(--rp-highlight-med); color: var(--rp-text);"
                                required>
                            @error('author')
                                <p class="text-sm flex items-center gap-2" style="color: var(--rp-love);">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    {{ $message }}
                                </p>
                            @enderror
                        </div>

                        <!-- Rating -->
                        <div class="space-y-2">
                            <label for="rating" class="block text-sm font-semibold"
                                style="color: var(--rp-text);">Rating</label>
                            <select id="rating" name="rating"
                                class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-20 @error('rating') error-border @enderror"
                                style="background-color: var(--rp-overlay); border-color: var(--rp-highlight-med); color: var(--rp-text);">
                                @for ($i = 1; $i <= 5; $i++)
                                    <option value="{{ $i }}"
                                        {{ old('rating', $book->rating) == $i ? 'selected' : '' }}>
                                        {{ $i }} Star{{ $i != 1 ? 's' : '' }}
                                    </option>
                                @endfor
                            </select>
                            @error('rating')
                                <p class="text-sm flex items-center gap-2" style="color: var(--rp-love);">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    {{ $message }}
                                </p>
                            @enderror
                        </div>

                        <!-- Status -->
                        <div class="space-y-2">
                            <label for="status" class="block text-sm font-semibold" style="color: var(--rp-text);">
                                <span class="flex items-center gap-2">
                                    <span>Status</span>
                                    <span style="color: var(--rp-love);">*</span>
                                </span>
                            </label>
                            <select id="status" name="status"
                                class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-20 @error('status') error-border @enderror"
                                style="background-color: var(--rp-overlay); border-color: var(--rp-highlight-med); color: var(--rp-text);"
                                required>
                                <option value="planned" {{ old('status', $book->status) == 'planned' ? 'selected' : '' }}>
                                    Planned</option>
                                <option value="reading" {{ old('status', $book->status) == 'reading' ? 'selected' : '' }}>
                                    Reading</option>
                                <option value="completed"
                                    {{ old('status', $book->status) == 'completed' ? 'selected' : '' }}>
                                    Completed
                                </option>
                                <option value="dropped" {{ old('status', $book->status) == 'dropped' ? 'selected' : '' }}>
                                    Dropped
                                </option>
                            </select>
                            @error('status')
                                <p class="text-sm flex items-center gap-2" style="color: var(--rp-love);">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    {{ $message }}
                                </p>
                            @enderror
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label for="cover_image" class="block text-sm font-semibold" style="color: var(--rp-text);">
                            <span class="flex items-center gap-2">
                                <span>Cover Image URL</span>
                                <span style="color: var(--rp-love);">*</span>
                            </span>
                        </label>
                        <input type="url" id="cover_image" name="cover_image"
                            value="{{ old('cover_image', $book->cover_image) }}"
                            class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-20 @error('cover_image') error-border @enderror"
                            style="background-color: var(--rp-overlay); border-color: var(--rp-highlight-med); color: var(--rp-text);"
                            required>
                        @error('cover_image')
                            <p class="text-sm flex items-center gap-2" style="color: var(--rp-love);">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                {{ $message }}
                            </p>
                        @enderror
                    </div>

                    <div class="space-y-2">
                        <label for="genres_input" class="block text-sm font-semibold" style="color: var(--rp-text);">
                            Genres (comma-separated)
                        </label>
                        <input type="text" id="genres_input"
                            value="{{ old('genres') ? implode(', ', old('genres')) : ($book->genres ? implode(', ', $book->genres) : '') }}"
                            class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-20"
                            style="background-color: var(--rp-overlay); border-color: var(--rp-highlight-med); color: var(--rp-text);"
                            placeholder="Fantasy, Adventure, Romance">
                    </div>

                    <div class="space-y-2">
                        <label for="tags_input" class="block text-sm font-semibold" style="color: var(--rp-text);">
                            Tags (comma-separated)
                        </label>
                        <input type="text" id="tags_input"
                            value="{{ old('tags') ? implode(', ', old('tags')) : ($book->tags ? implode(', ', $book->tags) : '') }}"
                            class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-20"
                            style="background-color: var(--rp-overlay); border-color: var(--rp-highlight-med); color: var(--rp-text);"
                            placeholder="must-read, favorite, series">
                    </div>

                    <div class="space-y-2">
                        <label for="description" class="block text-sm font-semibold" style="color: var(--rp-text);">
                            <span class="flex items-center gap-2">
                                <span>Description</span>
                                <span style="color: var(--rp-love);">*</span>
                            </span>
                        </label>
                        <textarea id="description" name="description" rows="4"
                            class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-20 @error('description') error-border @enderror resize-none"
                            style="background-color: var(--rp-overlay); border-color: var(--rp-highlight-med); color: var(--rp-text);"
                            required>{{ old('description', $book->description) }}</textarea>
                        @error('description')
                            <p class="text-sm flex items-center gap-2" style="color: var(--rp-love);">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                {{ $message }}
                            </p>
                        @enderror
                    </div>

                    <div class="space-y-2">
                        <label for="my_thoughts" class="block text-sm font-semibold" style="color: var(--rp-text);">
                            <span class="flex items-center gap-2">
                                <span>My Thoughts</span>
                                <span style="color: var(--rp-love);">*</span>
                            </span>
                        </label>
                        <textarea id="my_thoughts" name="my_thoughts" rows="4"
                            class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-opacity-20 @error('my_thoughts') error-border @enderror resize-none"
                            style="background-color: var(--rp-overlay); border-color: var(--rp-highlight-med); color: var(--rp-text);"
                            required>{{ old('my_thoughts', $book->my_thoughts) }}</textarea>
                        @error('my_thoughts')
                            <p class="text-sm flex items-center gap-2" style="color: var(--rp-love);">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                {{ $message }}
                            </p>
                        @enderror
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <label class="block text-sm font-semibold" style="color: var(--rp-text);">External
                                Links</label>
                            <button type="button" id="add-link"
                                class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                style="background-color: var(--rp-pine); color: var(--rp-base);">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Link
                            </button>
                        </div>
                        <div id="links-container" class="space-y-3">
                            @foreach ($book->links as $index => $link)
                                <div class="flex gap-3 p-4 rounded-lg border"
                                    style="background-color: var(--rp-overlay); border-color: var(--rp-highlight-med);">
                                    <input type="text" name="links[{{ $index }}][key]"
                                        value="{{ $link->key }}" placeholder="Link name"
                                        class="flex-1 px-3 py-2 rounded-md border transition-all duration-200"
                                        style="background-color: var(--rp-surface); border-color: var(--rp-highlight-med); color: var(--rp-text);">
                                    <input type="url" name="links[{{ $index }}][value]"
                                        value="{{ $link->value }}" placeholder="https://..."
                                        class="flex-1 px-3 py-2 rounded-md border transition-all duration-200"
                                        style="background-color: var(--rp-surface); border-color: var(--rp-highlight-med); color: var(--rp-text);">
                                    <button type="button"
                                        class="px-4 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105"
                                        style="background-color: var(--rp-love); color: var(--rp-text);"
                                        onclick="this.parentElement.remove()">
                                        Remove
                                    </button>
                                </div>
                            @endforeach
                        </div>
                    </div>

                    <div class="space-y-6 p-6 rounded-lg" style="background-color: var(--rp-overlay);">
                        <h3 class="text-lg font-semibold flex items-center gap-2" style="color: var(--rp-text);">
                            <svg class="w-5 h-5" style="color: var(--rp-iris);" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Additional Options
                        </h3>

                        <div class="flex items-center gap-3">
                            <input type="checkbox" id="explicit" name="explicit" value="1"
                                {{ old('explicit', $book->explicit) ? 'checked' : '' }}
                                class="w-4 h-4 rounded border-2 transition-all duration-200"
                                style="background-color: var(--rp-surface); border-color: var(--rp-highlight-med); color: var(--rp-iris);">
                            <label for="explicit" class="text-sm flex items-center gap-2" style="color: var(--rp-text);">
                                <span class="text-lg">🔞</span>
                                Contains explicit content
                            </label>
                        </div>

                        <div class="space-y-2">
                            <label for="color" class="block text-sm font-semibold" style="color: var(--rp-text);">
                                Color Theme
                            </label>
                            <div class="flex items-center gap-4">
                                <input type="color" id="color" name="color"
                                    value="{{ old('color', $book->color ?? '#c4a7e7') }}"
                                    class="h-12 w-16 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105"
                                    style="border-color: var(--rp-highlight-med);">
                                <span class="text-sm" style="color: var(--rp-subtle);">Choose a theme color for this
                                    book</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-4 pt-6">
                        <button type="submit"
                            class="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-xl flex-1 justify-center"
                            style="background-color: var(--rp-foam); color: var(--rp-base);">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                            Update Book
                        </button>
                        <a href="{{ route('books.show', $book) }}"
                            class="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 border-2"
                            style="background-color: transparent; color: var(--rp-muted); border-color: var(--rp-muted);">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            let linkIndex = {{ $book->links->count() }};

            document.getElementById('add-link').addEventListener('click', function() {
                const container = document.getElementById('links-container');
                const linkDiv = document.createElement('div');
                linkDiv.className = 'flex gap-3 p-4 rounded-lg border';
                linkDiv.style.cssText =
                    'background-color: var(--rp-overlay); border-color: var(--rp-highlight-med);';
                linkDiv.innerHTML = `
                    <input type="text"
                           name="links[${linkIndex}][key]"
                           placeholder="Link name (e.g., Amazon)"
                           class="flex-1 px-3 py-2 rounded-md border transition-all duration-200"
                           style="background-color: var(--rp-surface); border-color: var(--rp-highlight-med); color: var(--rp-text);">
                    <input type="url"
                           name="links[${linkIndex}][value]"
                           placeholder="https://..."
                           class="flex-1 px-3 py-2 rounded-md border transition-all duration-200"
                           style="background-color: var(--rp-surface); border-color: var(--rp-highlight-med); color: var(--rp-text);">
                    <button type="button"
                            class="px-4 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105"
                            style="background-color: var(--rp-love); color: var(--rp-text);"
                            onclick="this.parentElement.remove()">
                        Remove
                    </button>
                `;
                container.appendChild(linkDiv);
                linkIndex++;
            });

            document.getElementById('book-form').addEventListener('submit', function(e) {
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
