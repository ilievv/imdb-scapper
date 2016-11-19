const _ = require('../node_modules/underscore/underscore-min');

module.exports = {
    connectionString: "mongodb://localhost:27018/moviesDb",
    genres: ["action", "sci-fi", "fantasy", "horror", "comedy"],
    searchUrl: _.template("http://www.imdb.com/search/title?genres=<%= genre %>&title_type=feature&sort=moviemeter,asc&page=<%= page %>"),
    pagesCount: 50,
    asyncPagesCount: 2000 / 50 // totalItemsToLoad / itemsPerPage
};