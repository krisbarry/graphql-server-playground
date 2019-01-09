import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class ScheduleSearch {
  @Field({description: "Contains the rail agency to search schedules for (i.e. LIRR or MNR)"})
  agency: string

  @Field({description: "Contains the origin station in which to search schedules for"})
  origin: string

  @Field({description: "Contains the destination station in which to search schedules for"})
  destination: string

  @Field({nullable: true, description: "Contains the date AND time in which to search schedules for. If null, uses current date and time."})
  date: string;
}
