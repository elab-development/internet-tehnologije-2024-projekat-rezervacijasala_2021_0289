<?php

namespace App\Http\Controllers;

use App\Models\Prostorija;
use Illuminate\Http\Request;

class ProstorijaController extends Controller
{
   
    public function index()
    {
        return response()->json(Prostorija::all());
    }

   
    public function show($id)
    {
        $prostorija = Prostorija::find($id);

        if (!$prostorija) {
            return response()->json(['message' => 'Prostorija nije pronađena'], 404);
        }

        return response()->json($prostorija);
    }
}
