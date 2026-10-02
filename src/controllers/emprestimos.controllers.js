// Recebe a requisição, chama o model e monta a resposta HTTP.
import { emprestimosModels } from '../models/emprestimos.models.js'

export async function listEmprestimos(req, res, next) {
    try {
        res.json(await emprestimosModels.findAll())
    } catch (err) { next(err) }
}

export async function getEmprestimos(req, res, next) {
    try {
        const emprestimos = await emprestimosModels.findById(Number(req.params.id))
        if (!emprestimos) return res.status(404).json({ erro: 'não encontrado' })
        res.json(emprestimos)
    } catch (err) { next(err) }
}

export async function createEmprestimos(req, res, next) {
    try {
        if (!req.body.nomeAluno) return res.status(400).json({ erro: 'Precisa ser colocado um nome' })
        if (!req.body.livro) return res.status(400).json({ erro: 'Precisa ser colocado um Livro' })
        res.status(201).json(await emprestimosModels.create(req.body))
    } catch (err) { next(err) }
}

export async function updateEmprestimos(req, res, next) {
    try {
        const product = await emprestimosModels.update(Number(req.params.id), req.body)
        if (!product) return res.status(404).json({ erro: 'não encontrado' })
        res.json(product)
    } catch (err) { next(err) }
}

export async function deleteEmprestimos(req, res, next) {
    try {
        const ok = await emprestimosModels.remove(Number(req.params.id))
        if (!ok) return res.status(404).json({ erro: 'não encontrado' })
        res.status(204).end()
    } catch (err) { next(err) }
}