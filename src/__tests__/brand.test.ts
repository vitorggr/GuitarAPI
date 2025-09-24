

import request from 'supertest';
import app from '../api/index';
import { connectDB } from '../infra/database/mongoose';

describe('Brand API', () => {
  let token: string;
  let brandId: string;

  beforeAll(async () => {
    await connectDB();
    // Cria e autentica usuário para obter token
    await request(app)
      .post('/auth/register')
      .send({ username: 'branduser', password: 'brandpass' });
    const login = await request(app)
      .post('/auth/login')
      .send({ username: 'branduser', password: 'brandpass' });
    token = login.body.token;
  });

  it('deve criar uma nova marca', async () => {
    const res = await request(app)
      .post('/brands')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Fender',
        country: 'EUA',
        foundedYear: '1946',
        isActive: true
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    brandId = res.body._id;
  });

  it('deve listar marcas', async () => {
    const res = await request(app)
      .get('/brands')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('deve atualizar status da marca', async () => {
    const res = await request(app)
      .patch(`/brands/${brandId}/isActive`)
      .set('Authorization', `Bearer ${token}`)
      .send({ isActive: false });
    if (res.statusCode !== 200) {
      console.error('Erro ao atualizar marca:', res.body);
      console.error('brandId usado:', brandId);
    }
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('isActive', false);
  });
});
