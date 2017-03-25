const should = require('should');
const request = require('supertest');
const app = require('../../');
const syncDatabase = require('../../../bin/sync-database');
const models = require('../../models');

describe('GET /search', () => {
    before('sync database', (done) => {
        syncDatabase().then(() => done());
    });

    const searchs = [
        {
            search_seq: 1,
            search_keyword: "test",
            search_group: "searchBlog",
            search_provider: "naver",
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
            search_keyword: "ttt",
            search_group: "searchBlog",
            search_provider: "daum",
            search_title: "Atomic Operation이란? :: <b>마이구미</b>",
            search_link: "http://mygumi.tistory.com/111",
            search_desc: ":: <b>마이구미</b> 운영체제 2017.01.28 16:48 이번 글은 Atomic Operation 에 대해 다뤄본다. Atomic Operation은... com/112 <b>마이구미</b> 녹차라떼주쇼 웹 개발 마스터의 날까지 Tag atomic operation , 비원자 연산 , 원자... ",
            search_image: null,
            search_author: "마이구미의 HelloWorld",
            search_date: null,
            createdAt: "2017-02-28T06:02:22.000Z",
            updatedAt: "2017-02-28T06:02:22.000Z"
        },
        {
            search_seq: 3,
            search_keyword: "aaaa",
            search_group: "searchBlog",
            search_provider: "daum",
            search_title: "BBBB :: <b>마이구미</b>",
            search_link: "http://mygumi.tistory.com/112",
            search_desc: ":: <b>마이구미</b> 운영체제 2017.01.28 16:48 이번 글은 Atomic Operation 에 대해 다뤄본다. Atomic Operation은... com/112 <b>마이구미</b> 녹차라떼주쇼 웹 개발 마스터의 날까지 Tag atomic operation , 비원자 연산 , 원자... ",
            search_image: null,
            search_author: "마이구미의 HelloWorld",
            search_date: null,
            createdAt: "2017-02-28T06:02:22.000Z",
            updatedAt: "2017-02-28T06:02:22.000Z"
        }
    ];

    before('insert 2 searchs into database', (done) => {
        models.Search.bulkCreate(searchs).then(() => done());
    });

    // naver search contents get
    it('GET /search/naver ', (done) => {
        request(app)
            .get('/search/naver?&keyword=test&type=searchBlog')
            .set('Accept', 'application/vnd.api+json')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                const obj = res.body[0];

                obj.should.have.property('search_keyword', 'test');
                obj.should.have.property('search_group', 'searchBlog');
                obj.should.have.property('search_provider', 'naver');
                obj.search_keyword.should.be.a.String();
                obj.search_group.should.be.a.String();
                obj.search_provider.should.be.a.String();

                done();
            });
    });

    // daum search contents get
    it('GET /search/daum ', (done) => {
        request(app)
            .get('/search/daum?&keyword=aaaa&type=searchBlog')
            .set('Accept', 'application/vnd.api+json')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                const obj = res.body[0];

                obj.should.have.property('search_keyword', 'aaaa');
                obj.should.have.property('search_group', 'searchBlog');
                obj.should.have.property('search_provider', 'daum');
                obj.search_keyword.should.be.a.String();
                obj.search_group.should.be.a.String();
                obj.search_provider.should.be.a.String();

                done();
            });
    });

    // naver search contents insert
    it('POST /search/naver ', (done) => {
        request(app)
            .post('/search/naver')
            .send({
                api_url: 'https://openapi.naver.com/v1/search/blog?query=마이구미',
                keyword: '마이구미',
                group: 'searchBlog'
            })
            .set('Accept', 'application/vnd.api+json')
            .expect(204)
            .end((err) => {
                if (err) throw err;

                done();
            });
    });

    // daum search contents insert
    it('POST /search/daum ', (done) => {
        request(app)
            .post('/search/daum')
            .send({
                api_url: 'https://apis.daum.net/search/blog?apikey=a5b0eef3c46e86443e3b73624f11488a&output=json&q=%EB%A7%88%EC%9D%B4%EA%B5%AC%EB%AF%B8',
                keyword: '마이구미',
                group: 'searchBlog'
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