// Recebe a requisição, chama o model e monta a resposta HTTP.
import { productsModel } from '../models/emprestimos.models.js'

export async function listEmprestimos(req, res, next) {
    try {
        res.json(await productsModel.findAll())
    } catch (err) { next(err) }
}

export async function getEmprestimos(req, res, next) {
    try {
        const product = await productsModel.findById(Number(req.params.id))
        if (!product) return res.status(404).json({ erro: 'não encontrado' })
        res.json(product)
    } catch (err) { next(err) }
}

export async function createEmprestimos(req, res, next) {
    try {
        res.status(201).json(await productsModel.create(req.body))
    } catch (err) { next(err) }
}

export async function updateEmprestimos(req, res, next) {
    try {
        const product = await productsModel.update(Number(req.params.id), req.body)
        if (!product) return res.status(404).json({ erro: 'não encontrado' })
        res.json(product)
    } catch (err) { next(err) }
}

export async function deleteEmprestimos(req, res, next) {
    try {
        const ok = await productsModel.remove(Number(req.params.id))
        if (!ok) return res.status(404).json({ erro: 'não encontrado' })
        res.status(204).end()
    } catch (err) { next(err) }
}