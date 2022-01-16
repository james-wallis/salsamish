import IEmployee from "./IEmployee";

interface IBaseAgendaItem {
  _id: string
  name: string
  description: string,
  type: string,
  lesson_level: string,
  start: string
  end: string
}

export interface IAgendaItem extends IBaseAgendaItem {
  employee: string
}

export interface IAgendaItemWithEmployees extends IBaseAgendaItem {
  employee: IEmployee
}

export type IAgenda = IAgendaItem[];

export type IAgendaWithEmployees = IAgendaItemWithEmployees[];
