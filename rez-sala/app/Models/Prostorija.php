<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class Prostorija extends Model
{
    use HasFactory;
    
    protected $table = 'prostorijas';  

    protected $primaryKey = 'idProstorija'; 
    public $incrementing = true; 
    protected $keyType = 'int'; 

    public $timestamps = true;
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
// Accessor za puni URL slike
protected $appends = ['slika_url'];
public function getSlikaUrlAttribute()
    {
        if (!$this->slika) return null;

        // Ako slika počinje sa http (već je URL), samo je vrati
        if (Str::startsWith($this->slika, ['http://', 'https://'])) {
            return $this->slika;
        }
 // Inače dodaj APP_URL ispred lokalnog fajla
 return asset($this->slika);
}
}
