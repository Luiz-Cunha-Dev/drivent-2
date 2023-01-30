import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { allTicketsTypes, newTicket, userTicket } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter.get("/", authenticateToken, userTicket);
ticketsRouter.get("/types", authenticateToken, allTicketsTypes);

ticketsRouter.post("/", authenticateToken, newTicket);

export { ticketsRouter };
