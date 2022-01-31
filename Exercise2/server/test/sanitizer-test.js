const assert = require('assert');

const sanitizer = require('./../sanitizer');

const expectedElevator = {
    active: false,
    status: "doors closed",
    floor: 0,
    action: "broken"
};

const inputElevatorExtraKeys = {
    active: false,
    status: "doors closed",
    floor: 0,
    action: "broken",
    eekum: "bokum"
};

const inputElevatorActiveString = {
    active: "false",
    status: "doors closed",
    floor: 0,
    action: "broken"
};

const inputElevatorFloorString = {
    active: false,
    status: "doors closed",
    floor: "0",
    action: "broken"
};

const expectedElevators = {
    1: expectedElevator,
    2: expectedElevator,
    3: expectedElevator,
    4: expectedElevator
};

const inputElevators = {
    1: expectedElevator,
    2: inputElevatorExtraKeys,
    3: inputElevatorActiveString,
    4: inputElevatorFloorString
};

const expectedBuilding = {
    floorCount: 3,
    ground: 1,
    elevators: {}
};

const inputBuildingExtraKeys = {
    floorCount: 3,
    ground: 1,
    elevators: {},
    eekum: "bokum"
};

const inputBuildingFloorCountString = {
    floorCount: "3",
    ground: 1,
    elevators: {}
};

const inputBuildingGroundString = {
    floorCount: 3,
    ground: "1",
    elevators: {}
};

const expectedBuildings = {
    1: expectedBuilding,
    2: expectedBuilding,
    3: expectedBuilding,
    4: expectedBuilding
};

const inputBuildings = {
    1: expectedBuilding,
    2: inputBuildingExtraKeys,
    3: inputBuildingFloorCountString,
    4: inputBuildingGroundString
};

describe('sanitizer.js', () => {
    describe('#toBuilding(input : object) : object', () => {
        it('Should return the expected building if given the expected building', () => {
            assert.deepEqual(sanitizer.toBuilding(expectedBuilding), expectedBuilding);
        });
        
        it('Should return the expected building if given a building with extra keys', () => {
            assert.deepEqual(sanitizer.toBuilding(inputBuildingExtraKeys), expectedBuilding);
        });
        
        it('Should return the expected building if given a floor count string value', () => {
            assert.deepEqual(sanitizer.toBuilding(inputBuildingFloorCountString), expectedBuilding);
        });
        
        it('Should return the expected building if given a ground string value', () => {
            assert.deepEqual(sanitizer.toBuilding(inputBuildingGroundString), expectedBuilding);
        });
        
        it('Should throw an error if given input is null', () => {
            assert.throws(() => sanitizer.toBuilding(null), Error);
        });
    });

    describe('#toBuildings(input : object) : object', () => {
        it('Should return the expected buildings if given the expected buildings', () => {
            assert.deepEqual(sanitizer.toBuildings(expectedBuildings), expectedBuildings);
        });

        it('Should return the expected buildings if given equivalent buildings', () => {
            assert.deepEqual(sanitizer.toBuildings(inputBuildings), expectedBuildings);
        });
    });

    describe('#toElevator(input : object) : object', () => {
        it('Should return the expected elevator if given the expected elevator', () => {
            assert.deepEqual(sanitizer.toElevator(expectedElevator), expectedElevator);
        });
        
        it('Should return the expected elevator if given a elevator with extra keys', () => {
            assert.deepEqual(sanitizer.toElevator(inputElevatorExtraKeys), expectedElevator);
        });
        
        it('Should return the expected elevator if given an active string value', () => {
            assert.deepEqual(sanitizer.toElevator(inputElevatorActiveString), expectedElevator);
        });
        
        it('Should return the expected elevator if given a floor string value', () => {
            assert.deepEqual(sanitizer.toElevator(inputElevatorFloorString), expectedElevator);
        });
        
        it('Should throw an error if given input is null', () => {
            assert.throws(() => sanitizer.toElevator(null), Error);
        });
    });

    describe('#toElevators(input : object) : object', () => {
        it('Should return the expected elevators if given the expected elevators', () => {
            assert.deepEqual(sanitizer.toElevators(expectedElevators), expectedElevators);
        });

        it('Should return the expected elevators if given equivalent elevators', () => {
            assert.deepEqual(sanitizer.toElevators(inputElevators), expectedElevators);
        });
    });
});