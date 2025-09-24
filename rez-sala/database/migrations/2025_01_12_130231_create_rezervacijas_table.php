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
            $table->id(); 

            // Povezivanje sa tabelom "prostorijas"
            $table->unsignedBigInteger('prostorija_id')->nullable();
            $table->foreign('prostorija_id')->references('idProstorija')->on('prostorijas')->onDelete('cascade');

            //  Povezivanje sa tabelom "users"
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');

            $table->date('datum'); 
            $table->string('napomena')->nullable(); 
            $table->timestamps(); 
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
