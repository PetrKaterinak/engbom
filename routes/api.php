<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::group(['prefix' => 'auth', 'middleware' => ['api', 'auth:api']], static function () {
    Route::post('/login', [AuthController::class, 'login'])->withoutMiddleware(['auth:api']);
    Route::post('/register', [AuthController::class, 'register'])->withoutMiddleware(['auth:api']);
    Route::post('/forgotten-password', [AuthController::class, 'forgottenPassword'])->withoutMiddleware(['auth:api']);
    Route::post('/password-reset', [AuthController::class, 'passwordReset'])->withoutMiddleware(['auth:api']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/me', [AuthController::class, 'me']);
});

// Routes without authentication
Route::group(['middleware' => ['api']], static function () {
});

// Routes with authentication
Route::group(['middleware' => ['api', 'auth:api']], static function () {
});