@extends('layouts.app')

@section('title', 'Reviews')

@section('content')
<h1>Reviews</h1>

<a href="{{ route('reviews.create') }}">Create New Review</a>

@if($reviews->count() > 0)
    <table>
        <thead>
            <tr>
                <th>Chapter</th>
                <th>Description</th>
                <th>Rating</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($reviews as $review)
                <tr>
                    <td>{{ $review->chapter }}</td>
                    <td>{{ Str::limit($review->description, 50) }}</td>
                    <td>{{ $review->rating }}/5</td>
                    <td>
                        <a href="{{ route('reviews.show', $review) }}">View</a>
                        <a href="{{ route('reviews.edit', $review) }}">Edit</a>
                        <form action="{{ route('reviews.destroy', $review) }}" method="POST" style="display: inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" onclick="return confirm('Are you sure?')">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{ $reviews->links() }}
@else
    <p>No reviews found.</p>
@endif
@endsection
