import { readEmprestimos, writeEmprestimos } from '../db.js'

export const emprestimosModels = {
  async findAll() {
    return (await readEmprestimos()).filter(p => !p.deletedAt)
  },

  async findById(id) {
    const product = (await readEmprestimos()).find(p => p.id === id && !p.deletedAt)
    return product || null
  },

  async create(data) {
    const products = await readEmprestimos()
    const id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1
    const novo = { id, ...data }
    products.push(novo)
    await writeEmprestimos(products)
    return novo
  },

  // Devolve o produto atualizado ou null se não existir
  async update(id, data) {
    const products = await readEmprestimos()
    const i = products.findIndex(p => p.id === id && !p.deletedAt)
    if (i === -1) return null
    products[i] = { ...products[i], ...data, id } // id nunca é sobrescrito
    await writeEmprestimos(products)
    return products[i]
  },

  // Soft delete (mesmo padrão dos users). Devolve true/false
  async remove(id) {
    const products = await readEmprestimos()
    const i = products.findIndex(p => p.id === id && !p.deletedAt)
    if (i === -1) return false
    products[i].deletedAt = new Date().toISOString()
    await writeEmprestimos(products)
    return true
  },
}