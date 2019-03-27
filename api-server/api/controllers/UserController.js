/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  login: async (req, res) => {
    const {
      name
    } = req.allParams();

    if (!name) {
      return res.badRequest();
    }
    const data = await User.find({
      name
    });
    if (data.length > 0) {
      return res.ok();
    }
    res.status(401);
    return res.send('unauthorized');

  }

};
