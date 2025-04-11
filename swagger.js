import swaggerAutogen from 'swagger-autogen';


const doc = {
  info: {
    title: 'API',
    description: 'API para gerenciamento de usuários, itens e categorias'
  },
  host: 'localhost:3000/api/v1', 
  schemes: ['http'], 
};

const outputFile = './swagger-output.json';
const routes = ['./backend/src/routes/routes.js'];

swaggerAutogen(outputFile, routes, doc);