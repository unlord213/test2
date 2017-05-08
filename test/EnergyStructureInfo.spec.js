'use strict';

require('./lib/common.js');

const EnergyStructureInfo = require('../src/EnergyStructureInfo');

desc('EnergyStructureInfo', () => {
	it('should set properties', () => {
		const energyCapacity = 100;
		const energy = 42;
		const info = new EnergyStructureInfo(energyCapacity, energy);
		expect(info).to.eql({
			energyCapacity: energyCapacity,
			energy: energy,
			needsEnergy: false,
			transfers: {}
		});
	});
});
