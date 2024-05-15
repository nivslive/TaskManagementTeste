<?php
use App\Http\Controllers\{TarefaController, AuthController, FuncionarioController, DepartamentoController};
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:jwt'])->group(function() {
    Route::controller(DepartamentoController::class)->prefix('/departamentos')->group(function() {
        Route::get('/all', 'all');
        Route::get('/{id}', 'find');
        Route::post('/', 'create');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'delete');
    });
    
    Route::controller(FuncionarioController::class)->prefix('/funcionarios')->group(function() {
        Route::get('/all', 'all');
        Route::get('/{id}', 'find');
        Route::post('/', 'create');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'delete');
    });
    
    Route::controller(TarefaController::class)->prefix('/tarefas')->group(function() {
        Route::get('/all', 'all');
        Route::get('/{id}', 'find');
        Route::post('/', 'create');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'delete');
    });
});

