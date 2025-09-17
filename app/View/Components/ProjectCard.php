<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;
use App\Models\Project;

class ProjectCard extends Component
{
    public function __construct(
        public Project $project
    ) {}

    public function render(): View|Closure|string
    {
        return view('components.project-card');
    }
}
