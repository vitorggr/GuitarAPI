
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { JsonRepository } from '../../infra/repositories/JsonRepository';
import { User } from '../../domain/User';
import { UserDTO } from '../../domain/dto/UserDTO';
import { validateDto } from '../middlewares/validate';

const userRepo = new JsonRepository<User>(`${__dirname}/../../infra/data/users.json`);
const router = Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: Usuário criado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *       400:
 *         description: Usuário já existe ou dados inválidos
 */
router.post('/register', validateDto(UserDTO), async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const users = await userRepo.getAll();
    if (users.find(u => u.username === username)) {
      const err: any = new Error('Usuário já existe');
      err.status = 400;
      throw err;
    }
    const newUser: User = { id: uuidv4(), username, password };
    users.push(newUser);
    await userRepo.saveAll(users);
    res.status(201).json({ id: newUser.id, username: newUser.username });
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login e retorna um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Token JWT gerado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login e retorna um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Token JWT gerado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const users = await userRepo.getAll();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        'b7e1c2d4f5a6b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3',
        { expiresIn: '1h' }
      );
      return res.json({ token });
    }
    const err: any = new Error('Credenciais inválidas');
    err.status = 401;
    throw err;
  } catch (err) {
    next(err);
  }
});
/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegister:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: usuario1
 *         password:
 *           type: string
 *           example: senha123
 *     UserLogin:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: usuario1
 *         password:
 *           type: string
 *           example: senha123
 */

/**
 * @swagger
 * /auth/authorize:
 *   post:
 *     summary: Valida um token JWT
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "<jwt>"
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                 payload:
 *                   type: object
 *       401:
 *         description: Token inválido
 */
router.post('/authorize', (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      const err: any = new Error('Token não informado');
      err.status = 400;
      throw err;
    }
    jwt.verify(
      token,
      'b7e1c2d4f5a6b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3',
      (err: any, decoded: any) => {
        if (err) {
          const error: any = new Error('Token inválido');
          error.status = 401;
          return next(error);
        }
        res.json({ valid: true, payload: decoded });
      }
    );
  } catch (err) {
    next(err);
  }
});

export default router;
