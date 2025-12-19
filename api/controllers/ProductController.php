<?php
class ProductController {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function listar() {
        $stmt = $this->pdo->query("SELECT * FROM produtos ORDER BY id DESC");
        echo json_encode($stmt->fetchAll());
    }

    public function criar($dados) {
        $sql = "INSERT INTO produtos (nome, preco, quantidade) VALUES (?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$dados->nome, $dados->preco, $dados->quantidade]);
        echo json_encode(["message" => "Criado com sucesso"]);
    }

    public function atualizar($dados) {
        $sql = "UPDATE produtos SET nome = ?, preco = ?, quantidade = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$dados->nome, $dados->preco, $dados->quantidade, $dados->id]);
        echo json_encode(["message" => "Atualizado com sucesso"]);
    }

    public function deletar($id) {
        $stmt = $this->pdo->prepare("DELETE FROM produtos WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["message" => "Excluído com sucesso"]);
    }
}