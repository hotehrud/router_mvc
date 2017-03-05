const should = require('should');
const request = require('supertest');
const app = require('../../');
const syncDatabase = require('../../../bin/sync-database');
const models = require('../../models');

describe('GET /keyword', () => {
    before('sync database', (done) => {
        syncDatabase().then(() => done());
    });

    const keywords = [
        {keyword_name: '촛불집회',keyword_count: 10},
        {keyword_name: '박근혜',keyword_count: 1},
        {keyword_name: '최순실',keyword_count: 2},
        {keyword_name: '정부',keyword_count: 5},
        {keyword_name: '대선',keyword_count: 4},
        {keyword_name: 't',keyword_count: 41}
    ];

    before('insert 3 keywords into database', (done) => {
        models.Keyword.bulkCreate(keywords).then(() => done());
    });

    it('should return 200 status code', (done) => {
        request(app)
            .get('/keyword')
            .set('Accept', 'application/vnd.api+json')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done();
            })
    });

    // /keyword/spec
    it('keyword/spec', (done) => {
        request(app)
            .get('/keyword/spec/t')
            .set('Accept', 'application/vnd.api+json')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                res.body.should.be.an.instanceof(Object);

                res.body.should.have.property('keyword_name', 't');
                res.body.should.have.property('keyword_count', 41);
                res.body.keyword_name.should.be.a.String();
                res.body.keyword_count.should.be.a.Number();

                done();
            });
    });

    // /keyword/list
    it('keyword/list', (done) => {
        request(app)
            .get('/keyword/list?pageno=')
            .set('Accept', 'application/vnd.api+json')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                done();
            });
    });

    // /keyword/rank
    it('keyword/rank', (done) => {
        request(app)
            .get('/keyword/rank?pageno=')
            .set('Accept', 'application/vnd.api+json')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                res.body[0].should.have.property('keyword_name', 't');

                done();
            });
    });

    // /keyword -> redis
    it('keyword -> redis', (done) => {
        request(app)
            .post('/keyword')
            .send({
                keyword_name: 'test',
                keyword_count: 1111
            })
            .set('Accept', 'application/vnd.api+json')
            .expect(204)
            .end((err, res) => {
                if (err) throw err;

                done();
            });
    });


    after('clear up database', (done) => {
        syncDatabase().then(() => done());
    });

});