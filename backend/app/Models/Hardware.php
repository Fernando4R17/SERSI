<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hardware extends Model
{
    use HasFactory;

    protected $table = 'hardware';

    protected $fillable = [
        'motortype',
        'name',
        'fabrication_date',
        'kW',
        'RPM',
        'active',
    ];
}
