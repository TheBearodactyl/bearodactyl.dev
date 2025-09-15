@extends('layouts.app')

@section('title', 'Create Review')

@section('content')
<h1>Create Review</h1>

<form action="{{ route('reviews.store') }}" method="POST">
    @csrf

    <div>
        <label for="chapter">Chapter Number:</label>
        <input type="number" id="chapter" name="chapter" value="{{ old('chapter') }}" required>
        @error('chapter')
            <span style="color: red;">{{ $message }}</span>
        @enderror
    </div>

    <div>
        <label for="description">Description:</label>
        <textarea id="description" name="description" required>{{ old('description') }}</textarea>
        @error('description')
            <span style="color: red;">{{ $message }}</span>
        @enderror
    </div>

    <div>
        <label for="rating">Rating (1-5):</label>
        <select id="rating" name="rating" required>
            <option value="">Select Rating</option>
            @for($i = 1; $i <= 5; $i++)
                <option value="{{ $i }}" {{ old('rating') == $i ? 'selected' : '' }}>{{ $i }}</option>
            @endfor
        </select>
        @error('rating')
            <span style="color: red;">{{ $message }}</span>
        @enderror
    </div>

    <div>
        <label for="thoughts">Thoughts:</label>
        <textarea id="thoughts" name="thoughts" required>{{ old('thoughts') }}</textarea>
        @error('thoughts')
            <span style="color: red;">{{ $message }}</span>
        @enderror
    </div>

    <button type="submit">Create Review</button>
    <a href="{{ route('reviews.index') }}">Cancel</a>
</form>
@endsection
