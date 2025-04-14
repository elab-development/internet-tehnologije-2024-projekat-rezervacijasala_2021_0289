<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RezervacijaController;
use App\Http\Controllers\ProstorijaController;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
//  Route::resource('rezervacije', PostsController::class);


Route::apiResource('rezervacije', RezervacijaController::class);

// Route::post('rezervacije', [RezervacijaController::class, 'create']);

Route::post('/register', [AuthController::class, 'register']); 
Route::post('/login', [AuthController::class, 'login']);



Route::get('/users', [UserController::class, 'index']);
Route::get('/rezervacije', [RezervacijaController::class, 'index']);
Route::get('/rezervacije/{id}', [RezervacijaController::class, 'show']);
Route::get('rezervacije/po-datumu/{datum}', [RezervacijaController::class, 'rezervacijePoDatumu']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/rezervacije', [RezervacijaController::class, 'store']);  // Kreiranje rezervacije
    Route::put('/rezervacije/{id}', [RezervacijaController::class, 'update']);  // Ažuriranje rezervacije
    Route::delete('/rezervacije/{id}', [RezervacijaController::class, 'destroy']);  // Brisanje rezervacije
    Route::middleware('auth:sanctum')->get('/my-reservations', [RezervacijaController::class, 'mojeRezervacije']);
    Route::delete('/prostorije/{id}', [ProstorijaController::class, 'destroy']);
    Route::post('/prostorije', [ProstorijaController::class, 'store']);

});
Route::middleware('auth:sanctum')->delete('/rezervacije/{id}', [RezervacijaController::class, 'destroy']);

Route::get('/prostorije', [ProstorijaController::class, 'index']);
Route::get('/prostorije/{id}', [ProstorijaController::class, 'show']);

Route::get('/admin/rezervacije', [RezervacijaController::class, 'sveRezervacije']);
Route::delete('/admin/rezervacije/{id}', [RezervacijaController::class, 'adminOtkazi']);
Route::delete('/admin/banuj-korisnika/{id}', [RezervacijaController::class, 'banujKorisnika']);

