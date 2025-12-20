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

        if ($usuario && password_verify($senha, trim($usuario['senha']))) {
            
            $payload = [
                'id'    => $usuario['id'],
                'nome'  => $usuario['nome'],
                'email' => $usuario['email'],
                'nivel' => $usuario['nivel']
            ];

            $token = JwtHandler::encode($payload);

            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'user'  => $payload,
                'token' => $token
            ]);
            exit;
            
        } else {
            http_response_code(401);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                "error" => "E-mail ou senha incorretos"
            ]);
            exit;
        }
    }
}