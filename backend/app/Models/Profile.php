<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_type', // individual, clinic
        'surname',
        'phone',
        'dni',
        'birthdate',
        'province',
        'city',
        'zipcode',
        'address',
        'is_professional',
        'bio',
        'photo',
        'services',
        'titles',
    ];

    protected $casts = [
        'is_professional' => 'boolean',
        'birthdate' => 'date',
        'services' => 'array',
        'titles' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
