import {
  Field,
  ObjectType,
  Int
} from "type-graphql"
import { Leg } from "./leg"

@ObjectType({ description: "Object representing a rail schedule" })
export class Schedule {

  @Field(type => [String], {nullable: true, description: "Alerts specific to the particular schedule." })
  alerts: string[]

  @Field({description: "Duration of the scheduled trip"})
  duration: number;

  @Field({description: "Indicates whether scheduled trip is during peak (i.e. 'Y' or 'N')"})
  peak: string;

  @Field(type => [Leg])
  legs: Leg[]

  constructor(alerts: string[], duration: string, peak: number) {
    this.legs = []
    this.alerts = alerts
    this.duration = Number(duration)
    this.peak = peak === 1 ? 'Y' : 'N'
  }

  async addLeg(leg: Leg) {
    this.legs.push(leg)
  }
}
