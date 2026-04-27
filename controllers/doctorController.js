// // 1) Add Doctor
exports.addDoctor = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'Doctor added successfully'
    });
};

// // 2) Remove Doctor
exports.removeDoctor = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Doctor removed successfully'
    });
};

// // 3) Update Doctor
exports.updateDoctor = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Doctor updated successfully'
    });
};