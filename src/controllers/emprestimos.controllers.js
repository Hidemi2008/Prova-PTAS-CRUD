// Recebe a requisição, chama o model e monta a resposta HTTP.
import { emprestimosModels } from '../models/emprestimos.models.js'

export async function listEmprestimos(req, res, next) {
    try {
        res.json(await emprestimosModels.findAll())
    } catch (err) { next(err) }
}

export async function listEmprestimosId(req, res, next) {
    try {
        res.json(await emprestimosModels.findById(req.params.id))
    } catch (err) { next(err) }
}

export async function getEmprestimos(req, res, next) {
    try {
        const product = await emprestimosModels.findById(Number(req.params.id))
        if (!product) return res.status(404).json({ erro: 'não encontrado' })
        res.json(product)
    } catch (err) { next(err) }
}

export async function createEmprestimos(req, res, next) {
    try {
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