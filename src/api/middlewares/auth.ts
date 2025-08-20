import { expressjwt } from 'express-jwt';

export const jwtMiddleware = expressjwt({
  secret: 'b7e1c2d4f5a6b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3',
  algorithms: ['HS256'],
});
