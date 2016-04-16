'use strict';

var fDate = {};

module.exports = exports = fDate;

/**
 * Returns a new date thats exactly the same as the pased in one without changing it.
 * @param  {Object} date The date to clone.
 * @return {Object}      The cloned date.
 */
function cloneDate(date) {
  date = date || new Date();

  return new Date(date.getTime());
}

/**
 * Pads the passed in number if its less then 10.
 * @param  {Number} num The number to pad.
 * @return {String}     The padded number.
 */
function pad(num) {
  return (num < 10) ? "0" + num : num;
}

/**
 * Returns an array that holds all months.
 * @return {Array} The months array.
 */
fDate.getMonths = function() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return months;
};

/**
 * Returns the month string based on the passed in month number (starting at 0 for jannuary).
 * @param  {Number} month The 0 based array number of months.
 * @return {String}     The month string.
 */
fDate.getMonth = function(month) {
  const months = fDate.getMonths();

  if (typeof month !== "number") {
    month = 0;
  }

  return (month >= months.length) ? undefined : months[month];
};

/**
 * Returns an array that holds all days.
 * @return {Array} The days array.
 */
fDate.getWeekDays = function() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  return days;
};

/**
 * Returns the day string based on the passed in day number (starting at 0 for sunday).
 * @param  {Number} day The 0 based array number of days.
 * @return {String}     The day string.
 */
fDate.getDay = function(day) {
  const days = fDate.getWeekDays();

  return (day >= days.length) ? undefined : days[day];
};

/**
 * Gets the first day of the week.
 * @param  {Object} date The date whose week start to get.
 * @return {Object}      The date representing the beggining of the week.
 */
fDate.getWeekStart = function(date) {
  date = cloneDate(date);

  const d = new Date(date);
  const dayOfWeek = d.getDay();
  const dayOfMonth = d.getDate();

  d.setDate(dayOfMonth - dayOfWeek);

  return d
};

/**
 * Uses the pased in date to get the beginning of the date of the beggining of the month.
 * @param  {Object} date The date to grab the beggining of the month for.
 * @return {Object}      The beggining of the month date.
 */
fDate.getMonthStart = function(date) {
  date = cloneDate(date);

  const d = new Date(date);

  d.setDate(1);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);

  return d;
};

/**
 * Uses the passed in date to get the end of the pased in month.
 * @param  {Object} date The date to use.
 * @return {Object}      The end of the month.
 */
fDate.getMonthEnd = function(date) {
  date = cloneDate(date);

  const d = fDate.getMonthStart(date);

  d.setMonth(d.getMonth() + 1);
  d.setMilliseconds(-1);

  return d;
};

/**
 * Gets an array representation of the month.
 * The array is made up of other arrays as weeks.
 * @param  {Object} date The date representing the month to build the calendar for.
 * @return {Array}      The array representation of a month.
 */
fDate.getMonthArray = function(date) {
  date = cloneDate(date);

  const month = [];
  const start = fDate.getMonthStart(date);
  const end = fDate.getMonthEnd(date);
  const lastDay = end.getDate();
  const numRows = Math.ceil(lastDay / 7);
  const dayOffset = start.getDay();

  //Create each week.
  for (var i = 0, day = 1; i < numRows; i++) {
    var week = [];

    //If its the first week add in the offsets.
    if (i === 0) {
      for (var j = 0; j < dayOffset; j++) {
        week.push(null);
      }
    }

    //While the week is not done yet keep adding days / null.
    while (week.length < 7) {
      //If the day is greater then the last day then just add null.
      if (day > lastDay) {
        week.push(null);
      } else {
        var calDate = new Date(date.getFullYear(), date.getMonth(), day);
        week.push(calDate);
        day++;
      }
    }

    month.push(week);
  }

  return month;
};

/**
 * Gets the week number of the passed in week.
 * @param  {Object} date The date whose week to calculate.
 * @return {Number}      The week number.
 */
fDate.getWeekNumber = function(date) {
  date = cloneDate(date);

  date.setHours(0, 0, 0);
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  // Get first day of year
  var yearStart = new Date(date.getFullYear(), 0, 1);
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  // Week number
  return weekNo;
};

/**
 * Returns the formats object, this object has the functions to run with the specified keys.
 * @return {Object} An object of functions that format a date.
 */
fDate.getFormats = function() {
  const formats = {
    //Full year.
    Y: function(date) {
      date = cloneDate(date);
      return "" + date.getFullYear();
    },
    //1 digit month
    j: function(date) {
      date = cloneDate(date);

      return "" + (date.getMonth() + 1);
    },
    //2 digit Month.
    m: function(date) {
      date = cloneDate(date);
      return "" + pad(date.getMonth() + 1);
    },
    //2 digit day.
    d: function(date) {
      date = cloneDate(date);
      return "" + pad(date.getDate());
    },
    //Week number
    W: fDate.getWeekNumber,
    //Full textual month.
    F: function(date) {
      date = cloneDate(date);

      return "" + fDate.getMonth(date.getMonth());
    },
    //Non-padded hours.
    g: function(date) {
      date = cloneDate(date);

      return "" + (date.getHours() % 12);
    },
    //Returns capitalized meridian timezone.
    A: function(date) {
      date = cloneDate(date);

      return "" + ((date.getHours() < 12) ? "AM" : "PM");
    },
    //Returns padded minutes
    i: function(date) {
      date = cloneDate(date);

      return "" + (pad(date.getMinutes()));
    }
  };

  return formats;
};

/**
 * Based on the pased in date and format returns a formated string.
 * @param  {Object} date   The date object.
 * @param  {String} format The format to use.
 * @return {String}        The formated string.
 */
fDate.format = function(date, format) {
  //If format is not a valid string just return it.
  if (typeof format !== "string") {
    return "" + format;
  }

  date = cloneDate(date);

  const formats = fDate.getFormats();

  //Reduce the format string replacing all values with the coresponding date values.
  return format.split("").reduce(function(prev, letter) {
    const formatter = formats[letter];

    if (typeof formatter === "function") {
      return prev + formatter(date);
    }

    return prev + letter;
  }, "");
};

/**
 * Gets the next month of the pased in date.
 * @param  {Object} date The date to start with.
 * @return {Object}      The next month date object.
 */
fDate.nextMonth = function(date) {
  date = cloneDate(date);

  date.setMonth(date.getMonth() + 1);

  return date;
};

/**
 * Checks weather the pased in date is this year.
 * @param  {Object}  date The date to check.
 * @return {Boolean}      True if this year, false otherwise.
 */
fDate.isThisYear = function(date) {
  date = cloneDate(date);

  const today = new Date();

  return date.getFullYear() === today.getFullYear();
};

/**
 * Checks if the pased in date is this month.
 * @param  {Object}  date The date object to check.
 * @return {Boolean}      True if this month, false otherwise.
 */
fDate.isThisMonth = function(date) {
  date = cloneDate(date);

  const today = new Date();

  return (date.getFullYear() === today.getFullYear()) &&
    (date.getMonth() === today.getMonth());
};

/**
 * Checks if the date pased in is today.
 * @param  {Object}  date The date to check.
 * @return {Boolean}      True if the date is today, false otherwise.
 */
fDate.isToday = function(date) {
  date = cloneDate(date);

  const today = new Date();

  return (date.getDate() === today.getDate()) &&
    (fDate.isThisMonth(date)) &&
    (fDate.isThisYear(date));
};
