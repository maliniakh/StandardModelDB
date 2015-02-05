/**
 * @param {string} url url with GET parameter to be changed. if there is no such parameter, then it's appended.
 * @param {string} paramName param's name.
 * @param {string} paramValue new value.
 * @returns {string}
 */
function changeParamValue(url, paramName, paramValue){
    var pattern = new RegExp('(\\?|\\&)('+paramName+'=).*?(&|$)')
    var newUrl=url
    if(url.search(pattern)>=0){
        newUrl = url.replace(pattern,'$1$2' + paramValue + '$3');
    }
    else{
        newUrl = newUrl + (newUrl.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue
    }
    return newUrl
}

exports.changeParamValue = changeParamValue;