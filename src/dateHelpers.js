'use strict';
module.exports = {
  getWeekNumber(d) {
    d = new Date(d);// Copy date so don't modify original
    d.setHours(0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7)); // eslint-disable-line no-mixed-operators
    // Get first day of year
    const yearStart = new Date(d.getFullYear(), 0, 1); // eslint-disable-line no-mixed-operators
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return weekNo;
  }
};
