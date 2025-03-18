<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RezervacijaController;

// 📌 RUTA ZA AUTENTIFIKOVANE KORISNIKE (Prikaz podataka o korisniku)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
//  Route::resource('rezervacije', PostsController::class);


Route::apiResource('rezervacije', RezervacijaController::class);

// Route::post('rezervacije', [RezervacijaController::class, 'create']);
// 📌 JAVNE RUTE (Svi korisnici imaju pristup)
Route::post('/register', [AuthController::class, 'register']); 
Route::post('/login', [AuthController::class, 'login']);


// 📌 JAVNE RUTE (Nezaštićene rute za čitanje podataka)
Route::get('/users', [UserController::class, 'index']);
Route::get('/rezervacije', [RezervacijaController::class, 'index']);
Route::get('/rezervacije/{id}', [RezervacijaController::class, 'show']);
Route::get('rezervacije/po-datumu/{datum}', [RezervacijaController::class, 'rezervacijePoDatumu']);

// 📌 ZAŠTIĆENE RUTE (Samo prijavljeni korisnici mogu menjati podatke)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/rezervacije', [RezervacijaController::class, 'store']);  // Kreiranje rezervacije
    Route::put('/rezervacije/{id}', [RezervacijaController::class, 'update']);  // Ažuriranje rezervacije
    Route::delete('/rezervacije/{id}', [RezervacijaController::class, 'destroy']);  // Brisanje rezervacije
    Route::middleware('auth:sanctum')->get('/my-reservations', [RezervacijaController::class, 'mojeRezervacije']);

});