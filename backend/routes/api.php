<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HardwareController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public endpoints (no authentication required)
Route::get('/health', function () {
    return response()->json([
        'status' => 'OK',
        'message' => 'Servidor funcionando',
        'timestamp' => now()->timestamp
    ]);
});

Route::get('/', function () {
    return response()->json([
        'message' => 'API Documentation',
        'endpoints' => [
            'auth' => [
                'POST /api/login' => 'Inicia sesión de usuario',
                'POST /api/logout' => 'Cierra sesión (requiere autenticación)'
            ],
            'users' => [
                'GET /api/users' => 'Obtiene todos los usuarios (solo admin)',
                'POST /api/users' => 'Crea nuevo usuario (solo admin)',
                'GET /api/users/:id' => 'Obtiene usuario por id (solo admin)',
                'PUT/PATCH /api/users/:id' => 'Actualiza usuario (solo admin)',
                'DELETE /api/users/:id' => 'Desactiva usuario (solo admin)'
            ],
            'hardware' => [
                'GET /api/hardware' => 'Obtiene todos los equipos (requiere autenticación)',
                'POST /api/hardware' => 'Crea nuevo equipo (requiere autenticación)',
                'GET /api/hardware/:id' => 'Obtiene equipo por id (requiere autenticación)',
                'PUT/PATCH /api/hardware/:id' => 'Actualiza equipo (requiere autenticación)',
                'DELETE /api/hardware/:id' => 'Elimina equipo (requiere autenticación)',
                'GET /api/hardware/search?query=' => 'Busca equipos por término (requiere autenticación)'
            ],
            'system' => [
                'GET /api/health' => 'Verifica el estado del servidor'
            ]
        ]
    ]);
});

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware(['auth:sanctum', 'admin'])->group(function (){
    Route::apiResource('users', UserController::class);
});
Route::middleware('auth:sanctum')->group(function (){
    Route::get('hardware/search', [HardwareController::class, 'search']);
    Route::apiResource('hardware', HardwareController::class);
});