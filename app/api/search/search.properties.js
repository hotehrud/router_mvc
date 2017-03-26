const apiProperties = {
    naver: {
        headers: {'X-Naver-Client-Id':'NXUnBi1hGRDD0YALBt0h', 'X-Naver-Client-Secret': 'As4fRZod9c'},
        searchBlog: "https://openapi.naver.com/v1/search/blog?query=",
        searchNews: "https://openapi.naver.com/v1/search/news?query=",
        searchBook: "https://openapi.naver.com/v1/search/book_adv?query=",
        searchAdult: "https://openapi.naver.com/v1/search/adult?query=",
        searchEncyc: "https://openapi.naver.com/v1/search/encyc?query=",
        searchMovie: "https://openapi.naver.com/v1/search/movie?query=",
        searchCafe: "https://openapi.naver.com/v1/search/cafearticle?query=",
        searchKin: "https://openapi.naver.com/v1/search/kin?query=",
        searchLocal: "https://openapi.naver.com/v1/search/local?query=",
        searchErrata: "https://openapi.naver.com/v1/search/errata?query=",
        searchWeb: "https://openapi.naver.com/v1/search/webkr?query=",
        searchImage: "https://openapi.naver.com/v1/search/image?query=",
        searchShop: "https://openapi.naver.com/v1/search/shop?query=",
        searchDoc: "https://openapi.naver.com/v1/search/doc?query=",
        property: {title: 'title', link: 'link', description: 'desc', bloggername: 'author', postdate: 'date'}
    },
    daum: {
        apiKey: "a5b0eef3c46e86443e3b73624f11488a",
        searchBoard: "https://apis.daum.net/search/board?apikey=a5b0eef3c46e86443e3b73624f11488a&output=json&q=",
        searchVclip: "https://apis.daum.net/search/vclip?apikey=a5b0eef3c46e86443e3b73624f11488a&output=json&q=",
        searchBlog: "https://apis.daum.net/search/blog?apikey=a5b0eef3c46e86443e3b73624f11488a&output=json&q=",
        searchWeb: "https://apis.daum.net/search/web?apikey=a5b0eef3c46e86443e3b73624f11488a&output=json&q=",
        searchImage: "https://apis.daum.net/search/image?apikey=a5b0eef3c46e86443e3b73624f11488a&output=json&q=",
        searchKin: "https://apis.daum.net/search/knowledge?apikey=a5b0eef3c46e86443e3b73624f11488a&output=json&q=",
        searchBook: "https://apis.daum.net/search/book?apikey=a5b0eef3c46e86443e3b73624f11488a&output=json&q=",
        searchCafe: "https://apis.daum.net/search/cafe?apikey=a5b0eef3c46e86443e3b73624f11488a&output=json&q=",
        property: {title: 'title', link: 'link', description: 'desc', author: 'author', pubDate: 'date'}

    },
    google: {
        searchTotal: 'https://www.google.com/search?gws_rd=ssl&site=&source=hp&q=',
        searchNews: 'https://www.google.com/search?gws_rd=ssl&site=&source=hp&tbm=nws&q=',
        searchVclip: 'https://www.google.com/search?gws_rd=ssl&site=&source=hp&tbm=nws&q=',
        searchImage: 'https://www.google.com/search?gws_rd=ssl&site=&source=hp&tbm=isch&q=',
        searchBook: 'https://www.google.com/search?gws_rd=ssl&site=&source=hp&tbm=bks&q='
    }
}

module.exports = apiProperties;