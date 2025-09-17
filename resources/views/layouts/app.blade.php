<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Bearodactyl')</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/rose-pine.css') }}">
</head>

<body>
    <nav>
        <a href="{{ route('reviews.index') }}">Reviews</a>
        <a href="{{ route('projects.index') }}">Projects</a>
        <a href="{{ route('books.index') }}">Read/Watch List</a>
    </nav>

    <main>
        @if (session('success'))
            <div style="color: green; padding: 10px; margin: 10px 0;">
                {{ session('success') }}
            </div>
        @endif

        @yield('content')
    </main>
</body>

</html>
