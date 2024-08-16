var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer');
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Set up multer for file handling
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Handle file upload and metadata extraction
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }


  var file = req.file;
  var fileSize = file.size;
  var fileName = file.originalname;
  var fileType = file.mimetype;

  res.json({
    name: fileName,
    type: fileType,
    size: fileSize
  });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
