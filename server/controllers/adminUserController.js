const { logger } = require("../config/logger");
const { AdminUser } = require("../models/AdminUser");

const adminUserController = {
  add: (req, res) => {
    const adminUser = new AdminUser({
      email: req.body.email,
      password: req.body.password,
    });

    adminUser
      .save()
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getAll: (req, res) => {
    AdminUser.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  delete: (req, res) => {
    let id = req.params.id;

    AdminUser.findByIdAndDelete(id)
      .then((data) => {
        res.json(data);
        logger.log("info", "Admin User Delete", {
          message: "admin user deleted.. Id: " + id,
        });
      })
      .catch((err) => {
        res.json(err);
      });
  },
  
};

module.exports = {
  adminUserController,
};
