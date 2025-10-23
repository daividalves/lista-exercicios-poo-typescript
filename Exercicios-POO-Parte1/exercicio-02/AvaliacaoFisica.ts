/**
 * Representa uma avaliação física individual, com dados como peso, altura e data.
 * Esta classe demonstra alta **Coesão**, sendo responsável apenas pelos dados e cálculos de uma única avaliação.
 */
class Avaliacao {
  private _data: Date;
  private _peso: number;
  private _altura: number;

  constructor(data: Date, peso: number, altura: number) {
    this._data = data;
    this._peso = peso;
    this._altura = altura;
  }

  get data(): Date {
    return this._data;
  }

  get peso(): number {
    return this._peso;
  }

  get altura(): number {
    return this._altura;
  }

  /**
   * Calcula o Índice de Massa Corporal (IMC) com base no peso e altura.
   * @returns O valor do IMC.
   */
  calcularIMC(): number {
    if (this._altura === 0) {
      return 0; // Evita divisão por zero e garante um resultado válido.
    }
    return this._peso / (this._altura * this._altura);
  }
}

/**
 * Representa o registro de avaliações físicas de um aluno em uma academia.
 * Reutiliza a classe `AlunoAcademia` (Exercício 1), demonstrando o princípio de **Reutilização**.
 * Mantém uma lista de objetos `Avaliacao`, demonstrando **Coesão** ao gerenciar apenas as avaliações.
 */
class AvaliacaoFisica {
  private _idMatricula: string;
  private _dataMatricula: Date;
  private _aluno: AlunoAcademia; // Reutiliza a classe AlunoAcademia
  private _avaliacoes: Avaliacao[];

  constructor(idMatricula: string, dataMatricula: Date, aluno: AlunoAcademia) {
    this._idMatricula = idMatricula;
    this._dataMatricula = dataMatricula;
    this._aluno = aluno;
    this._avaliacoes = [];
  }

  get idMatricula(): string {
    return this._idMatricula;
  }

  get dataMatricula(): Date {
    return this._dataMatricula;
  }

  get aluno(): AlunoAcademia {
    return this._aluno;
  }

  get avaliacoes(): Avaliacao[] {
    return [...this._avaliacoes]; // Retorna uma cópia para evitar modificações externas diretas
  }

  /**
   * Adiciona uma nova avaliação física à lista do aluno.
   * @param avaliacao A avaliação a ser adicionada.
   */
  adicionarAvaliacao(avaliacao: Avaliacao): void {
    this._avaliacoes.push(avaliacao);
    console.log(`Avaliação de ${avaliacao.data.toLocaleDateString()} adicionada para ${this._aluno.nome}.`);
  }

  /**
   * Retorna a última avaliação física registrada.
   * @returns A última avaliação física ou `undefined` se não houver avaliações.
   */
  getUltimaAvaliacao(): Avaliacao | undefined {
    if (this._avaliacoes.length === 0) {
      return undefined;
    }
    return this._avaliacoes[this._avaliacoes.length - 1];
  }

  /**
   * Retorna uma avaliação específica pelo seu índice.
   * @param indice O índice da avaliação na lista (base 0).
   * @returns A avaliação física correspondente ou `undefined` se o índice for inválido.
   */
  getAvaliacaoPorIndice(indice: number): Avaliacao | undefined {
    if (indice >= 0 && indice < this._avaliacoes.length) {
      return this._avaliacoes[indice];
    }
    return undefined;
  }

  /**
   * Exibe todas as informações relevantes da avaliação física, incluindo dados do aluno e avaliações.
   */
  exibirInformacoes(): void {
    console.log(`\n--- Informações da Avaliação Física ---`);
    console.log(`ID Matrícula: ${this._idMatricula}`);
    console.log(`Data da Matrícula: ${this._dataMatricula.toLocaleDateString()}`);
    console.log(`Aluno: ${this._aluno.nome} (Idade: ${this._aluno.calcularIdade()} anos)`);
    console.log(`
Histórico de Avaliações:`);
    if (this._avaliacoes.length === 0) {
      console.log(`  Nenhuma avaliação registrada.`);
    } else {
      this._avaliacoes.forEach((aval, index) => {
        console.log(`  Avaliação ${index + 1}:`);
        console.log(`    Data: ${aval.data.toLocaleDateString()}`);
        console.log(`    Peso: ${aval.peso} kg`);
        console.log(`    Altura: ${aval.altura} m`);
        console.log(`    IMC: ${aval.calcularIMC().toFixed(2)}`);
      });
    }

    const ultima = this.getUltimaAvaliacao();
    if (ultima) {
      console.log(`\nÚltima Avaliação:`);
      console.log(`  Data: ${ultima.data.toLocaleDateString()}`);
      console.log(`  Peso: ${ultima.peso} kg`);
      console.log(`  Altura: ${ultima.altura} m`);
      console.log(`  IMC: ${ultima.calcularIMC().toFixed(2)}`);
    }
  }
}

// --- Exemplo de Uso ---
console.log("\n--- Exercício 2: Avaliação Física de Academia ---");

// Reutilizando AlunoAcademia do Exercício 1
const alunoExemplo = new AlunoAcademia("Maria Souza", new Date("1995-08-20"), 65, 1.60);
const avaliacaoFisica1 = new AvaliacaoFisica("MAT001", new Date(), alunoExemplo);

// Adicionando avaliações
avaliacaoFisica1.adicionarAvaliacao(new Avaliacao(new Date("2024-01-10"), 64, 1.60));
avaliacaoFisica1.adicionarAvaliacao(new Avaliacao(new Date("2024-04-15"), 63, 1.61));

avaliacaoFisica1.exibirInformacoes();

console.log(`\nInformações da avaliação no índice 0:`);
const avaliacaoEspecifica = avaliacaoFisica1.getAvaliacaoPorIndice(0);
if (avaliacaoEspecifica) {
  console.log(`  Data: ${avaliacaoEspecifica.data.toLocaleDateString()}`);
  console.log(`  Peso: ${avaliacaoEspecifica.peso} kg`);
  console.log(`  IMC: ${avaliacaoEspecifica.calcularIMC().toFixed(2)}`);
}
