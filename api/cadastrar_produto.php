<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'config.php';

$dados = json_decode(file_get_contents("php://input"));

if (!empty($dados->nome) && !empty($dados->preco)) {
    try {
        $query = "INSERT INTO produtos (nome, preco, quantidade, categoria_id) VALUES (:nome, :preco, :quantidade, :cat_id)";
        $stmt = $pdo->prepare($query);

        // Bind dos valores para segurança contra SQL Injection
        $stmt->bindParam(":nome", $dados->nome);
        $stmt->bindParam(":preco", $dados->preco);
        $stmt->bindParam(":quantidade", $dados->quantidade);
        $stmt->bindValue(":cat_id", 1); // Por enquanto, fixo na categoria 'Geral'

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Produto cadastrado com sucesso!"]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["message" => "Erro ao cadastrar: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Dados incompletos."]);
}