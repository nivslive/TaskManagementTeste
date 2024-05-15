<?php
namespace Database\Factories;

use App\Models\Tarefa;
use Illuminate\Database\Eloquent\Factories\Factory;

class TarefaFactory extends Factory
{
    protected $model = Tarefa::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph(2),
            'due_date' => $this->faker->dateTimeBetween('+1 day', '+1 week'),
            'assignee_id' => function () {
                return \App\Models\Funcionario::factory()->create()->id;
            },
        ];
    }
}
