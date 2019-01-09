import {
  Field,
  ObjectType
} from "type-graphql"

@ObjectType({ description: "Object representing a rail schedule leg stop" })
export class Stop {
  @Field({description: "Station associated with this particular stop for a scheduled trip leg."})
  station: string

  @Field({description: "Time of departure for this particular stop within a scheduled trip leg."})
  departure: string

  constructor(station: string, departure: string) {
    this.station = station
    this.departure = departure
  }
}
