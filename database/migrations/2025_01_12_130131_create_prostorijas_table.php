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
        Schema::create('prostorijas', function (Blueprint $table) {
            $table->id('idProstorija'); // Primarni ključ
            $table->integer('kapacitet'); // Kapacitet prostorije
            $table->string('tip'); // Tip prostorije
            $table->timestamps(); // Kreira 'created_at' i 'updated_at' kolone
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prostorijas');
    }
};
