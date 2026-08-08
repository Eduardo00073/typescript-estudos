// =====================================================================
// STORAGE — Gerenciador de Contatos TypeScript
// =====================================================================

import { Contato, FiltroContato, NovoContato, AtualizarContato, ResultadoContatos } from './models';

// Simulação de storage em memória (substituível por localStorage, DB, API)
class ContatoRepository {
  private contatos: Map<string, Contato> = new Map();

  private gerarId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  criar(dados: NovoContato): Contato {
    const agora = new Date();
    const contato: Contato = {
      ...dados,
      id: this.gerarId(),
      criadoEm: agora,
      atualizadoEm: agora,
    };
    this.contatos.set(contato.id, contato);
    return contato;
  }

  buscarPorId(id: string): Contato | undefined {
    return this.contatos.get(id);
  }

  atualizar(id: string, dados: AtualizarContato): Contato | null {
    const contato = this.contatos.get(id);
    if (!contato) return null;
    const atualizado: Contato = { ...contato, ...dados, atualizadoEm: new Date() };
    this.contatos.set(id, atualizado);
    return atualizado;
  }

  excluir(id: string): boolean {
    return this.contatos.delete(id);
  }

  listar(filtro?: FiltroContato, pagina = 1, porPagina = 10): ResultadoContatos {
    let lista = Array.from(this.contatos.values());

    if (filtro?.busca) {
      const termo = filtro.busca.toLowerCase();
      lista = lista.filter(c =>
        c.nome.toLowerCase().includes(termo) ||
        c.empresa?.toLowerCase().includes(termo) ||
        c.emails.some(e => e.endereco.toLowerCase().includes(termo)) ||
        c.telefones.some(t => t.numero.includes(termo))
      );
    }

    if (filtro?.tags?.length) {
      lista = lista.filter(c => filtro.tags!.every(tag => c.tags.includes(tag)));
    }

    if (filtro?.favorito !== undefined) {
      lista = lista.filter(c => c.favorito === filtro.favorito);
    }

    if (filtro?.cidade) {
      lista = lista.filter(c => c.endereco?.cidade === filtro.cidade);
    }

    lista.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

    const total = lista.length;
    const inicio = (pagina - 1) * porPagina;
    const contatos = lista.slice(inicio, inicio + porPagina);

    return {
      contatos,
      paginacao: { pagina, porPagina, total, totalPaginas: Math.ceil(total / porPagina) },
    };
  }

  contarTotal(): number { return this.contatos.size; }
  listarTags(): string[] {
    const tags = new Set<string>();
    this.contatos.forEach(c => c.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }
}

export const repo = new ContatoRepository();
