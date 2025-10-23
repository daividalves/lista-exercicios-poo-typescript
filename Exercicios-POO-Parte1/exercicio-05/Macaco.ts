/**
 * Representa um macaco com a capacidade de comer, ver o que tem no estômago e digerir.
 * Esta classe demonstra **Coesão** ao centralizar as ações relacionadas ao comportamento de um macaco.
 * A clareza na interação de 'comer' contribui para a **Confiabilidade** e **Manutenibilidade**.
 */
class Macaco {
  nome: string;
  private _bucho: string[]; // O estômago do macaco, contendo alimentos como strings

  constructor(nome: string) {
    this.nome = nome;
    this._bucho = [];
  }

  /**
   * Permite que o macaco coma um alimento.
   * @param alimento O item que o macaco irá comer (representado como string).
   */
  comer(alimento: string): void {
    this._bucho.push(alimento);
    console.log(`${this.nome} comeu ${alimento}.`);
  }

  /**
   * Exibe o conteúdo atual do bucho (estômago) do macaco.
   */
  verBucho(): void {
    if (this._bucho.length === 0) {
      console.log(`${this.nome} está com o bucho vazio.`);
    } else {
      console.log(`${this.nome} tem no bucho: ${this._bucho.join(", ")}.`);
    }
  }

  /**
   * Simula o processo de digestão, esvaziando o bucho do macaco.
   */
  digerir(): void {
    if (this._bucho.length > 0) {
      console.log(`${this.nome} está digerindo ${this._bucho.join(", ")}...`);
      this._bucho = [];
      console.log(`${this.nome} está com o bucho vazio após digerir.`);
    } else {
      console.log(`${this.nome} não tem nada para digerir.`);
    }
  }
}

// --- Programa de Teste Interativo ---
console.log("\n--- Exercício 5: Macacos ---");

// Crie 2 macacos
const macacoA = new Macaco("Chico");
const macacoB = new Macaco("Cacau");

console.log(`\nCriados dois macacos: ${macacoA.nome} e ${macacoB.nome}.`);

// Alimente-os com 3 alimentos diferentes e verificando o conteúdo do estômago a cada refeição.
macacoA.comer("banana");
macacoA.verBucho();
macacoB.comer("maçã");
macacoB.verBucho();

macacoA.comer("amendoim");
macacoA.verBucho();
macacoB.comer("uva");
macacoB.verBucho();

macacoA.comer("coco");
macacoA.verBucho();
macacoB.comer("laranja");
macacoB.verBucho();

// Experimente fazer com que um macaco coma o outro. É possível criar um macaco canibal?
console.log("\n--- Tentativa de Canibalismo ---");
console.log("Para fins de modelagem de POO, um macaco não deve 'comer' outro macaco como um alimento simples.");
console.log("Se a intenção fosse modelar a canibalismo, seria necessário uma lógica mais complexa, talvez com um método 'atacar' ou 'devorar'.");
console.log("Neste modelo, 'comer' aceita apenas 'alimentos' (strings) para manter a coesão e clareza da classe Macaco.");
// macacoA.comer(macacoB); // Isso geraria um erro de tipo em TypeScript, demonstrando a segurança do tipo.

macacoA.digerir();
macacoB.digerir();

