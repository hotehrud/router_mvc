const apiProperties = {
    naver: {
        headers: {'X-Naver-Client-Id':'NXUnBi1hGRDD0YALBt0h', 'X-Naver-Client-Secret': 'As4fRZod9c'},
        client_id: 'NXUnBi1hGRDD0YALBt0h',
        client_secret: 'As4fRZod9c',
        callback_url: 'http://52.79.164.94:3000/user/auth/naver/callback'
    },
    daum: {
        client_id: '8930561538932112719',
        client_secret: '1d22cc4b1e28e49364b49eef6570b979',
        callback_url: 'http://52.79.164.94:3000/user/auth/daum/callback'
    },
    kakao: {
        client_id: 'b0ddc9d169e22739be7eef6dcac37fa9',
        callback_url: 'http://52.79.164.94:3000/user/auth/kakao/callback'
    }
}

module.exports = apiProperties;