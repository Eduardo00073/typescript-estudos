// Interfaces e Types

// Interface básica
interface Pessoa {
  nome: string;
  idade: number;
  email?: string; // opcional
}

// Implementação
const professor: Pessoa = {
  nome: "Eduardo",
  idade: 30,
  email: "eduardo@email.com"
};

// Interface com métodos
interface Animal {
  nome: string;
  som(): string;
}

// Extends
interface Cachorro extends Animal {
  raca: string;
}

const rex: Cachorro = {
  nome: "Rex",
  raca: "Pastor Alemão",
  som: () => "Au au!"
};

// Type alias
type Coordenada = {
  x: number;
  y: number;
};

type Direcao = "norte" | "sul" | "leste" | "oeste";

const pos: Coordenada = { x: 10, y: 20 };
const dir: Direcao = "norte";

console.log("Professor:", professor);
console.log("Cachorro:", rex.nome, "-", rex.som());
console.log("Posição:", pos);
console.log("Direção:", dir);
