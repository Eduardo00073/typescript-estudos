// Tipos Básicos em TypeScript

// String
let nome: string = "Eduardo";

// Number
let idade: number = 30;
let pi: number = 3.14;

// Boolean
let ativo: boolean = true;

// Array
let numeros: number[] = [1, 2, 3, 4, 5];
let frutas: Array<string> = ["Maçã", "Banana", "Laranja"];

// Tuple
let aluno: [string, number] = ["Maria", 25];

// Any (evitar quando possível)
let qualquerCoisa: any = "texto";
qualquerCoisa = 42;

// Union Types
let id: string | number;
id = "abc123";
id = 123;

// Type assertion
let valor: any = "Hello TypeScript";
let tamanho: number = (valor as string).length;

console.log("Nome:", nome);
console.log("Números:", numeros);
console.log("Aluno:", aluno);
console.log("Tamanho:", tamanho);
