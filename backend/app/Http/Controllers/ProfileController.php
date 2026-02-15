<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        return response()->json($request->user()->load('profile'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = $request->user();
        $profile = $user->profile ?? new Profile(['user_id' => $user->id]);

        $validatedData = $request->validate([
            'surname' => 'nullable|string',
            'phone' => 'nullable|string',
            'dni' => 'nullable|string',
            'birthdate' => 'nullable|date',
            'province' => 'nullable|string',
            'city' => 'nullable|string',
            'zipcode' => 'nullable|string',
            'address' => 'nullable|string',
            'is_professional' => 'boolean',
            'bio' => 'nullable|string',
            'photo' => 'nullable|string',
            'services' => 'nullable|array',
            'titles' => 'nullable|array',
        ]);

        $profile->fill($validatedData);
        $profile->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'profile' => $profile,
        ]);
    }
}
