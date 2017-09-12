export default class Availability {

  daysOfTheWeek: [DayAvailability];

  constructor(){

  }
}

interface DayAvailability {
  day: string,
  fromTime: number,
  toTime: number
}
