import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function ticketInformation(req: Request, res: Response) {

  // const userId = req.userId;
  const userId = 867;
  const {ticketId} = req.query;

  if(!ticketId){
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }

  try {
    const payment = await paymentRepository.findUniquePayment(Number(ticketId), userId);

    return res.send(payment).status(200)

  } catch (error) {

    if(error.name === "NOT_FOUND"){
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if(error.name === "UNAUTHORIZED"){
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function newPayment(req: Request, res: Response) {

  type boryType = {
    ticketId: number,
    cardData: {
      issuer: string,
      number: number,
      name: string,
      expirationDate: Date,
      cvv: number
    }
  }

  // const userId = req.userId;
  const userId = 867;
  const paymentInformation = req.body as boryType;

  if(!paymentInformation.cardData || !paymentInformation.ticketId){
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }

  try {
    const payment = await paymentRepository.createPayment(paymentInformation, userId);

    return res.send(payment).status(200)

  } catch (error) {

    if(error.name === "NOT_FOUND"){
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if(error.name === "UNAUTHORIZED"){
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}