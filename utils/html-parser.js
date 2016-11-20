/* globals module require Promise */
"use strict";

const jsdom = require("jsdom").jsdom,
    doc = jsdom(),
    window = doc.defaultView,
    $ = require("jquery")(window);

module.exports.parseSimpleMovie = (selector, html) => {
    $("body").html(html);
    let items = [];
    $(selector).each((index, item) => {
        const $item = $(item);

        items.push({
            title: $item.html(),
            url: $item.attr("href")
        });
    });

    return Promise.resolve()
        .then(() => {
            return items;
        });
};

module.exports.parseDetailedMovie = (detailsSelector, actorsSelector, html) => {
    $("body").html(html);

    let fullTitle = $(`${detailsSelector} .titleBar .title_wrapper h1`).html();
    let titleSeparatorIndex = fullTitle.indexOf('&');
    let movieTitle = fullTitle.substring(0, titleSeparatorIndex);

    console.log(movieTitle);

    let fullReleaseDate = $(`${detailsSelector} .subtext a[title="See more release dates"]`).html();
    let releaseDateSeparator = fullReleaseDate.indexOf('(');
    let releaseDate = fullReleaseDate.substring(0, releaseDateSeparator - 1);

    console.log(releaseDate); 

    let description = $(`${detailsSelector} .plot_summary .summary_text`).html().trim();
    console.log(description);

    let imgUrl = $(`${detailsSelector} .poster a img`).attr("src");
    console.log(imgUrl);

    let trailerUrl = $(`${detailsSelector} .slate a`).attr("href");
    console.log(trailerUrl);

    let genresSelector = $(`${detailsSelector} .subtext a span.itemprop[itemprop="genre"]`);

    let genres = [];
    let keys = Object
        .keys(genresSelector)
        .forEach(key => {
            if (!isNaN(+key)) {
                genres.push(genresSelector[key].innerHTML);
            }
        });

    console.log(genres);
    const movie = {};

    return Promise.resolve()
        .then(() => {
            return {
                title: movieTitle,
                description: description,
                imageUrl: imgUrl,
                trailerUrl: trailerUrl || null,
                releaseDate: releaseDate,
                genres: genres,
                actors: []
            }
        })
}