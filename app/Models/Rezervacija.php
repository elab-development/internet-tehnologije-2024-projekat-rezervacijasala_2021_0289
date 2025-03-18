<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; 

class Rezervacija extends Model
{
    use HasFactory;
    protected $table = 'rezervacijas'; // Osigurava da Laravel koristi tačno ime tabele

    protected $fillable = ['datum', 'napomena', 'prostorija_id', "user_id"];


    
  public  function prostorija() 
    {
      return $this->belongsTo(Prostorija::class, 'prostorija_id', 'idProstorija');  
    }

    public function user() {
      return $this->belongsTo(User::class, 'user_id', 'id');  
  }
  
}
