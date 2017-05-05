'use strict';

require('./lib/common.js');

const SourceManager = require('../src/SourceManager');

desc('SourceManager', () => {
	beforeEach(() => {
		/*eslint-disable no-global-assign */
		Memory = {};
	});

	describe('getOpenAccessPoint', () => {
		// let creepId;

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

	// describe('getUnmappedSource', () => {
	// 	const sourceId1 = 'foo';
	// 	const source1 = {
	// 		id: sourceId1,
	// 		mapped: true
	// 	};
	//
	// 	beforeEach(() => {
	// 		Memory.my = {
	// 			sourceInfos: {
	// 				foo: source1,
	// 				bar: null
	// 			}
	// 		};
	// 	});
	//
	// 	it('should return undefined if no unmapped sources', function() {
	// 		Memory.my.sourceInfos.bar = source1;
	//
	// 		const actual = SourceManager.getUnmappedSource();
	// 		expect(actual).to.eql(undefined);
	// 	});
	//
	// 	it('should return source id', () => {
	// 		const sourceId2 = 'bar';
	// 		const source2 = {
	// 			id: sourceId2,
	// 			mapped: false
	// 		};
	// 		Memory.my.sourceInfos.bar = source2;
	//
	// 		const actual = SourceManager.getUnmappedSource();
	// 		expect(actual).to.eql(sourceId2);
	// 	});
	// });

	// describe('getAccesPointPosition', () => {
	// 	const pos = {
	// 		foo: 'bar'
	// 	};
	// 	const sourceId = 'foo';
	// 	const accessPointId = '0';
	//
	// 	beforeEach(() => {
	// 		Memory.my = {
	// 			sourceInfos: {
	// 				'foo': {
	// 					accessPoints: {
	// 						'0': {
	// 							roomPosition: pos
	// 						}
	// 					}
	// 				}
	// 			}
	// 		};
	// 	});
	//
	// 	it('should return undefined if no source info', () => {
	// 		const actual = SourceManager.getAccesPointPosition('bar', accessPointId);
	// 		expect(actual).to.eql(undefined);
	// 	});
	//
	// 	it('should return undefined if no access point', () => {
	// 		const actual = SourceManager.getAccesPointPosition(sourceId, '1');
	// 		expect(actual).to.eql(undefined);
	// 	});
	//
	// 	it('should get access point position', () => {
	// 		const actual = SourceManager.getAccesPointPosition(sourceId, accessPointId);
	// 		expect(actual).to.eql(pos);
	// 	});
	// });

	// describe('getSourceInfo', () => {
	// 	it('should get source info', () => {
	// 		const source = {
	// 			foo: 'bar'
	// 		};
	// 		const sourceId = 'foo';
	// 		Memory.roomInfos = {
	// 			roomName0: {
	// 				sourceInfos: {
	// 					sourceId0: source
	// 				}
	// 			}
	// 		};
	// 		// Memory.my = {
	// 		// 	sourceInfos: {
	// 		// 		'foo': source
	// 		// 	}
	// 		// };
	//
	// 		const actual = SourceManager.getSourceInfo(sourceId);
	// 		expect(actual).to.eql(source);
	// 	});
	// });

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
});
