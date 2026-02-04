<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Expose-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

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
require_once 'controllers/UserController.php';

$userController = new UserController($pdo);
$productController = new ProductController($pdo);
$categoryController = new CategoryController($pdo);
$userModel = new User($pdo);
$authController = new AuthController($userModel);

$metodo = $_SERVER['REQUEST_METHOD'];
$dados = json_decode(file_get_contents("php://input"), false);
$id = $_GET['id'] ?? null;
$rota = $_GET['route'] ?? 'produtos';

$usuarioLogado = null;

if ($rota !== 'login' && $metodo !== 'OPTIONS') {
    $usuarioLogado = AuthMiddleware::autenticar(); 
}

switch ($metodo) {
    case 'GET':
        if ($rota === 'categorias') {
            $categoryController->listar();
        } else if ($rota === 'historico') {
            $productController->listarMovimentacoes($id);
        } else if ($rota === 'usuarios') {
            $userController->listar();
        } else {
            $productController->listar();     
        }
        break;

    case 'POST':
        if ($rota === 'login') {
            $authController->login($dados);
        } else if ($rota === 'usuarios') {
            if (!$usuarioLogado || $usuarioLogado['nivel'] !== 'admin') {
                http_response_code(403);
                echo json_encode(["error" => "Acesso negado."]);
                exit;
            }
            $userController->cadastrar($dados);
        } else {
            $productController->criar($dados);
        }
        break;

    case 'PUT':
        if ($rota === 'usuarios') {
            if (!$usuarioLogado || $usuarioLogado['nivel'] !== 'admin') {
                http_response_code(403);
                exit;
            }
            $userController->atualizar($dados);
        } else {    
            $productController->atualizar($dados);
        }
        break;

    case 'DELETE':
        if ($rota === 'usuarios' && $id) {
            if (!$usuarioLogado || $usuarioLogado['nivel'] !== 'admin') {
                http_response_code(403);
                exit;
            }
            $userController->deletar($id);
        } else if ($id) {
            $productController->deletar($id);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método não permitido"]);
        break;
}