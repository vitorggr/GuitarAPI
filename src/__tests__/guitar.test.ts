import request from 'supertest';
import app from '../api/index';

describe('Guitar API', () => {
  it('deve listar guitarras', async () => {
    // Autentica para obter token JWT
    const login = await request(app)
      .post('/auth/login')
      .send({ username: 'admin', password: 'admin' });
    const token = login.body.token;
    const res = await request(app)
      .get('/guitars')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
