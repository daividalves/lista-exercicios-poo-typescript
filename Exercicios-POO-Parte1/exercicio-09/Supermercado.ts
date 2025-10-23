/**
 * Representa um produto vendido no supermercado. Demonstra alta **Coesão**
 * ao ser responsável apenas por seus próprios dados (nome, preço, estoque)
 * e operações relacionadas (adicionar/remover estoque).
 */
class Produto {
  private _nome: string;
  private _preco: number;
  private _quantidadeEstoque: number;

  constructor(nome: string, preco: number, quantidadeEstoque: number) {
    if (preco <= 0) {
      throw new Error("O preço do produto deve ser positivo.");
    }
    if (quantidadeEstoque < 0) {
      throw new Error("A quantidade em estoque não pode ser negativa.");
    }
    this._nome = nome;
    this._preco = preco;
    this._quantidadeEstoque = quantidadeEstoque;
  }

  get nome(): string {
    return this._nome;
  }

  get preco(): number {
    return this._preco;
  }

  get quantidadeEstoque(): number {
    return this._quantidadeEstoque;
  }

  /**
   * Tenta remover uma quantidade do estoque do produto.
   * Garante a **Confiabilidade** ao verificar a disponibilidade antes de remover.
   * @param quantidade A quantidade a ser removida do estoque.
   * @returns true se a remoção foi bem-sucedida, false caso contrário.
   */
  removerEstoque(quantidade: number): boolean {
    if (quantidade <= 0) {
      console.log(`Erro: A quantidade a remover de ${this._nome} deve ser positiva.`);
      return false;
    }
    if (this._quantidadeEstoque >= quantidade) {
      this._quantidadeEstoque -= quantidade;
      console.log(`${quantidade} unidades de ${this._nome} removidas do estoque. Novo estoque: ${this._quantidadeEstoque}.`);
      return true;
    } else {
      console.log(`Não há estoque suficiente de ${this._nome}. Disponível: ${this._quantidadeEstoque}, solicitado: ${quantidade}.`);
      return false;
    }
  }

  /**
   * Adiciona uma quantidade ao estoque do produto.
   * @param quantidade A quantidade a ser adicionada ao estoque.
   */
  adicionarEstoque(quantidade: number): void {
    if (quantidade > 0) {
      this._quantidadeEstoque += quantidade;
      console.log(`${quantidade} unidades de ${this._nome} adicionadas ao estoque. Novo estoque: ${this._quantidadeEstoque}.`);
    } else {
      console.log(`Erro: A quantidade a adicionar ao estoque de ${this._nome} deve ser positiva.`);
    }
  }
}

/**
 * Representa um item dentro de um pedido de cliente. Possui alta **Coesão**
 * ao focar apenas na relação entre um produto e sua quantidade dentro de um pedido.
 */
class ItemPedido {
  private _produto: Produto;
  private _quantidade: number;

  constructor(produto: Produto, quantidade: number) {
    if (quantidade <= 0) {
      throw new Error("A quantidade do item no pedido deve ser positiva.");
    }
    this._produto = produto;
    this._quantidade = quantidade;
  }

  get produto(): Produto {
    return this._produto;
  }

  get quantidade(): number {
    return this._quantidade;
  }

  /**
   * Calcula o subtotal do item (preço * quantidade).
   * @returns O valor total do item.
   */
  calcularSubtotal(): number {
    return this._produto.preco * this._quantidade;
  }
}

/**
 * Define os tipos de pagamento possíveis. Isso pode ser estendido no futuro
 * sem alterar a classe `Pedido`, demonstrando **Extensibilidade** e baixo **Acoplamento**.
 */
type TipoPagamento = "Dinheiro" | "Cheque" | "Cartão";

/**
 * Representa um pedido feito por um cliente no supermercado. Demonstra **Coesão**
 * ao gerenciar a lista de itens, o tipo de pagamento e o cálculo total.
 * O **Acoplamento** com a classe `Produto` é gerenciado através do método `adicionarItem`,
 * onde a `Produto` é responsável por sua própria lógica de estoque.
 */
class Pedido {
  private _itens: ItemPedido[];
  private _tipoPagamento: TipoPagamento | null;

