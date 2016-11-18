const _ = require('../node_modules/underscore/underscore-min');

module.exports = {
    connectionString: "mongodb://localhost/moviesDb",
    genres: ["action", "sci-fi", "fantasy", "horror", "comedy"],
    url: "http://www.imdb.com/search/title?genres=${genre}&title_type=feature&0sort=moviemeter,asc&page=${i+1}&view=simple&ref_=adv_nxt",
    searchUrl: _.template("http://www.imdb.com/search/title?genres=$<%= genre %>&title_type=feature&0sort=moviemeter,asc&page=$<%= page %>&view=simple&ref_=adv_nxt"),
    pagesCount: 50
};