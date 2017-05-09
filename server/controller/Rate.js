const RateModel = require('../model/Rate');

const RateController = {

  //post (userId, projectId, rate - creationDate a save) OK
  rateProject: (req, res) => {
    //check if already rate for this project and user
    RateModel.findOne({
      fk_te_user: req.params.userId,
      fk_te_project: req.params.projectId
    })
    .exec((err, rate) => {
      if (err) { 
        return res.send(err); 
      } else if(rate){
        return res.send("rate already saved for this project and this user")
      }
    });

    const rate = new RateModel()
    rate.rate = req.body.rate
    rate.fk_te_project = req.body.projectId
    rate.fk_te_user = req.body.userId
    rate.creation_date = Date.now()

    if(rate.rate<0){
      rate.rate = 0;
    } else if(rate.rate>10){
      rate.rate = 10;
    }

    rate.save((err, rate) => {
      if (err) {
        return res.send(err)
      }
      res.json(rate)
    })

  },

  //put (userId, rateId, rate) OK
  updateRate: (req, res) => {
    RateModel.findByIdAndUpdate(req.params.rateId, { $set: req.body}, {new: true}, (err, rate) => {
      console.log('rate : ', rate)
      if (err) {
        return res.send(err).status(500);
      } else if(rate.fk_te_user!=req.params.userId){ //rate of user
        return res.send("This is not a rate of this user")
      }
      rate.rate = req.params.rate;
      rate.edit_date = Date.now();
      res.json(rate)
    });
  },

  //delete (rateId) OK
  deleteRate: (req, res) => {
    RateModel.findByIdAndRemove(req.params.rateId, (err) => {
      if (err) {
        return res.send(err).status(500);
      }
      res.json({ message: 'Rate deleted!' })
    });
  }

}

module.exports = RateController;
