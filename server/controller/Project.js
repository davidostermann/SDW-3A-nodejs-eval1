const Project = require('../model/Project');
const Note = require('../model/Note');
const lodash = require('lodash');
const map = require('async').map;

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

  /**
   * Get the average not on two decimals if the project has atleast one note
   * @param {any} req
   * @param {any} res
   */
  getAverageNotes: (req, res) => {
    const getAverage = (project, callback) => {
      let formattedProject = lodash.cloneDeep(project);
      Note.find({ _project: project._id })
        .exec((err, notes) => {
          if (err) { return res.send(err).status(500); }
          formattedProject.numberOfNotes = notes.length;
          if (notes.length) {
            formattedProject.average = notes.reduce((a, b) => { return a.note + b.note }, { note: 0 });
            formattedProject.average /= notes.length;
            formattedProject.average = formattedProject.average.toFixed(2);
          }
          callback(null, formattedProject);
        });
    };

    Project.find()
      .lean()
      .exec((err, projects) => {
        if (err) { return res.send(err).status(500); }
        map(projects, getAverage, (err, formattedProjects) => {
          res.json(formattedProjects);
        });
      })
  }

};

module.exports = ProjectController;
