const Project = require('../model/Project');
const NoteModel = require('../model/Note')
const UserModel = require('../model/User')

const ProjectController = {

  getProjects: (req, res) => {
    Project.find()
    .populate({
      path: '_creator',
      model: 'User'})
    .exec((err, projects) => {
      if (err) { res.send(err) }
      res.json(projects);
    })
  },

  createProject: (req, res) => {
    var project = new Project();
    project.title = req.body.title;
    project.description = req.body.description;
    project._creator = req.body.creator;
    project.save((err) => {
      if (err) {
        return res.send(err);
      }

      res.json({
        message: `Project ${project._creator} created !`
      });
    });
  },

  getProject: (req, res) => {
    Project.findOne({_id: req.params.id})
    .exec((err, project) => {
      if (err) { res.send(err); }
      res.json(project);
    });
  },

  updateProject: (req, res) => {
    Project.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true}, (err, project) => {
      if (err) {
        return res.send(err).status(500);
      }
      res.json(project)
    });
  },

  deleteProject: (req, res) => {
    Project.findByIdAndRemove(req.params.id, (err, project) => {
      if (err) {
        return res.send(err).status(500);
      }
      let str = (project) ? `Project ${project._id} deleted !` : 'No project were deleted.'
      res.json({ message: str })
    });
  },

  getUserProjects: (req, res) => {
    Project.find({_creator: req.params.id})
    .exec((err, projects) => {
      if (err) { res.send(err); }
      res.json(projects);
    });
  },

  getProjectNoted: (req, res) => {
    NoteModel.find({
      '_project': req.params.id
    }, '_creator note', function(err, notes){
      if (err){res.send(err)}

      let userArray = []
      for (let i = 0; i < notes.length; i++){
        UserModel.find({
          '_id': notes[i]._creator
        }, 'name', function(err, user){
          if (err){res.send(err)}

          // Si on a bien un user on le formatte en y ajoutant sa note
          if (null != user){
            let userFormatted = {
              'userId': user[0]._id,
              'name': user[0].name,
              'note': notes[i].note
            }
            userArray.push(userFormatted)
          }
          // Si c'est la dernière itération
          if (i == notes.length - 1){
            res.json(userArray)
          }
        })
      }
    })
  },

  getCompleteProjects: (req, res) => {
      Project.find({}, '_creator title description', function(err, projects){
        if (err){res.send(err)}

        let projectArray = []
        // On parcourt les projets pour récupérer toutes les notes
        for (let i = 0; i < projects.length; i++){
          let projectObject = {
            'projectId': projects[i]._id,
            'title': projects[i].title,
            'description': projects[i].description,
            'numberNotes': 0,
            'average': 0
          }
          let notesAddition = 0;

          NoteModel.find({
            '_project': projects[i]._id
          }, 'note', function(err, notes){
            // On parcours les notes pour faire la moyenne
            for (let j = 0; j < notes.length; j++){
              projectObject.numberNotes++;
              notesAddition += notes[j].note

              // Si c'est la dernière itération
              if (j == notes.length - 1){
                projectObject.average = (notesAddition / projectObject.numberNotes).toFixed(2);
                projectArray.push(projectObject);

                if (i == projects.length - 1){
                  res.json(projectArray)
                }
              }
            }
          });      
        }
      })
  }

};

module.exports = ProjectController;
