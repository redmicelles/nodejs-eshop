//https://dev.to/desmondsanctity/documenting-nodejs-api-using-swagger-4klp

import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'eShop API',
            description: 'Ecommerce Shop Backend',
            contact: {
                name: '\'Seyi Daniel',
                email: 'dexter_daniel@outlook.com',
                LinkedIn: 'https://www.linkedin.com/in/seyi-daniel-8bb68b1a9/'
            },
            version: '0.1.0'
        },
        servers: [
            {
                url: 'http://localhost:3001/',
                description: 'Local Server'
            }
        ]
    },
    apis: ['src/index.ts', './src/api-docs/**/*.yaml']
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerOptions = {
    explorer: true,
    customCssUrl: '/api-docs/openapi.css',
    swaggerOptions: {
      validatorUrl: null
    }
  }

const swaggerConst = {
    'swaggerSpec': swaggerSpec,
    'swaggerOptions': swaggerOptions
}
export default swaggerConst