<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Events\UserRegistered;
use Illuminate\Http\JsonResponse;
use App\Models\PasswordResetToken;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\PasswordResetRequest;
use App\Http\Requests\ForgottenPasswordRequest;
use App\Notifications\ForgottenPasswordNotification;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        if (!$token = Auth::attempt($request->only('email', 'password'))) {
            return $this->error('Wrong email or password');
        }
        return $this->respondWithToken($token);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        if ($user = User::create($request->validated())) {
            UserRegistered::dispatch($user);
        } else {
            return $this->error('User registration failed');
        }
        return $this->success('User created successfully');
    }

    public function forgottenPassword(ForgottenPasswordRequest $request): JsonResponse
    {
        $user = User::where('email', $request->input('email'))->first();
        if ($user) {
            $user->passwordResetTokens()->create();
            $user->notify(new ForgottenPasswordNotification($user));
        }
        return $this->success();
    }

    public function passwordReset(PasswordResetRequest $request): JsonResponse
    {
        $passwordResetToken = PasswordResetToken::where('token', $request->input('reset_token'))->first();
        if (!$passwordResetToken) {
            return $this->error('Invalid reset token');
        }
        if ($passwordResetToken->isExpired()) {
            return $this->error('Reset token expired');
        }
        $user = $passwordResetToken->user;
        $user->update(['password' => $request->input('password')]);
        $user->passwordResetTokens()->delete();
        return $this->success('Password reset successfully');
    }

    public function me(): JsonResponse
    {
        return $this->success(Auth::user());
    }

    public function logout(): JsonResponse
    {
        Auth::logout();
        return $this->success('Logged out successfully');
    }

    public function refresh(): JsonResponse
    {
        return $this->respondWithToken(Auth::refresh());
    }

    protected function respondWithToken(string $token): JsonResponse
    {
        return $this->success([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60,
        ]);
    }
}
