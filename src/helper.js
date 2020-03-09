import moment from "moment";
import _ from "lodash";

export function getCalendarMonth(year, month, day) {
  var arr = getItemsPerMonth(year, month, day);

  var result = _.groupBy(arr, function(m) {
    return m.date.isoWeek();
  });

  return result;
}

export function getItemsPerMonth(year, month, day) {
  var n = getIsoWeekDaysInMonth(year, month, day);

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

export function getFullMonthName(year, month, day) {
  return moment(year + "-" + month + "-" + day, "YYYY-MM-DD").format("MMMM");
}

export function getIsoWeekDaysInMonth(year, month, day) {
  var momentObj = moment(year + "-" + month + "-" + day, "YYYY-MM-DD");

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

moment.prototype.monthId = function() {
  return Number(this.format("YYYYMM"));
};

moment.prototype.weekId = function() {
  return Number(this.format("YYYYWW"));
};

moment.prototype.dayId = function() {
  return Number(this.format("YYYYMMDD"));
};
