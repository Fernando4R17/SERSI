<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Hardware;

class HardwareSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Hardware::create([
            'motortype' => 'gasolina',
            'name' => 'Equipo A',
            'fabrication_date' => '2020-01-15',
            'kW' => 100.0,
            'RPM' => 6000,
            'active' => true,
        ]);
        Hardware::create([
            'motortype' => 'eléctrico',
            'name' => 'Equipo B',
            'fabrication_date' => '2022-05-10',
            'kW' => 85.0,
            'RPM' => 8000,
            'active' => true,
        ]);
        Hardware::create([
            'motortype' => 'diesel',
            'name' => 'Equipo C',
            'fabrication_date' => '2018-09-23',
            'kW' => 120.0,
            'RPM' => 4500,
            'active' => true,
        ]);
    }
}
