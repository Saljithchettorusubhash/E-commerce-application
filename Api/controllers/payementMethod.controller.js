import payementMethodRepository from "../repository/payementMethod.repository.js";
import { checkValidation } from "../middleware/validation.middleware.js";

class payementMethodController {
  getAllPayementMethods = async (req, res, next) => {
    try {
      checkValidation(req);
      const userId = req.currentUser.id;
      const response = await payementMethodRepository.getAllPaymentMethods(
        userId
      );
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  createPayementMethod = async (req, res, next) => {
    try {
      checkValidation(req);
      const userId = req.currentUser.id;
      const response = await payementMethodRepository.createPaymentMethod(
        userId,
        req.body
      );
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  updatePayementMethod = async (req, res, next) => {
    try {
      checkValidation(req);
      const userId = req.currentUser.id;
      const response = await payementMethodRepository.updatePaymentMethod(
        req.params.id,
        userId,
        req.body
      );
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  deletePayementMethod = async (req, res) => {
    try {
      const userId = req.currentUser.id;
      const response = await payementMethodRepository.deletePaymentMethod(
        req.params.id,
        userId
      );
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  getAllPayementTypes = async (req, res) => {
    try {
      checkValidation(req);
      const response = await payementMethodRepository.getAllPayementTypes();
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  getAllTransactions = async (req, res) => {
    try {
      checkValidation(req);
      const userId = req.currentUser.id;
      const response = await payementMethodRepository.getAllTransactions(
        userId
      );
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  createTransaction = async (req, res) => {
    try {
      checkValidation(req);
      const response = await payementMethodRepository.createTransaction(
        req.body
      );
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
export default new payementMethodController();