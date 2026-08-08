// =====================================================================
// UTILITY TYPES AVANÇADOS — TypeScript
// =====================================================================

// ── Tipos base ────────────────────────────────────────────────────────
interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  avatar?: string;
  admin: boolean;
  criadoEm: Date;
}

// ── 1. Partial<T> ─────────────────────────────────────────────────────
// Todos os campos viram opcionais — ótimo para updates parciais
type AtualizarUsuario = Partial<Usuario>;

function atualizarUsuario(id: number, dados: Partial<Usuario>): string {
  return `Atualizando usuário #${id}: ${JSON.stringify(dados)}`;
}
console.log(atualizarUsuario(1, { nome: 'Eduardo Atualizado', avatar: 'avatar.jpg' }));

// ── 2. Required<T> ────────────────────────────────────────────────────
// Todos os campos viram obrigatórios (remove ?)
type UsuarioCompleto = Required<Usuario>;

// ── 3. Readonly<T> ────────────────────────────────────────────────────
// Todos os campos viram imutáveis
type UsuarioImutavel = Readonly<Usuario>;
const usuarioCongelado: UsuarioImutavel = {
  id: 1, nome: 'Eduardo', email: 'edu@mail.com',
  senha: 'hash...', admin: true, criadoEm: new Date()
};
// usuarioCongelado.nome = 'Outro'; // Error!

// ── 4. Pick<T, K> ────────────────────────────────────────────────────
// Seleciona apenas alguns campos
type UsuarioPublico = Pick<Usuario, 'id' | 'nome' | 'avatar'>;
type LoginDTO = Pick<Usuario, 'email' | 'senha'>;

const perfilPublico: UsuarioPublico = { id: 1, nome: 'Eduardo' };
const loginData: LoginDTO = { email: 'edu@mail.com', senha: 'abc123' };
console.log('\n--- Pick ---');
console.log('Perfil público:', perfilPublico);

// ── 5. Omit<T, K> ────────────────────────────────────────────────────
// Remove alguns campos
type UsuarioSemSenha = Omit<Usuario, 'senha'>;
type NovoUsuario = Omit<Usuario, 'id' | 'criadoEm'>;

// ── 6. NonNullable<T> ─────────────────────────────────────────────────
type PossiveisValores = string | number | null | undefined;
type ValoresReais = NonNullable<PossiveisValores>; // string | number

// ── 7. ReturnType<T> e Parameters<T> ─────────────────────────────────
function criarProduto(nome: string, preco: number, estoque: number) {
  return { id: Math.random(), nome, preco, estoque, ativo: true };
}

type Produto = ReturnType<typeof criarProduto>;
type ParamsCriarProduto = Parameters<typeof criarProduto>;
// [nome: string, preco: number, estoque: number]

console.log('\n--- ReturnType e Parameters ---');
const produto: Produto = criarProduto('Notebook', 3500, 5);
console.log('Produto criado:', produto);
const params: ParamsCriarProduto = ['Mouse', 80, 15];
const produto2 = criarProduto(...params);
console.log('Produto 2:', produto2);

// ── 8. Record<K, V> ──────────────────────────────────────────────────
type Status = 'pendente' | 'processando' | 'concluido' | 'cancelado';
type Pedido = { id: number; total: number };
const pedidosPorStatus: Record<Status, Pedido[]> = {
  pendente: [{ id: 1, total: 150 }],
  processando: [{ id: 2, total: 320 }],
  concluido: [{ id: 3, total: 89 }],
  cancelado: [],
};
console.log('\n--- Record ---');
console.log('Pendentes:', pedidosPorStatus.pendente);

// ── 9. Extract e Exclude ──────────────────────────────────────────────
type Todos = 'a' | 'b' | 'c' | 'd' | 'e';
type SoAB = Extract<Todos, 'a' | 'b'>;     // 'a' | 'b'
type SemAB = Exclude<Todos, 'a' | 'b'>;   // 'c' | 'd' | 'e'

type Primitivos = string | number | boolean | symbol | bigint;
type SomenteNumeros = Extract<Primitivos, number>;  // number

console.log('\n✅ Todos os utility types verificados com sucesso!');
