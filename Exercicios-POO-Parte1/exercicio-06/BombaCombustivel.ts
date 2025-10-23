class BombaCombustivel {
  private _tipoCombustivel: string;
  private _valorLitro: number;
  private _quantidadeCombustivel: number;

  constructor(tipoCombustivel: string, valorLitro: number, quantidadeInicial: number = 100) {
    if (valorLitro <= 0) {
      throw new Error("O valor do litro deve ser positivo.");
    }
    if (quantidadeInicial < 0) {
      throw new Error("A quantidade inicial de combustível não pode ser negativa.");
    }
    this._tipoCombustivel = tipoCombustivel;
    this._valorLitro = valorLitro;
    this._quantidadeCombustivel = quantidadeInicial;
    console.log(`Bomba de ${this._tipoCombustivel} inicializada com R$${this._valorLitro.toFixed(2)}/L e ${this._quantidadeCombustivel.toFixed(2)} L.`);
  }

  get tipoCombustivel(): string {
    return this._tipoCombustivel;
  }

  get valorLitro(): number {
    return this._valorLitro;
  }

  get quantidadeCombustivel(): number {
    return this._quantidadeCombustivel;
  }

  /**
   * Abastece por valor, calculando a quantidade de litros.
   * Garante a confiabilidade ao verificar a disponibilidade de combustível.
   * @param valor O valor em dinheiro a ser abastecido.
   * @returns A quantidade de litros abastecida ou 0 se não for possível.
   */
  abastecerPorValor(valor: number): number {
    if (valor <= 0) {
      console.log("Erro: O valor a ser abastecido deve ser positivo.");
      return 0;
    }

    const litrosNecessarios = valor / this._valorLitro;
    if (litrosNecessarios > this._quantidadeCombustivel) {
      console.log(`Não há combustível suficiente. Disponível: ${this._quantidadeCombustivel.toFixed(2)} L. Solicitado: ${litrosNecessarios.toFixed(2)} L.`);
      return 0;
    }

    this._quantidadeCombustivel -= litrosNecessarios;
    console.log(`Abastecidos ${litrosNecessarios.toFixed(2)} L de ${this._tipoCombustivel} por R$${valor.toFixed(2)}.`);
    this.exibirEstado();
    return litrosNecessarios;
  }

  /**
   * Abastece por quantidade de litros, calculando o valor a ser pago.
   * Garante a confiabilidade ao verificar a disponibilidade de combustível.
   * @param litros A quantidade de litros a ser abastecida.
   * @returns O valor a ser pago ou 0 se não for possível.
   */
  abastecerPorLitro(litros: number): number {
    if (litros <= 0) {
      console.log("Erro: A quantidade de litros deve ser positiva.");
      return 0;
    }

    if (litros > this._quantidadeCombustivel) {
      console.log(`Não há combustível suficiente. Disponível: ${this._quantidadeCombustivel.toFixed(2)} L. Solicitado: ${litros.toFixed(2)} L.`);
      return 0;
    }

    const valorAPagar = litros * this._valorLitro;
    this._quantidadeCombustivel -= litros;
    console.log(`Abastecidos ${litros.toFixed(2)} L de ${this._tipoCombustivel}. Valor a pagar: R$${valorAPagar.toFixed(2)}.`);
    this.exibirEstado();
    return valorAPagar;
  }

  /**
   * Altera o valor do litro do combustível.
   * Contribui para a manutenibilidade ao centralizar a regra de negócio para atualização de preço.
   * @param novoValor O novo valor do litro.
   */
  alterarValor(novoValor: number): void {
    if (novoValor > 0) {
      this._valorLitro = novoValor;
      console.log(`Valor do litro de ${this._tipoCombustivel} alterado para R$${this._valorLitro.toFixed(2)}.`);
    } else {
      console.log("Erro: O novo valor do litro deve ser positivo.");
    }
  }

  /**
   * Altera a quantidade de combustível restante na bomba (e.g., reabastecimento).
   * Garante a confiabilidade ao não permitir quantidades negativas.
   * @param novaQuantidade A nova quantidade de combustível.
   */
  alterarQuantidadeCombustivel(novaQuantidade: number): void {
    if (novaQuantidade >= 0) {
      this._quantidadeCombustivel = novaQuantidade;
      console.log(`Quantidade de ${this._tipoCombustivel} na bomba alterada para ${this._quantidadeCombustivel.toFixed(2)} L.`);
    } else {
      console.log("Erro: A quantidade de combustível não pode ser negativa.");
    }
  }

  /**
   * Exibe o estado atual da bomba de combustível.
   */
  exibirEstado(): void {
    console.log(`\n--- Estado da Bomba ---`);
    console.log(`Tipo de Combustível: ${this._tipoCombustivel}`);
    console.log(`Valor por Litro: R$${this._valorLitro.toFixed(2)}`);
    console.log(`Quantidade na Bomba: ${this._quantidadeCombustivel.toFixed(2)} L`);
  }
}

// --- Exemplo de Uso ---
console.log("\n--- Exercício 6: Bomba de Combustível ---");

const bombaGasolina = new BombaCombustivel("Gasolina", 5.89); // Inicia com 100L por padrão
bombaGasolina.exibirEstado();

console.log(`\nAbastecendo por valor (R$ 50):`);
bombaGasolina.abastecerPorValor(50);

console.log(`\nAbastecendo por litro (20 L):`);
bombaGasolina.abastecerPorLitro(20);

console.log(`\nAlterando o valor do litro para R$ 6.10:`);
bombaGasolina.alterarValor(6.10);

console.log(`\nAbastecendo por litro (15 L) com novo preço:`);
bombaGasolina.abastecerPorLitro(15);

console.log(`\nReabastecendo a bomba com 200 L:`);
bombaGasolina.alterarQuantidadeCombustivel(200);

console.log(`\nTentando abastecer mais do que o disponível:`);
bombaGasolina.abastecerPorLitro(250);

// Exemplo de erro no construtor
try {
  new BombaCombustivel("Etanol", -3.00);
} catch (error: any) {
  console.log(`\nErro ao criar bomba: ${error.message}`);
}

