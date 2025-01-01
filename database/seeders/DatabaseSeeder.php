<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'first_name' => 'Vue',
            'last_name' => 'Admin',
            'email' => 'admin@vue.com',
            'password' => 'admin',
        ]);

        $this->call([
            // AnotherSeeder::class,
        ]);
    }
}
