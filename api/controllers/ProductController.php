<?php
class ProductController {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function listar() {
        $sql = "SELECT p.*, c.nome as categoria_nome 
                FROM produtos p 
                LEFT JOIN categorias c ON p.categoria_id = c.id 
                ORDER BY p.id DESC";
        $stmt = $this->pdo->query($sql);
        echo json_encode($stmt->fetchAll());
    }

    public function criar($dados) {
        $sql = "INSERT INTO produtos (nome, preco, quantidade, categoria_id) VALUES (?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            $dados->nome, 
            $dados->preco, 
            $dados->quantidade, 
            $dados->categoria_id ?? null
        ]);
        echo json_encode(["message" => "Produto criado"]);
    }

    public function atualizar($dados) {
        $sql = "UPDATE produtos SET nome = ?, preco = ?, quantidade = ?, categoria_id = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            $dados->nome, 
            $dados->preco, 
            $dados->quantidade, 
            $dados->categoria_id ?? null, 
            $dados->id
        ]);
        echo json_encode(["message" => "Produto atualizado"]);
    }

    public function deletar($id) {
        $stmt = $this->pdo->prepare("DELETE FROM produtos WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["message" => "Produto deletado"]);
    }
}