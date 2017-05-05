'use strict';

require('./lib/common.js');

const SourceManager = require('../src/SourceManager');

desc('SourceManager', () => {
	beforeEach(() => {
		/*eslint-disable no-global-assign */
		Memory = {};
	});

	describe('getAccessPoint', () => {
		it('should get access point', () => {
			const actual = SourceManager.getAccessPoint(roomName, sourceId, accessPointId);
			expect(actual).to.eql(accessPoint);
		});
	});

	describe('getSource', () => {
		it('should get source', () => {
			const sourceId = 'foo';
			const source = {
				foo: 'bar'
			};
			sandbox.stub(Game, 'getObjectById').returns(source);

			const actual = SourceManager.getSource(sourceId);
			expect(actual).to.eql(source);
			expect(Game.getObjectById).to.have.been.calledWith(sourceId);
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
			const actual = SourceManager.getOpenAccessPoint('roomName0');
			expect(actual).to.eql(undefined);
		});

		it('should return open access point', () => {
			Memory.roomInfos.roomName0.sourceInfos.sourceId1.accessPoints['1'].creepId = null;

			const actual = SourceManager.getOpenAccessPoint('roomName0');
			expect(actual).to.eql({
				sourceId: 'sourceId1',
				accessPointId: '1'
			});
		});
	});
});
