<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; 

class Rezervacija extends Model
{
    use HasFactory;
    //protected $fillable = ['datum','napomena'];
    
  public  function prostorija() 
    {
    return $this->belongsTo(Prostorija::class);    
    }

    public function user() 
    {
    return $this->belongsTo(User::class);  
    }
}
