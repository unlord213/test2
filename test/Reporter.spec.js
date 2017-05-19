'use strict';

const Reporter = require('../src/Reporter');
const MemoryManager = require('../src/MemoryManager');

require('./lib/common.js');

desc('Reporter', () => {
	describe('report', () => {
		it('should output information', () => {
			const roomInfo0 = {
				energyStructureInfos: {
					spawns: {
						spawnId0_0: {
							energy: 12,
							energyCapacity: 13,
							transfers: {}
						},
						spawnId0_1: {
							energy: 14,
							energyCapacity: 15,
							transfers: {
								creepName0_1: 1
							}
						}
					}
				},
				sourceInfos: {
					sourceId0_0: {
						accessPoints: {
							'0': {},
							'1': {}
						}
					},
					sourceId0_1: {
						accessPoints: {
							'0': {
								creepName: 'creepName0_1'
							},
							'1': {}
						}
					}

				}
			};
			const roomInfo2 = {
				energyStructureInfos: {
					spawns: {
						spawnId2_0: {
							energy: 16,
							energyCapacity: 17,
							transfers: {
								creepName2_0: 1,
								creepName2_1: 2,
							}
						}
					}
				},
				sourceInfos: {
					sourceId2_0: {
						accessPoints: {
							'0': {
								creepName: 'creepName2_2'
							},
							'1': {
								creepName: 'creepName2_3'
							}
						}
					},
				}
			};

			Game.time = 42;
			Game.rooms = {
				roomName0: {},
				roomName1: {},
				roomName2: {}
			};
			Game.creeps = {
				creepName42: {
					memory: {
						actionInfo: {
							foo: 'bar'
						}
					}
				},
				creepName43: {
					memory: {
						actionInfo: {
							bar: 'foo'
						}
					}
				}
			};

			sandbox.stub(MemoryManager, 'getRoomInfo');
			MemoryManager.getRoomInfo.withArgs('roomName0').returns(roomInfo0);
			MemoryManager.getRoomInfo.withArgs('roomName1').returns(undefined);
			MemoryManager.getRoomInfo.withArgs('roomName2').returns(roomInfo2);

			sandbox.stub(console, 'log');

			Reporter.report();

			/*eslint-disable no-console */
			expect(console.log.callCount).to.eql(17);
			expect(console.log.getCall(0).args[0]).to.eql(Reporter.SPAN_PURPLE + 'Tick 42' + Reporter.SPAN_CLOSE);
			expect(console.log.getCall(1).args[0]).to.eql('3 rooms');

			expect(console.log.getCall(2).args[0]).to.eql(Reporter.SPAN_ORANGE + 'roomName0' + Reporter.SPAN_CLOSE);
			expect(console.log.getCall(3).args[0]).to.eql(Reporter.SPAN_GREEN + '2 spawns' + Reporter.SPAN_CLOSE);
			expect(console.log.getCall(4).args[0]).to.eql('spawnId0_0: 12/13 energy, 0 transfers');
			expect(console.log.getCall(5).args[0]).to.eql('spawnId0_1: 14/15 energy, 1 transfers');
			expect(console.log.getCall(6).args[0]).to.eql(Reporter.SPAN_GREEN + '2 sources' + Reporter.SPAN_CLOSE);
			expect(console.log.getCall(7).args[0]).to.eql('sourceId0_0: 2 open access points');
			expect(console.log.getCall(8).args[0]).to.eql('sourceId0_1: 1 open access points');

			expect(console.log.getCall(9).args[0]).to.eql(Reporter.SPAN_ORANGE + 'roomName2' + Reporter.SPAN_CLOSE);
			expect(console.log.getCall(10).args[0]).to.eql(Reporter.SPAN_GREEN + '1 spawns' + Reporter.SPAN_CLOSE);
			expect(console.log.getCall(11).args[0]).to.eql('spawnId2_0: 16/17 energy, 2 transfers');
			expect(console.log.getCall(12).args[0]).to.eql(Reporter.SPAN_GREEN + '1 sources' + Reporter.SPAN_CLOSE);
			expect(console.log.getCall(13).args[0]).to.eql('sourceId2_0: 0 open access points');

			expect(console.log.getCall(14).args[0]).to.eql(Reporter.SPAN_ORANGE + 'Creeps' + Reporter.SPAN_CLOSE);
			expect(console.log.getCall(15).args[0]).to.eql('creepName42: {"foo":"bar"}');
			expect(console.log.getCall(16).args[0]).to.eql('creepName43: {"bar":"foo"}');

			expect(console.log).to.not.have.been.calledWith(Reporter.SPAN_ORANGE + 'roomName1' + Reporter.SPAN_CLOSE);
		});
	});
});
