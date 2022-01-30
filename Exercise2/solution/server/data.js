let cityData = {};

// Helpers
const hasAddress = (address) => {
    return (address in cityData);
};

const hasIndex = (address, index) => {
    return hasAddress(address) && 
        (index in cityData[address].elevators);
};

// Read
const getBuildings = _ => cityData;

const getBuilding = (address) => {
    if (hasAddress(address)) {
        return cityData[address];
    }
    
    return null; // error out instead
};

const getElevator = (address, index) => {
    if (hasIndex(address, index)) {
        return cityData[address].elevators[index];
    }

    return null;
};

// Create
const addBuildings = (input) => {
    let combo = Object.assign({}, cityData); // clone buildings into combo

    for (let address in input) {
        if (address in combo) {
            return false; // error out because the building id already exists
        }

        combo[address] = input[address];
    }

    cityData = combo;
    return true;
};

const addElevators = (input, address) => {
    if (!hasAddress(address)) { // check if building exists
        return false;
    }

    let combo = Object.assign({}, cityData[address].elevators); // clone into combo

    for (let index in input) {
        if (index in combo) {
            return false; // error out if elevator id already exists
        }

        combo[index] = input[index];
    }

    cityData[address].elevators = combo;
    return true;
};

// Update
const updateBuildings = (input) => {
    let combo = Object.assign({}, cityData); // clone buildings into combo

    for (let address in input) {
        if (!(address in combo)) {
            return false; // error out because the building id doesn't exist
        }

        combo[address] = input[address];
    }

    cityData = combo;
    return true;
};

const updateBuilding = (input, address) => {
    if (!hasAddress(address)) {
        return false;
    }

    const building = Object.assign({}, cityData[address], input);

    let combo = Object.assign({}, building.elevators); // clone into combo

    for (let index in input.elevators) {
        if (!(index in combo)) {
            return false; // error out because elevator doesn't exist
        }

        combo[index] = input.elevators[index];
    }

    building.elevators = combo;

    cityData[address] = building;
    return true;
};

const updateElevator = (input, address, index) => {
    if (!hasIndex(address, index)) {
        return false;
    }

    const elevator = Object.assign({}, cityData[address].elevators[index], input);

    cityData[address].elevators[index] = elevator;
    return true;
};

// Add or Update
const addOrUpdateBuildings = (input) => {
    Object.assign(cityData, input);

    return true;
};

const addOrUpdateElevators = (input, address) => {
    if (!hasAddress(address)) {
        return false;
    }

    Object.assign(cityData[address].elevators, input);

    return true;
};

// Delete
const deleteBuildings = _ => cityData = [];

const deleteBuilding = (address) => {
    if (hasAddress(address)) {
        delete cityData[address];
        return true;
    }
    
    return false; // error out instead
};

const deleteElevator = (address, index) => {
    if (hasIndex(address, index)) {
        delete cityData[address].elevators[index];
        return true;
    }

    return false;
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
};