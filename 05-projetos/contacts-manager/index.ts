// =====================================================================
// DEMO — Gerenciador de Contatos TypeScript
// =====================================================================

import { repo } from './storage';
import { Contato } from './models';

// ── Criar contatos ────────────────────────────────────────────────────
const eduardo = repo.criar({
  nome: 'Eduardo Junior',
  empresa: 'Escola Técnica',
  cargo: 'Professor de TI',
  telefones: [
    { numero: '17987650001', tipo: 'celular', principal: true },
    { numero: '1733330002', tipo: 'comercial', principal: false },
  ],
  emails: [
    { endereco: 'eduardo@escola.com', tipo: 'profissional', principal: true },
    { endereco: 'eduardo@gmail.com', tipo: 'pessoal', principal: false },
  ],
  endereco: {
    logradouro: 'Rua das Acácias',
    numero: '100',
    bairro: 'Centro',
    cidade: 'Jales',
    estado: 'SP',
    cep: '15700-000',
  },
  tags: ['professor', 'ti', 'favorito'],
  favorito: true,
  notas: 'Professor de programação, robótica e informática.',
});

const ana = repo.criar({
  nome: 'Ana Silva',
  empresa: 'TechCorp',
  cargo: 'Desenvolvedora',
  telefones: [{ numero: '11987650003', tipo: 'celular', principal: true }],
  emails: [{ endereco: 'ana@techcorp.com', tipo: 'profissional', principal: true }],
  tags: ['developer', 'frontend'],
  favorito: false,
});

const bruno = repo.criar({
  nome: 'Bruno Lima',
  telefones: [{ numero: '21987650004', tipo: 'celular', principal: true }],
  emails: [{ endereco: 'bruno@gmail.com', tipo: 'pessoal', principal: true }],
  tags: ['amigo', 'developer'],
  favorito: true,
});

// ── Demonstrações ─────────────────────────────────────────────────────
console.log('=== Gerenciador de Contatos TypeScript ===\n');

// Listar todos
const todos = repo.listar();
console.log(`📋 Total de contatos: ${todos.paginacao.total}`);
todos.contatos.forEach(c => {
  const tel = c.telefones.find(t => t.principal)?.numero || '-';
  const email = c.emails.find(e => e.principal)?.endereco || '-';
  console.log(`  ${c.favorito ? '⭐' : '  '} ${c.nome} | ${tel} | ${email}`);
});

// Buscar por nome
console.log('\n🔍 Busca por "edu":');
const resultado = repo.listar({ busca: 'edu' });
resultado.contatos.forEach(c => console.log(`  → ${c.nome}`));

// Buscar favoritos
console.log('\n⭐ Favoritos:');
const favoritos = repo.listar({ favorito: true });
favoritos.contatos.forEach(c => console.log(`  → ${c.nome}`));

// Buscar por tag
console.log('\n🏷️  Tag "developer":');
const devs = repo.listar({ tags: ['developer'] });
devs.contatos.forEach(c => console.log(`  → ${c.nome} (${c.empresa || 'sem empresa'})`));

// Atualizar
repo.atualizar(ana.id, { cargo: 'Senior Developer', notas: 'Promovida em 2024' });
console.log('\n✏️  Ana atualizada:', repo.buscarPorId(ana.id)?.cargo);

// Listar tags
console.log('\n🏷️  Todas as tags:', repo.listarTags().join(', '));
console.log('\n✅ Sistema funcionando! Total:', repo.contarTotal(), 'contatos');
