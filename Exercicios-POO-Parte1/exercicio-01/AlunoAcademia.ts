/**
 * Representa um aluno de academia com informações pessoais e métodos para calcular a idade.
 * Demonstra os princípios de **Confiabilidade** e **Reutilização** da POO.
 */
class AlunoAcademia {
  private _nome: string;
  private _dataNascimento: Date;
  private _peso: number;
  private _altura: number;

  constructor(nome: string, dataNascimento: Date, peso: number, altura: number) {
    this._nome = nome;
    this._dataNascimento = dataNascimento;
    this._peso = peso;
    this._altura = altura;
  }

  // Getters para acessar os atributos (encapsulamento)
  get nome(): string {
    return this._nome;
  }

  get dataNascimento(): Date {
    return this._dataNascimento;
  }

  get peso(): number {
    return this._peso;
  }

  get altura(): number {
    return this._altura;
  }

  /**
   * Calcula a idade do aluno com base na data de nascimento.
   * Este método encapsula a lógica de cálculo de idade, tornando-a confiável e fácil de usar.
   * @returns A idade do aluno em anos.
   */
  calcularIdade(): number {
    const hoje = new Date();
    const anoNascimento = this._dataNascimento.getFullYear();
    const mesNascimento = this._dataNascimento.getMonth();
    const diaNascimento = this._dataNascimento.getDate();

    let idade = hoje.getFullYear() - anoNascimento;

    // Verifica se o aniversário já ocorreu este ano
    if (hoje.getMonth() < mesNascimento || (hoje.getMonth() === mesNascimento && hoje.getDate() < diaNascimento)) {
      idade--;
    }
    return idade;
  }

  
  atualizarPeso(novoPeso: number): void {
    if (novoPeso > 0) {
      this._peso = novoPeso;
      console.log(`${this._nome} teve seu peso atualizado para ${novoPeso} kg.`);
    } else {
      console.log("O peso deve ser um valor positivo.");
    }
  }

   atualizarAltura(novaAltura: number): void {
    if (novaAltura > 0) {
      this._altura = novaAltura;
      console.log(`${this._nome} teve sua altura atualizada para ${novaAltura} m.`);
    } else {
      console.log("A altura deve ser um valor positivo.");
    }
  }
}

// --- Exemplo de Uso (para demonstração) ---
console.log("\n--- Exercício 1: Aluno de Academia ---");
const aluno1 = new AlunoAcademia("João Silva", new Date("1990-05-15"), 80, 1.75);
console.log(`Nome: ${aluno1.nome}`);
console.log(`Data de Nascimento: ${aluno1.dataNascimento.toLocaleDateString()}`);
console.log(`Peso: ${aluno1.peso} kg`);
console.log(`Altura: ${aluno1.altura} m`);
console.log(`Idade: ${aluno1.calcularIdade()} anos`);

aluno1.atualizarPeso(82);
aluno1.atualizarAltura(1.76);
console.log(`Novo Peso: ${aluno1.peso} kg`);
console.log(`Nova Altura: ${aluno1.altura} m`);

