const should = require('should');
const request = require('supertest');
const app = require('../../');
const syncDatabase = require('../../../bin/sync-database');
const models = require('../../models');

describe('GET /search', () => {
    before('sync database', (done) => {
        syncDatabase().then(() => done());
    });

    //// Through redis, select the target
    //it('GET /search/check/마이구미?type=searchBlog', (done) => {
    //    request(app)
    //        .get('/search/check/마이구미?type=searchBlog')
    //        .set('Accept', 'application/vnd.api+json')
    //        .expect(200)
    //        .end((err, res) => {
    //            if (err) throw err;
    //
    //            done();
    //        })
    //});

    after('clear up database', (done) => {
        syncDatabase().then(() => done());
    });

});