'use strict';

require('./lib/common.js');

const MemoryManager = require('../src/MemoryManager');
const Position = require('../src/Position');
const SourceInfo = require('../src/SourceInfo');
const EnergyStructureInfo = require('../src/EnergyStructureInfo');
const AccessPoint = require('../src/AccessPoint');

desc('MemoryManager', () => {
	describe('initRoomInfos', () => {
		beforeEach(() => {
			/*eslint-disable no-global-assign */
			Memory = {};
		});

		it('should init room infos', () => {
			Game.rooms = {
				roomName0: {
					find: sandbox.stub()
				},
				roomName1: {
					find: sandbox.stub()
				}
			};

			const source0_0 = {
				id: 'sourceid0_0',
				room: {
					name: 'roomName0',
				},
				pos: new Position(0, 0)
			};
			const source0_1 = {
				id: 'sourceid0_1',
				room: {
					name: 'roomName0',
				},
				pos: new Position(10, 10)
			};
			Game.rooms.roomName0.find.withArgs(FIND_SOURCES).returns([source0_0, source0_1]);

			const source1_0 = {
				id: 'sourceid1_0',
				room: {
					name: 'roomName1',
				},
				pos: new Position(5, 5)
			};
			Game.rooms.roomName1.find.withArgs(FIND_SOURCES).returns([source1_0]);

			const getTerrainAt = sandbox.stub(Game.map, 'getTerrainAt');
			getTerrainAt.withArgs(1, 1, 'roomName0').returns('wall');
			getTerrainAt.withArgs(1, 0, 'roomName0').returns('swamp');
			getTerrainAt.withArgs(1, -1, 'roomName0').returns('wall');
			getTerrainAt.withArgs(0, 1, 'roomName0').returns('wall');
			getTerrainAt.withArgs(0, -1, 'roomName0').returns('plain');
			getTerrainAt.withArgs(-1, 1, 'roomName0').returns('wall');
			getTerrainAt.withArgs(-1, 0, 'roomName0').returns('wall');
			getTerrainAt.withArgs(-1, -1, 'roomName0').returns('wall');

			getTerrainAt.withArgs(11, 11, 'roomName0').returns('wall');
			getTerrainAt.withArgs(11, 10, 'roomName0').returns('wall');
			getTerrainAt.withArgs(11, 9, 'roomName0').returns('wall');
			getTerrainAt.withArgs(10, 11, 'roomName0').returns('swamp');
			getTerrainAt.withArgs(10, 9, 'roomName0').returns('wall');
			getTerrainAt.withArgs(9, 11, 'roomName0').returns('wall');
			getTerrainAt.withArgs(9, 10, 'roomName0').returns('wall');
			getTerrainAt.withArgs(9, 9, 'roomName0').returns('wall');

			getTerrainAt.withArgs(6, 6, 'roomName1').returns('wall');
			getTerrainAt.withArgs(6, 5, 'roomName1').returns('swamp');
			getTerrainAt.withArgs(6, 4, 'roomName1').returns('wall');
			getTerrainAt.withArgs(5, 6, 'roomName1').returns('plain');
			getTerrainAt.withArgs(5, 4, 'roomName1').returns('wall');
			getTerrainAt.withArgs(4, 6, 'roomName1').returns('wall');
			getTerrainAt.withArgs(4, 5, 'roomName1').returns('plain');
			getTerrainAt.withArgs(4, 4, 'roomName1').returns('wall');

			const structure0_0 = {
				id: 'structureId0_0',
				structureType: STRUCTURE_SPAWN,
				energyCapacity: 42,
				energy: 41,
			};

			Game.rooms.roomName0.find.withArgs(FIND_STRUCTURES).returns([structure0_0]);
			Game.rooms.roomName1.find.withArgs(FIND_STRUCTURES).returns([]);

			sandbox.stub(console, 'log');

			MemoryManager.initRoomInfos();

			const sourceInfo0_0 = new SourceInfo();
			sourceInfo0_0.accessPoints['1'] = new AccessPoint(new Position(1, 0));
			sourceInfo0_0.accessPoints['4'] = new AccessPoint(new Position(0, -1));

			const sourceInfo0_1 = new SourceInfo();
			sourceInfo0_1.accessPoints['3'] = new AccessPoint(new Position(10, 11));

			const sourceInfo1_0 = new SourceInfo();
			sourceInfo1_0.accessPoints['1'] = new AccessPoint(new Position(6, 5));
			sourceInfo1_0.accessPoints['3'] = new AccessPoint(new Position(5, 6));
			sourceInfo1_0.accessPoints['6'] = new AccessPoint(new Position(4, 5));

			expect(Memory.roomInfos).to.eql({
				roomName0: {
					sourceInfos: {
						sourceid0_0: sourceInfo0_0,
						sourceid0_1: sourceInfo0_1
					},
					energyStructureInfos: {
						spawns: {
							structureId0_0: new EnergyStructureInfo(42, 41)
						}
					}
				},
				roomName1: {
					sourceInfos: {
						sourceid1_0: sourceInfo1_0
					},
					energyStructureInfos: {
						spawns: {}
					}
				}
			});

			/*eslint-disable no-console */
			expect(console.log).to.have.been.calledWith('Memory manager init room roomName0');
			expect(console.log).to.have.been.calledWith('Memory manager init room roomName1');
		});

		it('should not do anything if room info already present', () => {
			sandbox.stub(MemoryManager, '_initSourceInfos');
			sandbox.stub(MemoryManager, '_initEnergyStructures');

			const roomInfo = {
				foo: 'bar'
			};

			Memory.roomInfos = {
				roomName0: roomInfo
			};

			Game.rooms = {
				roomName0: {}
			};

			MemoryManager.initRoomInfos();

			expect(Memory.roomInfos['roomName0']).to.eql(roomInfo);
			expect(MemoryManager._initSourceInfos).to.not.have.been.called;
			expect(MemoryManager._initEnergyStructures).to.not.have.been.called;
		});

		it('should set empty memory', () => {
			sandbox.stub(MemoryManager, '_initSourceInfos');
			sandbox.stub(MemoryManager, '_initEnergyStructures');

			Game.rooms = {};

			MemoryManager.initRoomInfos();

			expect(Memory).to.eql({
				roomInfos: {}
			});
		});

		it('should log unknown structure type', () => {
			const structure = {
				structureType: 'foo'
			};

			Game.rooms = {
				roomName0: {
					find: sandbox.stub()
				}
			};

			Game.rooms.roomName0.find.returns([]);
			Game.rooms.roomName0.find.withArgs(FIND_STRUCTURES).returns([structure]);

			sandbox.stub(console, 'log');

			MemoryManager.initRoomInfos();

			/*eslint-disable no-console */
			expect(console.log).to.have.been.calledWith('Unknown energy structure type: foo');
		});
	});

	describe('updateSpawns', () => {
		it('should set energy', () => {
			Memory.roomInfos = {
				roomName0: {
					energyStructureInfos: {
						spawns: {
							structureId0: {
								energy: 42,
								transfers: {}
							}
						}
					}
				}
			};

			sandbox.stub(Game, 'getObjectById').returns({
				energy: 43
			});

			MemoryManager.updateSpawns();

			expect(Memory.roomInfos.roomName0.energyStructureInfos.spawns.structureId0.energy).to.eql(43);
		});

		it('should set needs energy', () => {
			Memory.roomInfos = {
				roomName0: {
					energyStructureInfos: {
						spawns: {
							structureId0: {
								energyCapacity: 100,
								energy: 40,
								transfers: {
									creepId0: 10,
									creepId1: 10,
								}
							}
						}
					}
				}
			};

			sandbox.stub(Game, 'getObjectById').returns({
				energy: 40
			});

			MemoryManager.updateSpawns();

			expect(Memory.roomInfos.roomName0.energyStructureInfos.spawns.structureId0.needsEnergy).to.eql(true);
		});
	});

	describe('getRoomInfo', () => {
		it('should return room info', () => {
			const room = {
				foo: 'bar'
			};
			Memory.roomInfos = {
				roomName0: room
			};

			const actual = MemoryManager.getRoomInfo('roomName0');
			expect(actual).to.eql(room);
		});
	});

	describe('energyStructureFilter', () => {
		it('should filter array', () => {
			const structure0 = {
				structureType: STRUCTURE_SPAWN
			};
			const structure1 = {
				structureType: 'foo'
			};
			const structure2 = {
				structureType: STRUCTURE_SPAWN
			};

			const array = [structure0, structure1, structure2];
			const results = array.filter(MemoryManager.energyStructureFilter.filter);

			expect(results).to.eql([structure0, structure2]);
		});
	});
});
