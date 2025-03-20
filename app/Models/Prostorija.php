<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prostorija extends Model
{
    use HasFactory;
    
    protected $table = 'prostorijas';  

    protected $primaryKey = 'idProstorija'; 
    public $incrementing = true; 
    protected $keyType = 'int'; 

    
    protected $fillable = [
        'kapacitet', 
        'tip', 
        'ulica', 
        'grad', 
        'cena_po_satu', 
        'opis',
        'slika' 
    ];

    public function rezervacije() {
        return $this->hasMany(Rezervacija::class, 'prostorija_id', 'idProstorija');
    }
}
