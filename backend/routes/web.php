<?php

use Illuminate\Support\Facades\Route;
use App\Helpers\ResponseHelper;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Add a simple login route to satisfy Laravel's authentication system
Route::get('/login', function (Request $request) {
    return response()->json(
        ResponseHelper::createResponseObject(
            null, 
            'Debes iniciar sesión para usar el endpoint', 
            false, 
            401, 
            $request
        ),
        401
    );
})->name('login');
