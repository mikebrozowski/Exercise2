const fs = require('fs');

const savedDataFileName = 'saved-data.json';

let cityData = {};

// Helpers
const hasAddress = (address) => {
    return (address in cityData);
};

const hasIndex = (address, index) => {
    return hasAddress(address) && 
        (index in cityData[address].elevators);
};

const saveCityData = () => {
    const savedString = JSON.stringify(cityData);

    fs.writeFileSync(savedDataFileName, savedString);
};

// Read
const getBuildings = _ => cityData;

const getBuilding = (address) => {
    if (hasAddress(address)) {
        return cityData[address];
    }
    
    return null;
};

const getElevator = (address, index) => {
    if (hasIndex(address, index)) {
        return cityData[address].elevators[index];
    }

    return null;
};

// Create
const addBuildings = (input) => {
    let combo = Object.assign({}, cityData);

    for (let address in input) {
        if (address in combo) {
            return false;
        }

        combo[address] = input[address];
    }

    cityData = combo;
    saveCityData();
    return true;
};

const addElevators = (input, address) => {
    if (!hasAddress(address)) {
        return false;
    }

    let combo = Object.assign({}, cityData[address].elevators);

    for (let index in input) {
        if (index in combo) {
            return false;
        }

        combo[index] = input[index];
    }

    cityData[address].elevators = combo;
    saveCityData();
    return true;
};

// Update
const updateBuildings = (input) => {
    let combo = Object.assign({}, cityData);

    for (let address in input) {
        if (!(address in combo)) {
            return false;
        }

        combo[address] = input[address];
    }

    cityData = combo;
    saveCityData();
    return true;
};

const updateBuilding = (input, address) => {
    if (!hasAddress(address)) {
        return false;
    }

    const building = Object.assign({}, cityData[address], input);

    let combo = Object.assign({}, building.elevators);

    for (let index in input.elevators) {
        if (!(index in combo)) {
            return false;
        }

        combo[index] = input.elevators[index];
    }

    building.elevators = combo;

    cityData[address] = building;
    saveCityData();
    return true;
};

const updateElevator = (input, address, index) => {
    if (!hasIndex(address, index)) {
        return false;
    }

    const building = cityData[address];

    // floor must be within the building
    if (input.floor < 0 - building.ground || input.floor >= building.floorCount - building.ground) {
        return false;
    }

    const elevator = Object.assign({}, cityData[address].elevators[index], input);

    cityData[address].elevators[index] = elevator;
    saveCityData();
    return true;
};

// Add or Update
const addOrUpdateBuildings = (input) => {
    Object.assign(cityData, input);

    saveCityData();
    return true;
};

const addOrUpdateElevators = (input, address) => {
    if (!hasAddress(address)) {
        return false;
    }

    Object.assign(cityData[address].elevators, input);

    saveCityData();
    return true;
};

// Delete
const deleteBuildings = _ => {
    cityData = {};
    saveCityData();
};

const deleteBuilding = (address) => {
    if (!hasAddress(address)) {
        return false;
    }
    
    delete cityData[address];
    saveCityData();
    return true;
};

const deleteElevator = (address, index) => {
    if (!hasIndex(address, index)) {
        return false;
    }

    delete cityData[address].elevators[index];
    saveCityData();
    return true;
};

// Other
const readCityData = (callback) => {
    fs.readFile(savedDataFileName, (err, buffer) => {
        if (!err) {
            const savedData = JSON.parse(buffer);

            if (savedData) {
                cityData = savedData;
            }
        }

        callback();
    });
};

const goToFloor = (address, index, floor) => {
    if (!hasIndex(address, index)) {
        return false;
    }

    const currentElevator = getElevator(address, index);

    // inactive elevators cannot move
    if (!currentElevator.active) {
        return false;
    }

    const targetElevator = Object.assign({}, currentElevator);
    targetElevator.floor = floor;
    targetElevator.status = "doors open";

    const result = updateElevator(targetElevator, address, index);

    // update failed, probably invalid floor selection
    if (result !== true) {
        return false;
    }

    // close the doors if they're open
    if (currentElevator.status === "doors open") {
        console.log(`Building ${address}, Elevator ${index}, closes doors.`);
    }

    // go to floor and open doors
    console.log(`Building ${address}, Elevator ${index}, arrives at floor ${floor}.`);
    console.log(`Building ${address}, Elevator ${index}, open doors.`);

    return true;
};

module.exports = {
    getBuildings: getBuildings,
    addBuildings: addBuildings,
    updateBuildings: updateBuildings,
    addOrUpdateBuildings: addOrUpdateBuildings,
    deleteBuildings: deleteBuildings,
    getBuilding: getBuilding,
    addElevators: addElevators,
    updateBuilding: updateBuilding,
    addOrUpdateElevators: addOrUpdateElevators,
    deleteBuilding: deleteBuilding,
    getElevator: getElevator,
    updateElevator: updateElevator,
    deleteElevator: deleteElevator,
    readCityData: readCityData,
    goToFloor: goToFloor
};