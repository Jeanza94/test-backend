import swaggerJSDoc, {
  OAS3Definition,
  OAS3Options
} from "swagger-jsdoc"

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentation CRUD test',
    version: '1.0.0'
  },
  servers: [
    {
      url: 'http://localhost:8000'
    }
  ],
  components: {
    schemas: {
      item: {
        type: 'object',
        properties: {
          author: {
            name: 'string',
            lastname: 'string',
          },  
          condition: {
            type: 'string'
          },
          free_shipping: {
            type: 'boolean'
          },
          id: {
            type: 'string'
          },
          picture: {
            type: 'string'
          },
          price: {
            amount: 'number',
            currency: 'string',
            decimals: 'number'
          },
          title: {
            type: 'string'
          },
        }
      }
    }
  }
}

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis:[
    '../../routes.ts'
  ]
}

export default swaggerJSDoc(swaggerOptions)
