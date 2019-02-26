const Concept = require('../models/models').Concept;

exports.getConcepts = async (req, res, next ) => {
    try {
        const concepts = await Concept.findAll();
        return res.status(200).json({
            success:true,
            data: concepts
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching the concepts',
            success: false,
            error
        });
    }
}