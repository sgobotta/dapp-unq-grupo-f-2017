
export class Availability {

  monday: Workshift[];
  tuesday: Workshift[];
  wednesday: Workshift[];
  thursday: Workshift[];
  friday: Workshift[];
  saturday: Workshift[];
  sunday: Workshift[];

  constructor(monday: Workshift[], tuesday: Workshift[], wednesday: Workshift[],
    thursday: Workshift[], friday: Workshift[], saturday: Workshift[],
    sunday: Workshift[]) {

      this.monday = monday;
      this.tuesday = tuesday;
      this.wednesday = wednesday;
      this.thursday = thursday;
      this.friday = friday;
      this.saturday = saturday;
      this.sunday = sunday;
  }
}

export class AvailabilityBuilder {

  monday: Workshift[];
  tuesday: Workshift[];
  wednesday: Workshift[];
  thursday: Workshift[];
  friday: Workshift[];
  saturday: Workshift[];
  sunday: Workshift[];

  constructor() {
    this.clear();
    return this;
  }

  private clear() {
    this.monday = null;
    this.tuesday = null;
    this.wednesday = null;
    this.thursday = null;
    this.friday = null;
    this.saturday = null;
    this.sunday = null;
  }

  private buildWorkshifts(workshifts: Workshift[]) {
    let newShifts: Workshift[] = [];
    workshifts.forEach((shift) => {
      const workshift: Workshift = new WorkshiftBuilder()
        .withStartTime(shift.startTime)
        .withEndTime(shift.endTime)
        .build()
      newShifts.push(workshift);
    })
    return newShifts;
  }

  public withMonday(shifts: Workshift[]) {
    this.monday = this.buildWorkshifts(shifts);
    console.log(this.monday)
    return this;
  }

  public withTuesday(shifts: Workshift[]) {
    this.tuesday = this.buildWorkshifts(shifts);
    return this;
  }

  public withWednesday(shifts: Workshift[]) {
    this.wednesday = this.buildWorkshifts(shifts);
    return this;
  }

  public withThursday(shifts: Workshift[]) {
    this.thursday = this.buildWorkshifts(shifts);
    return this;
  }

  public withFriday(shifts: Workshift[]) {
    this.friday = this.buildWorkshifts(shifts);
    return this;
  }

  public withSaturday(shifts: Workshift[]) {
    this.saturday = this.buildWorkshifts(shifts);
    return this;
  }

  public withSunday(shifts: Workshift[]) {
    this.sunday = this.buildWorkshifts(shifts);
    return this;
  }

  public build() {
    const dayAvailability = new Availability(this.monday, this.tuesday,
      this.wednesday, this.thursday, this.friday, this.saturday,
      this.saturday);
    this.clear();
    return dayAvailability;
  }
}

export class Workshift {

  startTime: number
  endTime: number

  constructor(startTime: number, endTime: number) {
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

export class WorkshiftBuilder {

  startTime: number;
  endTime: number;

  constructor() {
    this.clear();
    return this;
  }

  private clear() {
    this.startTime = null;
    this.endTime = null;
  }

  public withStartTime(startTime: number) {
    this.startTime = startTime;
    return this;
  }

  public withEndTime(endTime: number) {
    this.endTime = endTime;
    return this;
  }

  public build() {
    const workshift = new Workshift(this.startTime, this.endTime);
    this.clear();
    return workshift;
  }
}