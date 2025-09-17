@extends('layouts.app')

@section('content')
    <main class="container">
        <div class="form-container">
            <div class="card">
                <div class="card-header">
                    <h1>Add New Book</h1>
                </div>

                <div class="card-body">
                    <form method="POST" action="{{ route('books.store') }}" id="book-form">
                        @csrf

                        <div class="form-grid">
                            <div class="form-group">
                                <label for="title" class="form-label">Title</label>
                                <input type="text" id="title" name="title" value="{{ old('title') }}"
                                    class="form-input @error('title') error @enderror" required>
                                @error('title')
                                    <p class="form-error">{{ $message }}</p>
                                @enderror
                            </div>


                            <div class="form-group">
                                <label for="author" class="form-label">Author</label>
                                <input type="text" id="author" name="author" value="{{ old('author') }}"
                                    class="form-input @error('author') error @enderror" required>
                                @error('author')
                                    <p class="form-error">{{ $message }}</p>
                                @enderror
                            </div>


                            <div class="form-group">
                                <label for="rating" class="form-label">Rating</label>
                                <select id="rating" name="rating" class="form-select @error('rating') error @enderror">
                                    @for ($i = 1; $i <= 5; $i++)
                                        <option value="{{ $i }}" {{ old('rating', 1) == $i ? 'selected' : '' }}>
                                            {{ $i }} Star{{ $i != 1 ? 's' : '' }}
                                        </option>
                                    @endfor
                                </select>
                                @error('rating')
                                    <p class="form-error">{{ $message }}</p>
                                @enderror
                            </div>


                            <div class="form-group">
                                <label for="status" class="form-label">Status</label>
                                <select id="status" name="status" class="form-select @error('status') error @enderror"
                                    required>
                                    <option value="planned" {{ old('status') == 'planned' ? 'selected' : '' }}>Planned
                                    </option>
                                    <option value="reading" {{ old('status') == 'reading' ? 'selected' : '' }}>Reading
                                    </option>
                                    <option value="completed" {{ old('status') == 'completed' ? 'selected' : '' }}>
                                        Completed</option>
                                </select>
                                @error('status')
                                    <p class="form-error">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>


                        <div class="form-group">
                            <label for="cover_image" class="form-label">Cover Image URL</label>
                            <input type="url" id="cover_image" name="cover_image" value="{{ old('cover_image') }}"
                                class="form-input @error('cover_image') error @enderror" required>
                            @error('cover_image')
                                <p class="form-error">{{ $message }}</p>
                            @enderror
                        </div>


                        <div class="form-group">
                            <label for="genres_input" class="form-label">
                                Genres (comma-separated)
                            </label>
                            <input type="text" id="genres_input"
                                value="{{ old('genres') ? implode(', ', old('genres')) : '' }}" class="form-input"
                                placeholder="Fantasy, Adventure, Romance">
                            <input type="hidden" name="genres[]" id="genres_hidden">
                        </div>


                        <div class="form-group">
                            <label for="tags_input" class="form-label">
                                Tags (comma-separated)
                            </label>
                            <input type="text" id="tags_input"
                                value="{{ old('tags') ? implode(', ', old('tags')) : '' }}" class="form-input"
                                placeholder="must-read, favorite, series">
                            <input type="hidden" name="tags[]" id="tags_hidden">
                        </div>


                        <div class="form-group">
                            <label for="description" class="form-label">Description</label>
                            <textarea id="description" name="description" rows="4" class="form-textarea @error('description') error @enderror"
                                required>{{ old('description') }}</textarea>
                            @error('description')
                                <p class="form-error">{{ $message }}</p>
                            @enderror
                        </div>


                        <div class="form-group">
                            <label for="my_thoughts" class="form-label">My Thoughts</label>
                            <textarea id="my_thoughts" name="my_thoughts" rows="4" class="form-textarea @error('my_thoughts') error @enderror"
                                required>{{ old('my_thoughts') }}</textarea>
                            @error('my_thoughts')
                                <p class="form-error">{{ $message }}</p>
                            @enderror
                        </div>


                        <div class="form-group">
                            <label class="form-label">External Links</label>
                            <div id="links-container" class="links-container">

                            </div>
                            <button type="button" id="add-link" class="btn btn-secondary">
                                Add Link
                            </button>
                        </div>


                        <div class="options-section">
                            <div class="checkbox-group">
                                <label>
                                    <input type="checkbox" id="explicit" name="explicit" value="1"
                                        {{ old('explicit') ? 'checked' : '' }} class="form-checkbox">
                                    Contains explicit content
                                </label>
                            </div>

                            <div class="form-group">
                                <label for="color" class="form-label">
                                    Color Theme (optional)
                                </label>
                                <input type="color" id="color" name="color"
                                    value="{{ old('color', '#3B82F6') }}" class="color-input">
                            </div>
                        </div>


                        <div class="btn-group">
                            <button type="submit" class="btn btn-primary">
                                Add Book
                            </button>
                            <a href="{{ route('books.index') }}" class="btn btn-secondary">
                                Cancel
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            let linkIndex = 0;

            document.getElementById('add-link').addEventListener('click', function() {
                const container = document.getElementById('links-container');
                const linkDiv = document.createElement('div');
                linkDiv.className = 'link-input-group';
                linkDiv.innerHTML = `
                    <input type="text"
                           name="links[${linkIndex}][key]"
                           placeholder="Link name (e.g., Amazon)"
                           class="form-input">
                    <input type="url"
                           name="links[${linkIndex}][value]"
                           placeholder="https://..."
                           class="form-input">
                    <button type="button"
                            class="link-remove-btn"
                            onclick="this.parentElement.remove()">
                        Remove
                    </button>
                `;
                container.appendChild(linkDiv);
                linkIndex++;
            });

            document.getElementById('book-form').addEventListener('submit', function(e) {
                const genresInput = document.getElementById('genres_input').value;
                const genresContainer = document.getElementById('genres_hidden').parentElement;
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
                const tagsContainer = document.getElementById('tags_hidden').parentElement;
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
