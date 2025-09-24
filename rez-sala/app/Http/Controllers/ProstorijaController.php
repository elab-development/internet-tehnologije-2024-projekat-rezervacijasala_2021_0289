<?php

namespace App\Http\Controllers;

use App\Models\Prostorija;
use App\Models\Rezervacija;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

class ProstorijaController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['store', 'destroy']);
    }

    public function index(Request $request)
    {
        $query = Prostorija::query();

        if ($request->has('grad')) {
            $query->where('grad', $request->grad);
        }
        if ($request->has('tip')) {
            $query->where('tip', $request->tip);
        }
        if ($request->has('minCena')) {
            $query->where('cena_po_satu', '>=', $request->minCena);
        }
        if ($request->has('maxCena')) {
            $query->where('cena_po_satu', '<=', $request->maxCena);
        }
        if ($request->has('slobodanDatum')) {
            $datum = $request->slobodanDatum;

            $zauzeteProstorije = Rezervacija::where('datum', $datum)
                ->pluck('prostorija_id')
                ->toArray();

            $query->whereNotIn('idProstorija', $zauzeteProstorije);
        }

        $perPage = $request->query('perPage', 9);
        return response()->json($query->paginate($perPage));
    }

    public function show($id)
    {
        $prostorija = Prostorija::find($id);

        if (!$prostorija) {
            return response()->json(['message' => 'Prostorija nije pronađena'], 404);
        }

        return response()->json($prostorija);
    }

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
             'slika' => 'required|file|mimetypes:image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif|max:8192',

        ]);

        if ($request->hasFile('slika')) {
            $path = $request->file('slika')->store('slike', 'public');
            $validated['slika'] = '/storage/' . $path;
        }

        $prostorija = Prostorija::create($validated);

        return response()->json([
            'message' => 'Sala uspešno dodata!',
            'prostorija' => $prostorija
        ], 201);
    }

    public function destroy($id)
    {
        $prostorija = Prostorija::find($id);

        if (!$prostorija) {
            return response()->json(['message' => 'Prostorija nije pronađena'], 404);
        }

        $prostorija->delete();

        return response()->json(['message' => 'Prostorija uspešno obrisana.']);
    }

    public function tipovi()
    {
        $tipovi = Prostorija::select('tip')->distinct()->pluck('tip');
        return response()->json($tipovi);
    }
}
