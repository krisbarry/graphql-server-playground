import {
  Args,
  Query,
  Root,
  Resolver,
  FieldResolver
} from "type-graphql"
import { Schedule } from "./schemas/schedule"
import { ScheduleService } from "./services/schedule"
// import { ScheduleService } from "./services/mock/schedule"
import { ScheduleSearch } from "./schemas/schedule-search"

// @Service()
@Resolver(of => Schedule)
export class ScheduleResolver {

  constructor (
    // constructor injection of a service
    private readonly scheduleService: ScheduleService,
  ) {}

  @Query(returns => [Schedule], { nullable: true })
  async schedulesByDate( @Args() args: ScheduleSearch ): Promise<Schedule[] | undefined> {
    return await this.scheduleService.searchSchedules(args)
  }

  @FieldResolver()
  numLegs(@Root() schedule: Schedule): number {
    return schedule.legs.length;
  }
}
