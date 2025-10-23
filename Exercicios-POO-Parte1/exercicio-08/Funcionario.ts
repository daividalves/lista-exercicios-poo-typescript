class Funcionario {
  private _nome: string;
  private _salario: number;

  constructor(nome: string, salario: number) {
    if (salario < 0) {
      throw new Error("O salário não pode ser negativo.");
    }
    this._nome = nome;
    this._salario = salario;
  }

  get nome(): string {
    return this._nome;
  }

  get salario(): number {
    return this._salario;
  }

  aumentarSalario(porcentualDeAumento: number): void {
    if (porcentualDeAumento < 0) {
      console.log("Erro: O percentual de aumento não pode ser negativo.");
      return;
    }
    this._salario += this._salario * (porcentualDeAumento / 100);
    console.log(`Salário de ${this._nome} aumentado em ${porcentualDeAumento}%. Novo salário: R$${this._salario.toFixed(2)}`);
  }
}

// Exemplo de uso:
console.log("\n--- Exercício 8: Funcionário ---");
const funcionario = new Funcionario("João", 2000);
console.log(`Nome: ${funcionario.nome}, Salário: R$${funcionario.salario.toFixed(2)}`);

funcionario.aumentarSalario(10); // Aumenta 10%
console.log(`Nome: ${funcionario.nome}, Salário: R$${funcionario.salario.toFixed(2)}`);

funcionario.aumentarSalario(5); // Aumenta 5%
console.log(`Nome: ${funcionario.nome}, Salário: R$${funcionario.salario.toFixed(2)}`);

// Tentativa de aumento com percentual negativo
funcionario.aumentarSalario(-2); 

// Tentativa de criar funcionário com salário negativo
try {
  new Funcionario("Maria", -100);
} catch (error: any) {
  console.log(`Erro ao criar funcionário: ${error.message}`);
}

