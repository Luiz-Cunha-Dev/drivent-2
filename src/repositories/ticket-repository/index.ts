import { prisma } from "@/config";

async function findManyTicketsTypes() {
  const data = await prisma.ticketType.findMany();
  return data;
}

async function finduniqueTicketByUserId(userId: number) {
  const enrollment = await prisma.enrollment.findUnique({where:{userId}});

  if(!enrollment){
    throw {name: "NOT_FOUND"}
  }

  const data = await prisma.ticket.findMany({
    where:{enrollmentId: enrollment.id},
    include:{TicketType:true}
  })

  if(!data){
    throw {name: "NOT_FOUND"}
  }

  return data;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await prisma.enrollment.findUnique({where:{userId}});

  if(!enrollment){
    throw {name: "NOT_FOUND"}
  }

  const data = await prisma.ticket.create({
    data:{ticketTypeId, enrollmentId: enrollment.id, status: "RESERVED"},
    include:{TicketType:true}
  })


  return data;
}

const ticketRepository = {
  findManyTicketsTypes,
  finduniqueTicketByUserId,
  createTicket
};

export default ticketRepository;
