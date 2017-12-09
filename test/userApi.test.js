var mongoose = require('mongoose')
var User = require('../api/models/User')


var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../server')
let should = chai.should();


chai.use(chaiHttp)


describe('Users', () => {
	describe('test userController.index', () => {
		it('it should have status 200', (done) => {
			chai.request(server)
			.get('/api')
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
		})
	})
})