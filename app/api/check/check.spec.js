const should = require('should');
const request = require('supertest');
const app = require('../../');
const syncDatabase = require('../../../bin/sync-database');
const models = require('../../models');

describe('GET /search', () => {
    before('sync database', (done) => {
        syncDatabase().then(() => done());
    });

    //before('insert 2 searchs into database', (done) => {
    //    models.Search.bulkCreate(searchs).then(() => done());
    //});

    // Init create, targets in redis for a search
    it('POST /create ', (done) => {
        request(app)
            .post('/search/naver')
            .send({
                user: 'fdde24e94820b11b482436e930df09858496e7f9d2a92b88e52a4429ddc5397b'
            })
            .set('Accept', 'application/vnd.api+json')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                console.log(res)
                done();
            });
    });

    // Store, target in redis for a search
    it('GET /search/:sns ', (done) => {
        request(app)
            .get('/search/naver')
            .set('Accept', 'application/vnd.api+json')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                done();
            });
    });

    after('clear up database', (done) => {
        syncDatabase().then(() => done());
    });

});