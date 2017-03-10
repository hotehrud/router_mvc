const apiProperties = {
    naver: {
        headers: {'X-Naver-Client-Id':'NXUnBi1hGRDD0YALBt0h', 'X-Naver-Client-Secret': 'As4fRZod9c'},
        client_id: 'NXUnBi1hGRDD0YALBt0h',
        client_secret: 'As4fRZod9c',
        callback_url: 'http://52.79.164.94:3000/user/auth/naver/callback',
        token_url: 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code',
        profile_url: 'https://openapi.naver.com/v1/nid/me',
        token: ['client_id', 'client_secret', 'code', 'state']
    }
}

module.exports = apiProperties;