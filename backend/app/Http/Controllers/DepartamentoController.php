<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDepartamentoRequest;
use App\Http\Requests\StoreDepartamentoRequest;
use App\Http\Requests\UpdateDepartamentoRequest;
use App\Models\Departamento;
use Illuminate\Http\JsonResponse;

use OpenApi\Annotations as OA;

class DepartamentoController extends Controller
{

    /**
     * Retorna todos os departamentos.
     *
     * @OA\Get(
     *     path="/departamentos",
     *     summary="Retorna todos os departamentos",
     *     tags={"Departamentos"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de todos os departamentos",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(
     *                     property="id",
     *                     type="integer",
     *                     description="ID do departamento"
     *                 ),
     *                 @OA\Property(
     *                     property="nome",
     *                     type="string",
     *                     description="Nome do departamento"
     *                 ),
     *             ),
     *         ),
     *     ),
     * )
     **/
    public function all() {
        return Departamento::all();
    }

        /**
     * Retorna os detalhes de um departamento.
     *
     * @OA\Get(
     *     path="/departamentos/{id}",
     *     summary="Retorna os detalhes de um departamento",
     *     tags={"Departamentos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do departamento",
     *         @OA\Schema(type="integer"),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalhes do departamento",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Departamento editado com sucesso."),
     *             @OA\Property(property="data", type="object"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Não foi possível achar um departamento",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Não foi possível achar um departamento."),
     *         ),
     *     ),
     * )
     */
    public function find($id) {
        $departamento = Departamento::find($id);
        if(!$departamento) {
            return response()->json(['message' => 'Não foi possível achar um departamento.'], 500);
        }
        return response()->json(['message' => 'Departamento editado com sucesso.', 'data' => $departamento], 200);
    }

     /**
     * Cria um novo departamento.
     *
     * @OA\Post(
     *     path="/departamentos",
     *     summary="Cria um novo departamento",
     *     tags={"Departamentos"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              @OA\Property(
     *                 property="nome",
     *                 type="string",
     *                 example="Nome do Departamento"
     *             ),
     *          ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Departamento criado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Departamento criado com sucesso."),
     *             @OA\Property(property="data", type="object", example="{'nome': 'Nome do Departamento'}"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Não foi possível criar um departamento",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Não foi possível criar um departamento."),
     *         ),
     *     ),
     * )
     */
    public function create(CreateDepartamentoRequest $request)
    {

        $departamento = Departamento::create($request->except('_token'));

        if(!$departamento) {
            return response()->json(['message' => 'Não foi possível criar um departamento.'], 500);
        }

        return response()->json(['message' => 'Departamento criado com sucesso.', 'data' => $departamento], 200);
    }

        /**
     * Atualiza os detalhes de um departamento.
     *
     * @OA\Put(
     *     path="/departamentos/{id}",
     *     summary="Atualiza os detalhes de um departamento",
     *     tags={"Departamentos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do departamento",
     *         @OA\Schema(type="integer"),
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
    *               @OA\Property(
     *                 property="id",
     *                 type="number",
     *                 example="1"
     *             ),
     *               @OA\Property(
     *                 property="nome",
     *                 type="string",
     *                 example="Nome do Departamento"
     *             ),
     *          ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Departamento editado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Departamento editado com sucesso."),
     *             @OA\Property(property="data", type="object"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Não foi possível achar um departamento",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Não foi possível achar um departamento."),
     *         ),
     *     ),
     * )
     */
    public function update(UpdateDepartamentoRequest $request, $id): JsonResponse

    {
        $departamento = Departamento::find($id);
        if(!$departamento) {
            return response()->json(['message' => 'Não foi possível achar um departamento.'], 500);
        }

        $departamento->update($request->except('_token'));
        return response()->json(['message' => 'Departamento editado com sucesso.', 'data' => $departamento], 200);
    }


        /**
     * Deleta um departamento.
     *
     * @OA\Delete(
     *     path="/departamentos/{id}",
     *     summary="Deleta um departamento",
     *     tags={"Departamentos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do departamento",
     *         @OA\Schema(type="integer"),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Departamento deletado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Departamento apagado com sucesso."),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Não existe esse departamento",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Não existe esse departamento."),
     *         ),
     *     ),
     * )
     */
    public function delete($id)
    {
        $departamento = Departamento::find($id);
        if(!$departamento) {
            return response()->json(['message' => 'Não existe esse departamento.'], 500);
        }
        $departamento->delete();
        return response()->json(['message'=> 'Departamento apagada com sucesso.'], 200);
    }
}
