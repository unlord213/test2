'use strict';

require('./lib/common.js');

const MemoryManager = require('../src/MemoryManager');
const Position = require('../src/Position');
const SourceInfo = require('../src/SourceInfo');
const AccessPoint = require('../src/AccessPoint');

desc('MemoryManager', () => {
	let find0 = sandbox.stub();
	let find1 = sandbox.stub();
	let getTerrainAt = sandbox.stub();

	beforeEach(() => {
		/*eslint-disable no-global-assign */
		Memory = {};

		sandbox.stub(console, 'log');
		find0 = sandbox.stub();
		find1 = sandbox.stub();
		getTerrainAt = sandbox.stub();

		Game.rooms = {
			'roomName0': {
				name: 'roomName0',
				find: find0
			},
			'roomName1': {
				name: 'roomName1',
				find: find1
			}
		};

		Game.map = {
			getTerrainAt: getTerrainAt
		};
	});

	// it('should init room infos', () => {
	// 	const source0_0 = {
	// 		id: 'sourceid0_0',
	// 		room: {
	// 			name: 'roomName0',
	// 		},
	// 		pos: new Position(0, 0)
	// 	};
	// 	const source0_1 = {
	// 		id: 'sourceid0_1',
	// 		room: {
	// 			name: 'roomName0',
	// 		},
	// 		pos: new Position(10, 10)
	// 	};
	// 	find0.returns([source0_0, source0_1]);
	//
	// 	const source1_0 = {
	// 		id: 'sourceid1_0',
	// 		room: {
	// 			name: 'roomName1',
	// 		},
	// 		pos: new Position(5, 5)
	// 	};
	// 	find1.returns([source1_0]);
	//
	// 	getTerrainAt.withArgs(1, 1, 'roomName0').returns('wall');
	// 	getTerrainAt.withArgs(1, 0, 'roomName0').returns('swamp');
	// 	getTerrainAt.withArgs(1, -1, 'roomName0').returns('wall');
	// 	getTerrainAt.withArgs(0, 1, 'roomName0').returns('wall');
	// 	getTerrainAt.withArgs(0, -1, 'roomName0').returns('plain');
	// 	getTerrainAt.withArgs(-1, 1, 'roomName0').returns('wall');
	// 	getTerrainAt.withArgs(-1, 0, 'roomName0').returns('wall');
	// 	getTerrainAt.withArgs(-1, -1, 'roomName0').returns('wall');
	//
	// 	getTerrainAt.withArgs(11, 11, 'roomName0').returns('wall');
	// 	getTerrainAt.withArgs(11, 10, 'roomName0').returns('wall');
	// 	getTerrainAt.withArgs(11, 9, 'roomName0').returns('wall');
	// 	getTerrainAt.withArgs(10, 11, 'roomName0').returns('swamp');
	// 	getTerrainAt.withArgs(10, 9, 'roomName0').returns('wall');
	// 	getTerrainAt.withArgs(9, 11, 'roomName0').returns('wall');
	// 	getTerrainAt.withArgs(9, 10, 'roomName0').returns('wall');
	// 	getTerrainAt.withArgs(9, 9, 'roomName0').returns('wall');
	//
	// 	getTerrainAt.withArgs(6, 6, 'roomName1').returns('wall');
	// 	getTerrainAt.withArgs(6, 5, 'roomName1').returns('swamp');
	// 	getTerrainAt.withArgs(6, 4, 'roomName1').returns('wall');
	// 	getTerrainAt.withArgs(5, 6, 'roomName1').returns('plain');
	// 	getTerrainAt.withArgs(5, 4, 'roomName1').returns('wall');
	// 	getTerrainAt.withArgs(4, 6, 'roomName1').returns('wall');
	// 	getTerrainAt.withArgs(4, 5, 'roomName1').returns('plain');
	// 	getTerrainAt.withArgs(4, 4, 'roomName1').returns('wall');
	//
	// 	MemoryManager.initRoomInfos();
	//
	// 	const sourceInfo0_0 = new SourceInfo();
	// 	sourceInfo0_0.accessPoints['1'] = new AccessPoint(new Position(1, 0));
	// 	sourceInfo0_0.accessPoints['4'] = new AccessPoint(new Position(0, -1));
	//
	// 	const sourceInfo0_1 = new SourceInfo();
	// 	sourceInfo0_1.accessPoints['3'] = new AccessPoint(new Position(10, 11));
	//
	// 	const sourceInfo1_0 = new SourceInfo();
	// 	sourceInfo1_0.accessPoints['1'] = new AccessPoint(new Position(6, 5));
	// 	sourceInfo1_0.accessPoints['3'] = new AccessPoint(new Position(5, 6));
	// 	sourceInfo1_0.accessPoints['6'] = new AccessPoint(new Position(4, 5));
	//
	// 	expect(Memory.roomInfos).to.eql({
	// 		roomName0: {
	// 			sourceInfos: {
	// 				sourceid0_0: sourceInfo0_0,
	// 				sourceid0_1: sourceInfo0_1
	// 			}
	// 		},
	// 		roomName1: {
	// 			sourceInfos: {
	// 				sourceid1_0: sourceInfo1_0
	// 			}
	// 		}
	// 	});
	//
	// 	/*eslint-disable no-console */
	// 	expect(console.log).to.have.been.calledWith('Memory manager init room roomName0');
	// });

	// it('should not do anything if room info already present', () => {
	// 	const roomInfo = {
	// 		foo: 'bar'
	// 	};
	// 	Memory.roomInfos['roomName0'] = roomInfo;
	//
	// 	MemoryManager.initRoomInfos();
	//
	// 	expect(Memory.roomInfos['roomName0']).to.eql(roomInfo);
	// 	expect(console.log).to.not.have.been.called;
	// });

	describe('getAccessPoint', () => {
		it('should get access point', () => {
			const roomName = 'roomName0';
			const sourceId = 'sourceId0';
			const accessPointId = '0';
			const accessPoint = new AccessPoint(new Position(1, 2));

			Memory = {
				roomInfos: {
					roomName0: {
						sourceInfos: {
							sourceId0: {
								accessPoints: {
									'0': accessPoint
								}
							}
						}
					}
				}
			};

			const actual = MemoryManager.getAccessPoint(roomName, sourceId, accessPointId);
			expect(actual).to.eql(accessPoint);
		});
	});

	describe('getOpenAccessPoint', () => {
		beforeEach(() => {
			Memory.roomInfos = {
				roomName0: {
					sourceInfos: {
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
								'1': {
									creepId: 'creepId2'
								}
							}
						}
					}
				}
			};
		});

		it('should return undefined if no open access point', () => {
			const copy = _.clone(Memory.roomInfos);
			const actual = MemoryManager.getOpenAccessPoint('roomName0', 'creepId0');
			expect(actual).to.eql(undefined);
			expect(Memory.roomInfos).to.eql(copy);
		});

		it('should return open access point', () => {
			Memory.roomInfos.roomName0.sourceInfos.sourceId1.accessPoints['1'].creepId = null;

			const actual = MemoryManager.getOpenAccessPoint('roomName0', 'creepId0');
			expect(actual).to.eql({
				sourceId: 'sourceId1',
				accessPointId: '1'
			});
			expect(Memory.roomInfos.roomName0.sourceInfos.sourceId1.accessPoints['1'].creepId).to.eql('creepId0');
		});
	});
});
