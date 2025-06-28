<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hardware;
use App\Helpers\ResponseHelper;

class HardwareController extends Controller
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
        $hardware = Hardware::where('active', true)->get();
        return response()->json(
            ResponseHelper::createResponseObject($hardware, 'Equipos obtenido correctamente', true, 200, $request),
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
            'motortype' => 'required|in:gasolina,diesel,gas,eléctrico',
            'name' => 'required|string|max:255',
            'fabrication_date' => 'required|date',
            'kW' => 'required|numeric|min:0',
            'RPM' => 'required|integer|min:0',
            'active' => 'boolean',
        ]);
        if ($validator->fails()) {
            return response()->json(
                ResponseHelper::createResponseObject(null, $validator->errors()->first(), false, 422, $request),
                422
            );
        }
        $validated = $validator->validated();
        $hardware = Hardware::create($validated);
        return response()->json(
            ResponseHelper::createResponseObject($hardware, 'Equipo creado correctamente', true, 201, $request),
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
        $hardware = Hardware::find($id);
        if (!$hardware) {
            return response()->json(
                ResponseHelper::createResponseObject(null, 'Equipo no encontrado', false, 404, $request),
                404
            );
        }
        return response()->json(
            ResponseHelper::createResponseObject($hardware, 'Equipo obtenido correctamente', true, 200, $request),
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
        $hardware = Hardware::find($id);
        if (!$hardware) {
            return response()->json(
                ResponseHelper::createResponseObject(null, 'Equipo no encontrado', false, 404, $request),
                404
            );
        }
        $validator = \Validator::make($request->all(), [
            'motortype' => 'sometimes|required|in:gasolina,diesel,gas,eléctrico',
            'name' => 'sometimes|required|string|max:255',
            'fabrication_date' => 'sometimes|required|date',
            'kW' => 'sometimes|required|numeric|min:0',
            'RPM' => 'sometimes|required|integer|min:0',
            'active' => 'sometimes|boolean',
        ]);
        if ($validator->fails()) {
            return response()->json(
                ResponseHelper::createResponseObject(null, $validator->errors()->first(), false, 422, $request),
                422
            );
        }
        $validated = $validator->validated();
        $hardware->update($validated);
        return response()->json(
            ResponseHelper::createResponseObject($hardware, 'Equipo actualizado correctamente', true, 200, $request),
            200
        );
    }

    /**
     * Search hardware by various criteria.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        if (!$request->user()) {
            return response()->json(
                ResponseHelper::createResponseObject(null, 'Debes iniciar sesión para acceder a este recurso', false, 401, $request),
                401
            );
        }

        $query = $request->get('query');
        
        if (!$query) {
            return response()->json(
                ResponseHelper::createResponseObject(null, 'El parámetro de búsqueda es requerido', false, 400, $request),
                400
            );
        }

        $hardware = Hardware::where('active', true)->where(function($q) use ($query) {
            $q->where('motortype', 'LIKE', "%{$query}%")
              ->orWhere('name', 'LIKE', "%{$query}%")
              ->orWhere('fabrication_date', 'LIKE', "%{$query}%")
              ->orWhere('kW', 'LIKE', "%{$query}%")
              ->orWhere('RPM', 'LIKE', "%{$query}%");
        })->get();

        if ($hardware->isEmpty()) {
            return response()->json(
                ResponseHelper::createResponseObject(null, "No se encontraron equipos con el término: '{$query}'", false, 404, $request),
                404
            );
        }

        return response()->json(
            ResponseHelper::createResponseObject($hardware, 'Búsqueda completada correctamente', true, 200, $request),
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
        $hardware = Hardware::find($id);
        if (!$hardware) {
            return response()->json(
                ResponseHelper::createResponseObject(null, 'Equipo no encontrado', false, 404, $request),
                404
            );
        }
        $hardware->active = false;
        $hardware->save();
        return response()->json(
            ResponseHelper::createResponseObject(null, 'Equipo eliminado correctamente', true, 200, $request),
            200
        );
    }
}
