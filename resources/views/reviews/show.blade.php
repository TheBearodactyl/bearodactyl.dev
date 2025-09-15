@extends('layouts.app')

@section('title', 'Review Details')

@section('content')
<h1>Review for Chapter {{ $review->chapter }}</h1>

<div>
    <strong>Chapter:</strong> {{ $review->chapter }}
</div>

<div>
    <strong>Description:</strong>
    <p>{{ $review->description }}</p>
</div>

<div>
    <strong>Rating:</strong> {{ $review->rating }}/5
</div>

<div>
    <strong>Thoughts:</strong>
    <p>{{ $review->thoughts }}</p>
</div>

<div>
    <strong>Created:</strong> {{ $review->created_at->format('M d, Y') }}
</div>

<div>
    <a href="{{ route('reviews.edit', $review) }}">Edit</a>
    <a href="{{ route('reviews.index') }}">Back to Reviews</a>

    <form action="{{ route('reviews.destroy', $review) }}" method="POST" style="display: inline;">
        @csrf
        @method('DELETE')
        <button type="submit" onclick="return confirm('Are you sure?')">Delete</button>
    </form>
</div>
@endsection
