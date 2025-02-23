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
                //'idProstorija' => $this->faker->number(),
                'kapacitet' => $this->faker->numberBetween(10, 100),
                'tip' => $this->faker->randomElement(['konferencijska', 'proslava', 'seminar']),
            
        ];
    }
}
