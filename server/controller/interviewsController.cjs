const Interviews = require('../models/interviewModel.cjs')


exports.getInterviews = async (req, res) => {
    const userId = req.params.userId;

    try {
        const interviews = await Interviews.find({studentId: userId});
        
        res.json(interviews);
    } catch (error) {
        console.error("Failed to fetch categories", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.addInterview = async (req, res) => {
    const { studentId, interviewerId, category, scheduledDate } = req.body; // Updated fields

    try {
        const newInterview = new Interviews({
            studentId,
            interviewerId,  // Added interviewerId
            category,       // Added category
            scheduledDate,  // Added scheduledDate
            status: "pending",  // Default status
            feedback: null,     // Default feedback
        });

        await newInterview.save();

        res.status(201).json(newInterview);
        console.log(newInterview, "at interview controller")
    } catch (error) {
        console.error("Failed to add interview", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

