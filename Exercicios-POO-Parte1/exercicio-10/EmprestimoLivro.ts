/**
 * Representa um Livro com suas informações básicas e estado de disponibilidade.
 * Demonstra alta **Coesão** ao ser responsável apenas por seus próprios dados
 * (título, autor, ISBN) e estado (disponível), e pelas operações que alteram esse estado.
 */
class Livro {
  private _titulo: string;
  private _autor: string;
  private _isbn: string;
  private _disponivel: boolean;

  constructor(titulo: string, autor: string, isbn: string) {
    this._titulo = titulo;
    this._autor = autor;
    this._isbn = isbn;
    this._disponivel = true; // Livro é criado como disponível por padrão
  }

  get titulo(): string {
    return this._titulo;
  }

  get autor(): string {
    return this._autor;
  }

  get isbn(): string {
    return this._isbn;
  }

  get disponivel(): boolean {
    return this._disponivel;
  }

  /**
   * Marca o livro como emprestado, alterando seu estado de disponibilidade.
   * Garante a **Confiabilidade** ao verificar se o livro já não está emprestado.
   * @returns true se o livro foi emprestado com sucesso, false caso contrário.
   */
  emprestar(): boolean {
    if (this._disponivel) {
      this._disponivel = false;
      console.log(`Livro "${this._titulo}" foi emprestado.`);
      return true;
    } else {
      console.log(`Erro: Livro "${this._titulo}" já está emprestado.`);
      return false;
    }
  }

  /**
   * Marca o livro como devolvido, alterando seu estado de disponibilidade.
   * Garante a **Confiabilidade** ao verificar se o livro já não está disponível.
   * @returns true se o livro foi devolvido com sucesso, false caso contrário.
   */
  devolver(): boolean {
    if (!this._disponivel) {
      this._disponivel = true;
      console.log(`Livro "${this._titulo}" foi devolvido.`);
      return true;
    } else {
      console.log(`Erro: Livro "${this._titulo}" já está disponível.`);
      return false;
    }
  }

  /**
   * Exibe as informações detalhadas do livro.
   */
  exibirInformacoes(): void {
    console.log(`  Título: ${this._titulo}`);
    console.log(`  Autor: ${this._autor}`);
    console.log(`  ISBN: ${this._isbn}`);
    console.log(`  Disponível: ${this._disponivel ? "Sim" : "Não"}`);
  }
}

/**
 * Representa uma Pessoa que pode realizar empréstimos de livros.
 * Demonstra **Coesão** ao centralizar as informações e identificação de uma pessoa.
 */
class Pessoa {
  private _nome: string;
  private _id: string;

  constructor(nome: string, id: string) {
    this._nome = nome;
    this._id = id;
  }

  get nome(): string {
    return this._nome;
  }

  get id(): string {
    return this._id;
  }

  /**
   * Exibe as informações da pessoa.
   */
  exibirInformacoes(): void {
    console.log(`  Nome: ${this._nome}`);
    console.log(`  ID: ${this._id}`);
  }
}

/**
 * Representa um Empréstimo de um livro para uma pessoa, com controle de datas.
 * Demonstra **Coesão** ao gerenciar todos os aspectos de um empréstimo específico.
 * O **Acoplamento** com `Livro` e `Pessoa` é feito por composição, onde o `Emprestimo`
 * "tem um" `Livro` e "tem uma" `Pessoa`, mas não interfere diretamente em suas responsabilidades internas,
 * apenas invoca métodos públicos como `emprestar()` e `devolver()`.
 */
class Emprestimo {
  private _livro: Livro;
  private _pessoa: Pessoa;
  private _dataEmprestimo: Date;
  private _dataDevolucaoPrevista: Date;
  private _dataDevolucaoReal: Date | null;

  constructor(livro: Livro, pessoa: Pessoa, diasParaDevolucao: number) {
    if (!livro.disponivel) {
      throw new Error(`O livro "${livro.titulo}" não está disponível para empréstimo.`);
    }
    if (diasParaDevolucao <= 0) {
        throw new Error("O número de dias para devolução deve ser positivo.");
    }

    this._livro = livro;
    this._pessoa = pessoa;
    this._dataEmprestimo = new Date();
    this._dataDevolucaoPrevista = new Date();
    this._dataDevolucaoPrevista.setDate(this._dataDevolucaoPrevista.getDate() + diasParaDevolucao);
    this._dataDevolucaoReal = null;

    // A responsabilidade de marcar o livro como emprestado é do próprio livro.
    this._livro.emprestar();
    console.log(`Empréstimo criado para "${livro.titulo}" por ${pessoa.nome}.`);
  }

  get livro(): Livro {
    return this._livro;
  }

  get pessoa(): Pessoa {
    return this._pessoa;
  }

  get dataEmprestimo(): Date {
    return this._dataEmprestimo;
  }

  get dataDevolucaoPrevista(): Date {
    return this._dataDevolucaoPrevista;
  }

