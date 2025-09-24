<?php

namespace App\Http\Controllers;

use App\Http\Resources\RezervacijaCollection;
use Illuminate\Http\Request;
use App\Models\Rezervacija;
use App\Http\Resources\RezervacijaResource;
use Illuminate\Routing\Controller;

// DODATO:
use App\Models\Prostorija;
use App\Models\Dogadjaj;

class RezervacijaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['store', 'update', 'destroy']);
    }

    public function index()
    {
        return new RezervacijaCollection(Rezervacija::all());
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'datum'          => 'required|date',
            'napomena'       => 'string|nullable',
            'prostorija_id'  => 'required|exists:prostorijas,idProstorija',
        ]);

        // ulogovani korisnik (Sanctum)
        $validatedData['user_id'] = $request->user()->id;

        // 1) Učitaj prostoriju
        $prostorija = Prostorija::findOrFail($validatedData['prostorija_id']);

        // 2) Mapiranje tipa prostorije -> ime događaja
        //    Po tvom pravilu:
        //    - Seminar tip  -> "Seminar"
        //    - Premium poslovna -> "Sastanak"
        //    - Coworking -> "Coworking"
        $mapaTipova = [
            'Seminar'            => 'Seminar',
            'Premium poslovna'   => 'Sastanak',
            'Coworking'          => 'Coworking',
        ];
        $imeDogadjaja = $mapaTipova[$prostorija->tip] ?? 'Događaj';

        // 3) Upis u tabelu dogadjaj (očekivanaPoseta = kapacitet sale)
        $dogadjaj = Dogadjaj::create([
            'ime'              => $imeDogadjaja,
            'ocekivanaPoseta'  => (int) $prostorija->kapacitet,
        ]);

        // 4) Kreiraj rezervaciju (standardno)
        $rezervacija = Rezervacija::create($validatedData);

        return response()->json([
            'message'     => 'Rezervacija kreirana uspešno!',
            'rezervacija' => new RezervacijaResource($rezervacija),
            'dogadjaj'    => $dogadjaj,
        ], 201);
    }

    public function show($id)
    {
        return new RezervacijaResource(Rezervacija::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy($id)
    {
        $rezervacija = Rezervacija::find($id);

        if (!$rezervacija) {
            return response()->json(['message' => 'Rezervacija nije pronađena!'], 404);
        }

        $rezervacija->delete();

        return response()->json(['message' => 'Rezervacija uspešno otkazana!'], 200);
    }

    public function create(Request $request)
    {
        //
    }

    public function rezervacijePoDatumu($datum)
    {
        $rezervacije = Rezervacija::where('datum', $datum)->get();
        return response()->json($rezervacije);
    }

    public function mojeRezervacije(Request $request)
    {
        $user = $request->user();
        $rezervacije = Rezervacija::with('prostorija')
            ->where('user_id', $user->id)
            ->get();

        return response()->json($rezervacije);
    }

    
    public function sveRezervacije()
    {
        $rezervacije = Rezervacija::with('user', 'prostorija')
            ->orderBy('datum', 'asc')
            ->get();

        return response()->json($rezervacije);
    }

    
    public function adminOtkazi($id)
    {
        $rezervacija = Rezervacija::find($id);
        if (!$rezervacija) {
            return response()->json(['message' => 'Rezervacija nije pronađena'], 404);
        }

        $rezervacija->delete();
        return response()->json(['message' => 'Rezervacija uspešno otkazana!']);
    }

    
    public function banujKorisnika($id)
    {
        $korisnik = \App\Models\User::find($id);
        if (!$korisnik) {
            return response()->json(['message' => 'Korisnik nije pronađen!'], 404);
        }

        
        \App\Models\Rezervacija::where('user_id', $id)->delete();

      
        $korisnik->delete();

        return response()->json(['message' => 'Korisnik uspešno banovan!']);
    }

    public function zauzetiDatumi($id)
    {
        $zauzeti = Rezervacija::where('prostorija_id', $id)->pluck('datum');
        return response()->json($zauzeti);
    }
}
