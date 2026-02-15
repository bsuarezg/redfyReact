<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->constrained('users')->onDelete('cascade'); // The user account that owns the clinic
            $table->string('name');
            $table->string('cif')->nullable(); // Tax ID
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('website')->nullable();

            // Subscription details specific to clinics
            $table->integer('max_members')->default(5); // Default tier limit
            $table->string('plan_tier')->default('tier_1'); // tier_1 (1-5), tier_2 (6-20), tier_3 (21+)

            $table->timestamps();
        });

        Schema::create('organization_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // The professional
            $table->string('role')->default('staff'); // admin, staff, receptionist
            $table->string('status')->default('active'); // active, invited, suspended
            $table->timestamps();

            $table->unique(['organization_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organization_members');
        Schema::dropIfExists('organizations');
    }
};
