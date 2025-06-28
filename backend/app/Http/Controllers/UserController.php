<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Helpers\ResponseHelper;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (!$request->user()) {
            return response()->json(
                ResponseHelper::createResponseObject(null, 'Debes iniciar sesión para acceder a este recurso', false, 401, $request),
                401
            );
        }
        $users = User::all();
        return response()->json(
            ResponseHelper::createResponseObject($users, 'Usuarios obtenidos correctamente', true, 200, $request),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!$request->user()) {
            return response()->json(
                ResponseHelper::createResponseObject(null, 'Debes iniciar sesión para acceder a este recurso', false, 401, $request),
                401
            );
        }
        $validator = \Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'in:user,admin',
            'active' => 'boolean',
        ]);
        if ($validator->fails()) {
            return response()->json(
                ResponseHelper::createResponseObject(null, $validator->errors()->first(), false, 422, $request),
                422
            );
        }
        $validated = $validator->validated();
        $validated['password'] = Hash::make($validated['password']);
        $user = User::create($validated);
        return response()->json(
            ResponseHelper::createResponseObject($user, 'Usuario creado correctamente', true, 201, $request),
            201
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if (!$request->user()) {
            return response()->json(
                ResponseHelper::createResponseObject(null, 'Debes iniciar sesión para acceder a este recurso', false, 401, $request),
                401
            );
        }
        $user = User::find($id);
        if (!$user) {
            return response()->json(
                ResponseHelper::createResponseObject(null, 'Usuario no encontrado', false, 404, $request),
                404
            );
        }
        return response()->json(
            ResponseHelper::createResponseObject($user, 'Usuario obtenido correctamente', true, 200, $request),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if (!$request->user()) {
            return response()->json(
                ResponseHelper::createResponseObject(null, 'Debes iniciar sesión para acceder a este recurso', false, 401, $request),
                401
            );
        }
        $user = User::find($id);
        if (!$user) {
            return response()->json(
                ResponseHelper::createResponseObject(null, 'Usuario no encontrado', false, 404, $request),
                404
            );
        }
        $validator = \Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|nullable|string|min:6',
            'role' => 'sometimes|in:user,admin',
            'active' => 'sometimes|boolean',
        ]);
        if ($validator->fails()) {
            return response()->json(
                ResponseHelper::createResponseObject(null, $validator->errors()->first(), false, 422, $request),
                422
            );
        }
        $validated = $validator->validated();
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }
        $user->update($validated);
        return response()->json(
            ResponseHelper::createResponseObject($user, 'Usuario actualizado correctamente', true, 200, $request),
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        if (!$request->user()) {
            return response()->json(
                ResponseHelper::createResponseObject(null, 'Debes iniciar sesión para acceder a este recurso', false, 401, $request),
                401
            );
        }
        $user = User::find($id);
        if (!$user) {
            return response()->json(
                ResponseHelper::createResponseObject(null, 'Usuario no encontrado', false, 404, $request),
                404
            );
        }
        
        // Previene que el admin pueda eliminar su propia cuenta
        if ($user->id === $request->user()->id) {
            return response()->json(
                ResponseHelper::createResponseObject(null, 'No puedes desactivar tu propia cuenta', false, 403, $request),
                403
            );
        }
        
        $user->active = false;
        $user->save();
        return response()->json(
            ResponseHelper::createResponseObject(null, 'Usuario eliminado correctamente', true, 200, $request),
            200
        );
    }
}
