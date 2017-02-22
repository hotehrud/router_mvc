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
        searchDoc: "https://openapi.naver.com/v1/search/doc?query="
    },
    daum: {
        apiKey: "a5b0eef3c46e86443e3b73624f11488a",
        searchBoard: "https://apis.daum.net/search/board?apikey=a5b0eef3c46e86443e3b73624f11488a",
        searchVclip: "https://apis.daum.net/search/vclip?apikey=a5b0eef3c46e86443e3b73624f11488a",
        searchBlog: "https://apis.daum.net/search/blog?apikey=a5b0eef3c46e86443e3b73624f11488a",
        searchWeb: "https://apis.daum.net/search/web?apikey=a5b0eef3c46e86443e3b73624f11488a",
        searchImage: "https://apis.daum.net/search/image?apikey=a5b0eef3c46e86443e3b73624f11488a",
        searchKin: "https://apis.daum.net/search/knowledge?apikey=a5b0eef3c46e86443e3b73624f11488a",
        searchBook: "https://apis.daum.net/search/book?apikey=a5b0eef3c46e86443e3b73624f11488a",
        searchCafe: "https://apis.daum.net/search/cafe?apikey=a5b0eef3c46e86443e3b73624f11488a"
    }
}

module.exports = apiProperties;