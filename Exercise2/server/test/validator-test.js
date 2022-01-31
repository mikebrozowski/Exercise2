const assert = require('assert');

const validator = require('./../validator');

const validElevator = {
    active: true,
    status: "doors open",
    floor: 0,
    action: "idle"
};

const validElevators = {
    1: validElevator,
    2: validElevator,
    3: validElevator
};

const invalidElevators = {
    1: validElevator,
    2: {},
    3: validElevator
};

const validBuilding = {
    floorCount: 5,
    ground: 2,
    elevators: validElevators
};

const validBuildings = {
    1: validBuilding,
    2: validBuilding,
    3: validBuilding
};

const invalidBuildings = {
    1: validBuilding,
    2: validBuilding,
    3: {}
};

const invalidBuildingNoFloorCount = {
    ground: 2,
    elevators: validElevators
};

const invalidBuildingNoGround = {
    floorCount: 5,
    elevators: validElevators
};

const invalidBuildingNullFloorCount = {
    floorCount: null,
    ground: 2,
    elevators: validElevators
};

const invalidBuildingNullGround = {
    floorCount: 5,
    ground: null,
    elevators: validElevators
};

const invalidBuildingInvalidFloorCountNotNumber = {
    floorCount: [5],
    ground: 2,
    elevators: validElevators
};

const invalidBuildingInvalidFloorCountInfiniteNumber = {
    floorCount: -Infinity,
    ground: 2,
    elevators: validElevators
};

const invalidBuildingInvalidFloorCountNaN = {
    floorCount: NaN,
    ground: 2,
    elevators: validElevators
};

const invalidBuildingInvalidFloorCountFloat = {
    floorCount: 5.5,
    ground: 2,
    elevators: validElevators
};

const invalidBuildingInvalidGroundNotNumber = {
    floorCount: 5,
    ground: "2",
    elevators: validElevators
};

const invalidBuildingInvalidGroundInfiniteNumber = {
    floorCount: 5,
    ground: Infinity,
    elevators: validElevators
};

const invalidBuildingInvalidGroundNaN = {
    floorCount: 5,
    ground: NaN,
    elevators: validElevators
};

const invalidBuildingInvalidGroundFloat = {
    floorCount: 5,
    ground: 2.2,
    elevators: validElevators
};

const invalidBuildingElevatorsNotObject = {
    floorCount: 5,
    ground: 2,
    elevators: [validElevators]
};

const invalidBuildingNegativeFloorCount = {
    floorCount: -5,
    ground: 2,
    elevators: validElevators
};

const invalidBuildingLowGround = {
    floorCount: 5,
    ground: -2,
    elevators: validElevators
};

const invalidBuildingHighGround = {
    floorCount: 5,
    ground: 5,
    elevators: validElevators
};

const invalidBuildingInvalidElevators = {
    floorCount: 5,
    ground: 2,
    elevators: invalidElevators
};

const invalidElevatorNoActive = {
    status: "doors open",
    floor: 0,
    action: "idle"
};

const invalidElevatorNoStatus = {
    active: true,
    floor: 0,
    action: "idle"
};

const invalidElevatorNoFloor = {
    active: true,
    status: "doors open",
    action: "idle"
};

const invalidElevatorNoAction = {
    active: true,
    status: "doors open",
    floor: 0,
};

const invalidElevatorActiveNotBoolean = {
    active: null,
    status: "doors open",
    floor: 0,
    action: "idle"
};

const invalidElevatorFloorNotNumber = {
    active: true,
    status: "doors open",
    floor: "0",
    action: "idle"
};

const invalidElevatorFloorInfiniteNumber = {
    active: true,
    status: "doors open",
    floor: Infinity,
    action: "idle"
};

const invalidElevatorFloorNaN = {
    active: true,
    status: "doors open",
    floor: NaN,
    action: "idle"
};

const invalidElevatorFloorFloat = {
    active: true,
    status: "doors open",
    floor: 0.3,
    action: "idle"
};

const invalidElevatorLowFloor = {
    active: true,
    status: "doors open",
    floor: -10,
    action: "idle"
};

const invalidElevatorHighFloor = {
    active: true,
    status: "doors open",
    floor: 2000,
    action: "idle"
};

