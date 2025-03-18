<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prostorija extends Model
{
    use HasFactory;
    
    protected $table = 'prostorijas';  // Povezivanje sa tabelom

    protected $primaryKey = 'idProstorija'; // Postavljamo ispravan primarni ključ
    public $incrementing = true; // Ako koristi auto-increment
    protected $keyType = 'int'; // Ako je broj

    protected $fillable = ['kapacitet', 'tip'];

    public function rezervacije() {
        return $this->hasMany(Rezervacija::class, 'prostorija_id', 'idProstorija');
    }
}
