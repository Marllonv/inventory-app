<?php

class User {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }
    // Busca pelo email
    public function buscarPorEmail($email) {
        $sql = "SELECT * FROM usuarios WHERE email = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Busca pelo ID
    public function buscarPorId($id) {
        $sql = "SELECT id, nome, email, nivel FROM usuarios WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}