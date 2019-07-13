import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../../../../app';

dotenv.config();

chai.use(chaiHttp);
const { expect } = chai;
const bearer = 'Bearer ';
let token;

describe('Verify request token', () => {
    it('should return error message when passed wrong token', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'admin@mail.com', password: process.env.ADMIN_PASSWORD
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                token = `${bearer} incorrect_token`;
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
                        expect(response.body.status).to.equal('error');
                        expect(response.body).to.have.property('error');
                        expect(response.body.error).to.equal('You do not have permission to access this resource');
                        expect(response.status).to.equal(403);
                        done();
                    });
            });
    });
    it('should return error message when not passed token', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'admin@mail.com', password: process.env.ADMIN_PASSWORD
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                chai.request(app)
                    .post('/api/v1/trips')
                    .send({
                        bus_id: '3',
                        origin: 'lagos',
                        destination: 'abuja',
                        trip_date: '7-13-2019',
                        fare: '3333.00'
                    })
                    .end((error, response) => {
                        expect(response.body).to.have.property('status');
                        expect(response.body.status).to.equal('error');
                        expect(response.body).to.have.property('error');
                        expect(response.body.error).to.equal('Authorization credential is required');
                        expect(response.status).to.equal(401);
                        done();
                    });
            });
    });
});
