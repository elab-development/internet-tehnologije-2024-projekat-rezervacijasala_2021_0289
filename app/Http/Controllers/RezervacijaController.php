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
    // 🔹 Validacija podataka (uklonjen 'user_id' jer ga automatski dodajemo)
    $validatedData = $request->validate([
        'datum' => 'required|date',
        'napomena' => 'string|nullable',
        'prostorija_id' => 'required|exists:prostorijas,idProstorija',
    ]);

    // 🔹 Dodajemo user_id trenutno prijavljenog korisnika
    $validatedData['user_id'] = $request->user()->id;

    // 🔹 Kreiramo rezervaciju
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
    public function destroy(string $id)
    {
        //
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
    $user = $request->user(); // Dobijamo prijavljenog korisnika
    $rezervacije = Rezervacija::with('prostorija') // Učitavamo povezane prostorije
        ->where('user_id', $user->id)
        ->get();

    return response()->json($rezervacije);
}



}
