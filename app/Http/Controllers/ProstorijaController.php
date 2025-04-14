<?php

namespace App\Http\Controllers;

use App\Models\Prostorija;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ProstorijaController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['store', 'destroy']);
    }

    // Vrati sve prostorije
    public function index()
    {
        return response()->json(Prostorija::all());
    }

    // Vrati jednu prostoriju po ID
    public function show($id)
    {
        $prostorija = Prostorija::find($id);

        if (!$prostorija) {
            return response()->json(['message' => 'Prostorija nije pronađena'], 404);
        }

        return response()->json($prostorija);
    }

    //  Dodavanje nove prostorije
    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user || $user->tipKorisnik !== 'admin') {
            return response()->json(['message' => 'Pristup odbijen.'], 403);
        }
        

        $validated = $request->validate([
            'tip' => 'required|string',
            'ulica' => 'required|string',
            'grad' => 'required|string',
            'kapacitet' => 'required|integer',
            'cena_po_satu' => 'required|numeric',
            'opis' => 'nullable|string',
            'slika' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('slika')) {
            $path = $request->file('slika')->store('slike', 'public');
            $validated['slika'] = asset('storage/' . $path);
        }

        $prostorija = Prostorija::create($validated);

        return response()->json([
            'message' => 'Sala uspešno dodata!',
            'prostorija' => $prostorija
        ], 201);
    }

    //  Brisanje prostorije
    public function destroy($id)
    {
        $prostorija = Prostorija::find($id);

        if (!$prostorija) {
            return response()->json(['message' => 'Prostorija nije pronađena'], 404);
        }

        $prostorija->delete();

        return response()->json(['message' => 'Prostorija uspešno obrisana.']);
    }
}
