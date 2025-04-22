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
        Schema::create('rezervacijas', function (Blueprint $table) {
            $table->id(); // Primarni ključ
           // $table->foreignId('prostorija_id')->constrained('prostorijas','idProstorija')->onDelete('cascade');
           // $table->foreignId('user_id')->constrained('users','id')->onDelete('cascade');

            // 🔹 Dodajemo ispravno povezivanje sa tabelom "prostorijas"
            $table->unsignedBigInteger('prostorija_id')->nullable();
            $table->foreign('prostorija_id')->references('idProstorija')->on('prostorijas')->onDelete('cascade');

            // 🔹 Povezivanje sa tabelom "users"
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');

            $table->date('datum'); // Kolona za datum
            $table->string('napomena')->nullable(); // Kolona za napomenu
            $table->timestamps(); // Kolone za created_at i updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rezervacijas');
    }
};
