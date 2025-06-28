<?php

namespace App\Helpers;

use Illuminate\Http\Request;

class ResponseHelper
{
    public static function createResponseObject($payload, $message, $success = true, $status = 200, Request $request = null)
    {
        return [
            'success' => $success,
            'payload' => $payload,
            'status' => $status,
            'message' => $message,
            'url' => $request ? $request->fullUrl() : null,
            'timestamp' => now()->timestamp,
        ];
    }
} 