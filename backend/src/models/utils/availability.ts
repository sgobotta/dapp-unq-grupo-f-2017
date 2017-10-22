export default class Availability {

  daysOfTheWeek: [DayAvailability];

  constructor(daysOfTheWeek){
    this.daysOfTheWeek = daysOfTheWeek;
  }
}

interface DayAvailability {
  day: string,
  shifts: [Workshift]
}

interface Workshift {
  start: number,
  end: number
}
