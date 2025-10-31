// 1. Interface/Classe Abstrata para o Estado (EstadoJogador)
interface EstadoJogador {
    readonly nome: string;
    getNomeEstado(): string;
    ficarOnline(jogador: Jogador): void;
    iniciarJogo(jogador: Jogador): void;
    pausar(jogador: Jogador): void;
    desconectar(jogador: Jogador): void;
}

// 2. Contexto (Jogador)
class Jogador {
    private estadoAtual: EstadoJogador;

    constructor() {      
        this.estadoAtual = new EstadoOffline();
      
        console.log(`Jogador inicializado no estado: ${this.estadoAtual.getNomeEstado()}`);
    }

    // Método para mudar o estado (usado pelas classes de estado)
    public setEstado(novoEstado: EstadoJogador): void {
        this.estadoAtual = novoEstado;
        console.log(`-> Jogador mudou para o estado: ${this.estadoAtual.getNomeEstado()}`);
    }

    public getEstadoNome(): string {
        // Usando o novo método getNomeEstado()
        return this.estadoAtual.getNomeEstado();
    }

    // Métodos delegados ao estado atual
    public ficarOnline(): void {
        this.estadoAtual.ficarOnline(this);
    }

    public iniciarJogo(): void {
        this.estadoAtual.iniciarJogo(this);
    }

    public pausar(): void {
        this.estadoAtual.pausar(this);
    }

    public desconectar(): void {
        this.estadoAtual.desconectar(this);
    }

    // Método de transição especial para "Desconectado" -> "Offline"
    public voltarParaOffline(): void {
        this.setEstado(new EstadoOffline());
    }
}

// 3. Implementações de Estado

// Estado: Offline
class EstadoOffline implements EstadoJogador {
    public readonly nome: string = "Offline";

    getNomeEstado(): string {
        return this.nome;
    }

    ficarOnline(jogador: Jogador): void {
        console.log("Transição válida: Offline -> Online");
        jogador.setEstado(new EstadoOnline());
    }
    iniciarJogo(jogador: Jogador): void {
        console.log("Falha: Não pode iniciar jogo estando Offline.");
    }
    pausar(jogador: Jogador): void {
        console.log("Falha: Não pode pausar estando Offline.");
    }
    desconectar(jogador: Jogador): void {
        console.log("Falha: Não pode desconectar estando Offline.");
    }
}

// Estado: Online
class EstadoOnline implements EstadoJogador {
    public readonly nome: string = "Online";

    getNomeEstado(): string {
        return this.nome;
    }

    ficarOnline(jogador: Jogador): void {
        console.log("Falha: Já está Online.");
    }
    iniciarJogo(jogador: Jogador): void {
        console.log("Transição válida: Online -> Em Jogo");
        jogador.setEstado(new EstadoEmJogo());
    }
    pausar(jogador: Jogador): void {
        console.log("Falha: Não pode pausar estando Online (ainda não está em jogo).");
    }
    desconectar(jogador: Jogador): void {
        console.log("Transição válida: Online -> Offline");
        jogador.setEstado(new EstadoOffline());
    }
}

// Estado: Em Jogo
class EstadoEmJogo implements EstadoJogador {
    public readonly nome: string = "Em Jogo";

    getNomeEstado(): string {
        return this.nome;
    }

    ficarOnline(jogador: Jogador): void {
        console.log("Falha: Já está Em Jogo.");
    }
    iniciarJogo(jogador: Jogador): void {
        console.log("Falha: Já está Em Jogo.");
    }
    pausar(jogador: Jogador): void {
        console.log("Transição válida: Em Jogo -> Pausado");
        jogador.setEstado(new EstadoPausado());
    }
    desconectar(jogador: Jogador): void {
        console.log("Transição válida: Em Jogo -> Desconectado");
        jogador.setEstado(new EstadoDesconectado());
    }
}

// Estado: Pausado
class EstadoPausado implements EstadoJogador {
    public readonly nome: string = "Pausado";

    getNomeEstado(): string {
        return this.nome;
    }

    ficarOnline(jogador: Jogador): void {
        console.log("Falha: O jogo está Pausado. Precisa voltar ao jogo ou desconectar.");
    }
    iniciarJogo(jogador: Jogador): void {
        console.log("Transição válida: Pausado -> Em Jogo (Retornar ao jogo)");
        jogador.setEstado(new EstadoEmJogo());
    }
    pausar(jogador: Jogador): void {
        console.log("Falha: Já está Pausado.");
    }
    desconectar(jogador: Jogador): void {
        console.log("Transição válida: Pausado -> Desconectado");
        jogador.setEstado(new EstadoDesconectado());
    }
}

// Estado: Desconectado
class EstadoDesconectado implements EstadoJogador {
    public readonly nome: string = "Desconectado";

    getNomeEstado(): string {
        return this.nome;
    }

    ficarOnline(jogador: Jogador): void {
        console.log("Falha: O jogador foi Desconectado. Deve voltar para Offline primeiro.");
    }
    iniciarJogo(jogador: Jogador): void {
        console.log("Falha: O jogador foi Desconectado. Deve voltar para Offline primeiro.");
    }
    pausar(jogador: Jogador): void {
        console.log("Falha: O jogador foi Desconectado. Não há jogo para pausar.");
    }
    desconectar(jogador: Jogador): void {
        console.log("Falha: Já está Desconectado.");
    }
    
    // Transição especial de volta para Offline
    constructor() {
        // Simula a transição automática ou forçada de volta para Offline
        // No contexto real, o Jogador faria essa transição, mas aqui forçamos a regra de negócio:
        // "Um jogador 'Desconectado' volta para 'Offline'."
        // Para simplificar o exemplo, vamos delegar a transição ao Jogador, mas
        // o método `desconectar` da classe `Em Jogo` e `Pausado` é que chama a mudança.
    }
}


console.log("\n--- Teste de Fluxo Válido ---");
const jogador1 = new Jogador(); // Offline

jogador1.ficarOnline(); // Offline -> Online
jogador1.iniciarJogo(); // Online -> Em Jogo
jogador1.pausar(); // Em Jogo -> Pausado
jogador1.iniciarJogo(); // Pausado -> Em Jogo (Volta)
jogador1.desconectar(); // Em Jogo -> Desconectado

console.log(`Estado final de Jogador 1: ${jogador1.getEstadoNome()}`);

// Simulação da regra: "Um jogador 'Desconectado' volta para 'Offline'."
console.log("\nSimulando retorno forçado de Desconectado para Offline...");
jogador1.voltarParaOffline(); // Desconectado -> Offline
console.log(`Novo estado de Jogador 1: ${jogador1.getEstadoNome()}`);

console.log("\n--- Teste de Falhas (Transições Inválidas) ---");
const jogador2 = new Jogador(); // Offline

jogador2.iniciarJogo(); // Falha: Offline -> Em Jogo
jogador2.ficarOnline(); // Offline -> Online
jogador2.ficarOnline(); // Falha: Online -> Online
jogador2.iniciarJogo(); // Online -> Em Jogo
jogador2.iniciarJogo(); // Falha: Em Jogo -> Em Jogo
jogador2.desconectar(); // Em Jogo -> Desconectado
jogador2.pausar(); // Falha: Desconectado -> Pausado
jogador2.voltarParaOffline(); // Desconectado -> Offline
jogador2.desconectar(); // Falha: Offline -> Desconectado