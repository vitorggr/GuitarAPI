

import request from 'supertest';
import app from '../api/index';
import { connectDB } from '../infra/database/mongoose';

describe('Auth API', () => {
  beforeAll(async () => {
    await connectDB();
  });

  let token: string;

  it('deve registrar um novo usuário (ou lidar com já existente)', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'testuser', password: 'testpass' });
    expect([201, 400]).toContain(res.statusCode);
  });

  it('deve autenticar e retornar um token JWT', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testpass' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('deve validar o token JWT', async () => {
    const res = await request(app)
      .post('/auth/authorize')
      .send({ token });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('valid', true);
    expect(res.body).toHaveProperty('payload');
  });

  it('deve rejeitar login com senha errada', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'wrongpass' });
    expect(res.statusCode).toBe(401);
  });
});
