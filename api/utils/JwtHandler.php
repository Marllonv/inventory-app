<?php

class JwtHandler {
    private static $secret = JWT_SECRET;

    public static function encode($payload) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        
        $headerBase64 = self::base64UrlEncode($header);
        $payloadBase64 = self::base64UrlEncode(json_encode($payload));
        
        $signature = hash_hmac('sha256', "$headerBase64.$payloadBase64", self::$secret, true);
        $signatureBase64 = self::base64UrlEncode($signature);
        
        return "$headerBase64.$payloadBase64.$signatureBase64";
    }

    public static function decode($token) {
        $partes = explode('.', $token);
        
        if (count($partes) !== 3) {
            return null;
        }

        [$header, $payload, $signature] = $partes;

        $validSignature = hash_hmac('sha256', "$header.$payload", self::$secret, true);
        $validSignatureEncoded = self::base64UrlEncode($validSignature);

        if (!hash_equals($signature, $validSignatureEncoded)) {
            return null;
        }

        $decodedPayload = base64_decode(str_replace(['-', '_'], ['+', '/'], $payload));
        return json_decode($decodedPayload, true);
    }

    private static function base64UrlEncode($data) {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
    }
}