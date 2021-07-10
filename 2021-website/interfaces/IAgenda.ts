import IEmployee from "./IEmployee";

interface IBaseAgenda {
  _id: string
  name: string
  description: string,
  type: string,
  lesson_level: string,
  start: string
  end: string
}

export interface IAgenda extends IBaseAgenda {
  employee: string
}

export interface IAgendaWithEmployees extends IBaseAgenda {
  employee: IEmployee
}
