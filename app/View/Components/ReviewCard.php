<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;
use App\Models\Review;

class ReviewCard extends Component
{
    public function __construct(
        public Review $review
    ) {}

    public function render(): View|Closure|string
    {
        return view('components.review-card');
    }
}
