/**
 * Representa um televisor com funcionalidades básicas de canal e volume.
 * Esta classe demonstra **Confiabilidade** ao garantir que o estado interno (canal e volume)
 * permaneça sempre dentro de faixas válidas, e **Manutenibilidade** ao centralizar
 * a lógica de validação e alteração desses estados.
 */
class Televisor {
  private _canal: number;
  private _volume: number;

  // Limites válidos para canal e volume, garantindo a confiabilidade do estado do objeto.
  private readonly CANAL_MINIMO: number = 1;
  private readonly CANAL_MAXIMO: number = 99;
  private readonly VOLUME_MINIMO: number = 0;
  private readonly VOLUME_MAXIMO: number = 100;

  constructor(canalInicial: number = 1, volumeInicial: number = 20) {
    // A validação no construtor garante que o objeto seja criado em um estado válido.
    this._canal = this.validarCanal(canalInicial);
    this._volume = this.validarVolume(volumeInicial);
    console.log(`Televisor ligado no Canal ${this._canal} e Volume ${this._volume}.`);
  }

  /**
   * Retorna o canal atual do televisor.
   * O uso de getters (acessores) demonstra encapsulamento, controlando o acesso aos atributos internos.
   */
  get canal(): number {
    return this._canal;
  }

  /**
   * Retorna o volume atual do televisor.
   * O uso de getters (acessores) demonstra encapsulamento, controlando o acesso aos atributos internos.
   */
  get volume(): number {
    return this._volume;
  }

  /**
   * Define o número do canal, com validação para manter o estado confiável.
   * @param novoCanal O número do canal desejado.
   */
  setCanal(novoCanal: number): void {
    const canalValidado = this.validarCanal(novoCanal);
    if (canalValidado !== this._canal) {
      this._canal = canalValidado;
      console.log(`Canal alterado para: ${this._canal}`);
    } else {
      console.log(`Info: Canal ${novoCanal} já é o canal atual ou está fora dos limites.`);
    }
  }

  /**
   * Aumenta o volume do televisor em uma unidade, respeitando o limite máximo.
   */
  aumentarVolume(): void {
    if (this._volume < this.VOLUME_MAXIMO) {
      this._volume++;
      console.log(`Volume aumentado para: ${this._volume}`);
    } else {
      console.log(`Info: Volume já está no máximo (${this.VOLUME_MAXIMO}).`);
    }
  }

  /**
   * Diminui o volume do televisor em uma unidade, respeitando o limite mínimo.
   */
  diminuirVolume(): void {
    if (this._volume > this.VOLUME_MINIMO) {
      this._volume--;
      console.log(`Volume diminuído para: ${this._volume}`);
    } else {
      console.log(`Info: Volume já está no mínimo (${this.VOLUME_MINIMO}).`);
    }
  }

  /**
   * Método privado para validar se o canal está dentro dos limites permitidos.
   * Centraliza a lógica de validação, contribuindo para a manutenibilidade.
   * @param canal O canal a ser validado.
   * @returns O canal validado, ajustado aos limites se necessário.
   */
  private validarCanal(canal: number): number {
    if (canal < this.CANAL_MINIMO) {
      return this.CANAL_MINIMO;
    } else if (canal > this.CANAL_MAXIMO) {
      return this.CANAL_MAXIMO;
    } else {
      return Math.round(canal); // Garante que o canal seja um número inteiro
    }
  }

  /**
   * Método privado para validar se o volume está dentro dos limites permitidos.
   * Centraliza a lógica de validação, contribuindo para a manutenibilidade.
   * @param volume O volume a ser validado.
   * @returns O volume validado, ajustado aos limites se necessário.
   */
  private validarVolume(volume: number): number {
    if (volume < this.VOLUME_MINIMO) {
      return this.VOLUME_MINIMO;
    } else if (volume > this.VOLUME_MAXIMO) {
      return this.VOLUME_MAXIMO;
    } else {
      return Math.round(volume); // Garante que o volume seja um número inteiro
    }
  }

  /**
   * Exibe o estado atual do televisor.
   */
  exibirEstado(): void {
    console.log(`\n--- Estado Atual do Televisor ---`);
    console.log(`Canal: ${this._canal}`);
    console.log(`Volume: ${this._volume}`);
  }
}

// --- Exemplo de Uso ---
console.log("\n--- Exercício 4: Televisor ---");
const minhaTV = new Televisor(); // Inicia com canal 1, volume 20
minhaTV.exibirEstado();

minhaTV.setCanal(5);
minhaTV.aumentarVolume();
minhaTV.aumentarVolume();
minhaTV.diminuirVolume();
minhaTV.setCanal(100); // Tenta um canal fora do limite superior
minhaTV.setCanal(-5);  // Tenta um canal abaixo do limite inferior
minhaTV.exibirEstado();

console.log("\nTentando aumentar o volume além do máximo:");
for (let i = 0; i < 110; i++) {
  minhaTV.aumentarVolume();
}
minhaTV.exibirEstado();

console.log("\nTentando diminuir o volume além do mínimo:");
for (let i = 0; i < 110; i++) {
  minhaTV.diminuirVolume();
}
minhaTV.exibirEstado();

