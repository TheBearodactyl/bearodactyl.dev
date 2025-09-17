<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()) {
            return response()->json([
                'error' => 'Authentication required',
                'message' => 'You must be logged in to access this resource.'
            ], 401);
        }

        if (!$request->user()->is_admin) {
            return response()->json([
                'error' => 'Admin access required',
                'message' => 'You must be an admin to perform this action.',
                'user_admin_status' => $request->user()->is_admin
            ], 403);
        }

        return $next($request);
    }
}
