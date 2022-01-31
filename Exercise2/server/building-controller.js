const express = require('express');
const router = express.Router();

const codes = require('./http-response-status');
const validator = require('./validator');
const sanitizer = require('./sanitizer');
const data = require('./data');

/**
 * @swagger
 * /building/{address}:
 *  get:
 *      description: Retrieve building information by a given ID.
 *      responses:
 *          '200':
 *              description: Retrieved building information successfully.
 *          '400':
 *              description: Failed to retrieve data. The building with the given ID may not exist.
 *      parameters:
 *      -
 *          name: address
 *          in: path
 *          schema:
 *              type: integer
 *          required: true
 *          description: The ID of the building you are trying to retrieve.
 */
router.get('/:id', (req, res, next) => {
    const result = data.getBuilding(req.params.id);

    if (result !== null) {
        res.send(result);
    } else {
        res.sendStatus(codes.BAD_REQUEST);
    }

    next();
});

/**
 * @swagger
 * /building/{address}:
 *  post:
 *      description: Add new elevator(s) to a building by a given ID.
 *      responses:
 *          '201':
 *              description: Created new elevator(s) successfully.
 *          '400':
 *              description: Unable to override existing elevator(s). The building with the given ID may not exist or the elevator data is not formed correctly.
 *      parameters:
 *      -
 *          name: address
 *          in: path
 *          schema:
 *              type: integer
 *          required: true
 *          description: The ID of the building you are trying to add elevator(s) to.
 */
router.post('/:id', (req, res, next) => {
    if (validator.isValidElevators(req.body, data.getBuilding(req.params.id))) {
        const result = data.addElevators(sanitizer.toElevators(req.body), req.params.id);
    
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
 * /building/{address}:
 *  put:
 *      description: Update existing building by a given ID.
 *      responses:
 *          '200':
 *              description: Updated existing building successfully.
 *          '400':
 *              description: Unable to add new elevator(s). The building with the given ID may not exist or the elevator data is not formed correctly.
 *      parameters:
 *      -
 *          name: address
 *          in: path
 *          schema:
 *              type: integer
 *          required: true
 *          description: The ID of the building you are trying to update.
 */
router.put('/:id', (req, res, next) => {
    if (validator.isValidBuilding(req.body)) {
        const result = data.updateBuilding(sanitizer.toBuilding(req.body), req.params.id);
    
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
 * /building/{address}:
 *  patch:
 *      description: Create new elevator(s) or update existing elevator(s) in a building by a given ID.
 *      responses:
 *          '200':
 *              description: Created new elevator(s) or updated existing elevator(s) successfully.
 *          '400':
 *              description: The building with the given ID may not exist or the elevator data is not formed correctly.
 *      parameters:
 *      -
 *          name: address
 *          in: path
 *          schema:
 *              type: integer
 *          required: true
 *          description: The ID of the building you are trying to add or update elevator(s) to.
 */
router.patch('/:id', (req, res, next) => {
    if (validator.isValidElevators(req.body, data.getBuilding(req.params.id))) {
        const result = data.addOrUpdateElevators(sanitizer.toElevators(req.body), req.params.id);
    
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
 * /building/{address}:
 *  delete:
 *      description: Delete a building by a given ID.
 *      responses:
 *          '200':
 *              description: Deleted building successfully.
 *          '400':
 *              description: The building with the given ID may not exist.
 *      parameters:
 *      -
 *          name: address
 *          in: path
 *          schema:
 *              type: integer
 *          required: true
 *          description: The ID of the building you are trying to remove from existence.
 */
router.delete('/:id', (req, res, next) => {
    const result = data.deleteBuilding(req.params.id);

    if (result === true) {
        res.sendStatus(codes.OK);
    } else {
        res.sendStatus(codes.BAD_REQUEST);
    }

    next();
});

module.exports = router;