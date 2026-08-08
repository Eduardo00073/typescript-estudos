// =====================================================================
// ARRAYS TIPADOS E TUPLES — TypeScript
// =====================================================================

// ── 1. Arrays tipados ────────────────────────────────────────────────
const numeros: number[] = [1, 2, 3, 4, 5];
const nomes: Array<string> = ['Ana', 'Bruno', 'Carla'];
const misto: (string | number)[] = ['Eduardo', 35, 'Jales', 2013];

// Readonly array — não pode ser modificado
const constantes: ReadonlyArray<number> = [1, 2, 3];
// constantes.push(4); // Error: Property 'push' does not exist on type 'readonly number[]'

console.log('Arrays:', { numeros, nomes });

// ── 2. Tuples ─────────────────────────────────────────────────────────
// Tuple: array com número fixo de elementos e tipos específicos por posição
type Coordenada = [number, number];
type Coordenada3D = [number, number, number];
type EntradaDB = [string, number, boolean]; // [nome, id, ativo]

const pos: Coordenada = [10, 20];
const pos3d: Coordenada3D = [10, 20, 30];
const registro: EntradaDB = ['Eduardo', 73, true];

// Desestruturação de tuple
const [x, y] = pos;
const [nome, id, ativo] = registro;
console.log('\n--- Tuples ---');
console.log(`Coordenada: x=${x}, y=${y}`);
console.log(`Registro: ${nome} (id:${id}) ativo:${ativo}`);

// ── 3. Tuples com rótulos (named tuples) — TS 4.0+ ───────────────────
type Ponto = [x: number, y: number, z?: number];
const ponto: Ponto = [1, 2];
const ponto3d: Ponto = [1, 2, 3];

// ── 4. Tuple como retorno de função ───────────────────────────────────
function divMod(a: number, b: number): [quociente: number, resto: number] {
  return [Math.floor(a / b), a % b];
}

const [quociente, resto] = divMod(17, 5);
console.log(`\n17 ÷ 5 = ${quociente} com resto ${resto}`);

// ── 5. Tuple com spread (variadic tuples) — TS 4.0+ ──────────────────
type Inicio = [string, number];
type Fim = [boolean, Date];
type Completo = [...Inicio, ...Fim];

const completo: Completo = ['Eduardo', 35, true, new Date()];
console.log('\nTuple variadic:', completo);

// ── 6. Readonly Tuple ─────────────────────────────────────────────────
const rgb: readonly [number, number, number] = [255, 128, 0];
// rgb[0] = 0; // Error: Cannot assign to '0' because it is a read-only property

// ── 7. Uso prático: useState-like ─────────────────────────────────────
function useState<T>(inicial: T): [T, (novo: T) => void] {
  let estado = inicial;
  const setEstado = (novo: T) => { estado = novo; };
  return [estado, setEstado];
}

const [contador, setContador] = useState(0);
const [texto, setTexto] = useState('');
console.log('\n--- useState-like ---');
setContador(42);
setTexto('TypeScript é incrível!');
// Nota: estado não muda aqui pois é primitivo (valor capturado no closure)
