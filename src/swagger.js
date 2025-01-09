const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Library API',
        version: '1.0.0',
        description: 'API for managing books and users',
      },
      servers: [
        {
          url: 'http://localhost:5000',
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
          },
        },
        schemas: {
          Book: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'Book ID',
              },
              title: {
                type: 'string',
                description: 'Title of the book',
              },
              author: {
                type: 'string',
                description: 'Author of the book',
              },
              category: {
                type: 'string',
                description: 'Category of the book',
              },
              description: {
                type: 'string',
                description: 'Description of the book',
              },
              user: {
                type: 'string',
                description: 'User ID who created the book',
              },
            },
            required: ['title', 'author', 'category', 'user'],
          },
        },
      },
      security: [{ BearerAuth: [] }],
    },
    apis: ['./src/routes/*.js'], // Path to the API docs
  };
  

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
