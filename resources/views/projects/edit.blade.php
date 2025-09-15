@extends('layouts.app')

@section('title', 'Edit Project')

@section('content')
<h1>Edit Project</h1>

<form action="{{ route('projects.update', $project) }}" method="POST">
    @csrf
    @method('PUT')

    <div style="margin-bottom: 15px;">
        <label for="name">Project Name:</label>
        <input type="text" id="name" name="name" value="{{ old('name', $project->name) }}" required style="width: 100%; padding: 8px;">
        @error('name')
            <span style="color: red;">{{ $message }}</span>
        @enderror
    </div>

    <div style="margin-bottom: 15px;">
        <label for="description">Description:</label>
        <textarea id="description" name="description" required style="width: 100%; padding: 8px; height: 100px;">{{ old('description', $project->description) }}</textarea>
        @error('description')
            <span style="color: red;">{{ $message }}</span>
        @enderror
    </div>

    <div style="margin-bottom: 15px;">
        <label for="tags">Tags (comma-separated):</label>
        <input type="text" id="tags_input" value="{{ old('tags') ? implode(', ', old('tags')) : implode(', ', $project->tags) }}" placeholder="web, php, laravel" style="width: 100%; padding: 8px;">
        <input type="hidden" name="tags" id="tags_hidden">
        @error('tags')
            <span style="color: red;">{{ $message }}</span>
        @enderror
        @error('tags.*')
            <span style="color: red;">{{ $message }}</span>
        @enderror
    </div>

    <div style="margin-bottom: 15px;">
        <label for="source">Source URL:</label>
        <input type="url" id="source" name="source" value="{{ old('source', $project->source) }}" required style="width: 100%; padding: 8px;">
        @error('source')
            <span style="color: red;">{{ $message }}</span>
        @enderror
    </div>

    <div style="margin-bottom: 15px;">
        <label for="cover_image">Cover Image URL:</label>
        <input type="url" id="cover_image" name="cover_image" value="{{ old('cover_image', $project->cover_image) }}" required style="width: 100%; padding: 8px;">
        @error('cover_image')
            <span style="color: red;">{{ $message }}</span>
        @enderror
    </div>

    <div style="margin-bottom: 15px;">
        <label for="install_command">Install Command:</label>
        <textarea id="install_command" name="install_command" required style="width: 100%; padding: 8px; height: 60px;">{{ old('install_command', $project->install_command) }}</textarea>
        @error('install_command')
            <span style="color: red;">{{ $message }}</span>
        @enderror
    </div>

    <button type="submit">Update Project</button>
    <a href="{{ route('projects.show', $project) }}">Cancel</a>
</form>

<script>
document.getElementById('tags_input').addEventListener('input', function() {
    const tags = this.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    document.getElementById('tags_hidden').value = JSON.stringify(tags);
});

document.getElementById('tags_input').dispatchEvent(new Event('input'));
</script>
@endsection
