/**
 * Representa uma conta de investimento, com saldo e taxa de juros.
 * Esta classe demonstra **Confiabilidade** ao garantir que o saldo e a taxa de juros sejam válidos,
 * e **Coesão** ao centralizar a lógica de aplicação de juros.
 * Pode ser vista como uma extensão de uma ContaBancaria (não implementada aqui, mas conceitualmente).
 */
class ContaInvestimento {
  private _saldo: number;
  private _taxaJuros: number; // Taxa de juros em formato decimal (ex: 0.10 para 10%)

  /**
   * Construtor da classe ContaInvestimento.
   * Garante a **Confiabilidade** do objeto ao validar os parâmetros iniciais.
   * @param saldoInicial O saldo inicial da conta. Deve ser não-negativo.
   * @param taxaJuros A taxa de juros a ser aplicada (ex: 0.10 para 10%). Deve ser não-negativa.
   */
  constructor(saldoInicial: number, taxaJuros: number) {
    if (saldoInicial < 0) {
      throw new Error("O saldo inicial não pode ser negativo.");
    }
    if (taxaJuros < 0) {
      throw new Error("A taxa de juros não pode ser negativa.");
    }
    this._saldo = saldoInicial;
    this._taxaJuros = taxaJuros;
    console.log(`Conta de Investimento criada com saldo R$${this._saldo.toFixed(2)} e taxa de juros ${(this._taxaJuros * 100).toFixed(2)}%.`);
  }

  /**
   * Retorna o saldo atual da conta.
   * Demonstra encapsulamento, fornecendo acesso controlado ao atributo privado.
   */
  get saldo(): number {
    return this._saldo;
  }

  /**
   * Retorna a taxa de juros da conta.
   * Demonstra encapsulamento, fornecendo acesso controlado ao atributo privado.
   */
  get taxaJuros(): number {
    return this._taxaJuros;
  }

  /**
   * Adiciona os juros ao saldo da conta com base na taxa de juros atual.
   * Este método centraliza a lógica de negócio de juros, promovendo a **Coesão**.
   */
  adicioneJuros(): void {
    const jurosCalculados = this._saldo * this._taxaJuros;
    this._saldo += jurosCalculados;
    console.log(`Juros de R$${jurosCalculados.toFixed(2)} adicionados. Novo saldo: R$${this._saldo.toFixed(2)}`);
  }

  /**
   * Exibe o extrato da conta de investimento.
   */
  exibirExtrato(): void {
    console.log(`\n--- Extrato da Conta de Investimento ---`);
    console.log(`Saldo Atual: R$${this.saldo.toFixed(2)}`);
    console.log(`Taxa de Juros: ${(this.taxaJuros * 100).toFixed(2)}%`);
    console.log(`----------------------------------------`);
  }
}

// --- Programa de Teste ---
console.log("\n--- Exercício 7: Conta de Investimento ---");

// Constrói uma poupança com um saldo inicial de R$1.000,00 e uma taxa de juros de 10%
const minhaPoupanca = new ContaInvestimento(1000.00, 0.10); // Saldo inicial R$1000,00, taxa de juros 10%
minhaPoupanca.exibirExtrato();

// Aplica o método adicioneJuros() cinco vezes
console.log("\nAplicando juros por 5 vezes:");
for (let i = 1; i <= 5; i++) {
  console.log(`Aplicação ${i}:`);
  minhaPoupanca.adicioneJuros();
}

// Imprime o saldo resultante
minhaPoupanca.exibirExtrato();

// Exemplo de erro no construtor
try {
  new ContaInvestimento(-100, 0.05);
} catch (error: any) {
  console.log(`\nErro ao criar conta de investimento: ${error.message}`);
}

try {
  new ContaInvestimento(1000, -0.01);
} catch (error: any) {
  console.log(`Erro ao criar conta de investimento: ${error.message}`);
}

