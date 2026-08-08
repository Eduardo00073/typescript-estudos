// =====================================================================
// TYPE GUARDS E TYPE NARROWING — TypeScript
// =====================================================================

// ── 1. typeof guard ──────────────────────────────────────────────────
function formatar(valor: string | number | boolean): string {
  if (typeof valor === 'string') {
    return `Texto: "${valor.toUpperCase()}"`;
  } else if (typeof valor === 'number') {
    return `Número: ${valor.toFixed(2)}`;
  } else {
    return `Booleano: ${valor ? 'verdadeiro' : 'falso'}`;
  }
}

console.log(formatar('hello'));   // Texto: "HELLO"
console.log(formatar(3.14159));   // Número: 3.14
console.log(formatar(true));      // Booleano: verdadeiro

// ── 2. instanceof guard ───────────────────────────────────────────────
class Dog { latir() { return '🐕 Au au!'; } }
class Cat { miar() { return '🐈 Miau!'; } }

function fazerBarulho(animal: Dog | Cat): string {
  if (animal instanceof Dog) return animal.latir();
  return animal.miar();
}

console.log(fazerBarulho(new Dog())); // 🐕 Au au!
console.log(fazerBarulho(new Cat())); // 🐈 Miau!

// ── 3. in guard ───────────────────────────────────────────────────────
interface Admin { nome: string; nivel: number; permissoes: string[]; }
interface Usuario { nome: string; email: string; }

function mostrarInfo(pessoa: Admin | Usuario): void {
  if ('nivel' in pessoa) {
    // TypeScript sabe que é Admin aqui
    console.log(`Admin: ${pessoa.nome} | Nível: ${pessoa.nivel}`);
    console.log(`Permissões: ${pessoa.permissoes.join(', ')}`);
  } else {
    // TypeScript sabe que é Usuario aqui
    console.log(`Usuário: ${pessoa.nome} | Email: ${pessoa.email}`);
  }
}

// ── 4. Discriminated Unions ───────────────────────────────────────────
type Circulo = { tipo: 'circulo'; raio: number };
type Retangulo = { tipo: 'retangulo'; largura: number; altura: number };
type Triangulo = { tipo: 'triangulo'; base: number; altura: number };
type Forma = Circulo | Retangulo | Triangulo;

function calcularArea(forma: Forma): number {
  switch (forma.tipo) {
    case 'circulo':
      return Math.PI * forma.raio ** 2;
    case 'retangulo':
      return forma.largura * forma.altura;
    case 'triangulo':
      return (forma.base * forma.altura) / 2;
    // TypeScript garante que todos os casos foram cobertos (exhaustiveness)
    default:
      const _never: never = forma;
      throw new Error(`Forma desconhecida: ${_never}`);
  }
}

console.log('\n--- Áreas ---');
console.log('Círculo r=5:', calcularArea({ tipo: 'circulo', raio: 5 }).toFixed(2));
console.log('Retângulo 4x6:', calcularArea({ tipo: 'retangulo', largura: 4, altura: 6 }));
console.log('Triângulo b=3,h=8:', calcularArea({ tipo: 'triangulo', base: 3, altura: 8 }));

// ── 5. User-defined type guard (predicado) ────────────────────────────
interface Produto { id: number; nome: string; preco: number; }
interface ProdutoComEstoque extends Produto { estoque: number; }

function temEstoque(p: Produto | ProdutoComEstoque): p is ProdutoComEstoque {
  return 'estoque' in p;
}

function verificarDisponibilidade(produto: Produto | ProdutoComEstoque): string {
  if (temEstoque(produto) && produto.estoque > 0) {
    return `✅ ${produto.nome} disponível (${produto.estoque} unid.)`;
  }
  return `❌ ${produto.nome} indisponível`;
}

console.log('\n--- Disponibilidade ---');
console.log(verificarDisponibilidade({ id: 1, nome: 'Notebook', preco: 3500, estoque: 5 }));
console.log(verificarDisponibilidade({ id: 2, nome: 'SSD', preco: 400, estoque: 0 }));
console.log(verificarDisponibilidade({ id: 3, nome: 'Mouse', preco: 80 }));
