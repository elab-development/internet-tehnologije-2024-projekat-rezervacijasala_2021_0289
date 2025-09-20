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
            'ulica' => 'Bulevar Kralja Aleksandra 73',
            'grad' => 'Beograd',
            'cena_po_satu' => 40,
            'opis' => 'Prostrana konferencijska sala sa modernom opremom i brzim internetom.',
            'slika' => 'https://ak.picdn.net/shutterstock/videos/26071844/thumb/1.jpg' 
        ]);

        Prostorija::create([
            'kapacitet' => 100,
            'tip' => 'Proslava',
            'ulica' => 'Trg slobode 12',
            'grad' => 'Zrenjanin',
            'cena_po_satu' => 20,
            'opis' => 'Velika sala pogodna za proslave i svečanosti.',
            'slika' => 'https://ak.picdn.net/shutterstock/videos/26071844/thumb/1.jpg' 
        ]);

        Prostorija::create([
            'kapacitet' => 30,
            'tip' => 'Seminar',
            'ulica' => 'Maksima Gorkog 8',
            'grad' => 'Novi Sad',
            'cena_po_satu' => 50,
            'opis' => 'Savremena seminar sala sa projektorom i interaktivnim tablama.',
            'slika' => 'https://ak.picdn.net/shutterstock/videos/26071844/thumb/1.jpg' 
        ]);
    }
}
