<?php

class AuthMiddleware {
    public static function autenticar() {
        $headers = array_change_key_case(getallheaders(), CASE_LOWER);
        $authHeader = $headers['authorization'] ?? 
                  $_SERVER['HTTP_AUTHORIZATION'] ?? 
                  $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? 
                  null;

        if (!$authHeader) {
            http_response_code(401);
            echo json_encode(["error" => "Token não fornecido"]);
            exit;
        }

        if (preg_match('/bearer\s(\S+)/i', $authHeader, $matches)) {
            $token = $matches[1];
            $payload = JwtHandler::decode($token);

            if ($payload) {
                return $payload;
            }
        }

        self::responderErro("Token inválido ou sessão expirada.");
    }

    private static function responderErro($mensagem) {
        http_response_code(401);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(["error" => $mensagem]);
        exit;
    }
}