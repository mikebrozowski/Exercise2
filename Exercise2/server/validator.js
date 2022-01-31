const isNumber = (input) => {
    return typeof(input) === "number";
};

const isInteger = (input) => {
    if (!isNumber(input)) {
        return false;
    }

    const num = Number(input);

    if (isNaN(num) || !isFinite(num)) {
        return false;
    }

    if (Math.floor(num) !== num) {
        return false;
    }

    return true;
};

const isBoolean = (input) => {
    return typeof(input) === "boolean";
};

const isObject = (input) => {
    return typeof(input) === "object";
}

const isValidBuilding = (input) => {
    // check required keys
    const requiredKeys = [ "floorCount", "ground" ];

    for (let key of requiredKeys) {
        if (input[key] === null || input[key] === undefined) {
            return false;
        }
    }

    // check valid types
    if (!isInteger(input.floorCount)) {
        return false;
    }

    if (!isInteger(input.ground)) {
        return false;
    }

    if (!isObject(input.elevators)) {
        return false;
    }

    // check additional constraints
    if (input.floorCount < 1) {
        return false;
    }

    if (input.ground < 0 || input.ground >= input.floorCount) {
        return false;
    }

    if (!isValidElevators(input.elevators, input)) {
        return false;
    }

    return true;
};

const isValidBuildings = (input) => {
    for (let address in input) {
        if (!isValidBuilding(input[address])) {
            return false;
        }
    }

    return true;
};

const isValidElevator = (input, building) => {
    // check required keys
    const requiredKeys = [ "active", "status", "floor", "action" ];

    for (let key of requiredKeys) {
        if (input[key] === null || input[key] === undefined) {
            return false;
        }
    }

    // check valid types
    if (!isBoolean(input.active)) {
        return false;
    }

    if (!isInteger(input.floor)) {
        return false;
    }

    // check additional constraints
    if (input.floor < 0 - building.ground || input.floor >= building.floorCount - building.ground) {
        return false;
    }

    return true;
};

const isValidElevators = (input, building) => {
    for (let index in input) {
        if (!isValidElevator(input[index], building)) {
            return false;
        }
    }

    return true;
};

module.exports = {
    isValidBuilding: isValidBuilding,
    isValidBuildings: isValidBuildings,
    isValidElevator: isValidElevator,
    isValidElevators: isValidElevators,
};