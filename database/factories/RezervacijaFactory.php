<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Rezervacija;
use App\Models\User;
use App\Models\Prostorija;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rezervacija>
 */
class RezervacijaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'datum' => $this->faker->date,
            'napomena' => $this->faker->sentence,
            'prostorija_id' => Prostorija::inRandomOrder()->first()->idProstorija ?? 1, // ✅ Uzimamo nasumičnu prostoriju
            'user_id' => User::inRandomOrder()->first()->id ?? 1, // ✅ Uzimamo nasumičnog korisnika
        ];
    }
}