describe('validator.js', () => {
    describe('#isValidBuilding(input : object) : boolean', () => {
        it('Should return true when the input is a valid building', () => {
            assert.equal(validator.isValidBuilding(validBuilding), true);
        });

        it('Should return false when the input building has no floor count', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingNoFloorCount), false);
        });

        it('Should return false when the input building has no ground', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingNoGround), false);
        });

        it('Should return false when the input building has a null floor count', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingNullFloorCount), false);
        });

        it('Should return false when the input building has a null ground', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingNullGround), false);
        });

        it('Should return false when the input building floor count is not a number', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingInvalidFloorCountNotNumber), false);
        });

        it('Should return false when the input building floor count is infinite', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingInvalidFloorCountInfiniteNumber), false);
        });

        it('Should return false when the input building floor count is NaN', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingInvalidFloorCountNaN), false);
        });

        it('Should return false when the input building floor count is a floating point number', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingInvalidFloorCountFloat), false);
        });

        it('Should return false when the input building ground is not a number', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingInvalidGroundNotNumber), false);
        });

        it('Should return false when the input building ground is infinite', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingInvalidGroundInfiniteNumber), false);
        });

        it('Should return false when the input building ground is NaN', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingInvalidGroundNaN), false);
        });

        it('Should return false when the input building ground is a float point number', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingInvalidGroundFloat), false);
        });

        it('Should return false when the input building elevators is not an object', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingElevatorsNotObject), false);
        });

        it('Should return false when the input building floor count is negative', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingNegativeFloorCount), false);
        });

        it('Should return false when the input building ground is below zero', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingLowGround), false);
        });

        it('Should return false when the input building ground is above the highest floor', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingHighGround), false);
        });

        it('Should return false when the input building has invalid elevators', () => {
            assert.equal(validator.isValidBuilding(invalidBuildingInvalidElevators), false);
        });
    });

    describe('#isValidBuildings(input : object) : boolean', () => {
        it('Should return true when the input buildings are all valid', () => {
            assert.equal(validator.isValidBuildings(validBuildings), true);
        });

        it('Should return false when at least one of the input buildings are invalid', () => {
            assert.equal(validator.isValidBuildings(invalidBuildings), false);
        });
    });

    describe('#isValidElevator(input : object) : boolean', () => {
        it('Should return true when the input is a valid elevator', () => {
            assert.equal(validator.isValidElevator(validElevator, validBuilding), true);
        });
        it('Should return false when the input elevator has no active', () => {
            assert.equal(validator.isValidElevator(invalidElevatorNoActive, validBuilding), false);
        });
        it('Should return false when the input elevator has no status', () => {
            assert.equal(validator.isValidElevator(invalidElevatorNoStatus, validBuilding), false);
        });
        it('Should return false when the input elevator has no floor', () => {
            assert.equal(validator.isValidElevator(invalidElevatorNoFloor, validBuilding), false);
        });
        it('Should return false when the input elevator has no action', () => {
            assert.equal(validator.isValidElevator(invalidElevatorNoAction, validBuilding), false);
        });
        it('Should return false when the input elevator active is not boolean', () => {
            assert.equal(validator.isValidElevator(invalidElevatorActiveNotBoolean, validBuilding), false);
        });
        it('Should return false when the input elevator floor is not a number', () => {
            assert.equal(validator.isValidElevator(invalidElevatorFloorNotNumber, validBuilding), false);
        });
        it('Should return false when the input elevator floor is infinite', () => {
            assert.equal(validator.isValidElevator(invalidElevatorFloorInfiniteNumber, validBuilding), false);
        });
        it('Should return false when the input elevator floor is NaN', () => {
            assert.equal(validator.isValidElevator(invalidElevatorFloorNaN, validBuilding), false);
        });
        it('Should return false when the input elevator floor is a floating point number', () => {
            assert.equal(validator.isValidElevator(invalidElevatorFloorFloat, validBuilding), false);
        });
        it('Should return false when the input elevator floor is too low', () => {
            assert.equal(validator.isValidElevator(invalidElevatorLowFloor, validBuilding), false);
        });
        it('Should return false when the input elevator floor is too high', () => {
            assert.equal(validator.isValidElevator(invalidElevatorHighFloor, validBuilding), false);
        });
    });


    describe('#isValidElevators(input : object) : boolean', () => {
        it('Should return true when the input elevators are all valid', () => {
            assert.equal(validator.isValidElevators(validElevators, validBuilding), true);
        });

        it('Should return false when at least one of the input elevators are invalid', () => {
            assert.equal(validator.isValidElevators(invalidElevators, validBuilding), false);
        });
    });
});