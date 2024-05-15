import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My APIs',
      version: '1.0.0',
      description: 'My Brand Apis',
    },
    servers: [
      {
        url: 'https://my-brand-backend-ts-byzx.onrender.com',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

const specs = swaggerJsDoc(options);

export default specs;
