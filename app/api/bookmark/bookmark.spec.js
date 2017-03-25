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

    // create bookmark
    it('POST /bookmark ', (done) => {
        request(app)
            .post('/bookmark')
            .send({
                search_seq: 1
            })
            .set('Accept', 'application/vnd.api+json')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                console.log(res)
                done();
            });
    });

    // bookmark search for specific keyword
    it('GET /bookmark/spec/:id ', (done) => {
        request(app)
            .get('/bookmark/spec/1')
            .set('Accept', 'application/vnd.api+json')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                done();
            });
    });

    // All bookmark search
    it('GET /bookmark/list ', (done) => {
        request(app)
            .get('/bookmark/list')
            .set('Accept', 'application/vnd.api+json')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                done();
            });
    });

    // bookmark delete
    it('DELETE /bookmark/:id ', (done) => {
        request(app)
            .delete('/bookmark/1')
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