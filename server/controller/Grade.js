const Grade = require('../model/Grade');

const GradeController = {

  getGrades: (req, res) => {
    Grade.find()
    .populate({
      path: 'project',
      model: 'Project'})
    .populate({
      path: 'grader',
      model: 'User'})
    .exec((err, grades) => {
      if (err) { res.send(err) }
      res.json(grades);
    })
  },

  getGrade: (req, res) => {
    Grade.findOne({_id: req.params.id})
    .exec((err, grade) => {
      if (err) { res.send(err); }
      res.json(grade);
    });
  },

  createGrade: (req, res) => {
    var grade = new Grade();
    grade.project = req.body.project;
    grade.grader = req.body.grader;
    grade.grade = req.body.grade;
    if (grade.grade > 10 || grade.grade < 1) {
      return res.json({ message: 'Please grade between 0 and 10 ! '});
    }
    grade.date = Date.now();
    grade.save((err) => {
      if (err) {
        return res.send(err);
      }

      res.json({
        message: `Grade ${grade.project} created !, at ${grade.date}`
      });
    });
  },

  updateGrade: (req, res) => {
    var body = req.body;
    body['updateDate'] = Date.now();
    Grade.findByIdAndUpdate(req.params.id, { $set: body}, {new: true}, (err, grade) => {
      if (err) {
        return res.send(err).status(500);
      }
      res.json(grade)
    });
  },

  deleteGrade: (req, res) => {
    Grade.findByIdAndRemove(req.params.id, (err, grade) => {
      if (err) {
        return res.send(err).status(500);
      }
      let str = (grade) ? `Grade ${grade._id} deleted !` : 'No grade were deleted.'
      res.json({ message: str })
    });
  },

};


module.exports = GradeController;
