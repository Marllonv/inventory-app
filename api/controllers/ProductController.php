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
    if (!isset($dados->id) || empty($dados->id)) {
        echo json_encode(["error" => "ID não fornecido"]);
        return;
    }

    $stmtCheck = $this->pdo->prepare("SELECT quantidade FROM produtos WHERE id = ?");
    $stmtCheck->execute([$dados->id]);
    $produtoAntigo = $stmtCheck->fetch(PDO::FETCH_ASSOC);

    if ($produtoAntigo) {
        $qtdAntiga = (int)$produtoAntigo['quantidade'];
        $qtdNova = (int)$dados->quantidade;

        if ($qtdAntiga != $qtdNova) {
            $tipo = ($qtdNova > $qtdAntiga) ? 'ENTRADA' : 'SAIDA';
            
            $sqlHist = "INSERT INTO movimentacoes (produto_id, tipo, quantidade_anterior, quantidade_nova, motivo) 
                        VALUES (?, ?, ?, ?, ?)";
            $this->pdo->prepare($sqlHist)->execute([
                $dados->id, 
                $tipo, 
                $qtdAntiga, 
                $qtdNova, 
                "Atualização via sistema"
            ]);
        }
    }

    $sql = "UPDATE produtos SET nome = ?, preco = ?, quantidade = ?, categoria_id = ? WHERE id = ?";
    $stmt = $this->pdo->prepare($sql);
    $sucesso = $stmt->execute([
        $dados->nome, 
        $dados->preco, 
        $dados->quantidade, 
        $dados->categoria_id ?? null, 
        $dados->id
    ]);

    echo json_encode(["success" => $sucesso]);
    }

    public function deletar($id) {
        $stmt = $this->pdo->prepare("DELETE FROM produtos WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["message" => "Produto deletado"]);
    }

    public function listarMovimentacoes() {
    $sql = "SELECT m.*, p.nome as produto_nome 
            FROM movimentacoes m 
            JOIN produtos p ON m.produto_id = p.id 
            ORDER BY m.data_movimentacao DESC 
            LIMIT 50";
    $stmt = $this->pdo->query($sql);
    echo json_encode($stmt->fetchAll());
}

}