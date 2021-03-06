'use strict';
/* global describe, it, after, before, __dirname, global; */
const base = `${__dirname}/../../src`;

const Assert    = require('assert');
const Config    = require(`${base}/config`);
const Core      = require(`${base}/core`);
const Database  = Core.Database;
const Http	    = Core.Http;
const Router    = Core.Router;
const Itinerary = require(`${base}/itinerary/itineraryModel`);

describe('Bus API', () => {
	
	let server, host;
	
	before(function*() {
		let ip = '0.0.0.0', port = 8080;
		host = `http://${ip}:${port}`;

		var busMock = {
			line: '000', 
			order: 'order', 
			speed: 0, 
			direction: 0, 
			latitude: 20, 
			longitude: 30, 
			timestamp: new Date(), 
			sense: 'direction'
		};
		
		global.database = yield Database.connect();
		yield global.database.collection('bus').insert(busMock);
		yield global.database.collection('itinerary').insert(new Itinerary('000', 'direction', '', '000 direction', []));

		let router = new Router();
		router.registerResources(Config.resources);
		server = router.start(ip, port);
	});
	
	it('should get a list of all buses from a GET request to /v3/search/000', function*() {
		let data;
		try {
			var output = yield Http.get(`${host}/v3/search/000`);
			data = output;
		} catch(e) {
			data = e;
		} finally {
			Assert.equal(data.statusCode, 200);
			Assert.equal(data.body instanceof Array, true);
			Assert.equal(data.body.length, 1);
			Assert.equal(data.body[0].line, '000');
			Assert.equal(data.body[0].order, 'order');
			Assert.equal(data.body[0].speed, 0);
			Assert.equal(data.body[0].direction, 0);
			Assert.equal(data.body[0].sense, 'direction');
		}
	});
	
	it('should get a list with only one bus from a GET request to /v3/search/order', function*() {
		let data;
		try {
			var output = yield Http.get(`${host}/v3/search/order`);
			data = output;
		} catch(e) {
			data = e;
		} finally {
            Assert.equal(data.statusCode, 200);
			Assert.equal(data.body instanceof Array, true);
			Assert.equal(data.body.length, 1);
			Assert.equal(data.body[0].line, '000');
			Assert.equal(data.body[0].order, 'order');
			Assert.equal(data.body[0].speed, 0);
			Assert.equal(data.body[0].direction, 0);
			Assert.equal(data.body[0].sense, 'direction');
		}
	});
	
	it('should get a list with only one bus from a GET request to /v3/search/direction', function*() {
		let data;
		try {
			var output = yield Http.get(`${host}/v3/search/direction`);
			data = output;
		} catch(e) {
			data = e;
		} finally {
            Assert.equal(data.statusCode, 200);
			Assert.equal(data.body instanceof Array, true);
			Assert.equal(data.body.length, 1);
			Assert.equal(data.body[0].line, '000');
			Assert.equal(data.body[0].order, 'order');
			Assert.equal(data.body[0].speed, 0);
			Assert.equal(data.body[0].direction, 0);
			Assert.equal(data.body[0].sense, 'direction');
		}
	});
	
	it('should get an empty list from a GET request to /v3/search/unexisting', function*() {
		let data;
		try {
			var output = yield Http.get(`${host}/v3/search/unexisting`);
			data = output;
		} catch(e) {
			data = e;
		} finally {
            Assert.equal(data.statusCode, 404);
		}
	});
	
	after(function*() {
		server.close();
		yield global.database.collection('bus').remove({});
		yield global.database.collection('itinerary').remove({});
	});
});