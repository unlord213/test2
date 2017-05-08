'use strict';

class EnergyStructureInfo {
	constructor(energyCapacity, energy) {
		this.energyCapacity = energyCapacity;
		this.energy = energy;
		this.needsEnergy = false;
		this.transfers = {};
	}
}

module.exports = EnergyStructureInfo;
