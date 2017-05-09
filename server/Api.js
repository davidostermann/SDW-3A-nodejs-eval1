const express = require('express');
const {Router} = express;

const mongoose = require('mongoose');

const UserController = require('./controller/User');
const ProjectController = require('./controller/Project');
const NoteController = require('./controller/Note');

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

// Récupérer tous les projets qu'un utilisateur à noté...
router.get('/user-noted/:id', UserController.getUserNoted);

router.get('/projects', ProjectController.getProjects);
router.get('/project/:id', ProjectController.getProject);
router.post('/project', ProjectController.createProject);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.get('/user/:id/projects', ProjectController.getUserProjects);
// Lister les projets avec la moyenne des notes...
router.get('/complete-projects', ProjectController.getCompleteProjects);

// Récupérer, pour un projet, tous les utilisateurs qui ont noté...
router.get('/project-noted/:id', ProjectController.getProjectNoted)


// Noter un projet avec un userId
router.post('/add-note', NoteController.addNote);

// Modifier une note
router.put('/edit-note/:id', NoteController.editNote);

// Supprimer une note
router.delete('/delete-note/:id', NoteController.deleteNote)


module.exports = router;
