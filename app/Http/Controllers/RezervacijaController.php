<?php

namespace App\Http\Controllers;

use App\Http\Resources\RezervacijaCollection;
use Illuminate\Http\Request;
use App\Models\Rezervacija;
use App\Http\Resources\RezervacijaResource;
use Illuminate\Routing\Controller;


class RezervacijaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new RezervacijaCollection(Rezervacija::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    
    $validatedData = $request->validate([
        'datum' => 'required|date',
        'napomena' => 'string|nullable',
        'prostorija_id' => 'required|exists:prostorijas,idProstorija',
    ]);

    
    $validatedData['user_id'] = $request->user()->id;

    
    $rezervacija = Rezervacija::create($validatedData);

    return response()->json([
        'message' => 'Rezervacija kreirana uspešno!',
        'rezervacija' => new RezervacijaResource($rezervacija)
    ], 201);
}


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return new RezervacijaResource(Rezervacija::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    $rezervacija = Rezervacija::find($id);

    if (!$rezervacija) {
        return response()->json(['message' => 'Rezervacija nije pronađena!'], 404);
    }

    $rezervacija->delete(); 

    return response()->json(['message' => 'Rezervacija uspešno otkazana!'], 200);
}


    public function create(Request $request) {
     /*   $data = $request->validate([
            'datum' => 'required|date',
            'napomena' => 'string|nullable',
            'prostorija_id' => 'required|exists:prostorijas,id',
            'user_id' => 'required|exists:users,id',
        ]);

        // Napravi novi objekat rezervacije umesto direktnog create()
    $rezervacija = new Rezervacija();
    $rezervacija->datum = $data['datum'];
    $rezervacija->napomena = $data['napomena'];
    $rezervacija->prostorija_id = $data['prostorija_id'];
    $rezervacija->user_id = $data['user_id'];

    // Ručno sačuvaj u bazi
    $rezervacija->save();
    
       // $rezervacija = Rezervacija::create($data);
        return response()->json(new RezervacijaResource($rezervacija), 201);
*/
    }
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['store', 'update', 'destroy']);
    }
      
    public function rezervacijePoDatumu($datum)
{
    $rezervacije = Rezervacija::where('datum', $datum)->get();
    return response()->json($rezervacije);
}


/*public function kreiraj(Request $request)
{
    $data = $request->validate([
        'datum' => 'required|date',
        'napomena' => 'string|nullable',
        'prostorija_id' => 'required|exists:prostorijas,id',
        'user_id' => 'required|exists:users,id',
    ]);

    $rezervacija = Rezervacija::create($data);
    return response()->json($rezervacija, 201);
}
*/
public function mojeRezervacije(Request $request)
{
    $user = $request->user(); 
    $rezervacije = Rezervacija::with('prostorija') 
        ->where('user_id', $user->id)
        ->get();

    return response()->json($rezervacije);
}

// Dovuci sve rezervacije sortirane po datumu ASC
public function sveRezervacije()
{
    $rezervacije = Rezervacija::with('user', 'prostorija')
        ->orderBy('datum', 'asc')
        ->get();

    return response()->json($rezervacije);
}

// Admin otkazuje rezervaciju po ID
public function adminOtkazi($id)
{
    $rezervacija = Rezervacija::find($id);
    if (!$rezervacija) {
        return response()->json(['message' => 'Rezervacija nije pronađena'], 404);
    }

    $rezervacija->delete();
    return response()->json(['message' => 'Rezervacija uspešno otkazana!']);
}

// Admin banuje korisnika – briše sve njegove rezervacije i njega
public function banujKorisnika($id)
{
    $korisnik = \App\Models\User::find($id);
    if (!$korisnik) {
        return response()->json(['message' => 'Korisnik nije pronađen!'], 404);
    }

    // Brišemo njegove rezervacije
    \App\Models\Rezervacija::where('user_id', $id)->delete();

    // Brišemo korisnika
    $korisnik->delete();

    return response()->json(['message' => 'Korisnik uspešno banovan!']);
}
public function zauzetiDatumi($id)
{
    $zauzeti = Rezervacija::where('prostorija_id', $id)->pluck('datum');
    return response()->json($zauzeti);
}

}
