const express = require('express')
const router = express.Router()
const upload = require('../utils/imageUploader')

router.post('/profile-pic', upload.single('profile_pic'), (req, res) => {
    const {file, fileValidationError} = req
    if (!file) {
      return res.status(400).send('Please upload a file');
    }
    if (fileValidationError) {
      return res.status(400).send(fileValidationError);
    }
    console.log(file)
    res.send(`<div>You have uploaded this image: <br/> <img src="http://localhost:3000/uploads/${req.file.filename}" width="500" /></div>`);
  })

router.post('/cat-pics', upload.array('cat_pics'), (req, res) => {
  const { files, fileValidationError } = req
  if (!files || !files.length) {
    return res.status(400).send('Please upload some files');
  }
  if (fileValidationError) {
    return res.status(400).send(fileValidationError);
  }
  console.log(files)
  res.send(`<div>You have uploaded these images: <br/> ${files.map(file => `<img src="http://localhost:3000/uploads/${file.filename}" width="500" />`)}</div>`);
})

module.exports = router