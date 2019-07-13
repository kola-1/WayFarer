import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../../../../app';

dotenv.config();

chai.use(chaiHttp);
const { expect } = chai;

describe('Check if user already exist on signup', () => {
    it('should return error message if user already exist', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                first_name: 'aFirstname', last_name: 'aLastname', email: 'admin@mail.com', password: 'aPassword'
            })
            .end((err, res) => {
                expect(res.body).to.have.property('status');
                expect(res.body.status).to.equal('error');
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('The provided email already exist');
                expect(res.status).to.equal(409);
                done();
            });
    });
});
