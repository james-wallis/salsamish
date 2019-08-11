const express = require('express')
const multer = require('multer')
const fs = require('fs-extra');
const path = require('path');
const mongoose = require('mongoose');

// Variables
const router = express.Router()
const IMAGE_DIR = 'public/images/employees';
const upload = multer({ dest: IMAGE_DIR })
const music = ['BACHATA', 'KIZOMBA'];
const dance = ['BACHATA', 'SALSA', 'KIZOMBA', 'RUEDA', 'CHACHACHA'];


/**
 * API Function to get all employees in the database
 * @returns All employees in the database
 */
router.get('/', async function (req, res) {
  const model = mongoose.model('Employee');
  try {
    const employees = await model.find();
    res.send(employees)
  } catch (err) {
    // throw err;
    console.error(err);
    res.status(500).send(err);
  }
})

/**
 * API Function to add an employee to the database 
 * and save their image to the file system
 * @param req.body.name - the name of the employee
 * @param req.body.role - the role of the employee
 * @param req.file - the image of the employee to be uploaded
 */
router.post('/', upload.single('image'), async function (req, res) {
  console.log(req.body)
  // Check image first as it'll need to be deleted if other validation occurs
  if (!req.file || req.file.originalname === '') return sendError(res, 404, 'Missing image');
  if (!req.body.name || req.body.name === '') return sendError(res, 404, 'Missing name', req.file.filename);
  if (!req.body.role || req.body.role === '') return sendError(res, 404, 'Missing role', req.file.filename);
  if (req.body.role.toUpperCase() !== 'DJ' && req.body.role.toUpperCase() !== 'TEACHER') return sendError(res, 400, 'Invalid role', req.file.filename);
  if (req.body.role.toUpperCase() === 'DJ' && (!req.body.music || !checkMusicStyles(req.body.music))) return sendError(res, 404, 'DJ detected, Missing or invalid music information', req.file.filename);
  if (req.body.role.toUpperCase() === 'TEACHER' && (!req.body.dance || !checkDanceTypes(req.body.dance))) return sendError(res, 404, 'Teacher detected, Missing or invalid dance information', req.file.filename);
  if (!req.body.description || req.body.description === '') return sendError(res, 404, 'Missing description', req.file.filename);
  const model = mongoose.model('Employee');
  if (await model.findOne({ name: req.body.name })) return sendError(res, 409, `Employee "${req.body.name}" already exists`, req.file.filename);
  const newFileName = `${(req.body.name).replace(/[^A-Z0-9]+/ig, "-")}-${Date.now()}${path.extname(req.file.originalname)}`;
  try {
    // If validation succeeds then rename image and add user into database
    await fs.rename(req.file.path, `${IMAGE_DIR}/${newFileName}`)
    const instance = new model({ 
      _id: new m.Types.ObjectId(),
      name: req.body.name, 
      role: req.body.role.toUpperCase(), 
      image: newFileName,
      description: req.body.description,
      stylesOfMusic: (req.body.role.toUpperCase() === 'DJ') ? req.body.music.split(',') : null,
      typesOfDance: (req.body.role.toUpperCase() === 'TEACHER') ? req.body.dance.split(',') : null,
    });
    await instance.save();
    res.send(`New employee ${req.body.name} added successfully`)
  } catch (err) {
    console.error(err);
    sendError(res, 500, err.message, newFileName);
  }
})

/**
 * TODO
 * API Function to update an employee in the database
 */
router.put('/:id', async function (req, res) {
  const id = req.params.id;
  const model = mongoose.model('Employee');
  try {
    const employee = await model.findById(id);
  } catch (err) {
    if (err.name === 'CastError') res.status(404).send('ID does not exist')
  }
})

/**
 * API Function to delete an employee from the database
 */
router.delete('/:id', async function (req, res) {
  const id = req.params.id;
  const model = mongoose.model('Employee');
  try {
    const employee = await model.findById(id);
    await model.deleteOne(employee);
    await fs.remove(`${IMAGE_DIR}/${employee.image}`);
    res.sendStatus(200);
  } catch (err) {
    if (err.name === 'CastError') res.status(404).send('ID does not exist')
    res.status(500).send(err);
  }
})

/**
 * Function to send a HTTP error and delete an image if a validation error occurs
 * @param {*} res - the response from the express object
 * @param {*} code - HTTP code to return
 * @param {*} message - Message to return
 * @param {*} image - Image name to delete
 */
const sendError = async (res, code, message, image) => {
  if (image) await fs.remove(`${IMAGE_DIR}/${image}`);
  res.status(code).send(message);
}

const checkMusicStyles = types => {
  types = types.split(',');
  for (let i = 0; i < types.length; i++) {
    const t = types[i];
    if (!music.includes(t)) return false;
  }
  return true;
}

const checkDanceTypes = types => {
  types = types.split(',');
  for (let i = 0; i < types.length; i++) {
    const t = types[i];
    if (!dance.includes(t)) return false;
  }
  return true;
}

module.exports = router