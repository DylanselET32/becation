const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Metadata info about our API
const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: 'BeCation API', version: '1.0.0' },
        components: {
            securitySchemes: {
                bearerAuth: { // Nombre del esquema de seguridad
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: [] // Aplicar este esquema de seguridad a los endpoints necesarios
            }
        ]
    },
    apis: ['./src/routes/v1/*.js', './src/database/connection.js']
};

// Docs en JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get('/api/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json'),
        res.send(swaggerSpec);
    });

    console.log(`Version 1.0 Docs are available at http://localhost:${port}/api/docs`);
};

module.exports = { swaggerDocs }