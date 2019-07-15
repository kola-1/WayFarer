import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../../../app';

dotenv.config();

chai.use(chaiHttp);
const { expect } = chai;
const bearer = 'Bearer ';
let token;

describe('Trip controller methods', () => {
    it('should add a trip', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'admin@mail.com', password: process.env.ADMIN_PASSWORD
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                token = bearer + res.body.data.token;
                chai.request(app)
                    .post('/api/v1/trips')
                    .set('Authorization', token)
                    .send({
                        token,
                        bus_id: '3',
                        origin: 'lagos',
                        destination: 'abuja',
                        trip_date: '7-13-2019',
                        fare: '3333.00'
                    })
                    .end((error, response) => {
                        expect(response.body).to.have.property('status');
                        expect(response.body.status).to.equal('success');
                        expect(response.body).to.have.property('data');
                        expect(response.body.data).to.have.property('trip_id');
                        expect(response.body.data).to.have.property('origin');
                        expect(response.body.data.origin).to.equal('lagos');
                        expect(response.body.data).to.have.property('destination');
                        expect(response.body.data.destination).to.equal('abuja');
                        expect(response.body.data).to.have.property('trip_date');
                        expect(response.body.data.trip_date).to.equal('2019-07-13T00:00:00.000Z');
                        expect(response.body.data).to.have.property('fare');
                        expect(response.body.data.fare).to.equal('3333.00');
                        expect(response.status).to.equal(201);
                        done();
                    });
            });
    });
    it('should view all trip', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'admin@mail.com', password: process.env.ADMIN_PASSWORD
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                token = bearer + res.body.data.token;
                chai.request(app)
                    .get('/api/v1/trips')
                    .set('Authorization', token)
                    .send({
                        token
                    })
                    .end((error, response) => {
                        expect(response.body).to.have.property('status');
                        expect(response.body.status).to.equal('success');
                        expect(response.body).to.have.property('data');
                        expect(response.body.data).to.be.an('array');
                        expect(response.body.data[0]).to.have.property('trip_id');
                        expect(response.body.data[0]).to.have.property('bus_id');
                        expect(response.body.data[0]).to.have.property('origin');
                        expect(response.body.data[0]).to.have.property('destination');
                        expect(response.body.data[0]).to.have.property('trip_date');
                        expect(response.body.data[0]).to.have.property('fare');
                        expect(response.body.data[0]).to.have.property('status');
                        expect(response.status).to.equal(200);
                        done();
                    });
            });
    });
});
