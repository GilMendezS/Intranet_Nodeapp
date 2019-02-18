const Viatic = require('../models/models').Viatic;
const Project = require('../models/models').Project;
const ViaticComment = require('../models/models').ViaticComment;

exports.addViatic = async (req, res, next) => {
    try {
        const project = await Project.findOne({where: {id: req.body.project_id}});
        if(!project){
            return res.status(404).json({
                message: 'Project not found',
                success: false
            })
        }
        let authorizator = project.user_id;
        if(!req.user.roles.map( r => r.name).includes('supervisor')){
            if(req.user.id == authorizator){
                if(req.user.area_id != null){
                    authorizator = req.user.area.user_id;
                }
                else {
                    return res.status(422).json({
                        message: 'You dont have some authorizator, you cant create a new request',
                        success: false
                    })
                }
            }
        }
        if(!project.enoughBudget(req.body.money_requested)){
            return res.status(422).json({
                message: 'The project does not have budget',
                success: false
            });
        }
        const money = req.body.money_requested != '' ? req.body.money_requested : 0.0;
        const newViatic = await Viatic.create({
            project_id: project.id,
            user_id: req.user.id,
            auth_user_id: authorizator,
            origin: req.body.origin,
            destiny: req.body.destiny,
            departure: req.body.departure,
            arrive: req.body.arrive,
            money_requested: money,
            status_id: 4,
            money_deposited: 0.0,
            money_checked: 0.0,
            money_refunded: 0.0
        })
        await project.reduceBudget(parseFloat(money));
        if(req.body.comments != ''){
            await ViaticComment.create({
                user_id: req.user.id,
                comments: req.body.comments,
                viatic_id: newViatic.id,
                
            })
        }
        return res.status(200).json({
            message: 'Viatic created successfully',
            success: true,
            data: newViatic
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Error creating the request',
            success: false,
            error
        })
    }
}
10,14
exports.getViaticsByUser = async (req, res, next) => {
    const no_in_this_statuses = [10,14];
    try {
        const viatics = await Viatic.findAll({
            where: {
                status_id: {
                    $notIn: no_in_this_statuses
                },
                user_id: req.user.id
            }
        }, { include: {all:true}});
        return res.status(200).json({
            data: viatics,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching your viatics',
            success: false,
            error
        })
    }
    
}