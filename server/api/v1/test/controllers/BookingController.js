import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../../../app';

dotenv.config();

chai.use(chaiHttp);
const { expect } = chai;
const bearer = 'Bearer ';
let token;

describe('Booking controller methods', () => {
    it('should book a trip', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'firstuser1@mail.com', password: process.env.USER1_PASSWORD
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                token = bearer + res.body.data.token;
                chai.request(app)
                    .post('/api/v1/bookings')
                    .set('Authorization', token)
                    .send({
                        token,
                        trip_id: '2'
                    })
                    .end((error, response) => {
                        expect(response.body).to.have.property('status');
                        expect(response.body.status).to.equal('success');
                        expect(response.body).to.have.property('data');
                        expect(response.body.data).to.have.property('id');
                        expect(response.body.data).to.have.property('user_id');
                        expect(response.body.data).to.have.property('trip_id');
                        expect(response.body.data).to.have.property('bus_id');
                        expect(response.body.data).to.have.property('trip_date');
                        expect(response.body.data).to.have.property('seat_number');
                        expect(response.body.data).to.have.property('first_name');
                        expect(response.body.data).to.have.property('last_name');
                        expect(response.body.data).to.have.property('email');
                        expect(response.status).to.equal(201);
                        done();
                    });
            });
    });
    it('user should view all his/her bookings', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'firstuser1@mail.com', password: process.env.USER1_PASSWORD
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                token = bearer + res.body.data.token;
                chai.request(app)
                    .get('/api/v1/bookings')
                    .set('Authorization', token)
                    .send({
                        token,
                        trip_id: '2'
                    })
                    .end((error, response) => {
                        expect(response.body).to.have.property('status');
                        expect(response.body.status).to.equal('success');
                        expect(response.body).to.have.property('data');
                        expect(response.body.data).to.be.an('array');
                        expect(response.body.data[0]).to.have.property('id');
                        expect(response.body.data[0]).to.have.property('user_id');
                        expect(response.body.data[0]).to.have.property('trip_id');
                        expect(response.body.data[0]).to.have.property('bus_id');
                        expect(response.body.data[0]).to.have.property('trip_date');
                        expect(response.body.data[0]).to.have.property('seat_number');
                        expect(response.body.data[0]).to.have.property('first_name');
                        expect(response.body.data[0]).to.have.property('last_name');
                        expect(response.body.data[0]).to.have.property('email');
                        expect(response.status).to.equal(200);
                        done();
                    });
            });
    });
    it('admin should view all bookings', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'admin@mail.com', password: process.env.ADMIN_PASSWORD
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                token = bearer + res.body.data.token;
                chai.request(app)
                    .get('/api/v1/bookings')
                    .set('Authorization', token)
                    .send({
                        token,
                        trip_id: '2'
                    })
                    .end((error, response) => {
                        expect(response.body).to.have.property('status');
                        expect(response.body.status).to.equal('success');
                        expect(response.body).to.have.property('data');
                        expect(response.body.data).to.be.an('array');
                        expect(response.body.data[0]).to.have.property('id');
                        expect(response.body.data[0]).to.have.property('user_id');
                        expect(response.body.data[0]).to.have.property('trip_id');
                        expect(response.body.data[0]).to.have.property('bus_id');
                        expect(response.body.data[0]).to.have.property('trip_date');
                        expect(response.body.data[0]).to.have.property('seat_number');
                        expect(response.body.data[0]).to.have.property('first_name');
                        expect(response.body.data[0]).to.have.property('last_name');
                        expect(response.body.data[0]).to.have.property('email');
                        expect(response.status).to.equal(200);
                        done();
                    });
            });
    });
    it('user can delete booking', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'admin@mail.com', password: process.env.ADMIN_PASSWORD
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                token = bearer + res.body.data.token;
                chai.request(app)
                    .post('/api/v1/bookings')
                    .set('Authorization', token)
                    .send({
                        token,
                        trip_id: '2',
                        seat_number: '22'
                    })
                    .end(() => {
                        expect(res.status).to.equal(200);
                        chai.request(app)
                            .delete('/api/v1/bookings/3')
                            .set('Authorization', token)
                            .send({
                                token
                            })
                            .end((error, response) => {
                                expect(response.body).to.have.property('status');
                                expect(response.body.status).to.equal('success');
                                expect(response.body).to.have.property('data');
                                expect(response.body.data).to.have.property('message');
                                expect(response.body.data.message).to.equal('Booking deleted successfully');
                                expect(response.status).to.equal(200);
                                done();
                            });
                    });
            });
    });
});
