const apiProperties = {
    naver: {
        headers: {'X-Naver-Client-Id':'NXUnBi1hGRDD0YALBt0h', 'X-Naver-Client-Secret': 'As4fRZod9c'},
        client_id: 'NXUnBi1hGRDD0YALBt0h',
        client_secret: 'As4fRZod9c',
        page_url: 'https://nid.naver.com/oauth2.0/authorize?response_type=code',
        token_url: 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code',
        token: ['client_id', 'client_secret', 'code', 'state']
    }
}

module.exports = apiProperties;