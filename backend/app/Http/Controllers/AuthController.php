<?php 
namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

use OpenApi\Annotations as OA;

class AuthController extends Controller
{
    /**
     * Efetua o login do usuário.
     *
     * @OA\Post(
     *     path="/login",
     *     summary="Efetua o login do usuário",
     *     tags={"Autenticação"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="email", type="string", example="user@example.com"),
     *             @OA\Property(property="password", type="string", example="password"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login realizado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Logado com sucesso!"),
     *             @OA\Property(property="token", type="string", example="token_here"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Credenciais inválidas ou dados não cadastrados",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Credenciais inválidas ou dados não cadastrados."),
     *         ),
     *     ),
     * )
     */
    public function login(LoginRequest $request)
    {
        $user = \App\Models\User::where('email', $request->email)->first();
        //dd($user);
        if (!$user) {
            return response()->json([
                'message' => 'Credenciais inválidas ou dados não cadastrados.'
            ], 401);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Credenciais inválidas ou dados não cadastrados.'
            ], 401);
        }

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'Logado com sucesso!',
            'token' => $token
        ], 200);
    }
}