<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Prostorija;

class ProstorijaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Prostorija::create([
            'kapacitet' => 50,
            'tip' => 'Konferencijska',
        ]);

        Prostorija::create([
            'kapacitet' => 100,
            'tip' => 'Proslava',
        ]);

        Prostorija::create([
            'kapacitet' => 30,
            'tip' => 'Seminar',
        ]);
    }
}

