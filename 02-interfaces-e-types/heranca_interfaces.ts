// =====================================================================
// HERANÇA DE INTERFACES E TYPES AVANÇADOS — TypeScript
// =====================================================================

// ── 1. Interface básica e extensão ───────────────────────────────────
interface Entidade {
  id: number;
  criadoEm: Date;
  atualizadoEm: Date;
}

interface Pessoa extends Entidade {
  nome: string;
  email: string;
  telefone?: string; // opcional
}

interface Funcionario extends Pessoa {
  cargo: string;
  departamento: string;
  salario: number;
}

interface Gerente extends Funcionario {
  subordinados: Funcionario[];
  orçamento: number;
}

// ── 2. Interface extends múltiplo ─────────────────────────────────────
interface Auditavel {
  criadoPor: string;
  modificadoPor: string;
}

interface Exportavel {
  exportarCSV(): string;
  exportarJSON(): string;
}

interface RelatorioCompleto extends Entidade, Auditavel, Exportavel {
  titulo: string;
  dados: Record<string, unknown>;
}

// ── 3. Index Signatures ───────────────────────────────────────────────
interface Dicionario {
  [chave: string]: string | number;
}

interface CacheResponse<T> {
  [url: string]: {
    dados: T;
    timestamp: number;
    expira: number;
  };
}

const dicionario: Dicionario = {
  nome: 'Eduardo',
  idade: 35,
  cidade: 'Jales',
};
console.log('Dicionário:', dicionario);

// ── 4. Mapped Types ───────────────────────────────────────────────────
type Opcional<T> = { [K in keyof T]?: T[K] };
type ReadOnly<T> = { readonly [K in keyof T]: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };
type Stringificado<T> = { [K in keyof T]: string };

interface Config {
  host: string;
  porta: number;
  debug: boolean;
  timeout: number;
}

type ConfigParcial = Opcional<Config>;
type ConfigImutavel = ReadOnly<Config>;
type ConfigNullable = Nullable<Config>;

// ── 5. Conditional Types ──────────────────────────────────────────────
type EhArray<T> = T extends Array<infer Item> ? Item : T;

type StringOuArray = EhArray<string[]>;    // string
type NumeroOuArray = EhArray<number>;      // number
type ObjetoOuArray = EhArray<boolean[]>;  // boolean

// ── 6. Template Literal Types (TS 4.1+) ──────────────────────────────
type Cor = 'red' | 'green' | 'blue';
type Tamanho = 'sm' | 'md' | 'lg' | 'xl';
type ClasseCSS = `btn-${Cor}-${Tamanho}`;

const btnClass: ClasseCSS = 'btn-blue-lg';
// const invalid: ClasseCSS = 'btn-purple-xl'; // Error!

type Evento = 'click' | 'focus' | 'blur' | 'change';
type HandlerProp = `on${Capitalize<Evento>}`;
// onClick | onFocus | onBlur | onChange

console.log('\n✅ Todos os tipos compilados com sucesso!');
