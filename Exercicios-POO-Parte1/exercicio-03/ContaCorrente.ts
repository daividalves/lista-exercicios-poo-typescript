/**
 * Representa uma conta corrente bancária, encapsulando seus dados e operações.
 * Esta classe demonstra **Confiabilidade** e **Manutenibilidade** ao gerenciar
 * de forma autônoma suas regras de negócio (depósito, saque, alteração de nome).
 */
class ContaCorrente {
  private _numeroConta: string;
  private _nomeCorrentista: string;
  private _saldo: number;

  constructor(numeroConta: string, nomeCorrentista: string, saldoInicial: number) {
    if (saldoInicial < 0) {
      throw new Error("O saldo inicial não pode ser negativo.");
    }
    this._numeroConta = numeroConta;
    this._nomeCorrentista = nomeCorrentista;
    this._saldo = saldoInicial;
  }

  /**
   * Retorna o número da conta.
   * Demonstra encapsulamento ao fornecer acesso controlado ao atributo.
   */
  get numeroConta(): string {
    return this._numeroConta;
  }

  /**
   * Retorna o nome do correntista.
   * Demonstra encapsulamento ao fornecer acesso controlado ao atributo.
   */
  get nomeCorrentista(): string {
    return this._nomeCorrentista;
  }

  /**
   * Retorna o saldo atual da conta.
   * Demonstra encapsulamento ao fornecer acesso controlado ao atributo.
   */
  get saldo(): number {
    return this._saldo;
  }

  /**
   * Altera o nome do correntista.
   * Garante a **Manutenibilidade** ao centralizar a lógica de validação e atualização do nome.
   * @param novoNome O novo nome do correntista.
   */
  alterarNome(novoNome: string): void {
    if (novoNome && novoNome.trim() !== '') {
      this._nomeCorrentista = novoNome.trim();
      console.log(`Nome do correntista alterado para: ${this._nomeCorrentista}`);
    } else {
      console.log('Erro: O novo nome do correntista não pode ser vazio.');
    }
  }

  /**
   * Realiza um depósito na conta.
   * Assegura a **Confiabilidade** da transação ao validar o valor e atualizar o saldo.
   * @param valor O valor a ser depositado.
   */
  deposito(valor: number): void {
    if (valor > 0) {
      this._saldo += valor;
      console.log(`Depósito de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this._saldo.toFixed(2)}`);
    } else {
      console.log('Erro: O valor do depósito deve ser positivo.');
    }
  }

  /**
   * Realiza um saque da conta.
   * Garante a **Confiabilidade** da transação, verificando o saldo e validando o valor.
   * @param valor O valor a ser sacado.
   * @returns True se o saque foi bem-sucedido, false caso contrário.
   */
  saque(valor: number): boolean {
    if (valor <= 0) {
      console.log('Erro: O valor do saque deve ser positivo.');
      return false;
    }
    if (this._saldo >= valor) {
      this._saldo -= valor;
      console.log(`Saque de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this._saldo.toFixed(2)}`);
      return true;
    } else {
      console.log(`Erro: Saldo insuficiente. Saldo atual: R$${this._saldo.toFixed(2)}. Valor solicitado: R$${valor.toFixed(2)}`);
      return false;
    }
  }

  /**
   * Exibe o extrato básico da conta.
   */
  exibirExtrato(): void {
    console.log(`\n--- Extrato da Conta Corrente ---`);
    console.log(`Número da Conta: ${this.numeroConta}`);
    console.log(`Correntista: ${this.nomeCorrentista}`);
    console.log(`Saldo Atual: R$${this.saldo.toFixed(2)}`);
    console.log(`---------------------------------`);
  }
}

// --- Exemplo de Uso ---
console.log("\n--- Exercício 3: Conta Corrente ---");
const minhaConta = new ContaCorrente('12345-6', 'Ana Paula', 1000.00);
minhaConta.exibirExtrato();

minhaConta.deposito(500.00);
minhaConta.saque(200.00);
minhaConta.alterarNome('Ana Paula da Silva');
minhaConta.saque(1500.00); // Tentativa de saque com saldo insuficiente
minhaConta.deposito(100.00);
minhaConta.exibirExtrato();

// Exemplo de erro no construtor
try {
  new ContaCorrente('7890-1', 'Teste', -50);
} catch (error: any) {
  console.log(`\nErro ao criar conta: ${error.message}`);
}

