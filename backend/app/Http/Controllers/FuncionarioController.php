<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateFuncionarioRequest;
use App\Http\Requests\StoreFuncionarioRequest;
use App\Http\Requests\UpdateFuncionarioRequest;
use App\Models\Funcionario;
use Illuminate\Http\JsonResponse;

use OpenApi\Annotations as OA;

class FuncionarioController extends Controller
{


    /**
     * Retorna todos os funcionários.
     *
     * @OA\Get(
     *     path="/funcionarios",
     *     summary="Retorna todos os funcionários",
     *     tags={"Funcionários"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de todos os funcionários",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(
     *                     property="id",
     *                     type="integer",
     *                     description="ID do funcionário"
     *                 ),
     *                 @OA\Property(
     *                     property="first_name",
     *                     type="string",
     *                     description="Primeiro nome do funcionário"
     *                 ),
     *                 @OA\Property(
     *                     property="last_name",
     *                     type="string",
     *                     description="Último nome do funcionário"
     *                 ),
     *                 @OA\Property(
     *                     property="email",
     *                     type="string",
     *                     description="Email do funcionário"
     *                 ),
     *                 @OA\Property(
     *                     property="phone",
     *                     type="string",
     *                     description="Telefone do funcionário"
     *                 ),
     *                 @OA\Property(
     *                     property="department_id",
     *                     type="integer",
     *                     description="ID do departamento associado ao funcionário"
     *                 ),
     *             ),
     *         ),
     *     ),
     * )
     */
    public function all() {
        return Funcionario::all();
    }

    /** 
     * Retorna os detalhes de um funcionário.
     *
     * @OA\Get(
     *     path="/funcionarios/{id}",
     *     summary="Retorna os detalhes de um funcionário",
     *     tags={"Funcionários"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do funcionário",
     *         @OA\Schema(type="integer"),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalhes do funcionário",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Funcionário editado com sucesso."),
     *             @OA\Property(property="data", type="object"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Não foi possível achar um funcionário",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Não foi possível achar um funcionário."),
     *         ),
     *     ),
     * )
     */
    public function find($id) {
        $funcionario = Funcionario::find($id);
        if(!$funcionario) {
            return response()->json(['message' => 'Não foi possível achar um funcionário.'], 500);
        }
        return response()->json(['message' => 'Funcionário editado com sucesso.', 'data' => $funcionario], 200);
    }



    /**
     * Cria um novo funcionário.
     *
     * @OA\Post(
     *     path="/funcionarios",
     *     summary="Cria um novo funcionário",
     *     tags={"Funcionários"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="first_name", type="string", example="João", description="Primeiro nome do funcionário"),
     *             @OA\Property(property="last_name", type="string", example="da Silva", description="Sobrenome do funcionário"),
     *             @OA\Property(property="email", type="string", example="joao@example.com", description="Email do funcionário"),
     *             @OA\Property(property="phone", type="string", example="1234567890", description="Telefone do funcionário"),
     *             @OA\Property(property="department_id", type="integer", example=1, description="ID do departamento associado ao funcionário"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Funcionário criado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Funcionário criado com sucesso."),
     *             @OA\Property(property="data", type="object"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Não foi possível criar um funcionário",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Não foi possível criar um funcionário."),
     *         ),
     *     ),
     * )
     */
    public function create(CreateFuncionarioRequest $request)
    {

        $funcionario = Funcionario::create($request->except('_token'));

        if(!$funcionario) {
            return response()->json(['message' => 'Não foi possível criar um funcionário.'], 500);
        }

        return response()->json(['message' => 'Funcionário criado com sucesso.', 'data' => $funcionario], 200);
    }

    /**
     * Atualiza os detalhes de um funcionário.
     *
     * @OA\Put(
     *     path="/funcionarios/{id}",
     *     summary="Atualiza os detalhes de um funcionário",
     *     tags={"Funcionários"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do funcionário",
     *         @OA\Schema(type="integer"),
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="first_name", type="string", example="João", description="Primeiro nome do funcionário"),
     *             @OA\Property(property="last_name", type="string", example="da Silva", description="Sobrenome do funcionário"),
     *             @OA\Property(property="email", type="string", example="joao@example.com", description="Email do funcionário"),
     *             @OA\Property(property="phone", type="string", example="1234567890", description="Telefone do funcionário"),
     *             @OA\Property(property="department_id", type="integer", example=1, description="ID do departamento associado ao funcionário"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Funcionário editado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Funcionário editado com sucesso."),
     *             @OA\Property(property="data", type="object"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Não foi possível achar um funcionário",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Não foi possível achar um funcionário."),
     *         ),
     *     ),
     * )
     */
    public function update(UpdateFuncionarioRequest $request, $id): JsonResponse

    {
        $funcionario = Funcionario::find($id);
        if(!$funcionario) {
            return response()->json(['message' => 'Não foi possível achar um funcionário.'], 500);
        }

        $funcionario->update($request->except('_token'));
        return response()->json(['message' => 'Funcionário editado com sucesso.', 'data' => $funcionario], 200);
    }

    /**
     * Deleta um funcionário.
     *
     * @OA\Delete(
     *     path="/funcionarios/{id}",
     *     summary="Deleta um funcionário",
     *     tags={"Funcionários"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do funcionário",
     *         @OA\Schema(type="integer"),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Funcionário deletado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Funcionário apagado com sucesso."),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Não existe esse funcionário",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Não existe esse funcionário."),
     *         ),
     *     ),
     * )
     */
    public function delete($id)
    {
        $funcionario = Funcionario::find($id);
        if(!$funcionario) {
            return response()->json(['message' => 'Não existe esse funcionário.'], 500);
        }
        $funcionario->delete();
        return response()->json(['message'=> 'Funcionário apagada com sucesso.'], 200);
    }
}
