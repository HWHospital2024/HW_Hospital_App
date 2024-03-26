process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require("mongoose");
const should = chai.should();

const server = require('../app')
const { patient } = require('./db')

chai.use(chaiHttp)


const nurseUsername = `TestUser${Math.floor(Math.random() * 1000000000)}`
const clerkUsername = `TestUser${Math.floor(Math.random() * 1000000000)}`;
const password = 'password123';
let NURSE_AUTH_TOKEN = '';
let CLERK_AUTH_TOKEN = '';

const REG_USER = {
  username: nurseUsername,
  password,
  role: 'nurse',
  dept: 'OPD'
}

const LOGIN_USER = {
  username: nurseUsername,
  password,
}

describe('USER REGISTRATION', () => {
  describe('POST /users/register', () => {

    it('it should not register if required field missing', (done) => {
      chai.request(server)
        .post('/users/register')
        .send({
          ...REG_USER,
          username: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('username');
          done();
        })
    })

    it('it should successfully register a nurse user', (done) => {
      chai.request(server)
        .post('/users/register')
        .send(REG_USER)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.staff.role.should.equal('nurse')
          done();
        })
    })

    it('it should successfully register a clerk user', (done) => {
      chai.request(server)
        .post('/users/register')
        .send({
          ...REG_USER,
          username: clerkUsername,
          role: 'clerk'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.staff.role.should.equal('clerk')
          done();
        })
    })
  })
})


describe('USER LOGIN', () => {
  it('it should not login if required field missing', (done) => {
    chai.request(server)
      .post('/users/login')
      .send({
        ...LOGIN_USER,
        password: ''
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error')
        done()
      })
  });
  it('it should login nurse user successfully', (done) => {
    chai.request(server)
      .post('/users/login')
      .send(LOGIN_USER)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token')
        res.body.should.have.property('staff')

        NURSE_AUTH_TOKEN = res.body.token
        done();
      })
  })

  it('it should login clerk user successfully', (done) => {
    chai.request(server)
      .post('/users/login')
      .send({
        ...LOGIN_USER,
        username: clerkUsername
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token')
        res.body.should.have.property('staff')
        res.body.staff.role.should.equal('clerk')

        CLERK_AUTH_TOKEN = res.body.token
        done();
      })
  })
})


describe('PATIENT CREATION', () => {
  it('it should create patient successfully', (done) => {
    chai.request(server)
      .post('/patients')
      .set('Authorization', `Bearer ${CLERK_AUTH_TOKEN}`)
      .send(patient)
      .end((err, res) => {
        res.should.have.status(201)
        res.body.should.have.property('personalDetails')
        done()
      })
  });

  it('it should not create duplicate patient', (done) => {
    chai.request(server)
      .post('/patients')
      .set('Authorization', `Bearer ${CLERK_AUTH_TOKEN}`)
      .send(patient)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('code')
        done()
        process.exit(0);
      })
  })

  it('it should not create patient with nurse user', (done) => {
    chai.request(server)
      .post('/users/login')
      .send(LOGIN_USER)
      .end((err, res) => {
        NURSE_AUTH_TOKEN = res.body.token
        done();
      })

    chai.request(server)
    .post('/patients')
    .set('Authorization', `Bearer ${NURSE_AUTH_TOKEN}`)
    .send(patient)
    .end((err, res) => {
        res.should.have.status(403)
      })
  })
})
