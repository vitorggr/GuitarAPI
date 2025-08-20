
import { Router } from 'express';
import { BrandDTO } from '../../domain/dto/BrandDTO';
import { validateDto } from '../middlewares/validate';
import { BrandController } from '../controllers/BrandController';
import { JsonRepository } from '../../infra/repositories/JsonRepository';
import { Brand } from '../../domain/Brand';

const router = Router();

/**
 * @swagger
 * /brands/{id}/isActive:
 *   patch:
 *     summary: Atualiza apenas o campo isActive de uma marca
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da marca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Marca atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Marca não encontrada
 */
router.patch('/:id/isActive', async (req, res) => {
	const { isActive } = req.body;
	if (typeof isActive !== 'boolean') {
		return res.status(400).json({ mensagem: 'O campo isActive deve ser booleano.' });
	}
	const repo = new JsonRepository<Brand>(`${__dirname}/../../infra/data/brands.json`);
	const brands = await repo.getAll();
	const idx = brands.findIndex((b: Brand) => b.id === req.params.id);
	if (idx === -1) return res.status(404).json({ mensagem: 'Marca não encontrada' });
	brands[idx].isActive = isActive;
	await repo.saveAll(brands);
	res.json(brands[idx]);
});


/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Gerenciamento de marcas de instrumentos
 */
/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Lista todas as marcas
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de marcas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 */
router.get('/', BrandController.getAll);

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Busca uma marca pelo ID
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da marca
 *     responses:
 *       200:
 *         description: Marca encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Marca não encontrada
 */
router.get('/:id', BrandController.getById);

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Cria uma nova marca
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       201:
 *         description: Marca criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 */
router.post('/', validateDto(BrandDTO), BrandController.create);

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Atualiza uma marca
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da marca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       200:
 *         description: Marca atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Marca não encontrada
 */
router.put('/:id', validateDto(BrandDTO), BrandController.update);

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Remove uma marca
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da marca
 *     responses:
 *       200:
 *         description: Marca removida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Marca não encontrada
 */

router.delete('/:id', BrandController.remove);

/**
 * @swagger
 * /brands/{id}/isActive:
 *   patch:
 *     summary: Atualiza apenas o campo isActive de uma marca
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da marca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Marca atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Marca não encontrada
 */
router.patch('/:id/isActive', async (req, res) => {
	const { isActive } = req.body;
	if (typeof isActive !== 'boolean') {
		return res.status(400).json({ mensagem: 'O campo isActive deve ser booleano.' });
	}
	const repo = new JsonRepository<Brand>(`${__dirname}/../../infra/data/brands.json`);
	const brands = await repo.getAll();
	const idx = brands.findIndex((b: Brand) => b.id === req.params.id);
	if (idx === -1) return res.status(404).json({ mensagem: 'Marca não encontrada' });
	brands[idx].isActive = isActive;
	await repo.saveAll(brands);
	res.json(brands[idx]);
});

export default router;
