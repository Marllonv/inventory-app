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

$controller = new ProductController($pdo);
$metodo = $_SERVER['REQUEST_METHOD'];
$dados = json_decode(file_get_contents("php://input"));
$id = $_GET['id'] ?? null;

switch ($metodo) {
    case 'GET':
        $controller->listar();
        break;
    case 'POST':
        $controller->criar($dados);
        break;
    case 'PUT':
        $controller->atualizar($dados);
        break;
    case 'DELETE':
        if ($id) $controller->deletar($id);
        break;
}