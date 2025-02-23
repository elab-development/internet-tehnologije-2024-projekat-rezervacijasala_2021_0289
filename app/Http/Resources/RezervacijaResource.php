<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RezervacijaResource extends JsonResource
{
    
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'rezervacija'; // Ovo mijenja "data" u "rezervacije"
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'datum' => $this->datum,
            'napomena' => $this->napomena,
            'user' => [
                'id' => $this->user->id,
                'ime' => $this->user->ime,
                'prezime' => $this->user->prezime,
                'email' => $this->user->email,
            ]
        ];
    }
}
