const assert = require('assert');

const data = require('./../data');

const buildings = {
    1: {
        "floorCount": 5,
        "ground": 0,
        "elevators": {
            1: {
                "active": true,
                "status": "doors open",
                "floor": 2,
                "action": "idle"
            },
            2: {
                "active": false,
                "status": "doors closed",
                "floor": 0,
                "action": "idle"
            }
        }
    },
    2: {
        "floorCount": 2,
        "ground": 1,
        "elevators": {
            1: {
                "active": true,
                "status": "doors open",
                "floor": 0,
                "action": "idle"
            }
        }
    },
    3: {
        "floorCount": 15,
        "ground": 2,
        "elevators": {
            1: {
                "active": true,
                "status": "doors open",
                "floor": 2,
                "action": "idle"
            },
            2: {
                "active": true,
                "status": "doors closed",
                "floor": 10,
                "action": "idle"
            },
            3: {
                "active": true,
                "status": "doors closed",
                "floor": 7,
                "action": "idle"
            },
            4: {
                "active": false,
                "status": "doors closed",
                "floor": 0,
                "action": "idle"
            }
        }
    }
};

const setupWithBuildings = () => {
    data.deleteBuildings();
    data.addBuildings(buildings);
};

const setupWithoutBuildings = () => {
    data.deleteBuildings();
}

describe('data.js', () => {
    describe('#getBuildings() : object', () => {
        it('Should return empty object if no buildings exist', () => {
            setupWithoutBuildings();

            assert.deepEqual(data.getBuildings(), {});
        });

        it('Should return buildings if buildings already added', () => {
            setupWithBuildings();

            assert.deepEqual(data.getBuildings(), buildings);
        });
    });
    
    describe('#addBuildings() : boolean', () => {
        it('Should return true if buildings were added', () => {
            setupWithoutBuildings();

            assert.equal(data.addBuildings(buildings), true);
        });

        it('Should return false if a building with the same address already exists', () => {
            setupWithBuildings();

            assert.equal(data.addBuildings(buildings), false);
        });
    });
    
    describe('#updateBuildings() : boolean', () => {
        it('Should return true if buildings was updated', () => {
            setupWithBuildings();

            assert.equal(data.updateBuildings(buildings), true);
        });
        
        it('Should return false if a building address does not exist', () => {
            setupWithoutBuildings();

            assert.equal(data.updateBuildings(buildings), false);
        });
    });
    
    describe('#addOrUpdateBuildings() : boolean', () => {
        it('Should return true if buildings were added or updated', () => {
            setupWithoutBuildings();

            assert.equal(data.addOrUpdateBuildings(buildings), true);
        });
    });
    
    describe('#deleteBuildings() : void', () => {
        it('Should delete all buildings', () => {
            setupWithBuildings();

            data.deleteBuildings();
            assert.deepEqual(data.getBuildings(), {});
        });
    });
    
    describe('#getBuilding() : object', () => {
        it('Should return building object if address exists', () => {
            setupWithBuildings();

            assert.deepEqual(data.getBuilding(1), buildings["1"]);
        });

        it('Should return null if address does not exist', () => {
            setupWithBuildings();

            assert.deepEqual(data.getBuilding(14), null);
        });
    });
    
    describe('#addElevators() : boolean', () => {
        it('Should return true if elevators were added', () => {
            setupWithBuildings();

            assert.equal(data.addElevators({}, 2), true);
        });

        it('Should return false if an elevator with the same index already exists', () => {
            setupWithBuildings();

            assert.equal(data.addElevators(buildings["2"].elevators, 2), false);
        });

        it('Should return false if the address does not exist', () => {
            setupWithBuildings();

            assert.equal(data.addElevators(buildings["2"].elevators, 31), false);
        });
    });
    
    describe('#updateBuilding() : boolean', () => {
        it('Should return true if building was updated', () => {
            setupWithBuildings();

            assert.equal(data.updateBuilding(buildings["1"], 1), true);
        });
        
        it('Should return false if address does not exist', () => {
            setupWithoutBuildings();

            assert.equal(data.updateBuilding(buildings["1"], 1), false);
        });
    });
    
    describe('#addOrUpdateElevators() : boolean', () => {
        it('Should return true if elevators were added or updated', () => {
            setupWithBuildings();

            assert.equal(data.addOrUpdateElevators(buildings["3"].elevators, 2), true);
        });

        it('Should return false if address does not exist', () => {
            setupWithBuildings();

            assert.equal(data.addOrUpdateElevators(buildings["3"].elevators, 21), false);
        });
    });
    
    describe('#deleteBuilding() : boolean', () => {
        it('Should return true if building has been deleted', () => {
            setupWithBuildings();

            assert.equal(data.deleteBuilding(1), true);
        });

        it('Should return false if address does not exist', () => {
            setupWithBuildings();

            assert.equal(data.deleteBuilding(51), false);
        });
    });
    
    describe('#getElevator() : object', () => {
        it('Should return elevator object if address and index exists', () => {
            setupWithBuildings();

            assert.deepEqual(data.getElevator(1, 1), buildings["1"].elevators["1"]);
        });

        it('Should return null if address does not exist', () => {
            setupWithBuildings();

            assert.deepEqual(data.getElevator(12, 1), null);
        });

        it('Should return null if index does not exist', () => {
            setupWithBuildings();

            assert.deepEqual(data.getElevator(1, 14), null);
        });
    });
    
    describe('#updateElevator() : boolean', () => {
        it('Should return true if elevator has been updated', () => {
            setupWithBuildings();

            assert.equal(data.updateElevator(buildings["1"].elevators["1"], 1, 1), true);
        });

        it('Should return false if address does not exist', () => {
            setupWithBuildings();

            assert.equal(data.updateElevator(buildings["1"].elevators["1"], -51, 1), false);
        });

        it('Should return false if index does not exist', () => {
            setupWithBuildings();

            assert.equal(data.updateElevator(buildings["1"].elevators["1"], 1, 1023), false);
        });
    });
    
    describe('#deleteElevator() : boolean', () => {
        it('Should return true if elevator has been deleted', () => {
            setupWithBuildings();

            assert.equal(data.deleteElevator(1, 1), true);
        });

        it('Should return false if address does not exist', () => {
            setupWithBuildings();

            assert.equal(data.deleteElevator(-51, 1), false);
        });

        it('Should return false if index does not exist', () => {
            setupWithBuildings();

            assert.equal(data.deleteElevator(1, 1023), false);
        });
    });
});