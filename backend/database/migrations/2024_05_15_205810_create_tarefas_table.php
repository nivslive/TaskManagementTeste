<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tarefas', function (Blueprint $table) {
            // defaults
            $table->id();
            
            // requireds
            $table->string("title");

            // optionals
            $table->string("description")->nullable();
            $table->dateTime("due_date")->nullable();

            // models relationships
            $table->unsignedBigInteger('assignee_id');
            $table->foreign('assignee_id')
                ->references('id')
                ->on('funcionarios');

            //defaults
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tarefas');
    }
};
