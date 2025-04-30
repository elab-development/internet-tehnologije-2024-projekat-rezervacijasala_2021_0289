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
            $table->bigIncrements('idProstorija'); // Ispravan primarni ključ
            $table->integer('kapacitet');
            $table->string('tip');
            $table->timestamps();
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
