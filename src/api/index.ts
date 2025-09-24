
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { logger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import authRoutes from './routes/auth';
import brandRoutes from './routes/brand';
import guitarRoutes from './routes/guitar';
import { jwtMiddleware } from './middlewares/auth';

import { connectDB } from '../infra/database/mongoose';



const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

export default app;

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GuitarAPI',
      version: '1.0.0',
      description: 'API para gerenciamento de guitarras e marcas',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Brand: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '652e1b2f8f1b2c3d4e5f6789', description: 'ObjectId do MongoDB' },
            name: { type: 'string', example: 'Fender' },
            country: { type: 'string', example: 'Estados Unidos' },
            foundedYear: { type: 'string', example: '1946' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time', example: '2020-01-01T00:00:00.000Z' }
          },
          required: ['name', 'country', 'foundedYear', 'isActive']
        },
        Guitar: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '652e1b2f8f1b2c3d4e5f6790', description: 'ObjectId do MongoDB' },
            model: { type: 'string', example: 'Stratocaster' },
            brandId: { type: 'string', example: '652e1b2f8f1b2c3d4e5f6789', description: 'ObjectId da marca' },
            year: { type: 'integer', example: 2020 },
            strings: { type: 'integer', example: 6 },
            notes: { type: 'string', example: 'Modelo clássico da Fender.' }
          },
          required: ['model', 'brandId', 'year', 'strings']
        }
      }
    },
  },
  apis: ['./src/api/routes/*.ts'],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);

// Protected routes
app.use('/brands', jwtMiddleware, brandRoutes);
app.use('/guitars', jwtMiddleware, guitarRoutes);


app.get('/', (req, res) => res.send('GuitarAPI is running'));

// Middleware global de tratamento de erros
app.use(errorHandler);



if (require.main === module) {
  connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
}
