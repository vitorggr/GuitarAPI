
import express from 'express';
import { logger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import authRoutes from './routes/auth';
import brandRoutes from './routes/brand';
import guitarRoutes from './routes/guitar';
import { jwtMiddleware } from './middlewares/auth';
import fs from 'fs';
import path from 'path';

// Criação automática dos arquivos de dados JSON se não existirem
const dataFiles = [
  'brands.json',
  'guitars.json',
  'users.json',
];
const dataDir = path.resolve(__dirname, '../infra/data');
for (const file of dataFiles) {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) {
    const initial: any[] = [];
    fs.writeFileSync(filePath, JSON.stringify(initial, null, 2));
  }
}



const app = express();
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
            id: { type: 'string', example: 'uuid' },
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
            id: { type: 'string', example: 'uuid' },
            model: { type: 'string', example: 'Stratocaster' },
            brandId: { type: 'string', example: 'uuid' },
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
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
