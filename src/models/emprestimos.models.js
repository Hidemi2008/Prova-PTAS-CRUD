import { readEmprestimos, writeEmprestimos } from '../db.js'

export const emprestimosModels = {
  async findAll() {
    return (await readEmprestimos()).filter(p => !p.deletedAt)
  },

  async findById(id) {
    const emprestimo = (await readEmprestimos()).find(p => p.id === id && !p.deletedAt)
    return emprestimo || null
  },

  async create(data) {
    const emprestimo = await readEmprestimos()
    const id = emprestimo.length ? Math.max(...emprestimo.map(p => p.id)) + 1 : 1
    const novo = { id, ...data }
    emprestimo.push(novo)
    await writeEmprestimos(emprestimo)
    return novo
  },

  // Devolve o produto atualizado ou null se não existir
  async update(id, data) {
    const emprestimo = await readEmprestimos()
    const i = emprestimo.findIndex(p => p.id === id && !p.deletedAt)
    if (i === -1) return null
    emprestimo[i] = { ...emprestimo[i], ...data, id } // id nunca é sobrescrito
    await writeEmprestimos(emprestimo)
    return emprestimo[i]
  },

  // Soft delete (mesmo padrão dos users). Devolve true/false
  async remove(id) {
    const emprestimos = await readEmprestimos()
    const i = emprestimos.findIndex(p => p.id === id && !p.deletedAt)
    if (i === -1) return false
    emprestimos[i].deletedAt = new Date().toISOString()
    await writeEmprestimos(emprestimos)
    return true
  },
}