<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php';

$stmt = $pdo->query("SELECT * FROM produtos");
$produtos = $stmt->fetchAll();

echo json_encode($produtos);