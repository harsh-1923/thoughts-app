const ThoughtsSchema = require("../models/Thoughts.js");

exports.createThoughts = (req, res) => {
  //   console.log("Creating a thought");
  const { title, content, banner } = req.body;

  if (!title || !content || !banner) {
    return res.status(400).json({
      error: true,
      message: "Missing values, cannot create thought",
      isAuthenticated: false,
    });
  } else {
    const newThought = new ThoughtsSchema({
      title: title,
      content: content,
      banner: banner,
    });
    newThought.save().then((savedThought) => {
      if (savedThought) {
        return res.stautus(200).json({
          error: false,
          message: "Thought Created",
          savedThought,
        });
      } else {
        return res.status(400).json({
          error: true,
          message: "Missing values, cannot create thought",
        });
      }
    }).catch;
  }
};
