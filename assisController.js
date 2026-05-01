const Assistant = require('./../models/assistantModel');
const Booking = require('./../models/bookingModel');

// 1) إضافة معيد جديد (Add Assistant)
exports.addAssis = async (req, res, next) => {
    try {
        const newAssistant = await Assistant.create(req.body);
        res.status(201).json({
            status: 'success',
            message: 'تم إضافة المعيد بنجاح',
            data: { assistant: newAssistant }
        });
    } catch (err) {
        next(err);
    }
};

// 2) حذف معيد (Remove Assistant)
exports.remAssis = async (req, res, next) => {
    try {
        const assistant = await Assistant.findByIdAndDelete(req.params.id);
        
        if (!assistant) {
            return res.status(404).json({ status: 'fail', message: 'المعيد غير موجود' });
        }

        res.status(200).json({
            status: 'success',
            message: 'تم حذف المعيد بنجاح'
        });
    } catch (err) {
        next(err);
    }
};

// 3) ربط المعيد بمشروع (Assign to Project)
exports.assignToProj = async (req, res, next) => {
    try {
        // بنحدث بيانات المعيد ونضيف ID المشروع لقايمته
        const assistant = await Assistant.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { projects: req.body.projectId } },
            { new: true }
        );

        res.status(200).json({
            status: 'success',
            message: 'تم ربط المعيد بالمشروع بنجاح',
            data: { assistant }
        });
    } catch (err) {
        next(err);
    }
}

// 4) حجز وقت وقاعة (Book Room Time) - دي مهمة جداً في الورقة
exports.bookRoomTime = async (req, res, next) => {
    try {
        // هنا بنستخدم موديل الـ Booking اللي عملناه
        const newBooking = await Booking.create({
            project: req.body.projectId,
            roomNumber: req.body.roomNumber,
            bookingTime: req.body.bookingTime,
            status: 'confirmed'
        });

        res.status(200).json({
            status: 'success',
            message: 'تم حجز القاعة والموعد بنجاح',
            data: { booking: newBooking }
        });
    } catch (err) {
        next(err);
    }
};