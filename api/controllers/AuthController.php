<?php

class AuthController {
    private $userModel;

    public function __construct($userModel) {
        $this->userModel = $userModel;
    }

    public function login($dados) {

    $email = trim($dados->email ?? '');
    $senha = $dados->senha ?? ''; 

    $usuario = $this->userModel->buscarPorEmail($email);

    if (!$usuario || !password_verify($senha, trim($usuario['senha']))) {
        http_response_code(401);
        echo json_encode(["error" => "Login ou Senha Inválidos"]);
        exit;
    }

    $payload = [
        'id'    => $usuario['id'],
        'nome'  => $usuario['nome'],
        'email' => $usuario['email'],
        'nivel' => $usuario['nivel']
    ];

    $token = JwtHandler::encode($payload);

    echo json_encode([
        'user'  => $payload,
        'token' => $token
    ]);
    exit;
}
    
}