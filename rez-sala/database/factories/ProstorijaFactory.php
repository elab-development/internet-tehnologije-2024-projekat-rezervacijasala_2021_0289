<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prostorija>
 */
class ProstorijaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kapacitet' => $this->faker->numberBetween(10, 300), 
            'tip' => $this->faker->randomElement(['Konferencijska', 'Proslava', 'Seminar', 'Coworking', 'Premium poslovna']), // Tip sale
            'ulica' => $this->faker->streetAddress(), 
            'grad' => $this->faker->randomElement(['Beograd', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica']), 
            'cena_po_satu' => $this->faker->randomFloat(2, 10, 100), 
            'opis' => $this->faker->sentence(10), 
            'slika' => $this->faker->randomElement([
                'https://i.pinimg.com/originals/1c/26/d5/1c26d5874a4c8a455d20fefd273bc173.jpg',
                'https://th.bing.com/th/id/OIP.Nq1NYKPoefNSwTnm7PvVzwHaFP?w=236&h=180&c=7&r=0&o=5&pid=1.7',
                'https://th.bing.com/th/id/OIP.zGbg_xYxYYOq0S9UPkFfWgHaFj?w=215&h=180&c=7&r=0&o=5&pid=1.7',
                
            ]), 
        ];
    }
}
