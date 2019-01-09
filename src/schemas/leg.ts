import {
  Int,
  Field,
  ObjectType
} from "type-graphql"
import { Stop } from "./stop"

@ObjectType({description: "Object representing a rail schedule leg."})
export class Leg {

  @Field({description: "Time in which this leg arrives the leg's destination station." })
  arrival: string;

  @Field({description: "Time in which this leg departs the leg's origin station." })
  departure: string;

  @Field({description: "Branch for this particular leg of a scheduled trip." })
  branch: string;

  @Field({nullable: true, description: "Train number for this particular leg of a scheduled trip." })
  trainNumber: string;

  @Field({nullable: true, description: "Track number for this particular leg of a scheduled trip." })
  trackNumber: string;

  @Field({description: "Status of this particular leg of a scheduled trip." })
  status: string;

  @Field(type => [Stop], {description: "All of the stations or stops for this particular leg of a scheduled trip."})
  stops: Stop[]

  @Field(type => Int)
  numStops(): number {
    return this.stops.length;
  }

  /*@Field(type => Float, { nullable: true })
  averageRating(@Arg("since") sinceDate: Date): number | null {
    const ratings = this.ratings.filter(rate => rate.date > sinceDate);
    if (!ratings.length) return null;

    const ratingsSum = ratings.reduce((a, b) => a + b, 0);
    return ratingsSum / ratings.length;
  }*/

  constructor(arrival: string, branch: string, departure: string, status: string, trackNumber: string, trainNumber: string) {
    this.stops = []
    this.branch = branch
    this.status = status
    this.arrival = arrival
    this.departure = departure
    this.trackNumber = trackNumber
    this.trainNumber = trainNumber
  }

  async addStop(stop: Stop) {
    this.stops.push(stop)
  }
}
