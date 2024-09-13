import orderStausHistory from "../repository/orderStausHistory.js";
import { checkValidation } from "../middleware/validation.middleware.js";

class OrderStatusHistoryController{
    getOrderStatusHistory = async(req,res)=>{
        try{
            checkValidation(req);
            const response = await orderStausHistory.getOrderStatusHistory(req.params.orderId);
            res.send(response);
        }
        catch(error){
            res.status(400).json({error:error.message});
        }

    }
    getOrderStatusHistoryByStatus = async (req, res) => {
        try {
            checkValidation(req);
            const { statusId, startDate, endDate } = req.query;
    
            const parsedStartDate = new Date(startDate);
            const parsedEndDate = new Date(endDate);
    
            if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
                throw new Error("Invalid date format");
            }
    
            const response = await orderStausHistory.getOrderHistoriesByStatus(
                statusId,
                parsedStartDate.toISOString(),
                parsedEndDate.toISOString()
            );
            res.send(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
      
createOrderStatusHistory = async(req,res)=>{
    try{
        checkValidation(req);
        const{orderId,previousStatusId,newStatusId,userId,reason,automated} = req.body;
        const response = await orderStausHistory.createOrderStatusHistory(orderId,previousStatusId,newStatusId,userId,reason,automated);
        res.send(response);

    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}


}
export default new OrderStatusHistoryController();
