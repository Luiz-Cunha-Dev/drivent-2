import { newPayment, ticketInformation } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter.get("/", ticketInformation);

paymentsRouter.post("/process", newPayment);  

export { paymentsRouter };
