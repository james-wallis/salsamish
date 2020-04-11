const express = require('express')
const multer = require('multer')
const fs = require('fs-extra');
const path = require('path');
const mongoose = require('mongoose');

const { uploadImageToS3, deleteImageFromS3 } = require('../modules/aws');

// Variables
const router = express.Router()
const IMAGE_DIR = (process.env.NODE_ENV === 'production') 
  ? 'build/images/employees' 
  : 'public/images/employees';
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
  // Check image first as it'll need to be deleted if other validation occurs
  const { file, body: { name, role, description } } = req;
  if (!file || file.originalname === '') return sendError(res, 404, 'Missing image');
  if (!name) return sendError(res, 404, 'Missing name', file.filename);
  if (!role) return sendError(res, 404, 'Missing role', file.filename);
  const validatedRole = role.toUpperCase();
  if (validatedRole !== 'DJ' && validatedRole !== 'TEACHER') return sendError(res, 400, 'Invalid role', file.filename);
  if (validatedRole === 'DJ' && (!music || !checkMusicStyles(music))) return sendError(res, 404, 'DJ detected, Missing or invalid music information', file.filename);
  if (validatedRole === 'TEACHER' && (!dance || !checkDanceTypes(dance))) return sendError(res, 404, 'Teacher detected, Missing or invalid dance information', file.filename);
  if (!description) return sendError(res, 404, 'Missing description', file.filename);
  const model = mongoose.model('Employee');
  const urlSafeName = createURLSafeName(name);
  if (await model.findOne({ name }) || await model.findOne({ urlSafeName })) return sendError(res, 409, `Employee "${name}" already exists`, file.filename);
  const newFileName = `${(name).replace(/[^A-Z0-9]+/ig, "-")}-${Date.now()}${path.extname(file.originalname)}`;
  try {
    const { Location: imageLocationOnAWS } = await uploadImageToS3(file.path, newFileName);
    // If AWS upload succeeds, delete the local image
    await fs.remove(file.path);

    const instance = new model({ 
      _id: new mongoose.Types.ObjectId(),
      name,
      urlSafeName,
      role: validatedRole,
      image: imageLocationOnAWS,
      description,
      stylesOfMusic: (validatedRole === 'DJ') ? music : null,
      typesOfDance: (validatedRole === 'TEACHER') ? dance : null,
    });
    await instance.save();
    res.send(`New employee ${name} added successfully`)
  } catch (err) {
    console.error(err);
    sendError(res, 500, err.message, newFileName);
  }
})

router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const model = mongoose.model('Employee');
  try {
    const employee = await model.findById(id);
    return res.json(employee);
  } catch (err) {
    if (err.name === 'CastError') res.status(404).send('ID does not exist')
  }
})

/**
 * TODO
 * API Function to update an employee in the database
 * Used at the moment to fix a bad employee
 */
router.put('/:id', async function (req, res) {
  const { id } = req.params;
  const model = mongoose.model('Employee');
  try {
    const employee = await model.findById(id);
    // employee.urlSafeName = createURLSafeName(employee.name);
    const { Location: imageLocationOnAWS } = await uploadImageToS3(`${IMAGE_DIR}/${employee.image}`, employee.image);
    employee.image = imageLocationOnAWS;
    await updateEmployeeInDatabase(employee, id);

    return res.json(await model.findById(id));
  } catch (err) {
    if (err.name === 'CastError') res.status(404).send('ID does not exist')
  }
})

/**
 * API Function to delete an employee from the database
 */
router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  const model = mongoose.model('Employee');
  try {
    const employee = await model.findById(id);
    await employee.remove();
    await deleteImageFromS3(employee.image);
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
  for (let i = 0; i < types.length; i++) {
    const t = types[i];
    if (!music.includes(t)) return false;
  }
  return true;
}

const checkDanceTypes = types => {
  for (let i = 0; i < types.length; i++) {
    const t = types[i];
    if (!dance.includes(t)) return false;
  }
  return true;
}

const createURLSafeName = name => {
  return name.toLowerCase().replace(/[^A-Z0-9]+/ig, "_");
}

async function updateEmployeeInDatabase(employee, id) {
  const model = mongoose.model('Employee');
  await model.updateOne({ _id: id }, employee);
}

module.exports = router;