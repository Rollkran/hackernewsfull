
function hacker (){
    request({
        uri: 'http://hn.algolia.com/api/v1/search_by_date?query=nodejs'
    },
    function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        }
    })
};

module.exports = hacker;
