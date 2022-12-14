const { user } = require("../models");

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { age, description } = req.body;

    if (id !== req.user._id.toString()) {
      res.status(400).send("No access");
    }

    const updatedUser = await user.findByIdAndUpdate(
      id,
      {
        age,
        description,
      },
      { new: true }
    );
    console.log(updatedUser);

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};
