<div>
    <a href="{{ route('projects.show', $project) }}">
        <img id="coverimage" src="{{ $project->cover_image }}" alt="Cover image of {{ $project->name }}">
    </a>
    <h1>Title: {{ $project->name }}</h1>
    <p2>Description: {{ $project->description }}</p2>
    <br />
    <p2>Tags: {{ implode(', ', $project->tags) }}</p2>
    <br />
    <p2>Install Command: {{ $project->install_command }}</p2>
    <br />
    <a href="{{ $project->source }}">Source Code</a>
</div>
