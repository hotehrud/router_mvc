const should = require('should');
const request = require('supertest');
const app = require('../../');
const syncDatabase = require('../../../bin/sync-database');
const models = require('../../models');

const redis = require('../../redis');

describe('GET /keyword', () => {

    before('redis', (done) => {
        redis.init(function(err) {
            if (err) throw err;

            app.listen(3000, () => {
                console.log('Example app listening on port ' + 3000);

                syncDatabase().then(() => {
                    console.log('Database sync');
                    done();
                })
            })
        });
    });

    const keywords = [
        {keyword_name: '촛불집회',keyword_group: 'default',keyword_count: 10, keyword_provider: 'daum'},
        {keyword_name: '박근혜',keyword_group: 'default',keyword_count: 1, keyword_provider: 'daum'},
        {keyword_name: '최순실',keyword_group: 'default',keyword_count: 2, keyword_provider: 'naver'},
        {keyword_name: '정부',keyword_group: 'default',keyword_count: 5, keyword_provider: 'daum'},
        {keyword_name: '대선',keyword_group: 'default',keyword_count: 4, keyword_provider: 'naver'},
        {keyword_name: 't',keyword_group: 'default',keyword_count: 41, keyword_provider: 'naver'}
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
                res.body.should.have.property('keyword_group', 'default');
                res.body.should.have.property('keyword_count', 41);
                res.body.should.have.property('keyword_provider', 'naver');
                res.body.keyword_name.should.be.a.String();
                res.body.keyword_group.should.be.a.String();
                res.body.keyword_count.should.be.a.Number();
                res.body.keyword_provider.should.be.a.String();

                done();
            });
    });

    // /keyword/list
    it('keyword/list', (done) => {
        request(app)
            .get('/keyword/list?pageno=')
            .set('Accept', 'application/vnd.api+json')
            .expect(200)
            .end((err) => {
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

    //keyword -> redis
    it('keyword/create', (done) => {
        request(app)
            .post('/keyword/count')
            .send({
                keyword_name: 'test',
                keyword_group: 'default',
                keyword_count: 1111,
                keyword_provider: 'naver'
            })
            .set('Accept', 'application/vnd.api+json')
            .expect(204)
            .end((err) => {
                if (err) throw err;

                done();
            });
    });

    after('clear up database', (done) => {
        syncDatabase().then(() => done());
    });

});