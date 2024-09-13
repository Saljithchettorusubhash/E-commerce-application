import orderRepository from "../repository/order.repository.js";
import { checkValidation } from "../middleware/validation.middleware.js";
import e from "express";

class OrderController {
    createOrder = async(req,res)=>{
        try{
            checkValidation(req);
            const response = await orderRepository.createOrder(req.currentUser.id,req.body);
            res.send(response);

        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    };
    getOrderById = async(req,res)=>{
        try{
            checkValidation(req);
            const response = await orderRepository.getOrderById(req.params.orderId);
            res.send(response);

        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }
    getAllOrdersForUser = async(req,res)=>{
        try{
            checkValidation(req);
            const response =await orderRepository.getAllOrdersForUser(req.currentUser.id);
            res.send(response);
        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }
    updateOrderstatus = async(req,res)=>{
        try{
            checkValidation(req);
            const orderId = req.params.orderId;
            const statusId = req.body.statusId;
            const userId = req.currentUser.id;
            const response = await orderRepository.updateOrderStatus(
                orderId,
                statusId,
                userId
            );
            res.send(response);

        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    };
    cancelOrder = async(req,res)=>{
        try{
            checkValidation(req);
            const orderId = req.params.orderId;
            const userId = req.currentUser.id;
            const response = await orderRepository.cancelOrder(
                orderId,
                userId
            );
            res.send(response);
        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }

    returnOrder = async(req,res)=>{
        try{
            checkValidation(req);
            const orderId = req.params.orderId;
            const userId = req.currentUser.id;
            const response = await orderRepository.returnOrder(orderId,userId);
            res.send(response);
        }
        catch(error){
            res.status(400).json({error:error.message});

    }
    }

    }
    export default new OrderController();