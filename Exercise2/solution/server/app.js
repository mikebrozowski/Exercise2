const express = require('express');
const bodyParser = require('body-parser');
const swagDoc = require('swagger-jsdoc');
const swagUi = require('swagger-ui-express');

const app = express();
const port = 3030;

const codes = require('./http-response-status');
const validator = require('./validator');
const sanitizer = require('./sanitizer');
const data = require('./data');

const buildingController = require('./building-controller');
const elevatorController = require('./elevator-controller');

// swagger business
const swagOptions = {
    swaggerDefinition: {
        info: {
            title: 'Exercise2 API',
            description: '<i>Our "close door" buttons actually do something.</i>',
            servers: [ `http://localhost:${port}` ]
        }
    },
    apis: [ 'app.js', 'building-controller.js', 'elevator-controller.js' ]
}

const swagDocs = swagDoc(swagOptions);

app.use('/api-docs', swagUi.serve, swagUi.setup(swagDocs));

// application-level logging for all requests
app.use((req, res, next) => {
    const logInfo = `Incoming URL: ${req.url} | Method: ${req.method} | Time: ${new Date().toUTCString()}`;

    console.log(logInfo);

    next();
});

app.use(bodyParser.json());

/**
 * @swagger
 * /:
 *  get:
 *      description: Retrieve all buildings information.
 *      responses:
 *          '200':
 *              description: Retrieved building(s) successfully.
 *          '400':
 *              description: Failed to retrieve data.
 */
app.get('/', (req, res, next) => {
    const result = data.getBuildings();

    if (result !== null) {
        res.send(result);
    } else {
        res.sendStatus(codes.BAD_REQUEST);
    }

    next();
});

/**
 * @swagger
 * /:
 *  post:
 *      description: Add new building(s).
 *      responses:
 *          '201':
 *              description: Created new building(s) successfully.
 *          '400':
 *              description: Unable to override existing buildings or the building data is not formed correctly.
 */
app.post('/', (req, res, next) => {
    if(validator.isValidBuildings(req.body)) {
        const result = data.addBuildings(sanitizer.toBuildings(req.body));
    
        if (result === true) {
            res.sendStatus(codes.CREATED);
        } else {
            res.sendStatus(codes.BAD_REQUEST);
        }
    } else {
        res.sendStatus(codes.BAD_REQUEST);
    }

    next();
});

/**
 * @swagger
 * /:
 *  put:
 *      description: Update existing building(s).
 *      responses:
 *          '200':
 *              description: Updated existing building(s) successfully.
 *          '400':
 *              description: Unable to add new buildings or the building data is not formed correctly.
 */
app.put('/', (req, res, next) => {
    if (validator.isValidBuildings(req.body)) {
        const result = data.updateBuildings(sanitizer.toBuildings(req.body));
    
        if (result === true) {
            res.sendStatus(codes.OK);
        } else {
            res.sendStatus(codes.BAD_REQUEST);
        }
    } else {
        res.sendStatus(codes.BAD_REQUEST);
    }

    next();
});

/**
 * @swagger
 * /:
 *  patch:
 *      description: Create new buildings or update existing building(s).
 *      responses:
 *          '200':
 *              description: Created new buildings or updated existing building(s) successfully.
 *          '400':
 *              description: Building data is not formed correctly.
 */
app.patch('/', (req, res, next) => {
    if (validator.isValidBuildings(req.body)) {
        const result = data.addOrUpdateBuildings(sanitizer.toBuildings(req.body));
    
        if (result === true) {
            res.sendStatus(codes.OK);
        } else {
            res.sendStatus(codes.BAD_REQUEST);
        }
    } else {
        res.sendStatus(codes.BAD_REQUEST);
    }

    next();
})

/**
 * @swagger
 * /:
 *  delete:
 *      description: Delete all buildings.
 *      responses:
 *          '200':
 *              description: Deleted building(s) successfully.
 *          '400':
 *              description: Failed to delete data.
 */
app.delete('/', (req, res, next) => {
    const result = data.deleteBuildings();

    if (result !== null) {
        res.sendStatus(codes.OK);
    } else {
        res.sendStatus(codes.BAD_REQUEST);
    }

    next();
});

// controllers
app.use('/building', buildingController);
app.use('/building/:buildingId/elevator', elevatorController);

app.use((req, res, next) => {
    const logInfo = `Outgoing URL: ${req.url} | Method: ${req.method} | Status: ${res.statusCode} | Time: ${new Date().toUTCString()}`;

    console.log(logInfo);

    next();
});

// run server
app.listen(port, () => {
    console.log(`running on ${port}`);
});