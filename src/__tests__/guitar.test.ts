

import request from 'supertest';
import app from '../api/index';
import { connectDB } from '../infra/database/mongoose';

describe('Guitar API', () => {
  let token: string;
  let brandId: string;
  let guitarId: string;

  beforeAll(async () => {
    await connectDB();
    // Cria e autentica usuário para obter token
    await request(app)
      .post('/auth/register')
      .send({ username: 'guitaruser', password: 'guitarpass' });
    const login = await request(app)
      .post('/auth/login')
      .send({ username: 'guitaruser', password: 'guitarpass' });
    token = login.body.token;

    // Cria uma marca para usar nos testes de guitarra
    const brandRes = await request(app)
      .post('/brands')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Ibanez',
        country: 'Japão',
        foundedYear: '1957',
        isActive: true
      });
    brandId = brandRes.body._id;
  });

  it('deve criar uma nova guitarra', async () => {
    const res = await request(app)
      .post('/guitars')
      .set('Authorization', `Bearer ${token}`)
      .send({
        model: 'RG550',
        brandId,
        year: 2020,
        strings: 6,
        notes: 'Guitarra de teste'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    guitarId = res.body._id;
  });

  it('deve listar guitarras', async () => {
    const res = await request(app)
      .get('/guitars')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('deve buscar uma guitarra pelo ID', async () => {
    const res = await request(app)
      .get(`/guitars/${guitarId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', guitarId);
  });

  it('deve atualizar uma guitarra', async () => {
    const res = await request(app)
      .put(`/guitars/${guitarId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        model: 'RG550 Atualizada',
        brandId,
        year: 2021,
        strings: 7,
        notes: 'Atualizada'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('model', 'RG550 Atualizada');
    expect(res.body).toHaveProperty('strings', 7);
  });

  it('deve remover uma guitarra', async () => {
    const res = await request(app)
      .delete(`/guitars/${guitarId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
