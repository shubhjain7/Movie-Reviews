const router = require('express').Router();
const Post = require('../models/review');



router.get('/',function(req,res){
    Post.find().then(function(results){
       // console.log(result);

       var count=0 ,average=0;
        for(let result of results){

            count+=result.rating;
        }
        average = count/results.length;
        //console.log(count,average);
        res.render('index',{reviews:results , total:count , average:average});
    });

    
    
  });



router.post('/reviews',(req,res)=>{
    let post = new Post({
        email:req.body.email,
        rating:req.body.rating,
        review:req.body.review
    });

    post.save().then(function(result){
        
        res.redirect('/');
    })
    // .catch(function(err){
    //     console.log(err);
    //     res.redirect('/');
    // });
    //res.json(req.body);
});

module.exports = router;