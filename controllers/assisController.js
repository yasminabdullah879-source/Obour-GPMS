// 1) Add Assistant
exports.addAssis = (req, res) => {
    res.status(201).json({
        status: 'success',
        message: 'Assistant added successfully',
        data: req.body
    });
};

// 2) Remove Assistant
exports.remAssis = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Assis Removed'
    });
};

// 3) Assign to Project
exports.assignToProj = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Assigned to project'
    });
};

// 4) Book Room Time
exports.bookRoomTime = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Room and Time Booked'
    });
};