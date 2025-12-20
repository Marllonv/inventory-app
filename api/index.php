<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

define('JWT_SECRET', 'secret_key_for_jwt_token_generation');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'config/database.php';
require_once 'controllers/ProductController.php';
require_once 'controllers/CategoryController.php';
require_once 'utils/JwtHandler.php'; 
require_once 'models/User.php';
require_once 'controllers/AuthController.php';
require_once 'middleware/AuthMiddleware.php';

$productController = new ProductController($pdo);
$categoryController = new CategoryController($pdo);
$userModel = new User($pdo);
$authController = new AuthController($userModel);

$metodo = $_SERVER['REQUEST_METHOD'];
$dados = json_decode(file_get_contents("php://input"), false);
$id = $_GET['id'] ?? null;
$rota = $_GET['route'] ?? 'produtos';

switch ($metodo) {
    case 'GET':
        AuthMiddleware::autenticar(); 
        if ($rota === 'categorias') {
            $categoryController->listar();
        } else if ($rota === 'historico') {
            $productController->listarMovimentacoes($id);
        } else {
            $productController->listar();     
        }
        break;

    case 'POST':
        if ($rota === 'login') {
            $authController->login($dados);
        } else {
            AuthMiddleware::autenticar();
            $productController->criar($dados);
        }
        break;

    case 'PUT':
        AuthMiddleware::autenticar();
        $productController->atualizar($dados);
        break;

    case 'DELETE':
        AuthMiddleware::autenticar();
        if ($id) {
            $productController->deletar($id);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método não permitido"]);
        break;
}