  get dataDevolucaoReal(): Date | null {
    return this._dataDevolucaoReal;
  }

  /**
   * Registra a devolução do livro associado a este empréstimo.
   * A responsabilidade de marcar o livro como devolvido é do próprio livro.
   */
  registrarDevolucao(): void {
    if (this._dataDevolucaoReal === null) {
      if (this._livro.devolver()) { // Delega a ação de devolução ao objeto Livro
        this._dataDevolucaoReal = new Date();
        console.log(`Empréstimo de "${this._livro.titulo}" devolvido por ${this._pessoa.nome}.`);
      }
    } else {
      console.log(`O empréstimo de "${this._livro.titulo}" já foi devolvido.`);
    }
  }

  /**
   * Verifica se o empréstimo está atrasado comparando a data atual com a data de devolução prevista.
   * @returns true se o empréstimo está atrasado e não foi devolvido, false caso contrário.
   */
  estaAtrasado(): boolean {
    const hoje = new Date();
    // Um empréstimo está atrasado se ainda não foi devolvido e a data atual é posterior à data prevista.
    return this._dataDevolucaoReal === null && hoje > this._dataDevolucaoPrevista;
  }

  /**
   * Exibe as informações detalhadas do empréstimo.
   */
  exibirInformacoes(): void {
    console.log("\n--- Detalhes do Empréstimo ---");
    console.log("Livro:");
    this._livro.exibirInformacoes();
    console.log("Pessoa:");
    this._pessoa.exibirInformacoes();
    console.log(`  Data de Empréstimo: ${this._dataEmprestimo.toLocaleDateString()}`);
    console.log(`  Data de Devolução Prevista: ${this._dataDevolucaoPrevista.toLocaleDateString()}`);
    console.log(`  Data de Devolução Real: ${this._dataDevolucaoReal ? this._dataDevolucaoReal.toLocaleDateString() : "Pendente"}`);
    console.log(`  Status: ${this.estaAtrasado() ? "ATRASADO" : "No prazo"}`);
    console.log("------------------------------");
  }
}

// --- Programa de Teste ---
console.log("\n--- Exercício 10: Controle de Empréstimo de Livros ---");

// Cria alguns livros
const livro1 = new Livro("O Pequeno Príncipe", "Antoine de Saint-Exupéry", "978-8578270698");
const livro2 = new Livro("Dom Quixote", "Miguel de Cervantes", "978-8535902777");

// Cria algumas pessoas
const pessoa1 = new Pessoa("Mariana Costa", "P001");
const pessoa2 = new Pessoa("Pedro Almeida", "P002");

// Exibe informações iniciais
console.log("\n--- Livros Disponíveis ---");
livro1.exibirInformacoes();
livro2.exibirInformacoes();

console.log("\n--- Pessoas Cadastradas ---");
pessoa1.exibirInformacoes();
pessoa2.exibirInformacoes();

// Realiza um empréstimo
try {
  const emprestimo1 = new Emprestimo(livro1, pessoa1, 7); // Empréstimo por 7 dias
  emprestimo1.exibirInformacoes();
  livro1.exibirInformacoes(); // Verifica o status do livro

  // Tenta emprestar o mesmo livro novamente
  try {
    new Emprestimo(livro1, pessoa2, 10);
  } catch (error: any) {
    console.log(`\nErro ao tentar emprestar livro indisponível: ${error.message}`);
  }

  // Registra a devolução
  console.log("\n--- Devolução do Livro ---");
  emprestimo1.registrarDevolucao();
  emprestimo1.exibirInformacoes();
  livro1.exibirInformacoes(); // Verifica o status do livro após devolução

  // Exemplo de empréstimo atrasado (simulado)
  const livro3 = new Livro("1984", "George Orwell", "978-8535914848");
  const pessoa3 = new Pessoa("Ana Clara", "P003");
  // Para simular atraso, definimos a data de devolução prevista para o passado.
  // Em um cenário real, a data de devolução prevista seria calculada a partir da data atual.
  const emprestimoAtrasado = new Emprestimo(livro3, pessoa3, 1); // 1 dia para devolução
  emprestimoAtrasado.dataEmprestimo.setDate(emprestimoAtrasado.dataEmprestimo.getDate() - 5); // Emprestado há 5 dias
  emprestimoAtrasado.dataDevolucaoPrevista.setDate(emprestimoAtrasado.dataDevolucaoPrevista.getDate() - 5); // Previsto para 4 dias atrás
  console.log("\n--- Empréstimo Atrasado (Simulado) ---");
  emprestimoAtrasado.exibirInformacoes();

} catch (error: any) {
  console.log(`\nErro geral no teste de empréstimo: ${error.message}`);
}

// Exemplos de erros no construtor
try {
  const livroTeste = new Livro("Teste", "Autor Teste", "123");
  new Emprestimo(livroTeste, pessoa1, -5); // Dias para devolução negativo
} catch (error: any) {
  console.log(`\nErro ao criar empréstimo: ${error.message}`);
}

