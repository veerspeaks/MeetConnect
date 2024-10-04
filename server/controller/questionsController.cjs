const Questions = require('../models/questionsModel.cjs')

exports.getQuestions = async (req,res) => {
    const page= parseInt(req.query.page) || 1;
    const limit =parseInt(req.query.limit) || 10;
    const questionCategory = req.query.questionCategory
    const numberofCategoy = 4;  //change this if question of more cateogries are added 
    
    
    const skip = (page -1 ) * limit

    try{
        const questions = await Questions.find({questionCategory: questionCategory})
            .skip(skip)
            .limit(limit)

        const totalQuestions = await Questions.countDocuments(); // Total number of questions
        const totalPages = Math.ceil(totalQuestions / (limit* numberofCategoy));  

        res.json({
            currentPage: page,
            totalPages: totalPages,
            questions: questions,
            
        })
    }
    catch(e){
        console.log("error fetching questions", e)
    }
    
    
}