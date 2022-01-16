import { IAgenda, IAgendaWithEmployees } from './IAgenda';

interface IBaseEvent {
  _id: string
  name: string
  type: string
  description: string | null
  date: {
    start: string
    end: string
  },
  facebook: string | null,
}

export interface IEvent extends IBaseEvent {
  agenda: IAgenda
}

export interface IEventWithEmployees extends IBaseEvent {
  agenda: IAgendaWithEmployees
}
