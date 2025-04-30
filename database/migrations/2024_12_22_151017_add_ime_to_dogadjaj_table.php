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
        Schema::table('dogadjaj', function (Blueprint $table) {
            $table->string('ime')->after('idDogadjaj'); // Dodaje kolonu 'ime' nakon 'idDogadjaj'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dogadjaj', function (Blueprint $table) {
            $table->dropColumn('ime'); // Uklanja kolonu 'ime' ako se migracija poništava
        });
    }
};
