// =====================================================================
// CLASSES E OOP — TypeScript
// =====================================================================

// ── 1. Classe base com modificadores de acesso ────────────────────────
abstract class Animal {
  readonly especie: string;
  protected nome: string;
  private _energia: number;
  static totalAnimais = 0;

  constructor(especie: string, nome: string) {
    this.especie = especie;
    this.nome = nome;
    this._energia = 100;
    Animal.totalAnimais++;
  }

  // Getter / Setter
  get energia(): number { return this._energia; }
  set energia(valor: number) {
    if (valor < 0 || valor > 100) throw new RangeError('Energia deve ser entre 0 e 100');
    this._energia = valor;
  }

  // Método público
  comer(alimento: string): string {
    this._energia = Math.min(100, this._energia + 20);
    return `${this.nome} comeu ${alimento} (energia: ${this._energia}%)`;
  }

  // Método abstrato — subclasses DEVEM implementar
  abstract fazerSom(): string;

  // toString
  toString(): string {
    return `[${this.especie}] ${this.nome} (energia: ${this._energia}%)`;
  }
}

// ── 2. Herança ────────────────────────────────────────────────────────
class Cachorro extends Animal {
  private raca: string;

  constructor(nome: string, raca: string) {
    super('Canis lupus familiaris', nome);
    this.raca = raca;
  }

  fazerSom(): string { return `${this.nome}: Au au! 🐕`; }
  buscar(objeto: string): string { return `${this.nome} foi buscar o(a) ${objeto}!`; }
  get info(): string { return `${this.nome} (${this.raca})`; }
}

class Gato extends Animal {
  private indoor: boolean;

  constructor(nome: string, indoor = true) {
    super('Felis silvestris catus', nome);
    this.indoor = indoor;
  }

  fazerSom(): string { return `${this.nome}: Miau! 🐈`; }
  ronronar(): string { return `${this.nome}: Purrr... 😺`; }
}

// ── 3. Interface implementada por classe ──────────────────────────────
interface Treinavel {
  habilidades: string[];
  aprender(habilidade: string): void;
  executar(habilidade: string): string;
}

class CachorroAmestrado extends Cachorro implements Treinavel {
  habilidades: string[] = [];

  aprender(habilidade: string): void {
    if (!this.habilidades.includes(habilidade)) {
      this.habilidades.push(habilidade);
      console.log(`${this.info} aprendeu: ${habilidade}!`);
    }
  }

  executar(habilidade: string): string {
    if (this.habilidades.includes(habilidade)) {
      return `${this.info} executa: ${habilidade}! 🎯`;
    }
    return `${this.info} não sabe: ${habilidade}`;
  }
}

// ── 4. Static e Factory ───────────────────────────────────────────────
class Relogio {
  private static instancia: Relogio;
  private formato: '12h' | '24h';

  private constructor(formato: '12h' | '24h' = '24h') {
    this.formato = formato;
  }

  static getInstance(formato?: '12h' | '24h'): Relogio {
    if (!Relogio.instancia) Relogio.instancia = new Relogio(formato);
    return Relogio.instancia;
  }

  agora(): string {
    const d = new Date();
    if (this.formato === '24h') {
      return d.toLocaleTimeString('pt-BR', { hour12: false });
    }
    return d.toLocaleTimeString('pt-BR', { hour12: true });
  }
}

// ── Demonstração ──────────────────────────────────────────────────────
console.log('--- POO com TypeScript ---');
const rex = new Cachorro('Rex', 'Labrador');
const mimi = new Gato('Mimi');
const buddy = new CachorroAmestrado('Buddy', 'Border Collie');

console.log(rex.fazerSom());
console.log(mimi.ronronar());
console.log(rex.comer('ração'));

buddy.aprender('sentar');
buddy.aprender('rolar');
buddy.aprender('dar a pata');
console.log(buddy.executar('rolar'));
console.log(buddy.executar('voar'));  // não sabe!
console.log(`Habilidades: ${buddy.habilidades.join(', ')}`);

console.log(`Total de animais criados: ${Animal.totalAnimais}`);

const relogio = Relogio.getInstance('24h');
console.log(`Hora atual: ${relogio.agora()}`);
