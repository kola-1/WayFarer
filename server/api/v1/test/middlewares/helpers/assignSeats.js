import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../../../../app';

dotenv.config();

chai.use(chaiHttp);
const { expect } = chai;
const bearer = 'Bearer ';
let token;

describe('Assign a seat ', () => {
    it('should return error message when passed incorrect seat', (done) => {
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
                        trip_id: '3',
                        seat_number: '5'
                    })
                    .end((error, response) => {
                        expect(response.body).to.have.property('status');
                        expect(response.body.status).to.equal('error');
                        expect(response.body).to.have.property('error');
                        expect(response.body.error).to.equal('The requested seat has been booked');
                        expect(response.status).to.equal(409);
                        done();
                    });
            });
    });
});
