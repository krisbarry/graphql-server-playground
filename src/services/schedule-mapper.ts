import { Leg } from "../schemas/leg"
import { Stop } from "../schemas/stop"
import { Schedule } from "../schemas/schedule"

export async function transformSchedules(data: object): Schedule[] {

  const transformLIRRSchedules = async (schedulesData: object[]): Schedule[] => {
    let schedules: Schedule[] = []

    schedulesData.forEach( (scheduleData) => {
      let schedule = new Schedule(scheduleData.ALERTS, scheduleData.DURATION, scheduleData.PEAK_INDICATOR)
      scheduleData.LEGS.forEach( (legData) => {
        let leg = new Leg(legData.ARRIVE_TIME, legData.BRANCH, legData.DEPART_TIME, legData.STATUS, legData.TRACK, legData.TRAIN_ID )
        legData.STOPS.forEach( (stopData) => {
          leg.addStop(new Stop(stopData.STATION, stopData.TIME))
        })
        schedule.addLeg(leg)
      })
      schedules.push(schedule)
    })

    return schedules
  }

  const transformMNRSchedules = async (schedulesData: object[]): Schedule[] => {
    let mnrSchedules: Schedule[] = []
    return mnrSchedules
  }

  if(data.TRIPS) {  // LIRR response
    return transformLIRRSchedules(data.TRIPS)
  } else {  // MNR response
    return transformMNRSchedules(data.GetTripStatusJsonResult)
  }
}
