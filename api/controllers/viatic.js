const User = require('../models/models').User;
const Role = require('../models/models').Role;
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
            });
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
                    });
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
        });
        //await project.reduceBudget(parseFloat(money));
        if(req.body.comments != ''){
            await ViaticComment.create({
                user_id: req.user.id,
                comments: req.body.comments,
                viatic_id: newViatic.id,
                
            });
        }
        return res.status(200).json({
            message: 'Viatic created successfully',
            success: true,
            data: newViatic
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error creating the request',
            success: false,
            error
        });
    }
}
exports.getViaticsByUser = async (req, res, next) => {
    const no_in_this_statuses = [10,14];
    try {
        const viatics = await Viatic.findAll({
            where: {
                status_id: {
                    $notIn: no_in_this_statuses
                },
                user_id: req.user.id
            },
            include: [{ all:true }]
        });
        return res.status(200).json({
            data: viatics,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching your viatics',
            success: false,
            error
        });
    }
    
}
exports.getViatic = async (req, res, next) => {
    try {
        const viaticId = req.params.id;
        const viatic = await Viatic.findByPk(viaticId, { include: {all: true}});
        if(!viatic){
            return res.status(404).json({
                message: 'Viatic not found',
                success: false
            });
        }
        return res.status(200).json({
            data: viatic,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching the viatic',
            success: false
        });
    }
}
exports.updateViatic = async (req, res, next) => {
    try {
        const viaticId = req.params.id;
        const viatic = await Viatic.findByPk(viaticId);
        if(!viatic){
            return res.status(404).json({message: 'Viatic not found', success: false});
        }
        if(viatic.isCanceled()){
            return res.status(422).json({message: 'You cant edit a canceled viatic'});
        }
        if(!viatic.canBeEdited){
            return res.status(422).json({message: 'The viatic cant be edited by now'});
        }
        let authorizator = viatic.auth_user_id;
        let project = await viatic.getProject();
        if(!req.user.roles.map(r => r.name).includes('supervisor')){
            
            if(viatic.project_id != req.body.project_id || viatic.auth_user_id == 0){
                project = await Project.findByPk(req.body.project_id)
                if(req.user.id == project.user_id){
                    if(req.user.area_id){
                        authorizator = req.user.area.user_id;
                    }
                    else {
                        return res.status(422).json({message: 'You cant create new request, you dont have an authorizator(area) assigned'});
                    }
                }
                else {
                    authorizator = project.user_id;
                }
            }
        }
       
        if(!project.enoughBudget(req.body.money_requested)){
            return res.status(422).json({
                message: 'The project does not have budget', success: false
            });
        }
        let money = viatic.money_requested;
        if(req.body.money_requested != viatic.money_requested){
            money = req.body.money_requested;
        }
        viatic.user_id = req.user.id;
        viatic.project_id = project.id;
        viatic.origin = req.body.origin;
        viatic.destiny = req.body.destiny;
        viatic.departure = req.body.departure;
        viatic.arrive = req.body.arrive;
        viatic.money_requested = money;
        viatic.auth_user_id = authorizator;
        viatic.status_id = 1;
        await viatic.save();
        if(req.body.comments != ''){
            await ViaticComment.create({
                user_id: req.user.id,
                comments: req.body.comments,
                viatic_id: viatic.id,
                
            });
        }
        return res.status(200).json({
            message:'Viatic updated successfully',
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating the viatic',
            error,
            success: false
        })
    }
}
exports.approveViatic = async(req, res, next) => {
    try {
        const viaticId = req.params.id;
        const viatic = await Viatic.findByPk(viaticId, {include: {all:true}});
        if(!viatic){
            return res.status(404).json({message: 'Viatic not found', success:false});
        }
        if(viatic.isCanceled()){
            return res.status(422).json({message: 'The viatic is canceled', success: false});
        }
        const result = await viatic.approve(req);
        if (result.success){
            if(req.body.comments != ''){
                await ViaticComment.create({
                    user_id: req.user.id,
                    comments: req.body.comments,
                    viatic_id: viatic.id,
                    
                });
            }
            return res.status(200).json({
                message: result.message,
                success: true
            });
        }
        else {
            return res.status(422).json({
                message: result.message,
                success: false,
            });
        }
        

    } catch (error) {
        return res.status(500).json({
            message: 'Error changing the status',
            error,
            success: false
        })
    }
}
exports.denyViatic = async (req, res ,next) => {
    try {
        const viaticId = req.params.id;
        const viatic = await Viatic.findByPk(viaticId, {include: {all:true}});
        if(viatic.isCanceled()){
            return res.status(422).json({message: 'Viatic canceled', success: false});
        }
        const result = await viatic.deny();
        if(result.success){
            if(req.body.comments != ''){
                await ViaticComment.create({
                    user_id: req.user.id,
                    comments: req.body.comments,
                    viatic_id: viatic.id,
                    
                });
            }
            return res.status(200).json({
                message: result.message,
                success: true
            })
        }
        else {
            return res.status(500).json({
                message: result.message,
                success: false
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Error changing the status',
            success: false
        })
    }
}
exports.cancelViatic = async (req, res, next) => {
    try {
        const viaticId = req.params.id;
        const viatic = await Viatic.findByPk(viaticId, { include: {all:true}});
        const statuses_to_prevent = [6,7,8,11,12,13,15];
        if(statuses_to_prevent.includes(viatic.status_id)){
            return res.status(422).json({message:'The viatic was approveed by administration, the lifecycle must be finished',success: false});
        }
        if(viatic.isCanceled()){
            return res.status(422).json({message:'The viatics is canceled.',success: false});
        }
        if(viatic.status == 11){
            return res.status(422).json({message:'The viatic is finished',success: false});
        }
        if(!req.user.roles.map(r => r.name).includes('admin')){
            if (viatic.user_id != req.user.id){
                return res.status(422).json({
                    message: 'You dont have permissions to change the status',
                    success: false
                })
            }
        }
        viatic.status_id = 7;
        viatic.auth_user_id = null;
        try {
            viatic.save();    
            if(req.body.comments != ''){
                await ViaticComment.create({
                    user_id: req.user.id,
                    comments: req.body.comments,
                    viatic_id: viatic.id,
                    
                });
            }
            return res.status(200).json({
                message: 'The viatic was canceled',
                succes: true
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Error canceling the viatic',
                success: false
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Error canceling the request',
            success: false
        })
    }
}
exports.finalizeViatic = async (req, res, next) => {
    if(!req.user.roles.map(r =>r.name).includes('admin')){
        return res.status(422).json({
            message: 'You dont have permissions to change the status'
        });
    }
    try {
        const viaticId = req.params.id;
        const viatic = await Viatic.findByPk(viaticId);
        viatic.status_id = 11;
        await viatic.save();
        if(req.body.comments != ''){
            await ViaticComment.create({
                user_id: req.user.id,
                comments: req.body.comments,
                viatic_id: viatic.id,
                
            });
        }
        return res.status(200).json({
            message: 'Request updated to finished',
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Error changing the status of the viatic',
            success: false
        })
    }
}