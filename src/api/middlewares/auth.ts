import { expressjwt } from 'express-jwt';

export const jwtMiddleware = expressjwt({
  secret: process.env.JWT_SECRET || 'segredo',
  algorithms: ['HS256'],
});
