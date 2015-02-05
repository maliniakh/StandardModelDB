/**
 * @param a {string}
 * @param b {string}
 * @returns {number}
 */
levenhsteinDist = function(a, b){
    if(a.length == 0) return b.length;
    if(b.length == 0) return a.length;

    var matrix = [];
    var i;
    for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }
    var j;
    for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }
    for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
            if(b.charAt(i-1) == a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                    Math.min(matrix[i][j-1] + 1, // insertion
                        matrix[i-1][j] + 1)); // deletion
            }
        }
    }
    return matrix[b.length][a.length];
};

/**
 *
 * @param str {string}
 * @param arr {string[]}
 * @returns {number}
 */
getSuggestion = function(str, arr) {
    var minDist = Number.MAX_VALUE;
    var result;
//    for (var w in arr) {
    for(var i = 0; i < arr.length; i++) {
        var w = arr[i];
        var dist = levenhsteinDist(str, w);
        if(dist < minDist) {
            minDist = dist;
            result = w;
        }
    }

    console.log("minDist: " + minDist);

    // 4 is an arbitrary treshold to not return suggestions that don't make sense
    // 0 limit is for not returing the very same string
    if(minDist == 0 || minDist > 4) {
        return null;
    }

    return result;
};

exports.getSuggestion = getSuggestion;