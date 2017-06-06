const Grade = require('../model/Grade');

const GradeController = {
  addNote: (req, res) => {
    // check if the grade's between 1 and 10
    if(req.body.note < 1 || req.body.note > 10)
      return res.json({
        type: `error`,
        message: `La note doit être comprise entre 1 et 10`
      });
    Grade.find({
      '_project': req.body.project,
      '_creator': req.body.creator
    }, 'grade', function(err, previousGrade) {
      if(err) {
        return res.send(err);
      } else if (previousGrade != null && previousGrade.length > 0) {
        return res.json({
          type: `error`,
          message: `La note existe déjà pour cet utilisateur`,
          note: previousGrade
        });
      } else {
        var note = new Grade();
        note.note = req.body.note;
        note._project = req.body.project;
        note._creator = req.body.creator;
        note.created_at = new Date();
        note.updated_at = new Date();
        note.save((err) => {
          if (err) {
            return res.send(err);
          }
          res.json({
            message: `Note de ${note.note} ajouté au projet : ${note._project} par ${note._creator} !`
          });
        });
      }
    })
  },
  showAllNotes: (req, res) => {
    Grade.find()
    .populate({
      path: '_creator',
      model: 'User'})
    .populate({
      path: '_project',
      model: 'Project'})
    .exec((err, notes) => {
      if (err) { res.send(err) }
      res.json(notes);
    })
  },
  updateNote: (req, res) => {
    if(req.body.note < 1 || req.body.note > 10){
      return res.json({
        type: `error`,
        message: `La note doit être comprise entre 1 et 10`
      });
    } else {
      Grade.findByIdAndUpdate(req.params.id, { $set: req.body, updated_at: new Date()}, {new: true}, (err, note) => {
        if (err) {
            return res.send(err)
          }
          res.json({
            message: `Note modifié`,
          })
      });
    }
  }
}

module.exports = GradeController;
