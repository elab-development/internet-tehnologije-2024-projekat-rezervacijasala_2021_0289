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
            $table->bigIncrements('idProstorija'); 
            $table->string('tip'); 
            $table->string('ulica')->default('Nepoznata ulica');
            $table->string('grad')->default('Beograd'); 
            $table->integer('kapacitet'); 
            $table->decimal('cena_po_satu', 8, 2); 
            $table->text('opis'); 
            $table->string('slika');
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
