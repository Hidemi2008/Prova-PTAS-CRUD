// Só o mapa: URL + método HTTP → função do controller.
import { Router } from 'express'
import {
    createEmprestimos, deleteEmprestimos, getEmprestimos, listEmprestimos, updateEmprestimos
} from '../controllers/emprestimos.controllers.js'

const router = Router()

router.get('/', listEmprestimos)
router.get('/:id', getEmprestimos)
router.post('/', createEmprestimos)
router.put('/:id', updateEmprestimos)
router.patch('/:id', updateEmprestimos)
router.delete('/:id', deleteEmprestimos)

export default router