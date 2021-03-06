import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Verify user password', () => {
    it('should return error message when passed incorrect password', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'admin@mail.com', password: 'invalidUserPassword'
            })
            .end((err, res) => {
                expect(res.body).to.have.property('status');
                expect(res.body.status).to.equal('error');
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('invalid email or password');
                expect(res.status).to.equal(400);
                done();
            });
    });
});
