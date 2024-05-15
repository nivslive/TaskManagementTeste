<?php

namespace App\Http\Controllers;

use App\Http\Requests\{CreateTarefaRequest, StoreTarefaRequest, EditTarefaRequest, UpdateTarefaRequest};
use App\Models\Tarefa;
use OpenApi\Annotations as OA;
use Illuminate\Http\JsonResponse;

class TarefaController extends Controller
{
    /**
    * @OA\Post(
    *      path="/tarefas",
    *      summary="Cria uma nova tarefa",
    *      tags={"Tarefas"},
    *      @OA\RequestBody(
    *          required=true,
    *          @OA\JsonContent(
    *              @OA\Property(property="title", type="string", example="Tarefa 1", description="Título da tarefa"),
    *              @OA\Property(property="description", type="string", example="Descrição da tarefa", description="Descrição da tarefa"),
    *              @OA\Property(property="due_date", type="string", format="date-time", example="2023-08-10 15:00:00", description="Data de vencimento da tarefa"),
    *              @OA\Property(property="assignee_id", type="integer", example=1, description="ID do funcionário atribuído à tarefa"),
    *          ),
    *      ),
    *      @OA\Response(
    *          response=200,
    *          description="Tarefa criada com sucesso!",
    *          @OA\JsonContent(
    *              @OA\Property(property="message", type="string", example="Tarefa criada com sucesso."),
    *              @OA\Property(property="data", type="object"),
    *          ),
    *      ),
    *      @OA\Response(
    *          response=500,
    *          description="Não foi possível criar a tarefa",
    *          @OA\JsonContent(
    *              @OA\Property(property="message", type="string", example="Não foi possível criar a tarefa."),
    *          ),
    *      ),
    * )
    */
    public function create(CreateTarefaRequest $request)
    {

        $tarefa = Tarefa::create($request->except('_token'));

        if(!$tarefa) {
            return response()->json(['message' => 'Não foi possível criar a tarefa.'], 500);
        }

        return response()->json(['message' => 'Tarefa criada com sucesso.', 'data' => $tarefa], 200);
    }

    /**
     * @OA\Get(
     *      path="/tarefas/{tarefa_id}",
     *      summary="Retorna os detalhes de uma tarefa",
     *      tags={"Tarefas"},
     *      @OA\Parameter(
     *          name="tarefa_id",
     *          description="ID da tarefa",
     *          required=true,
     *          in="path",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Detalhes da tarefa retornados com sucesso",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Sucesso ao encontrar a tarefa."),
     *              @OA\Property(property="data", type="object"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Não existe essa tarefa",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Não existe essa tarefa."),
     *          ),
     *      ),
     * )
     */
    public function find($tarefa_id)
    {

        $tarefa = Tarefa::find($tarefa_id);

        if(!$tarefa) {
            return response()->json(['message' => 'Não existe essa tarefa.'], 500);
        }

        return response()->json(['message' => 'Sucesso ao encontrar a tarefa do id ' . $tarefa_id, 'data' => $tarefa], 200);
    }

    /**
     * @OA\Get(
     *      path="/tarefas/all",
     *      summary="Retorna todas as tarefas",
     *      tags={"Tarefas"},
     *      @OA\Response(
     *          response=200,
     *          description="Lista de todas as tarefas retornada com sucesso",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(
     *                  type="object",
     *                  @OA\Property(property="title", type="string", example="Tarefa 1", description="Título da tarefa"),
     *                  @OA\Property(property="description", type="string", example="Descrição da tarefa", description="Descrição da tarefa"),
     *                  @OA\Property(property="due_date", type="string", format="date-time", example="2023-08-10 15:00:00", description="Data de vencimento da tarefa"),
     *                  @OA\Property(property="assignee_id", type="integer", example=1, description="ID do funcionário atribuído à tarefa"),
     *              ),
     *          ),
     *      ),
     * )
     */
    public function all() {
        return Tarefa::all();
    }

    /**
     * @OA\Put(
     *      path="/tarefas/{id}",
     *      summary="Atualiza os detalhes de uma tarefa",
     *      tags={"Tarefas"},
     *      @OA\Parameter(
     *          name="id",
     *          description="ID da tarefa",
     *          required=true,
     *          in="path",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              @OA\Property(property="title", type="string", example="Tarefa 1", description="Título da tarefa"),
     *              @OA\Property(property="description", type="string", example="Descrição da tarefa", description="Descrição da tarefa"),
     *              @OA\Property(property="due_date", type="string", format="date-time", example="2023-08-10 15:00:00", description="Data de vencimento da tarefa"),
     *              @OA\Property(property="assignee_id", type="integer", example=1, description="ID do funcionário atribuído à tarefa"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Tarefa atualizada com sucesso",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Tarefa atualizada com sucesso."),
     *              @OA\Property(property="data", type="object"),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Não existe essa tarefa",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Não existe essa tarefa."),
     *          ),
     *      ),
     * )
     */
    public function update(UpdateTarefaRequest $request, int $id): JsonResponse
    {
        $tarefa = Tarefa::find($id);
        if(!$tarefa) {
            return response()->json(['message' => 'Não existe essa tarefa.'], 500);
        }
        
        $tarefa->update($request->except('_token'));
        return response()->json(['message' => 'Tarefa foi atualizada!', 'data' => $tarefa ], 200);
    }

   /**
     * @OA\Delete(
     *      path="/tarefas/{id}",
     *      summary="Deleta uma tarefa",
     *      @OA\Parameter(
     *          name="id",
     *          description="ID da tarefa",
     *          required=true,
     *          in="path",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Tarefa deletada com sucesso",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Tarefa apagada com sucesso."),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Não existe essa tarefa",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Não existe essa tarefa."),
     *          ),
     *      ),
     * )
     */
    public function delete($id)
    {
        $tarefa = Tarefa::find($id);
        if(!$tarefa) {
            return response()->json(['message' => 'Não existe essa tarefa.'], 500);
        }

        $tarefa->delete();
        return response()->json(['message'=> 'Tarefa apagada com sucesso.'], 200);
    }
}
