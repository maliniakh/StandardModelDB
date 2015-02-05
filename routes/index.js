var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var spellcorrection = require('./../modules/spellcorrection');
var urlUtils = require('./../modules/urlUtils');

var particlesColl;

// it would probably be better and surely more elegant to get those values from db
var particleGroups = ['', 'leptons', 'bosons', 'quarks'];
var allParticles = [];

var MONGODB_URI = 'mongodb://localhost/standardModel';
var PAGINATION_SIZE = 6;

mongodb.MongoClient.connect(MONGODB_URI, { /*server: { logger: logger(MONGODB_URI) } */}, function (err, db) {
    if (err) throw err;

    console.log('connected to database :: ' + db);
    particlesColl = db.collection('particles');

    // get all particle names for spelling correction suggestion
    particlesColl.find({}, {fields: {'name': true, '_id': false}}).toArray(function(err, names) {
        if(err) throw err;

        for (var i = 0; i < names.length; i++) {
            allParticles.push(names[i]['name']);
        }
    });
});

router.get('/', function (req, res) {
    // obtaining GET params
    // notice they are not escaped nor validated which might make the app prone to SQLi or XSS
    var queryParam = req.param('q', String('')).trim();
    var groupParam = req.param('g');
    var pageParam = Number(req.param('p', Number(0)));

    // critieria processing
    var criteria = {};
    if (queryParam.length > 0) {
        criteria = {'name': new RegExp(queryParam, 'i')};
    }
    if (groupParam) {
        criteria.group = groupParam;
    }

    console.log('criteria: ' + JSON.stringify(criteria));

    // two find calss are needed to implement pagination
    // first one is for docs count, second one obtains limited to page docs
    particlesColl.count(criteria, function (err, count) {
        if (err) throw err;

        // create array of hrefs of pages to pass to jade
        var totalPages = Math.ceil(count / PAGINATION_SIZE);
        var pages = [];
        // page links are displayed only if there is more than one
        if(totalPages > 1) {
            // iterate over pages' numbers and change /p=\d/ accordinly
            for(var p = 0; p < totalPages; p++) {
                var changedParamUrl  = urlUtils.changeParamValue(req.originalUrl, 'p', p)
                pages.push(changedParamUrl);
            }
        }
        console.log('pages: ' + pages)

        // limit and skip parameters are added to criteria to limit search result if needed
        // assuming that sorting is not needed for pagination query, but it might be added just to be sure
        var options = totalPages > 1 ? {limit: PAGINATION_SIZE, skip: pageParam * PAGINATION_SIZE} : {};

        //
        var suggestion;
        var suggestionUrl;
        if(count == 0) {
            suggestion = spellcorrection.getSuggestion(queryParam, allParticles);
            if(suggestion !== undefined) {
                suggestionUrl = urlUtils.changeParamValue(req.originalUrl, 'q', suggestion);
                // unset the particle group, because it might be other than is currently set
                suggestionUrl = urlUtils.changeParamValue(suggestionUrl, 'g', '');
            }
        }

        particlesColl.find(criteria, options).toArray(function (err, particles) {
            if(err) throw err;

            res.render('index', { query: queryParam, particles: particles, particleGroups: particleGroups,
                selectedGroup: groupParam, count: count, pages: pages, currentPage: pageParam,
                suggestion: suggestion, suggestionUrl: suggestionUrl});
            res.end();
        });
    });
});

module.exports = router;
