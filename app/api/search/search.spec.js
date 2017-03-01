const should = require('should');
const request = require('supertest');
const app = require('../../');
const syncDatabase = require('../../../bin/sync-database');
const models = require('../../models');

describe('GET /search', () => {
    before('sync database', (done) => {
        syncDatabase().then(() => done());
    });

    const keywords = [
        {keyword_name: 'test'},
        {keyword_name: '박근혜'},
        {keyword_name: '최순실'}
    ];

    const searchs = [
        {
            search_seq: 1,
            search_keyword: "test",
            search_group: "searchBlog",
            search_title: "플로이드 와샬 알고리즘 :: <b>마이구미</b>",
            search_link: "http://mygumi.tistory.com/110",
            search_desc: "플로이드 와샬 알고리즘 :: <b>마이구미</b> 알고리즘 2017.01.27 22:36 이번 글은 플로이드 와샬 알고리즘에... 플로이드 관련 문제 소스 Github URL https://github.com/hotehrud/acmicpc/tree/master/graph <b>마이구미</b>... ",
            search_image: null,
            search_author: "마이구미의 HelloWorld",
            search_date: null,
            createdAt: "2017-02-28T06:02:22.000Z",
            updatedAt: "2017-02-28T06:02:22.000Z"
        },
        {
            search_seq: 2,
            search_keyword: "test",
            search_group: "searchBlog",
            search_title: "Atomic Operation이란? :: <b>마이구미</b>",
            search_link: "http://mygumi.tistory.com/111",
            search_desc: ":: <b>마이구미</b> 운영체제 2017.01.28 16:48 이번 글은 Atomic Operation 에 대해 다뤄본다. Atomic Operation은... com/112 <b>마이구미</b> 녹차라떼주쇼 웹 개발 마스터의 날까지 Tag atomic operation , 비원자 연산 , 원자... ",
            search_image: null,
            search_author: "마이구미의 HelloWorld",
            search_date: null,
            createdAt: "2017-02-28T06:02:22.000Z",
            updatedAt: "2017-02-28T06:02:22.000Z"
        }
    ];

    before('insert 3 keywords into database', (done) => {
        models.Keyword.bulkCreate(keywords).then(() => done());
    });

    before('insert 3 searchs into database', (done) => {
        models.Search.bulkCreate(searchs).then(() => done());
    });

    it('should return 200 status code', (done) => {
        request(app)
            .get('/search')
            .set('Accept', 'application/vnd.api+json')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done();
            })
    });

    it('should return array', (done) => {
        request(app)
            .get('/search/test?sns=naver&type=searchBlog')
            .set('Accept', 'application/vnd.api+json')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                res.body.should.be.an.instanceof(Object);

                res.body.should.have.lengthOf(2);

                res.body[0].should.have.property('search_keyword', 'test');
                res.body[0].should.have.property('search_group', 'searchBlog');
                res.body[0].search_keyword.should.be.a.String();
                res.body[0].search_group.should.be.a.String();

                done();
            });
    });

    after('clear up database', (done) => {
        syncDatabase().then(() => done());
    });

});