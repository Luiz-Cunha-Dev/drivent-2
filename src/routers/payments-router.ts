import { newPayment, ticketInformation } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter.get("/", authenticateToken, ticketInformation);

paymentsRouter.post("/process", authenticateToken, newPayment);  

export { paymentsRouter };
