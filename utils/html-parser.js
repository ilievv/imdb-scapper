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

    let fullReleaseDate = $(`${detailsSelector} .subtext a[title="See more release dates"]`).html();
    let releaseDateSeparator = fullReleaseDate.indexOf('(');
    let releaseDate = fullReleaseDate.substring(0, releaseDateSeparator - 1);

    let description = $(`${detailsSelector} .plot_summary .summary_text`).html().trim();

    let imgUrl = $(`${detailsSelector} .poster a img`).attr("src");

    let trailerUrl = $(`${detailsSelector} .slate a`).attr("href");

    let genresSelector = $(`${detailsSelector} .subtext a span.itemprop[itemprop="genre"]`);

    let genres = [];
    let keys = Object
        .keys(genresSelector)
        .forEach(key => {
            if (!isNaN(+key)) {
                genres.push(genresSelector[key].innerHTML);
            }
        });

    let actors = [];
    $(`${actorsSelector} tr.odd, tr.even`)
        .each((_, el) => {
            let actorName = $(el).find("td.itemprop a span.itemprop").html();

            if (!actorName) {
                return;
            }

            const noPictureUrl = "http://ia.media-imdb.com/images/G/01/imdb/images/nopicture/32x44/name-2138558783._CB527145656_.png";
            let actorPictureUrl = ($(el).find("td.primary_photo a img").attr("loadlate")) || noPictureUrl;

            let roleName =
                $(el).find("td.character div a").html() ||
                $(el).find("td.character div").html();

            let roleNameSeparatorIndex = roleName.indexOf("(");

            roleName = roleName
                .substring(0, roleNameSeparatorIndex == -1 ? roleName.length : roleNameSeparatorIndex)
                .trim();

            actors.push({ actorName, actorPictureUrl, roleName });
        });

    return Promise.resolve()
        .then(() => {
            return {
                title: movieTitle,
                description: description,
                imageUrl: imgUrl,
                trailerUrl: trailerUrl || null,
                releaseDate: releaseDate,
                genres: genres,
                actors: actors
            }
        })
}

module.exports.parseActorsMovie = (actorsSelector, moviesSelector, html) => {
    $("body").html(html);

    let profileImgUrl = $(`${actorsSelector} tbody tr #img_primary .image a img`).attr("src");

    let actorName = $(`${actorsSelector} tbody tr #overview-top .header span`).html();

    let selectingHtmlElementsRegex = /<[^>]*>/g;
    let biography = $(`${actorsSelector} tbody tr #overview-top .txt-block .name-trivia-bio-text .inline`).html().replace(selectingHtmlElementsRegex, "");
    let indexOfSeeFullBio = biography.indexOf("See full bio") || biography.length;
    biography = biography.substring(0, indexOfSeeFullBio);

    return Promise.resolve()
        .then(() => {
            return {
                profileImage: profileImgUrl,
                name: actorName,
                biography: biography,
                movies: []
            }
        })
}