import request from 'supertest';
import app from '../api/index';

describe('Auth API', () => {
  it('deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'usuario_teste', password: 'senha123' });
    expect([200, 201, 400]).toContain(res.statusCode); // 400 se já existir
  });

  it('deve autenticar um usuário existente', async () => {
    await request(app)
      .post('/auth/register')
      .send({ username: 'usuario_teste2', password: 'senha123' });
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'usuario_teste2', password: 'senha123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
