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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('surname')->nullable();
            $table->string('phone')->nullable();
            $table->string('dni')->nullable();
            $table->date('birthdate')->nullable();
            $table->string('province')->nullable();
            $table->string('city')->nullable();
            $table->string('zipcode')->nullable();
            $table->text('address')->nullable();
            $table->boolean('is_professional')->default(false);
            $table->text('bio')->nullable();
            $table->string('photo')->nullable();
            // Store complex structures as JSON
            $table->json('services')->nullable();
            $table->json('titles')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
