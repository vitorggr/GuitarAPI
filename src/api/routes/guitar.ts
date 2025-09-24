
import { Router } from 'express';

import { GuitarDTO } from '../../domain/dto/GuitarDTO';
import { validateDto } from '../middlewares/validate';
import { GuitarController } from '../controllers/GuitarController';

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Guitars
 *   description: Gerenciamento de guitarras
 */
/**
 * @swagger
 * /guitars:
 *   get:
 *     summary: Lista todas as guitarras
 *     tags: [Guitars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de guitarras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Guitar'
 */
router.get('/', GuitarController.getAll);

/**
 * @swagger
 * /guitars/{id}:
 *   get:
 *     summary: Busca uma guitarra pelo ID
 *     tags: [Guitars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da guitarra
 *     responses:
 *       200:
 *         description: Guitarra encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Guitar'
 *       404:
 *         description: Guitarra não encontrada
 */
router.get('/:id', GuitarController.getById);

/**
 * @swagger
 * /guitars:
 *   post:
 *     summary: Cria uma nova guitarra
 *     tags: [Guitars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Guitar'
 *     responses:
 *       201:
 *         description: Guitarra criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Guitar'
 */
router.post('/', validateDto(GuitarDTO), GuitarController.create);

/**
 * @swagger
 * /guitars/{id}:
 *   put:
 *     summary: Atualiza uma guitarra
 *     tags: [Guitars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da guitarra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Guitar'
 *     responses:
 *       200:
 *         description: Guitarra atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Guitar'
 *       404:
 *         description: Guitarra não encontrada
 */
router.put('/:id', validateDto(GuitarDTO), GuitarController.update);

/**
 * @swagger
 * /guitars/{id}:
 *   delete:
 *     summary: Remove uma guitarra
 *     tags: [Guitars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da guitarra
 *     responses:
 *       200:
 *         description: Guitarra removida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Guitar'
 *       404:
 *         description: Guitarra não encontrada
 */
router.delete('/:id', GuitarController.remove);

export default router;
