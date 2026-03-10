<?php

namespace Tests\Feature;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileSecurityTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that user_id and organization_id cannot be mass-assigned.
     */
    public function test_user_id_and_organization_id_are_not_mass_assignable()
    {
        $otherUser = User::factory()->create();

        $profile = new Profile([
            'user_id' => $otherUser->id,
            'organization_id' => 999,
            'surname' => 'Doe',
        ]);

        $this->assertNotEquals($otherUser->id, $profile->user_id);
        $this->assertNotEquals(999, $profile->organization_id);
        $this->assertEquals('Doe', $profile->surname);
    }
}
