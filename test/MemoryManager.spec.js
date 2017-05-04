'use strict';

require('./lib/common.js');

const MemoryManager = require('../src/MemoryManager');

desc('MemoryManager', () => {
	it('should init room infos', () => {
		const find0 = sandbox.stub();
		const find1 = sandbox.stub();
		const getTerrainAt = sandbox.stub();

		Game.rooms = {
			'roomName0': {
				name: 'roomName0',
				find: find0
			},
			'roomName1': {
				name: 'roomName1',
				find: find1
			},
			map: {
				getTerrainAt: getTerrainAt
			}
		}

		Memory = {};

		const source0_0 = {
			room: {
				name: 'roomName0',
				pos: new RoomPosition(0, 0, 'roomName0')
			}
		};
		const source0_1 = {
			room: {
				name: 'roomName0',
				pos: new RoomPosition(10, 10, 'roomName0')
			}
		};
		find0.returns([source0_0, source0_1]);

		const source1_0 = {
			room: {
				name: 'roomName0',
				pos: new RoomPosition(5, 5, 'roomName1')
			}
		};
		find1.returns([source1_0]);

		getTerrainAt.withArgs(1, 1, 'roomName0').returns('wall');
		getTerrainAt.withArgs(1, 0, 'roomName0').returns('wall');
		getTerrainAt.withArgs(1, -1, 'roomName0').returns('wall');
		getTerrainAt.withArgs(0, 1, 'roomName0').returns('wall');
		getTerrainAt.withArgs(0, -1, 'roomName0').returns('wall');
		getTerrainAt.withArgs(-1, 1, 'roomName0').returns('wall');
		getTerrainAt.withArgs(-1, 0, 'roomName0').returns('wall');
		getTerrainAt.withArgs(-1, -1, 'roomName0').returns('wall');

		getTerrainAt.withArgs(11, 11, 'roomName0').returns('wall');
		getTerrainAt.withArgs(11, 0, 'roomName0').returns('wall');
		getTerrainAt.withArgs(11, 9, 'roomName0').returns('wall');
		getTerrainAt.withArgs(0, 11, 'roomName0').returns('wall');
		getTerrainAt.withArgs(0, 9, 'roomName0').returns('wall');
		getTerrainAt.withArgs(9, 11, 'roomName0').returns('wall');
		getTerrainAt.withArgs(9, 0, 'roomName0').returns('wall');
		getTerrainAt.withArgs(9, 9, 'roomName0').returns('wall');

		getTerrainAt.withArgs(6, 6, 'roomName1').returns('wall');
		getTerrainAt.withArgs(6, 0, 'roomName1').returns('wall');
		getTerrainAt.withArgs(6, 4, 'roomName1').returns('wall');
		getTerrainAt.withArgs(0, 6, 'roomName1').returns('wall');
		getTerrainAt.withArgs(0, 4, 'roomName1').returns('wall');
		getTerrainAt.withArgs(4, 6, 'roomName1').returns('wall');
		getTerrainAt.withArgs(4, 0, 'roomName1').returns('wall');
		getTerrainAt.withArgs(4, 4, 'roomName1').returns('wall');

		MemoryManager.initRoomInfos();
	});
});
