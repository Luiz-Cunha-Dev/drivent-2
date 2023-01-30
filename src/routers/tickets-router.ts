import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { allTicketsTypes, newTicket, userTicket } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter.get("/", userTicket);
ticketsRouter.get("/types", allTicketsTypes);

ticketsRouter.post("/", newTicket);

export { ticketsRouter };
