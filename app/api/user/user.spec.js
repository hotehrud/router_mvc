const should = require('should');
const request = require('supertest');
const app = require('../../');
const syncDatabase = require('../../../bin/sync-database');
const models = require('../../models');

describe('GET /users', () => {
    before('sync database', (done) => {
        syncDatabase().then(() => done());
    });

    const users = [
        {member_name: 'alice'},
        {member_name: 'bek'},
        {member_name: 'chris'}
    ];
    before('insert 3 users into database', (done) => {
        models.User.bulkCreate(users).then(() => done());
    });


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
                res.body.should.be.an.instanceof(Array).and.have.length(0);
                res.body.map(user => {
                    user.should.have.properties('member_id', 'member_name');
                    user.member_id.should.be.a.Number();
                    user.member_name.should.be.a.String();
                });
                done();
            });
    });

    it('should return 200 status code', (done) => {
        request(app)
            .put('/users/1')
            .send({
                member_name: 'foo'
            })
            .end((err, res) => {
                if (err) throw err;
                done();
            });
    });


    after('clear up database', (done) => {
        syncDatabase().then(() => done());
    });

});