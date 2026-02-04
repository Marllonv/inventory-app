<?php

class UserController {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function cadastrar($dados) {
        if (empty($dados->nome) || empty($dados->email) || empty($dados->senha)) {
            http_response_code(400);
            echo json_encode(["error" => "Preencha todos os campos obrigatórios."]);
            return;
        }

        try {
            $check = $this->pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
            $check->execute([$dados->email]);
            if ($check->fetch()) {
                http_response_code(400);
                echo json_encode(["error" => "Este e-mail já está cadastrado."]);
                return;
            }

            $senhaHash = password_hash($dados->senha, PASSWORD_BCRYPT);

            $sql = "INSERT INTO usuarios (nome, email, senha, nivel) VALUES (?, ?, ?, ?)";
            $stmt = $this->pdo->prepare($sql);
            
            $sucesso = $stmt->execute([
                $dados->nome,
                $dados->email,
                $senhaHash,
                $dados->nivel ?? 'comum'
            ]);

            echo json_encode([
                "success" => true,
                "message" => "Usuário criado com sucesso!"
            ]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erro no banco de dados: " . $e->getMessage()]);
        }
    }

    public function listar() {
        try {
            $stmt = $this->pdo->query("SELECT id, nome, email, nivel FROM usuarios ORDER BY nome ASC");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    public function atualizar($dados) {
    if (empty($dados->id)) return;

    if (!empty($dados->senha)) {
        $senhaHash = password_hash($dados->senha, PASSWORD_BCRYPT);
        $sql = "UPDATE usuarios SET nome = ?, email = ?, nivel = ?, senha = ? WHERE id = ?";
        $params = [$dados->nome, $dados->email, $dados->nivel, $senhaHash, $dados->id];
    } else {
        $sql = "UPDATE usuarios SET nome = ?, email = ?, nivel = ? WHERE id = ?";
        $params = [$dados->nome, $dados->email, $dados->nivel, $dados->id];
    }

    $stmt = $this->pdo->prepare($sql);
    echo json_encode(["success" => $stmt->execute($params)]);
}

    public function deletar($id) {
        $stmt = $this->pdo->prepare("DELETE FROM usuarios WHERE id = ?");
        echo json_encode(["success" => $stmt->execute([$id])]);
    }

}