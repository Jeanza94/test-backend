import path from 'path'
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
            type: 'object',
            properties: {
              name: {
                type: 'string'
              },
              lastname: {
                type: 'string'
              }
            }
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
            type: 'object',
            properties: {
              amount: {
                type: 'number'
              },
              currency: {
                type: 'string'
              },
              decimals: {
                type: 'number'
              }
            }
          },
          title: {
            type: 'string'
          }
        }
      },
      item_description: {
        allOf: [
          { $ref: '#/components/schemas/item' },
          {
            type: 'object',
            properties: {
              sold_quantity: {
                type: 'number'
              },
              description: {
                type: 'string'
              }
            }
          }
        ]
      },
      product: {
        type: 'object',
        properties: {
          categories: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/item'
            }
          }
        }
      },
      server_error_response: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          }
        }
      } 
    }
  }
}

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis:[
    path.resolve(__dirname, '../routes/*.ts')
  ]
}

export default swaggerJSDoc(swaggerOptions)
