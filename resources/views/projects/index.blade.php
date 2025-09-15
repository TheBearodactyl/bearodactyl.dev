@extends('layouts.app')

@section('title', 'Projects')

@section('content')
<h1>Projects</h1>

<a href="{{ route('projects.create') }}">Create New Project</a>

@if($projects->count() > 0)
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
        @foreach($projects as $project)
            <div style="border: 1px solid #ccc; padding: 15px;">
                <img src="{{ $project->cover_image }}" alt="{{ $project->name }}" style="width: 100%; height: 200px; object-fit: cover;">

                <h3>{{ $project->name }}</h3>
                <p>{{ Str::limit($project->description, 100) }}</p>

                <div>
                    <strong>Tags:</strong>
                    @foreach($project->tags as $tag)
                        <span style="background: #f0f0f0; padding: 2px 8px; margin: 2px; display: inline-block;">{{ $tag }}</span>
                    @endforeach
                </div>

                <div style="margin-top: 10px;">
                    <a href="{{ route('projects.show', $project) }}">View</a>
                    <a href="{{ route('projects.edit', $project) }}">Edit</a>
                    <form action="{{ route('projects.destroy', $project) }}" method="POST" style="display: inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" onclick="return confirm('Are you sure?')">Delete</button>
                    </form>
                </div>
            </div>
        @endforeach
    </div>

    <div style="margin-top: 20px;">
        {{ $projects->links() }}
    </div>
@else
    <p>No projects found.</p>
@endif
@endsection
