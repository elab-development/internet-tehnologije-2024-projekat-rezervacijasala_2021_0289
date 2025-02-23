<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Rezervacija;

class RezervacijaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Dodavanje pojedinačnih rezervacija
        Rezervacija::create([
            'prostorija_id' => 1,
            'user_id' => 1,
            'datum' => '2025-01-20',
            'napomena' => 'Rezervacija za poslovni sastanak.',
        ]);

        Rezervacija::create([
            'prostorija_id' => 2,
            'user_id' => 2,
            'datum' => '2025-02-15',
            'napomena' => 'Rezervacija za privatnu proslavu.',
        ]);

        Rezervacija::create([
            'prostorija_id' => 3,
            'user_id' => 3,
            'datum' => '2025-03-01',
            'napomena' => 'Rezervacija za seminar.',
        ]);

        Rezervacija::factory(5)->create();
    }
}
