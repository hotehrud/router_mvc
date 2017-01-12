const should = require('should');
const request = require('supertest');
const app = require('../../index');

describe('GET /users', () => {
    it('should return 200 status code', (done) => {
        request(app)
            .get('/users')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done();
            })
    });

    it('should return array', (done) => {
        request(app)
            .get('/users')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                res.body.should.be.an.instanceof(Array).and.have.length(7);
                res.body.map(user => {
                    user.should.have.properties('member_id', 'member_name');
                    user.member_id.should.be.a.Number();
                    user.member_name.should.be.a.String();
                });
                done();
            });
    });
});