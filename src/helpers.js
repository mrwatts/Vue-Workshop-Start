import moment from "moment";
import _ from "lodash";

export function getCalendarMonth(year, month, day) {
  var arr = getItemsPerMonth(year, month, day);

  var result = _.groupBy(arr, function(m) {
    return m.date.isoWeek();
  });

  return result;
}

export function getItemsPerMonth(year, month) {
  var n = getIsoWeekDaysInMonth(year, month);

  var arr = Array.from(
    {
      length: n
    },
    (x, i) =>
      moment(year + "-" + month + "-01", "YYYY-MM-DD")
        .startOf("isoWeek")
        .add(i, "days")
  );

  var reqMonthId = moment(year + "-" + month + "-01", "YYYY-MM-DD").monthId();
  return arr.map(x => {
    return {
      dayId: x.dayId(),
      date: x,
      labelCount: 0,
      isInReqMonth: reqMonthId === x.monthId()
    };
  });
}

export function getFullMonthName(month) {
  return moment("2020-" + month + "-01", "YYYY-MM-DD").format("MMMM");
}

export function getIsoWeekDaysInMonth(year, month) {
  var momentObj = moment(year + "-" + month + "-01", "YYYY-MM-DD");

  var mFirstIsoWeekDayOfMonth = momentObj
    .clone()
    .startOf("month")
    .startOf("isoWeek");
  var mLastIsoWeekDayOfMonth = momentObj
    .clone()
    .endOf("month")
    .endOf("isoWeek");

  var d = moment.duration(mLastIsoWeekDayOfMonth.diff(mFirstIsoWeekDayOfMonth));

  return d.asDays() + 1;
}

export function getAppointments() {
  return [
    {
      id: 1,
      date: new Date("2020-03-12 18:00"),
      description: "Tech Event Dinner!",
      important: true
    },
    {
      id: 2,
      date: new Date("2020-03-12 19:00"),
      description: "Workshops Session I",
      important: false
    },
    {
      id: 3,
      date: new Date("2020-03-12 20:00"),
      description: "Workshops Session II",
      important: false
    }
  ];
}

moment.prototype.monthId = function() {
  return Number(this.format("YYYYMM"));
};

moment.prototype.weekId = function() {
  return Number(this.format("YYYYWW"));
};

moment.prototype.dayId = function() {
  return Number(this.format("YYYYMMDD"));
};
