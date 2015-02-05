var assert = require('better-assert');
var urlUtils = require('../modules/urlUtils');

//})

describe('urlUtils.js', function () {
    describe('#changeParamValue()', function () {
        it('should replace given param value, e.g. ?param=val -> ?param=new', function () {
            assert(
                "http://example.com/path?param=new" == urlUtils.changeParamValue(
                "http://example.com/path", 'param', 'new')
            );

            assert(
                "http://example.com/path?x=1&param=new" == urlUtils.changeParamValue(
                "http://example.com/path?x=1", 'param', 'new')
            );

            assert(
                "http://example.com/path?param=new" == urlUtils.changeParamValue(
                "http://example.com/path?param=val", 'param', 'new')
            );

            assert(
                "http://example.com/path?x=1&param=new&y=2" == urlUtils.changeParamValue(
                "http://example.com/path?x=1&param=val&y=2", 'param', 'new')
            );

            assert(
                "http://example.com/path?x=1&param=new&y=2" == urlUtils.changeParamValue(
                "http://example.com/path?x=1&param=val&y=2", 'param', 'new')
            );

            assert(
                "http://example.com/path?param=new" == urlUtils.changeParamValue(
                "http://example.com/path?param=", 'param', 'new')
            );

            assert(
                "http://example.com/path?xparam=foo&x=1&param=new&y=2" == urlUtils.changeParamValue(
                "http://example.com/path?xparam=foo&x=1&param=val&y=2", 'param', 'new')
            );

            assert(
                "http://example.com/path?xparam=foo&x=1&param=new&y=2#anchor" == urlUtils.changeParamValue(
                "http://example.com/path?xparam=foo&x=1&param=val&y=2#anchor", 'param', 'new')
            );

            assert(
                "http://example.com/path#page?x=1&param=new" == urlUtils.changeParamValue(
                "http://example.com/path#page?x=1&param=val", 'param', 'new')
            );
        });
    })
})
