const Project = require('./../models/projectModel');

// 1) إضافة مشروع جديد (Add New Project)
exports.createProject = async (req, res, next) => {
  try {
    // ربط المشروع بالطالب المسجل دخول حالياً
    if (!req.body.student) req.body.student = req.user.id;
    
    // إضافة الطالب كأول عضو في الفريق أوتوماتيكياً
    if (!req.body.teamMembers) req.body.teamMembers = [req.user.id];

    const newProject = await Project.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { project: newProject }
    });
  } catch (err) {
    next(err);
  }
};

// باقي الدوال (getAllProjects, updateProject, deleteProject, getProject) 
// اللي إنتي كاتباها ممتازة ومش محتاجة أي تغيير.
exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().populate('doctor assistant student teamMembers');
    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: { projects }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!project) return res.status(404).json({ status: 'fail', message: 'المشروع غير موجود' });
    res.status(200).json({ status: 'success', data: { project } });
  } catch (err) { next(err); }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ status: 'fail', message: 'المشروع غير موجود' });
    res.status(204).json({ status: 'success', data: null });
  } catch (err) { next(err); }
};

exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('doctor assistant student teamMembers');
    if (!project) return res.status(404).json({ status: 'fail', message: 'المشروع غير موجود' });
    res.status(200).json({ status: 'success', data: { project } });
  } catch (err) { next(err); }
};