// Enums e Utility Types

// Enum numérico
enum DiaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado
}

console.log("Quarta =", DiaSemana.Quarta); // 3

// Enum string
enum Cor {
  Vermelho = "#FF0000",
  Verde = "#00FF00",
  Azul = "#0000FF"
}

console.log("Verde:", Cor.Verde);

// Utility Types
interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

// Partial - torna tudo opcional
type UsuarioUpdate = Partial<Usuario>;

// Pick - seleciona campos
type UsuarioPublico = Pick<Usuario, "id" | "nome">;

// Omit - remove campos
type UsuarioSemSenha = Omit<Usuario, "senha">;

// Record
type StatusMap = Record<string, boolean>;

const status: StatusMap = {
  ativo: true,
  admin: false,
  verificado: true
};

const update: UsuarioUpdate = { nome: "Novo Nome" };
const publico: UsuarioPublico = { id: 1, nome: "Eduardo" };

console.log("Update:", update);
console.log("Público:", publico);
console.log("Status:", status);
