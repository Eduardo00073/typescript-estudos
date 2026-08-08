// =====================================================================
// PADRÕES COM GENERICS — TypeScript
// =====================================================================

// ── 1. Generic básico ─────────────────────────────────────────────────
function identidade<T>(valor: T): T { return valor; }
function primeiro<T>(arr: T[]): T | undefined { return arr[0]; }
function par<A, B>(a: A, b: B): [A, B] { return [a, b]; }

console.log(identidade(42));
console.log(identidade('TypeScript'));
console.log(primeiro([10, 20, 30]));
console.log(par('Eduardo', 35));

// ── 2. Constraints (restrições) ────────────────────────────────────────
function obterPropriedade<T, K extends keyof T>(obj: T, chave: K): T[K] {
  return obj[chave];
}

const usuario = { nome: 'Eduardo', idade: 35, cidade: 'Jales' };
console.log('\n--- Constraints ---');
console.log(obterPropriedade(usuario, 'nome'));   // Eduardo
console.log(obterPropriedade(usuario, 'idade'));  // 35
// obterPropriedade(usuario, 'xyz'); // Error: Argument of type '"xyz"' is not assignable

// ── 3. Generic Stack (LIFO) ────────────────────────────────────────────
class Stack<T> {
  private items: T[] = [];

  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
  isEmpty(): boolean { return this.items.length === 0; }
  size(): number { return this.items.length; }
  toArray(): T[] { return [...this.items]; }
}

console.log('\n--- Stack genérica ---');
const pilha = new Stack<number>();
pilha.push(1); pilha.push(2); pilha.push(3);
console.log('Topo:', pilha.peek());     // 3
console.log('Pop:', pilha.pop());       // 3
console.log('Tamanho:', pilha.size()); // 2

// ── 4. Repository Pattern ─────────────────────────────────────────────
interface Entidade { id: number; }

interface IRepository<T extends Entidade> {
  findById(id: number): T | undefined;
  findAll(): T[];
  save(item: T): T;
  delete(id: number): boolean;
}

class MemoryRepository<T extends Entidade> implements IRepository<T> {
  private store = new Map<number, T>();

  findById(id: number): T | undefined { return this.store.get(id); }
  findAll(): T[] { return Array.from(this.store.values()); }
  save(item: T): T { this.store.set(item.id, item); return item; }
  delete(id: number): boolean { return this.store.delete(id); }
  count(): number { return this.store.size; }
}

interface Produto extends Entidade { nome: string; preco: number; }
interface Cliente extends Entidade { nome: string; email: string; }

const produtoRepo = new MemoryRepository<Produto>();
const clienteRepo = new MemoryRepository<Cliente>();

console.log('\n--- Repository Pattern ---');
produtoRepo.save({ id: 1, nome: 'Notebook', preco: 3500 });
produtoRepo.save({ id: 2, nome: 'Mouse', preco: 80 });
produtoRepo.save({ id: 3, nome: 'Teclado', preco: 250 });

clienteRepo.save({ id: 1, nome: 'Ana Silva', email: 'ana@email.com' });

console.log('Produtos:', produtoRepo.findAll().map(p => p.nome));
console.log('Produto 2:', produtoRepo.findById(2));
console.log('Total produtos:', produtoRepo.count());

// ── 5. Builder Pattern genérico ───────────────────────────────────────
class Builder<T extends object> {
  private obj: Partial<T> = {};

  set<K extends keyof T>(chave: K, valor: T[K]): this {
    this.obj[chave] = valor;
    return this; // chainable
  }

  build(): T {
    return this.obj as T;
  }
}

interface ConfigServidor {
  host: string;
  porta: number;
  ssl: boolean;
  timeout: number;
  maxConexoes: number;
}

const config = new Builder<ConfigServidor>()
  .set('host', 'localhost')
  .set('porta', 3000)
  .set('ssl', false)
  .set('timeout', 30000)
  .set('maxConexoes', 100)
  .build();

console.log('\n--- Builder ---');
console.log('Config:', config);
