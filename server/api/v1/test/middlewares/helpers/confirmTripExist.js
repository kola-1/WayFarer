import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../../../../app';

dotenv.config();

chai.use(chaiHttp);
const { expect } = chai;
const bearer = 'Bearer ';
let token;

describe('Confirm trip exist ', () => {
    it('should return error message when passed incorrect trip', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'admin@mail.com', password: process.env.ADMIN_PASSWORD
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                token = bearer + res.body.data.token;
                chai.request(app)
                    .patch('/api/v1/trips/1300000000')
                    .set('Authorization', token)
                    .send({
                        token
                    })
                    .end((error, response) => {
                        expect(response.body).to.have.property('status');
                        expect(response.body.status).to.equal('error');
                        expect(response.body).to.have.property('error');
                        expect(response.body.error).to.equal('The specified trip does not exist');
                        expect(response.status).to.equal(404);
                        done();
                    });
            });
    });
});
