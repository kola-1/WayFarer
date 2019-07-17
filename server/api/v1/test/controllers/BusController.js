import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../../../app';

dotenv.config();

chai.use(chaiHttp);
const { expect } = chai;
const bearer = 'Bearer ';
let token;

describe('Bus controller methods', () => {
    it('should add a bus', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'admin@mail.com', password: process.env.ADMIN_PASSWORD
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                token = bearer + res.body.data.token;
                chai.request(app)
                    .post('/api/v1/buses')
                    .set('Authorization', token)
                    .send({
                        number_plate: 'HGH788',
                        manufacturer: 'NISSAN',
                        model: 'NEW MODEL',
                        year: '2014',
                        capacity: '34'
                    })
                    .end((error, response) => {
                        expect(response.body).to.have.property('status');
                        expect(response.body.status).to.equal('success');
                        expect(response.body).to.have.property('data');
                        expect(response.body.data).to.have.property('message');
                        expect(response.body.data).to.have.property('id');
                        expect(response.status).to.equal(201);
                        done();
                    });
            });
    });
    it('should return error when passed invalid bus capacity value', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'admin@mail.com', password: process.env.ADMIN_PASSWORD
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                token = bearer + res.body.data.token;
                chai.request(app)
                    .post('/api/v1/buses')
                    .set('Authorization', token)
                    .send({
                        number_plate: 'HGH788',
                        manufacturer: 'NISSAN',
                        model: 'NEW MODEL',
                        year: '2014',
                        capacity: '3400000'
                    })
                    .end((error, response) => {
                        expect(response.body).to.have.property('status');
                        expect(response.body.status).to.equal('error');
                        expect(response.body).to.have.property('error');
                        expect(response.status).to.equal(422);
                        done();
                    });
            });
    });
});
