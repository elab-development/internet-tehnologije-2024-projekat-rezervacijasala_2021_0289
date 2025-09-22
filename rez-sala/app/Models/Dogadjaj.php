<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dogadjaj extends Model
{

protected $table = 'dogadjaj';
protected $primaryKey = 'idDogadjaj';
    protected $fillable = ['ime', 'ocekivanaPoseta'];
}
