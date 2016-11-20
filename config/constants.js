const _ = require('../node_modules/underscore/underscore-min');

module.exports = {
    connectionString: _.template("mongodb://localhost:27017/<%= collection %>"),
    genres: ["action", "sci-fi", "fantasy", "horror", "comedy"],
    searchUrl: _.template("http://www.imdb.com/search/title?genres=<%= genre %>&title_type=feature&sort=moviemeter,asc&page=<%= page %>"),
    detailedUrl: _.template("http://www.imdb.com/title/<%= imdbId %>"),
    pagesCount: 50,
    asyncPagesCount: 2000 / 50 // totalItemsToLoad / itemsPerPage
};