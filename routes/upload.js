const express = require('express')
const router = express.Router()
const db = require("../database");
const upload = require('../utils/imageUploader')

// POSTGRESQL picture table
// CREATE TABLE "pictures" (
// 	"pic_id" serial NOT NULL,
// 	"name" varchar(255) NOT NULL,
// 	"path" varchar(255) NOT NULL,
// 	CONSTRAINT "pictures_pk" PRIMARY KEY ("pic_id")
// ) WITH (
//   OIDS=FALSE
// );

const insertPictureIntoDatabase = async (name, path) => {
  try {
    const data = await db.query('INSERT INTO pictures (name, path) VALUES ($1, $2) RETURNING *', [name, path])
    return data
  }
  catch (err) {
    console.error(err)
  }
}

router.post('/profile-pic', upload.single('profile_pic'), async (req, res) => {
    const {file, fileValidationError} = req
    if (!file) {
      return res.status(400).send('Please upload a file');
    }
    if (fileValidationError) {
      return res.status(400).send(fileValidationError);
    }
    const { rows: pic } = await insertPictureIntoDatabase(file.originalname, `/uploads/${file.filename}`)
    console.log(file)
    console.log(pic)
    res.send(`<div>You have uploaded this image: <br/> <img src="http://localhost:3000/uploads/${file.filename}" width="500" /></div>`);
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
  files.forEach(async file => {
    await insertPictureIntoDatabase(file.originalname, `/uploads/${file.filename}`)
  })
  res.send(`<div>You have uploaded these images: <br/> ${files.map(file => `<img src="http://localhost:3000/uploads/${file.filename}" width="500" />`)}</div>`);
})

router.get('/get-pics', async (req, res) => {
  const pictures = await db.query('SELECT * FROM pictures')
  console.log(pictures.rows)
  res.send(`<div>${pictures.rows.map(pic => {
    return `<br/><a href=http://localhost:3000${pic.path}>${pic.name}</a><br/>`
  })}</div>`)
})

module.exports = router