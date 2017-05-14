'use strict';

require('./lib/common.js');

const EnergyManager = require('../src/EnergyManager');

desc('EnergyManager', () => {
	describe('constructor', () => {
		it('should set properties', () => {
			const energyStructureInfos = {
				foo: 'bar'
			};
			const sourceInfos = {
				bar: 'foo'
			};

			const roomInfo = {
				energyStructureInfos: energyStructureInfos,
				sourceInfos: sourceInfos
			};

			const energyManager = new EnergyManager(roomInfo);
			expect(energyManager.energyStructureInfos).to.eql(energyStructureInfos);
			expect(energyManager.sourceInfos).to.eql(sourceInfos);
		});
	});

	describe('findStructureNeedingEnergy', () => {
		it('should return structure id', () => {
			const energyStructureInfos = {
				spawns: {
					structureId0: {
						needsEnergy: false,
						transfers: []
					},
					structureId1: {
						needsEnergy: true,
						energy: 50,
						energyCapacity: 100,
						transfers: []
					}
				}
			};

			const roomInfo = {
				energyStructureInfos: energyStructureInfos
			};

			const structureId = new EnergyManager(roomInfo).findStructureNeedingEnergy(10, 'creepId0');
			expect(structureId).to.eql('structureId1');
		});

		it('should add transfer', () => {
			const transfers = {
				creepId1: 10
			};

			const energyStructureInfos = {
				spawns: {
					structureId0: {
						energy: 50,
						needsEnergy: true,
						energyCapacity: 100,
						transfers: transfers
					}
				}
			};

			const roomInfo = {
				energyStructureInfos: energyStructureInfos
			};

			new EnergyManager(roomInfo).findStructureNeedingEnergy(10, 'creepId0');

			const newTransfers = {
				creepId1: 10,
				creepId0: 10
			};
			expect(energyStructureInfos.spawns['structureId0'].transfers).to.eql(newTransfers);
		});

		it('should set needs energy', () => {
			const energyStructureInfos = {
				spawns: {
					structureId0: {
						energy: 90,
						needsEnergy: true,
						energyCapacity: 100,
						transfers: {}
					}
				}
			};

			const roomInfo = {
				energyStructureInfos: energyStructureInfos
			};

			new EnergyManager(roomInfo).findStructureNeedingEnergy(10, 'creepId0');

			expect(energyStructureInfos.spawns['structureId0'].needsEnergy).to.eql(false);
		});

		it('should return undefined', () => {
			const energyStructureInfos = {
				spawns: {
					structureId0: {
						needsEnergy: false,
					}
				}
			};

			const roomInfo = {
				energyStructureInfos: energyStructureInfos
			};

			const structureId = new EnergyManager(roomInfo).findStructureNeedingEnergy(10, 'creepId0');

			expect(structureId).to.eql(undefined);
		});
	});

	describe('getAccessPoint', () => {
		it('should return access point', () => {
			const accessPoint0 = {
				foo: 'bar'
			};
			const accessPoint1 = {
				bar: 'foo'
			};

			const sourceInfos = {
				sourceId0: {
					accessPoints: {
						'0': accessPoint0,
						'1': accessPoint1
					}
				}
			};

			const roomInfo = {
				sourceInfos: sourceInfos
			};

			const accessPoint = new EnergyManager(roomInfo).getAccessPoint('sourceId0', '1');
			expect(accessPoint).to.eql(accessPoint1);
		});
	});

	describe('getOpenAccessPoint', () => {
		it('should return open access point', () => {
			const sourceInfos = {
				sourceId0: {
					accessPoints: {
						'0': {
							creepId: 'creepId0'
						}
					}
				},
				sourceId1: {
					accessPoints: {
						'0': {
							creepId: 'creepId1'
						},
						'1': {}
					}
				}
			};

			const roomInfo = {
				sourceInfos: sourceInfos
			};

			const accessPointInfo = new EnergyManager(roomInfo).getOpenAccessPoint('creepId3');
			expect(accessPointInfo).to.eql({
				sourceId: 'sourceId1',
				accessPointId: '1'
			});
		});

		it('should set creep id on open access point', () => {
			const sourceInfos = {
				sourceId0: {
					accessPoints: {
						'0': {}
					}
				}
			};

			const roomInfo = {
				sourceInfos: sourceInfos
			};

			new EnergyManager(roomInfo).getOpenAccessPoint('creepId0');
			expect(sourceInfos.sourceId0.accessPoints).to.eql({
				'0': {
					creepId: 'creepId0'
				}
			});
		});
	});

	describe('create', () => {
		it('should create', () => {
			const roomInfo = {
				foo: 'bar'
			};
			const actual = EnergyManager.create(roomInfo);
			expect(actual).to.eql(new EnergyManager(roomInfo));
		});
	});
});
