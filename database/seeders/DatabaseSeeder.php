<?php

namespace Database\Seeders;
use App\Models\Prostorija;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();


        Prostorija::factory(10)->create(); // Kreira 10 prostorija
        $this->call(RezervacijaSeeder::class); // Poziv seeder-a za rezervacije
//id,kapacitet, tip, created_at, updated_at
       /* User::factory()->create([
            'ime' => 'Test',
            'prezime' => 'User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'), // Lozinka mora biti hashovana
            'tipKorisnik' => 'admin', // Ili "korisnik" u zavisnosti od slučaja
            'brTelefona' => '123456789',*
        ]);*/
    }
}
