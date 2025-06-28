<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Helpers\ResponseHelper;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(
                ResponseHelper::createResponseObject(null, 'Credenciales invalidas', false, 401, $request),
                401
            );
        }
        if (!$user->active) {
            return response()->json(
                ResponseHelper::createResponseObject(null, 'Usuario inactivo, no puede iniciar sesión', false, 403, $request),
                403
            );
        }

        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json(
            ResponseHelper::createResponseObject([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ]
            ], 'Inicio de sesión exitoso', true, 200, $request),
            200
        );
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(
            ResponseHelper::createResponseObject(null, 'Sesión cerrada exitosamente', true, 200, $request),
            200
        );
    }
}
