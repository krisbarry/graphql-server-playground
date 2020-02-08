import {
  Args,
  Query,
  Root,
  Resolver,
  Mutation,
  Subscription
  // FieldResolver
} from "type-graphql"
import { Schedule } from "./schemas/schedule"
import { ScheduleService } from "./services/schedule"
import { ScheduleSearch } from "./schemas/schedule-search"

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

  /*@FieldResolver()
  numLegs(@Root() schedule: Schedule): number {
    return schedule.legs.length;
  }*

  @Subscription({ 
    topics: "NOTIFICATIONS",
    // filter: ({ payload, args }) => args.priorities.includes(payload.priority),
  })
  pointsScored(
    @Root() pointsPayload: any // PointsPayload
    // @Args() args: PointsArgs,
  ): any {
    console.log('points scored!')
    return {
      ...pointsPayload,
      date: new Date(),
    }
  }*/

}
