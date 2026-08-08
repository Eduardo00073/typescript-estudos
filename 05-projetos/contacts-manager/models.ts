// =====================================================================
// MODELS — Gerenciador de Contatos TypeScript
// =====================================================================

export type TipoTelefone = 'celular' | 'residencial' | 'comercial';
export type TipoEmail = 'pessoal' | 'profissional';

export interface Telefone {
  numero: string;
  tipo: TipoTelefone;
  principal: boolean;
}

export interface Email {
  endereco: string;
  tipo: TipoEmail;
  principal: boolean;
}

export interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface Contato {
  id: string;
  nome: string;
  empresa?: string;
  cargo?: string;
  telefones: Telefone[];
  emails: Email[];
  endereco?: Endereco;
  aniversario?: Date;
  tags: string[];
  favorito: boolean;
  notas?: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export type NovoContato = Omit<Contato, 'id' | 'criadoEm' | 'atualizadoEm'>;
export type AtualizarContato = Partial<Omit<Contato, 'id' | 'criadoEm' | 'atualizadoEm'>>;

export interface FiltroContato {
  busca?: string;
  tags?: string[];
  favorito?: boolean;
  cidade?: string;
  empresa?: string;
}

export interface PaginacaoContato {
  pagina: number;
  porPagina: number;
  total: number;
  totalPaginas: number;
}

export interface ResultadoContatos {
  contatos: Contato[];
  paginacao: PaginacaoContato;
}
