const router = require('express').Router();
const request = require('request');
const mongojs = require('mongojs');

const MONGO_URL = 'hnews'
const db = mongojs(MONGO_URL, ['news']);

router.get('/hacker', (req, res, next) => {
    request({
        uri: 'http://hn.algolia.com/api/v1/search_by_date?query=nodejs'
    }, 
    function (error, response, body){
        if(!error && response.statusCode === 200){
            let data = JSON.parse(body);
            let values = data.hits;
            values.map((obj)=>{
                db.news.findOne({ objectID: obj.objectID }, (err, news) => {
                    if (err) return next(err);
                    if (!news){
                        obj.deleted = false;
                        db.news.save(obj, (err, news) => {
                            if (err) return next(err);
                            console.log(news.objectID, 'added!');
                        })
                    }
                })
            });

            res.send(values);
        }
    })
});

module.exports = router;