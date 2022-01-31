const express = require('express');
const router = express.Router({ mergeParams: true});

const codes = require('./http-response-status');
const validator = require('./validator');
const sanitizer = require('./sanitizer');
const data = require('./data');

/**
 * @swagger
 * /building/{address}/elevator/{index}:
 *  get:
 *      description: Retrieve elevator information by a given building ID and elevator ID.
 *      responses:
 *          '200':
 *              description: Retrieved elevator information successfully.
 *          '400':
 *              description: Failed to retrieve data. The building with the given ID may not exist. The elevator with the given ID may not exist.
 *      parameters:
 *      -
 *          name: address
 *          in: path
 *          schema:
 *              type: integer
 *          required: true
 *          description: The ID of the building you are trying to retrieve.
 *      -
 *          name: index
 *          in: path
 *          schema:
 *              type: integer
 *          required: true
 *          description: The ID of the elevator you are trying to retrieve.
 */
router.get('/:id', (req, res, next) => {
    const result = data.getElevator(req.params.buildingId, req.params.id);

    if (result !== null) {
        res.send(result);
    } else {
        res.sendStatus(codes.BAD_REQUEST);
    }

    next();
});

/**
 * @swagger
 * /building/{address}/elevator/{index}:
 *  post:
 *      description: Go to floor, given building ID, elevator ID, and requested floor number.
 *      responses:
 *          '200':
 *              description: Updated elevator information successfully.
 *          '400':
 *              description: The building with the given ID may not exist. The elevator with the given ID may not exist.
 *      parameters:
 *      -
 *          name: address
 *          in: path
 *          schema:
 *              type: integer
 *          required: true
 *          description: The ID of the building you are trying to update.
 *      -
 *          name: index
 *          in: path
 *          schema:
 *              type: integer
 *          required: true
 *          description: The ID of the elevator you are trying to update.
 */
router.post('/:id', (req, res, next) => {
    // floor property needs to be validated and sanitized
    const address = req.params.buildingId;
    const index = req.params.id;
    const floor = req.body.floor;

    const result = data.goToFloor(address, index, floor);

    if (result === true) {
        res.sendStatus(codes.OK);
    } else {
        res.sendStatus(codes.BAD_REQUEST);
    }
    
    next();
});

/**
 * @swagger
 * /building/{address}/elevator/{index}:
 *  put:
 *      description: Update elevator information by a given building ID and elevator ID.
 *      responses:
 *          '200':
 *              description: Updated elevator information successfully.
 *          '400':
 *              description: The building with the given ID may not exist. The elevator with the given ID may not exist.
 *      parameters:
 *      -
 *          name: address
 *          in: path
 *          schema:
 *              type: integer
 *          required: true
 *          description: The ID of the building you are trying to update.
 *      -
 *          name: index
 *          in: path
 *          schema:
 *              type: integer
 *          required: true
 *          description: The ID of the elevator you are trying to update.
 */
router.put('/:id', (req, res, next) => {
    if (validator.isValidElevator(req.body, data.getBuilding(req.params.buildingId))) {
        const result = data.updateElevator(sanitizer.toElevator(req.body), req.params.buildingId, req.params.id);

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
 * /building/{address}/elevator/{index}:
 *  delete:
 *      description: Delete an elevator by a given building ID and elevator ID.
 *      responses:
 *          '200':
 *              description: Deleted elevator successfully.
 *          '400':
 *              description: The building with the given ID may not exist. The elevator with the given ID may not exist.
 *      parameters:
 *      -
 *          name: address
 *          in: path
 *          schema:
 *              type: integer
 *          required: true
 *          description: The ID of the building you are trying to remove from existence.
 *      -
 *          name: index
 *          in: path
 *          schema:
 *              type: integer
 *          required: true
 *          description: The ID of the elevator you are trying to remove from existence.
 */
router.delete('/:id', (req, res, next) => {
    const result = data.deleteElevator(req.params.buildingId, req.params.id);

    if (result === true) {
        res.sendStatus(codes.OK);
    } else {
        res.sendStatus(codes.BAD_REQUEST);
    }

    next();
});

module.exports = router;