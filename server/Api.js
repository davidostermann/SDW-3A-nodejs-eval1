const express = require('express');
const {Router} = express;
require('dotenv').config();
const mongoose = require('mongoose');

const UserController = require('./controller/User');
const ProjectController = require('./controller/Project');
const GradeController = require('./controller/Grade');

const bodyParser = require('body-parser');
const router = Router();

if(process.env.NODE_ENV == 'production') {
  mongoose.connect(`mongodb://${process.env.MLAB_ACCESS}`);
} else {
  mongoose.connect('mongodb://localhost:27017/kickass');
}

router.use(bodyParser.json({'extended': true}));
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.send('coucou api');
});

router.get('/users', UserController.getUsers);
router.get('/user/:id', UserController.getUser);
router.post('/user', UserController.createUser);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);

router.get('/projects', ProjectController.getProjects);
router.get('/project/:id', ProjectController.getProject);
router.post('/project', ProjectController.createProject);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.get('/user/:id/projects', ProjectController.getUserProjects);

//add note
router.post('/note', GradeController.addNote);
//update note
router.post('/note/update/:id', GradeController.updateNote);

//show notes
router.get('/notes', GradeController.showAllNotes);

module.exports = router;
