import ShoppingCartRepository from "../repository/ShoppingCart.repository.js";
import { checkValidation } from "../middleware/validation.middleware.js";

class ShoppingCartController {

    getCartByUserId = async(req,res) => {
     try{
        checkValidation(req);
        const response = await ShoppingCartRepository.getShoppingCart(req.params.userId);
        res.send(response);

     }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }
    addItemtoCart = async(req,res)=>{
        try{
            checkValidation(req);
            const response = await ShoppingCartRepository.addItemToCart(req.params.userId,req.body);

            res.send(response);
        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }
    updateCartItem = async(req,res)=>{
    try{
        checkValidation(req);
        const {itemId} = req.params;
        const {qty} = req.body;
        const response = await ShoppingCartRepository.updateCartItem(itemId,qty);
        res.send(response);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

async deleteCartItem(req, res) {
    try {
      checkValidation(req);

      const response = await ShoppingCartRepository.deleteCartItem(req.params.itemId);
      res.send(response);

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

    async deleteCart(req,res){
        try{
            checkValidation(req);
            const response = await ShoppingCartRepository.clearCart(req.params.userId);
            res.send(response);
        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }

}
export default new ShoppingCartController();