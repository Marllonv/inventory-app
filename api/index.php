<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'config/database.php';
require_once 'controllers/ProductController.php';
require_once 'controllers/CategoryController.php';

$productController = new ProductController($pdo);
$categoryController = new CategoryController($pdo);

$metodo = $_SERVER['REQUEST_METHOD'];
$dados = json_decode(file_get_contents("php://input"));
$id = $_GET['id'] ?? null;

$rota = $_GET['route'] ?? 'produtos';

switch ($metodo) {
    case 'GET':
        if ($rota === 'categorias') {
            $categoryController->listar();
        } else {
            $productController->listar();
        }
        break;
    case 'POST':
        $productController->criar($dados);
        break;
    case 'PUT':
        $productController->atualizar($dados);
        break;
    case 'DELETE':
        if ($id) $productController->deletar($id);
        break;
}