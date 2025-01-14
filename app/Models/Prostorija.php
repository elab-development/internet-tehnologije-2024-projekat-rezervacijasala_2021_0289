<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prostorija extends Model
{
    use HasFactory;

    public function rezervacija(){
        return $this->hasMany(Rezervacija::class);
    }
}
