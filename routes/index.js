var express = require('express');
var router = express.Router();
let jsonfile  = require('jsonfile');
let filedata = './data/data.json';
let obj = jsonfile.readFileSync(filedata);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* router for imgaes update */
router.get('/images', function(req, res, next) {
  res.send(obj.data);
});

router.post('/images', function(req, res, next) {

  let sampleFile = req.files.imageFile;
  let imagename = sampleFile.name;
  console.log(imagename);
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./data/images/'+ imagename, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });

  let imageobj = {};
  imageobj.image = "/data/images/"+ imagename ;
  obj.data.push(imageobj);
  jsonfile.writeFileSync(filedata, obj , { spaces: 2, EOL: '\n' });
});


module.exports = router;
