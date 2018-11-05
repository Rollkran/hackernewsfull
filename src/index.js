const express = require('express');
const app = express();
const cors = require('cors');
const cron = require('node-cron');
const request = require('request');
const mongojs = require('mongojs');
const path = require('path');

const MONGO_URL = 'hnews'
const db = mongojs(MONGO_URL, ['news']);
const NODE_PORT = 3000;

const news = require('./server/routes/news');
const hacker = require('./server/routes/hacker');

app.set('port', process.env.PORT || NODE_PORT);

//statics
app.use(express.static(path.join(__dirname, 'dist/client')));

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api',news);
app.use('/api',hacker);

cron.schedule('* 1 * * * *', () => {
    request({
        uri: 'http://hn.algolia.com/api/v1/search_by_date?query=nodejs'
    },
    function (error, response, body) {
        if(!error && response.statusCode === 200){
            let data = JSON.parse(body);
            let values = data.hits;
            values.map((obj) => {
                db.news.findOne({ objectID: obj.objectID }, (err, news) => {
                    if (err) return next(err);
                    if (!news) {
                        obj.deleted = false;
                        db.news.save(obj, (err, news) => {
                            if (err) return next(err);
                            console.log(news.objectID, 'added!');
                        })
                    }
                })
            });
        }
    })
});

//start
app.listen(app.get('port'), () => {
    console.log('server start on port', app.get('port'));
})