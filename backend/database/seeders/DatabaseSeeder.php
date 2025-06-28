<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\User;
use \Database\Seeders\HardwareSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
 
        // Crea usuarios
        User::create([
            'name' => 'Admin',
            'email' => 'admin@ejemplo.com',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
            'active' => true,
        ]);
        User::create([
            'name' => 'user',
            'email' => 'user@ejemplo.com',
            'password' => bcrypt('user123'),
            'role' => 'user',
            'active' => true,
        ]);

        // Crea Hardware
        $this->call(HardwareSeeder::class);
    }
}
