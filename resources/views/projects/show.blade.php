@extends('layouts.app')

@section('title', $project->name)

@section('content')
<h1>{{ $project->name }}</h1>

<div style="display: grid; grid-template-columns: 300px 1fr; gap: 30px;">
    <div>
        <img src="{{ $project->cover_image }}" alt="{{ $project->name }}" style="width: 100%; height: 200px; object-fit: cover;">

        <div style="margin-top: 15px;">
            <strong>Tags:</strong>
            <div style="margin-top: 5px;">
                @foreach($project->tags as $tag)
                    <span style="background: #f0f0f0; padding: 4px 12px; margin: 2px; display: inline-block;">{{ $tag }}</span>
                @endforeach
            </div>
        </div>

        <div style="margin-top: 15px;">
            <strong>Source:</strong>
            <div><a href="{{ $project->source }}" target="_blank">{{ $project->source }}</a></div>
        </div>

        <div style="margin-top: 15px;">
            <strong>Created:</strong> {{ $project->created_at->format('M d, Y') }}
        </div>
    </div>

    <div>
        <div style="margin-bottom: 20px;">
            <h3>Description</h3>
            <p>{{ $project->description }}</p>
        </div>

        <div style="margin-bottom: 20px;">
            <h3>Installation</h3>
            <pre style="background: #f5f5f5; padding: 15px; border-radius: 4px; overflow-x: auto;"><code>{{ $project->install_command }}</code></pre>
        </div>
    </div>
</div>

<div style="margin-top: 30px;">
    <a href="{{ route('projects.edit', $project) }}">Edit</a>
    <a href="{{ route('projects.index') }}">Back to Projects</a>

    <form action="{{ route('projects.destroy', $project) }}" method="POST" style="display: inline;">
        @csrf
        @method('DELETE')
        <button type="submit" onclick="return confirm('Are you sure?')">Delete</button>
    </form>
</div>
@endsection
