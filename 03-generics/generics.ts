// Generics em TypeScript

// Função genérica
function primeiroElemento<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(primeiroElemento([1, 2, 3]));           // 1
console.log(primeiroElemento(["a", "b", "c"]));     // "a"

// Classe genérica
class Caixa<T> {
  private conteudo: T;

  constructor(valor: T) {
    this.conteudo = valor;
  }

  getConteudo(): T {
    return this.conteudo;
  }
}

const caixaNumero = new Caixa<number>(42);
const caixaTexto = new Caixa<string>("Hello");

console.log("Caixa número:", caixaNumero.getConteudo());
console.log("Caixa texto:", caixaTexto.getConteudo());

// Generic com constraint
interface ComId {
  id: number;
}

function buscarPorId<T extends ComId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

const usuarios = [
  { id: 1, nome: "Ana" },
  { id: 2, nome: "Bruno" },
  { id: 3, nome: "Carlos" }
];

console.log("Busca:", buscarPorId(usuarios, 2));
