const express = require('express');
const {Router} = express;

const mongoose = require('mongoose');

const UserController = require('./controller/User');
const ProjectController = require('./controller/Project');
const GradeController = require('./controller/Grade');

const bodyParser = require('body-parser');
const router = Router();

if(process.env.NODE_ENV == 'production') {
  mongoose.connect(`mongodb://${process.env.MLAB_DBUSER}:${process.env.MLAB_DBPASSWORD}@${process.env.MLAB_DBURL}`);
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

router.delete('/grade/:id', GradeController.deleteGrade);
router.post('/grade/:projectId/:userId', GradeController.createGrade);
router.put('/grade/:id', GradeController.updateGrade);

module.exports = router;
