import { Service } from "typedi"
import { Args } from "type-graphql"
import { plainToClass } from "class-transformer"
import { Schedule } from "../schemas/schedule"
import { ScheduleSearch } from "../schemas/schedule-search"

@Service()
export class ScheduleService {

  async searchSchedules(args: Args<ScheduleSearch>): Promise<Schedule[]> {
    return plainToClass(Schedule,[
      {
        duration: 69,
        date: new Date("2018-04-11"),
        alerts: ['Yes!']
      },
      {
        duration: 96,
        date: new Date("2019-01-03"),
        alerts: ['NOOO!!!']
      },
      {
        duration: 92,
        date: new Date(),
        alerts: ['Yes!','NOOO!!!']
      },
    ])
  }
}
