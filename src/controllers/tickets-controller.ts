import ticketRepository from "@/repositories/ticket-repository";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function allTicketsTypes(req: Request, res: Response) {

  try {
    const ticketsTypes = await ticketRepository.findManyTicketsTypes();

    return res.send(ticketsTypes).status(200)

  } catch (error) {

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function userTicket(req: Request, res: Response) {
   
    // const userId = req.userId;
    const userId = 867;

    try {
      const ticket = await ticketRepository.finduniqueTicketByUserId(userId);
      
      return res.send(ticket).status(200)
  
    } catch (error) {
      if(error.name === "NOT_FOUND"){
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  export async function newTicket(req: Request, res: Response) {
   
    type bodyType = {
      ticketTypeId: number
    }

    // const userId = req.userId;
    const userId = 867;
    const {ticketTypeId} = req.body as bodyType;

    if(!ticketTypeId){
      return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    try {
      const ticket = await ticketRepository.createTicket(userId, ticketTypeId);
      
      return res.send(ticket).status(201)
  
    } catch (error) {
      if(error.name === "NOT_FOUND"){
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }