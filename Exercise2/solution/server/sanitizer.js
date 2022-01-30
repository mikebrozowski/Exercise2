const toBuilding = (input) => {
    return {
        floorCount: Number(input.floorCount),
        ground: Number(input.ground),
        elevators: toElevators(input.elevators)
    };
};

const toBuildings = (input) => {
    let buildings = {};

    for (let address in input) {
        buildings[address] = toBuilding(input[address]);
    }

    return buildings;
};

const toElevator = (input) => {
    return {
        active: Boolean(input.active),
        status: input.status,
        floor: Number(input.floor),
        action: input.action
    };
};

const toElevators = (input) => {
    let elevators = {};

    for (let index in input) {
        elevators[index] = toElevator(input[index]);
    }

    return elevators;
};

module.exports = {
    toBuilding: toBuilding,
    toBuildings: toBuildings,
    toElevator: toElevator,
    toElevators: toElevators,
};