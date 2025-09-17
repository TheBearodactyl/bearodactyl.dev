@extends('layouts.app')

@section('title', 'Projects')

@section('content')
<h1>Projects</h1>

<a href="{{ route('projects.create') }}">Create New Project</a>

@if($projects->count() > 0)
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
        @foreach($projects as $project)
            <x-project-card :project="$project" />
        @endforeach
    </div>

    <div style="margin-top: 20px;">
        {{ $projects->links() }}
    </div>
@else
    <p>No projects found.</p>
@endif
@endsection