  constructor() {
    this._itens = [];
    this._tipoPagamento = null;
  }

  get itens(): ItemPedido[] {
    return [...this._itens]; // Retorna uma cópia para evitar modificações externas diretas
  }

  get tipoPagamento(): TipoPagamento | null {
    return this._tipoPagamento;
  }

  /**
   * Adiciona um item ao pedido, verificando a disponibilidade do produto em estoque.
   * A responsabilidade de remover do estoque é delegada ao objeto `Produto`.
   * @param produto O produto a ser adicionado.
   * @param quantidade A quantidade desejada do produto.
   * @returns true se o item foi adicionado com sucesso, false caso contrário.
   */
  adicionarItem(produto: Produto, quantidade: number): boolean {
    // A classe Pedido não precisa saber os detalhes internos de como Produto gerencia seu estoque.
    // Isso reduz o acoplamento.
    if (produto.removerEstoque(quantidade)) {
      this._itens.push(new ItemPedido(produto, quantidade));
      console.log(`${quantidade}x ${produto.nome} adicionado ao pedido.`);
      return true;
    }
    return false;
  }

  /**
   * Calcula o valor total do pedido somando o subtotal de todos os itens.
   * @returns O valor total do pedido.
   */
  calcularTotal(): number {
    return this._itens.reduce((total, item) => total + item.calcularSubtotal(), 0);
  }

  /**
   * Define o tipo de pagamento para o pedido.
   * @param tipo O tipo de pagamento (Dinheiro, Cheque ou Cartão).
   */
  setTipoPagamento(tipo: TipoPagamento): void {
    this._tipoPagamento = tipo;
    console.log(`Tipo de pagamento definido como: ${tipo}.`);
  }

  /**
   * Exibe um resumo detalhado do pedido.
   */
  exibirResumo(): void {
    console.log("\n--- Resumo do Pedido ---");
    if (this._itens.length === 0) {
      console.log("Pedido vazio.");
      return;
    }
    this._itens.forEach(item => {
      console.log(`${item.quantidade}x ${item.produto.nome} @ R$${item.produto.preco.toFixed(2)} = R$${item.calcularSubtotal().toFixed(2)}`);
    });
    console.log(`Total: R$${this.calcularTotal().toFixed(2)}`);
    console.log(`Pagamento: ${this._tipoPagamento || "Não definido"}`);
    console.log("------------------------");
  }
}

// --- Programa de Teste ---
console.log("\n--- Exercício 9: Supermercado ---");

// Cria alguns produtos
const arroz = new Produto("Arroz 5kg", 25.00, 50);
const feijao = new Produto("Feijão 1kg", 8.00, 100);
const leite = new Produto("Leite 1L", 4.50, 30);

// Cria um novo pedido
const pedidoCliente = new Pedido();

// Adiciona itens ao pedido
pedidoCliente.adicionarItem(arroz, 2);
pedidoCliente.adicionarItem(feijao, 3);
pedidoCliente.adicionarItem(leite, 5);
pedidoCliente.adicionarItem(arroz, 60); // Tenta adicionar mais do que o estoque (deve falhar)

// Define o tipo de pagamento
pedidoCliente.setTipoPagamento("Cartão");

// Exibe o resumo do pedido
pedidoCliente.exibirResumo();

console.log("\nEstoque atual dos produtos após o pedido:");
console.log(`Arroz 5kg em estoque: ${arroz.quantidadeEstoque}`);
console.log(`Feijão 1kg em estoque: ${feijao.quantidadeEstoque}`);
console.log(`Leite 1L em estoque: ${leite.quantidadeEstoque}`);

// Testando a adição de estoque
arroz.adicionarEstoque(10);
console.log(`Arroz 5kg em estoque após adição: ${arroz.quantidadeEstoque}`);

// Exemplos de erros no construtor
try {
  new Produto("Refrigerante", -2.50, 20);
} catch (error: any) {
  console.log(`\nErro ao criar produto: ${error.message}`);
}

try {
  new ItemPedido(arroz, -1);
} catch (error: any) {
  console.log(`Erro ao criar item de pedido: ${error.message}`);
}

