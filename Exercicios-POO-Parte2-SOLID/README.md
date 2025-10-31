# Exercício Prático: Padrão State e Princípios SOLID

Este repositório contém a solução para um exercício prático de Programação Orientada a Objetos (POO) e aplicação dos princípios **SOLID**, utilizando o **Padrão de Projeto State** (Estado) para gerenciar os diferentes estados de um jogador em uma plataforma de jogos online.

## 1. O Problema: Violação de SOLID

O código original (ilustrado abaixo) demonstra uma implementação ingênua do gerenciamento de estados, onde a classe `Jogador` é responsável por toda a lógica de transição de estados.

### Código Original (Problema)

```typescript
class Jogador {
    private estado: string;

    constructor() {
        this.estado = "Offline";
    }

    ficarOnline(): void {
        if (this.estado === "Offline") {
            this.estado = "Online";
            console.log("Jogador agora está online.");
        } else {
            console.log("Falha: não pode ficar online se já estiver online, em jogo, pausado ou desconectado.");
        }
    }

    iniciarJogo(): void {
        if (this.estado === "Online") {
            this.estado = "Em Jogo";
            console.log("Jogador agora está em jogo.");
        } else {
            console.log("Falha: não pode iniciar jogo se estiver offline, em jogo, pausado ou desconectado.");
        }
    }
    // ... Outros métodos com lógica de transição
}
```

### Violações dos Princípios SOLID

| Princípio | Violação | Consequência |
| :--- | :--- | :--- |
| **SRP** (Responsabilidade Única) | A classe `Jogador` tem múltiplas responsabilidades: gerenciar o estado atual **e** conter a lógica de transição para **todos** os estados. | A classe se torna grande, complexa e difícil de manter. Qualquer mudança em uma regra de estado afeta a classe `Jogador`. |
| **OCP** (Aberto-Fechado) | A classe `Jogador` está **fechada** para extensão, mas **aberta** para modificação. | Para adicionar um novo estado (ex: "Assistindo"), seria necessário modificar o código da classe `Jogador`, adicionando novos `if/else` ou `switch/case`. |

## 2. A Solução: Padrão State

O **Padrão State** resolve este problema ao delegar o comportamento específico de cada estado para classes separadas. A classe `Jogador` (o **Contexto**) passa a ser responsável apenas por manter uma referência ao estado atual e delegar as chamadas de método para ele.

### Aplicação do Padrão State

1.  **Interface `EstadoJogador`:** Define a interface comum para todos os estados, garantindo que o Contexto (`Jogador`) possa interagir com qualquer estado sem saber sua implementação concreta.
2.  **Classes de Estado Concreto:** Cada estado (ex: `EstadoOffline`, `EstadoEmJogo`) é uma classe separada que implementa a interface `EstadoJogador`. A lógica de transição (o que acontece quando `iniciarJogo()` é chamado no estado "Online") é encapsulada **dentro** da classe de estado correspondente.
3.  **Contexto `Jogador`:** Mantém uma referência ao estado atual e delega as chamadas de método para ele. A classe `Jogador` não contém mais a lógica de transição.

### Correção das Violações SOLID

| Princípio | Solução com Padrão State |
| :--- | :--- |
| **SRP** (Responsabilidade Única) | A responsabilidade de `Jogador` é reduzida a **gerenciar o contexto** (manter o estado atual e delegar). A responsabilidade de **lógica de transição** é movida para as classes de estado concretas. |
| **OCP** (Aberto-Fechado) | A classe `Jogador` agora está **fechada** para modificação. Para adicionar um novo estado, basta criar uma nova classe de estado que implemente `EstadoJogador` (extensão), sem tocar no código da classe `Jogador`. |

## 3. Código Final (TypeScript)

O código a seguir implementa o Padrão State, corrigindo as violações de SOLID. Além disso, a propriedade `nome` foi implementada como **readonly**, sendo acessada por meio do método `getNomeEstado()`, afim de melhorar a **encapsulação**. Essa abordagem reforça dois conceitos cruciais:

1.  **Imutabilidade e LSP (Princípio da Substituição de Liskov):** Ao tornar a propriedade `nome` imutável, garantimos que a identidade de um objeto de estado (ex: "Offline") não possa ser alterada após sua criação. Isso reforça o LSP, pois qualquer classe que implemente `EstadoJogador` terá um nome de estado estável e previsível, permitindo que o Contexto (`Jogador`) e outros clientes confiem na sua identidade.
2.  **Encapsulamento:** O método `getNomeEstado()` atua como um *getter* controlado, garantindo que o acesso à informação interna do estado seja feito de forma segura e padronizada, mantendo a responsabilidade de como essa informação é exposta dentro da própria classe de estado.

O código completo está disponível no arquivo `Jogador.ts`, dentro da pasta `Exercicios-POO-Parte2-SOLID`.

### Interface `EstadoJogador`

```typescript
interface EstadoJogador {
    readonly nome: string; // Propriedade imutável
    getNomeEstado(): string; // Método para acesso encapsulado
    ficarOnline(jogador: Jogador): void;
    iniciarJogo(jogador: Jogador): void;
    // ... Outros métodos
}
```

### Classe `Jogador` (Contexto)

```typescript
class Jogador {
    private estadoAtual: EstadoJogador;

    // ...

    public setEstado(novoEstado: EstadoJogador): void {
        this.estadoAtual = novoEstado;
        // Usa o método getNomeEstado()
        console.log(`-> Jogador mudou para o estado: ${this.estadoAtual.getNomeEstado()}`);
    }

    public ficarOnline(): void {
        // Delega a responsabilidade ao estado atual
        this.estadoAtual.ficarOnline(this);
    }
    // ... Outros métodos delegados
}
```

### Exemplo de Estado Concreto (`EstadoOffline`)

```typescript
class EstadoOffline implements EstadoJogador {
    public readonly nome: string = "Offline";

    getNomeEstado(): string {
        return this.nome;
    }

    ficarOnline(jogador: Jogador): void {
        // A lógica de transição está aqui, e não na classe Jogador
        console.log("Transição válida: Offline -> Online");
        jogador.setEstado(new EstadoOnline());
    }
    
    iniciarJogo(jogador: Jogador): void {
        console.log("Falha: Não pode iniciar jogo estando Offline.");
    }
    // ... Outros métodos
}
```

## 4. Como Executar

Para executar o código de exemplo e ver as transições de estado em ação, você pode usar o `ts-node` ou compilar o arquivo para JavaScript:

1.  **Instale as dependências (se necessário):**
    ```bash
    npm install -g typescript ts-node
    ```
2.  **Execute o arquivo:**
    ```bash
    ts-node Jogador.ts
    ```
