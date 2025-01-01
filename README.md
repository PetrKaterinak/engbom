## Laravel Vue Boilerplate

Steps to run this project:

- composer install
- npm install
- cp .env.example .env
- php artisan key:generate
- php artisan migrate:fresh --seed (if database/database.sqlite does not exist, create it)


- Console 1: vite
- Console 2: php artisan serve --host=laravel-vue-boilerplate.lan

## Conventions

- all Models should extend App\Models\Model class
- all Controllers should extend App\Http\Controllers\Controller class
- all Services should extend App\Services\Service class