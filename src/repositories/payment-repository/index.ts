import { prisma } from "@/config";
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

async function findUniquePayment(ticketId: number, userId: number) {
  const ticket = await prisma.ticket.findUnique({
    where:{id: ticketId},
    select:{enrollmentId:true}
  })

  if(!ticket){
    throw {name: "NOT_FOUND"}
  }

  const enrollment = await prisma.enrollment.findUnique({
    where:{id: ticket.enrollmentId},
    select:{userId:true}
  })

  if(enrollment.userId !== userId){
    throw {name: "UNAUTHORIZED"}
  }

  const payment = await prisma.payment.findFirst({
    where:{ticketId}
  })

  if(!payment){
    throw {name: "NOT_FOUND"}
  }

  return payment;
}

async function createPayment(paymentInformation: boryType, userId: number) {
  const ticket = await prisma.ticket.findUnique({
    where:{id: paymentInformation.ticketId},
    select:{ticketTypeId:true, enrollmentId:true}
  })

  
  if(!ticket){
    throw {name: "NOT_FOUND"}
  }

  const enrollment = await prisma.enrollment.findUnique({
    where:{id: ticket.enrollmentId},
    select:{userId:true}
  })

  if(userId !== enrollment.userId){
    throw {name: "UNAUTHORIZED"}
  }


  const {price} = await prisma.ticketType.findUnique({
    where:{id: ticket.ticketTypeId},
    select:{price:true}
  })

  const payment = await prisma.payment.create({
    data:{
      ticketId: paymentInformation.ticketId,
      value: price,
      cardIssuer: paymentInformation.cardData.issuer,
      cardLastDigits: paymentInformation.cardData.number.toString().slice(-4)
    }
  })

  return payment;

}

async function updateStatusTicket(ticketId: number) {

  await prisma.ticket.update({
    where:{id: ticketId},
    data:{status:"PAID"}
  })

}


const paymentRepository = {
findUniquePayment,
createPayment,
updateStatusTicket
};

export default paymentRepository;
