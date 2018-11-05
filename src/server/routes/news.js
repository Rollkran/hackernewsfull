const router = require('express').Router();
const mongojs = require('mongojs');
const moment =  require('moment');
const MONGO_URL = 'hnews'
const db = mongojs(MONGO_URL, ['news']);

router.get('/news', (req, res, next) => {
    let data = []
    db.news.find((err, news) => {
        if (err) return next(err);
        news.map((obj) =>{
            if(!obj.deleted){
                if (obj.story_title != null || obj.title != null) {
                    data.push(obj);
                }
            }
        })
        res.json(data);
    })
})

router.get('/news/:id', (req, res, next) =>{
    db.news.findOne ({_id: mongojs.ObjectId(req.params.id)}, (err, news) =>{
        if (err) return next(err);
        res.json(news);
    })
})

router.post('/news', (req, res, next) => {
    const news = req.body;
    if (!news.title){
        res.status(400).json({
            error: 'Data error'
        });
    }else {
        db.news.save(news, (err,news) => {
            if (err) return next(err);
            res.json(news);
        })
    }
})

router.put('/news/:id', (req, res, next) => {
    const news = req.body;
    db.news.update({_id: mongojs.ObjectId(req.params.id)}, {$set:{deleted: true}}, (err, news) => {
        if (err) return next(err);
        res.json(news);
    })
})

router.delete('/news/:id', (req, res, next) => {
    db.news.remove({ _id: mongojs.ObjectId(req.params.id)}, (err, result) => {
        if (err) return next(err);
        res.json(result);
    });
})

module.exports = router;