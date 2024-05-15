<?php

namespace App\Http\Controllers;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Http\FormRequest;

interface CRUDControllerInterface {

    public function create(): JsonResponse;
    public function find(): JsonResponse;
    public function all(): JsonResponse;
    public function update(): JsonResponse;
    public function delete(): JsonResponse;
}