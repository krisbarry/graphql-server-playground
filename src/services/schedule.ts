import axios from "axios"
import { Service } from "typedi"
import { Args } from "type-graphql"
import { Schedule } from "../schemas/schedule"
import { transformSchedules } from "./schedule-mapper"
import { ScheduleSearch } from "../schemas/schedule-search"

@Service()
export class ScheduleService {

  async searchSchedules( args: Args<ScheduleSearch> ): Promise<Schedule[]> {
    const currentDate = new Date()
    const year = args.date ? args.date.substr(4,4) : currentDate.getFullYear()
    const day = args.date ? args.date.substr(2,2) : currentDate.getDate().toString().padStart(2,'0')
    const month = args.date ? args.date.substr(0,2) : (currentDate.getMonth() + 1).toString().padStart(2,'0')
    const hours = args.date && args.date.length > 8 ? args.date.substr(8,2) : currentDate.getHours().toString().padStart(2,'0')
    const minutes = args.date && args.date.length > 8 ? args.date.substr(10) : currentDate.getMinutes().toString().padStart(2,'0')

    let schedulesRequest
    // build the schedules request given the schedules metadata, especially the agency metadata
    if(args.agency === 'MNR') {
      schedulesRequest = `https://mnorth.prod.acquia-sites.com/wse/MYmta/Trains/v4/1/157/DepartBy/${year}/${month}/${day}/${hours}${minutes}/9ea83a8a361efacd098b6c7f6a6e49c1/Tripstatus24`
      // schedulesRequest = `https://mnorth.prod.acquia-sites.com/wse/MYmta/Trains/v4/${args.origin}/${args.destination}/DepartBy/${year}/${month}/${day}/${hours}${minutes}/9ea83a8a361efacd098b6c7f6a6e49c1/Tripstatus24`
    } else /*if(args.agency === 'LIRR')*/ {
      schedulesRequest = `https://traintime.lirr.org/api/TrainTime?startsta=${args.origin}&endsta=${args.destination}&year=${year}&month=${month}&day=${day}&hour=${hours}&minute=${minutes}&datoggle=d&mymta=1`
    }
    // console.log('About to get schedules for ' + args.agency)
    // make the request given the built Schedules API request
    const schedulesResponse = await axios({
      url: schedulesRequest,
      headers: {},
      method: 'get',
      responseType: 'json',
      transformResponse: axios.defaults.transformResponse.concat(transformSchedules)  // need axios.defaults.transformResponse, otherwise response is a string vs json object
    })
    return schedulesResponse.data
  }
}
