const Project = require('./../models/projectModel');

// 1) Add New Project
exports.addNewProject = async (req, res, next) => { // ضفنا next هنا
  try {
    const newProj = await Project.create({
      title: req.body.title,
      description: req.body.description,
      student: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: { project: newProj }
    });
  } catch (err) {
    next(err); // هنا بنخلي الـ app.js هو اللي يتعامل مع الغلط صح
  }
};

// 2) Delete Project
exports.deleteProj = async (req, res, next) => { // ضفنا next هنا
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err); // هنا بنخلي الـ app.js هو اللي يتعامل مع الغلط صح
  }
};
