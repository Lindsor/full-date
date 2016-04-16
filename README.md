# full-date #

This module contains utility classes to use with the date object. It does not affect the Date.prototype object. Add functions are pure and do not change the passed in value.

## Installing ##

```bash
npm install --save full-date
```



## Quick Start ##

```javascript
const fDate = require("full-date");
const today = new Date();

const formatted = fDate.format("Y-m-d");
```

## Properties ##

### getMonths() ###

Returns an array of all months.

```javascript
fdate.getMonths();
/**
 * [
 *  "January",
 *  "February",
 *  ...
 * ]
 */
```

### getMonth(month) ###

Returns a single month. This uses the getMonths() function so january = 0...

```javascript
fdate.getMonth(11);
/**
 * December
 */
```

### getWeekDays() ###

Returns an array of all weekdays.

```javascript
fdate.getWeekDays();
/**
 * [
 *  "Monday",
 *  "Tuesday",
 *  ...
 * ]
 */
```

### getDay(day) ###

Returns a single weekday. This uses the getWeekDays() function so Monday = 0...

```javascript
fdate.getDay(5);
/**
 * Friday
 */
```

### getWeekStart(date) ###

Returns a date object set to the first day of the week of the specified date.

### getMonthStart(date) ###

Returns a date object set to the first day of the Month of the specified date.

### getMonthEnd(date) ###

Returns a date object set to the lsat day of the Month of the specified date.

### getMonthArray(date) ###

Returns a multidimensional array representing the month of the pased in date.

```javascript
//Asume April 13 2016
const today = new Date();

const april2016 = fDate.getMonthArray(today);

/**
 * [
 *  [null, null, null, null, null,  1,  2],
 *  [   3,    4,    5,    6,    7,  8,  9],
 *  [  10,   11,   12,   13,   14, 15, 16],
 *  [  17,   18,   19,   20,   21, 22, 23],
 *  [  24,   25,   26,   27,   28, 29, 30]
 * ]
 */
```

### getWeekNumber(date) ###

Returns a number representing the number of the week the passed in date falls in.

### getFormats() ###

Returns the formats object which holds all of the functions used for formating the date.

### format(date, format) ###

Returns a formated string based on the pased in date and format string.

This function uses the PHP format mapping [found here PHP date function](http://php.net/manual/en/function.date.php).

__NOTE:__ Not all mappings have been implemented yet.

```javascript
//Asume april 13 2016
const today = new Date();

fDate.format(today, "Y-m-d"); // "2016-04-13"
fDate.format(today, "F"); // April
```

### isThisYear(date) ###

Returns true if pased in date is this year, false otherwise.

### isThisMonth(date) ###

Returns true if pased in date is this Month, false otherwise.

### isToday(date) ###

Returns true if pased in date is today, false otherwise.