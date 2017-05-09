const Project = require('../model/Project');
const User = require('../model/User');
const Grade = require('../model/Grade');

const GradeController = {
    createGrade: (req, res) {
        Project.findOne({_id: req.params.projectId}).exec((err, project) => {
            if (err) { return res.send(err); }
            if (null == project) { return res.send('No project')}


            User.findOne({_id: req.params.userId}).exec((err, user) => {
                if (err) { return res.send(err); }
                if (null == user) { return res.send('No user')}

                Grade.findOne({_user: user, _project: project}).exec((err, grade) =>  {
                    if (err) { return res.send(err); }
                    if (null != grade) { return res.send('Already have a grade')}

                    var grade = new Grade();
                    grade._user = user;
                    grade._project = project;
                    grade.grade = req.body.grade;

                    grade.save((err) => {
                            if (err) {
                                return res.send(err);
                            }
                            res.json({message: `grade created !`});
                    });
                });

            });


        });
    },

    updateGrade: (req, res) {
        Grade.findOne({_id: req.params.id}).exec((err, grade) =>  {
            if (err) { return res.send(err); }
            if (null == grade) { return res.send('no grade')}

            grade.grade = req.body.grade;
            grade.modification_date = Date.now();

            grade.save((err) => {
                if (err) {
                    return res.send(err);
                }
                res.json({message: `grade updated !`});
            });
        });
    },

    deleteGrade: (req, res) {
        Grade.findByIdAndRemove(req.params.id, (err, grade) => {
            if (err) {
                return res.send(err).status(500);
            }
            let str = (grade) ? `Project ${grade._id} deleted !` : 'No project were deleted.'
            res.json({ message: str })
        });
    },

    projectsGrades: (req, res) {
        Project.find().populate({
            path: 'grades',
            model: 'Grade'
        }).exec((err, grade) => {
            if (err) { return res.send(err); }

            // Parcourir les notes pour calculer la moyenne et le nombre d'avi
        });
    },

    userProjects: (req, res) {

    },

    projectUsers: (req, res) {

    }
}

module.exports = GradeController;