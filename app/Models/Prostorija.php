<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prostorija extends Model
{
    use HasFactory;
    protected $table = 'prostorijas';  // Povezivanje sa tabelom prostorijas

    protected $primaryKey = 'idProstorija'; // Postavljamo ispravan primarni ključ
    
   

    protected $fillable = [ 'idProstorija','kapacitet', 'tip'];
    public function rezervacija(){
        
        return $this->hasMany(Rezervacija::class, 'prostorija_id', 'idProstorija');
    }
}
