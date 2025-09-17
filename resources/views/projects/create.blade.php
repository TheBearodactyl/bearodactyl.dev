@extends('layouts.app')

@section('title', 'Create Project')

@section('content')
    <h1>Create Project</h1>

    <form action="{{ route('projects.store') }}" method="POST">
        @csrf

        <div style="margin-bottom: 15px;">
            <label for="name">Project Name:</label>
            <input type="text" id="name" name="name" value="{{ old('name') }}" required
                style="width: 100%; padding: 8px;">
            @error('name')
                <span style="color: red;">{{ $message }}</span>
            @enderror
        </div>

        <div style="margin-bottom: 15px;">
            <label for="description">Description:</label>
            <textarea id="description" name="description" required style="width: 100%; padding: 8px; height: 100px;">{{ old('description') }}</textarea>
            @error('description')
                <span style="color: red;">{{ $message }}</span>
            @enderror
        </div>

        <div style="margin-bottom: 15px;">
            <label for="tags">Tags (comma-separated):</label>
            <input type="text" id="tags_input" value="{{ old('tags') ? implode(', ', old('tags')) : '' }}"
                placeholder="web, php, laravel" style="width: 100%; padding: 8px;">
            <div id="tags_container"></div>
            @error('tags')
                <span style="color: red;">{{ $message }}</span>
            @enderror
            @error('tags.*')
                <span style="color: red;">{{ $message }}</span>
            @enderror
        </div>

        <div style="margin-bottom: 15px;">
            <label for="source">Source URL:</label>
            <input type="url" id="source" name="source" value="{{ old('source') }}" required
                style="width: 100%; padding: 8px;">
            @error('source')
                <span style="color: red;">{{ $message }}</span>
            @enderror
        </div>

        <div style="margin-bottom: 15px;">
            <label for="cover_image">Cover Image URL:</label>
            <input type="url" id="cover_image" name="cover_image" value="{{ old('cover_image') }}" required
                style="width: 100%; padding: 8px;">
            @error('cover_image')
                <span style="color: red;">{{ $message }}</span>
            @enderror
        </div>

        <div style="margin-bottom: 15px;">
            <label for="install_command">Install Command:</label>
            <textarea id="install_command" name="install_command" required style="width: 100%; padding: 8px; height: 60px;">{{ old('install_command') }}</textarea>
            @error('install_command')
                <span style="color: red;">{{ $message }}</span>
            @enderror
        </div>

        <button type="submit">Create Project</button>
        <a href="{{ route('projects.index') }}">Cancel</a>
    </form>

    <script>
        function updateTagsArray() {
            const tagsInput = document.getElementById('tags_input');
            const tagsContainer = document.getElementById('tags_container');

            tagsContainer.innerHTML = '';

            const tags = tagsInput.value
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            tags.forEach(tag => {
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'tags[]';
                hiddenInput.value = tag;
                tagsContainer.appendChild(hiddenInput);
            });
        }

        document.getElementById('tags_input').addEventListener('input', updateTagsArray);
        document.addEventListener('DOMContentLoaded', updateTagsArray);
    </script>
@endsection
