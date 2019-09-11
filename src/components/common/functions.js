export function getDays(timestamp) {
  if (!timestamp) {
    return "-";
  }
  var usaTime = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  usaTime = new Date(usaTime);
  var now = usaTime
  const gameDate = new Date(timestamp);
  const diffTime = Math.abs(gameDate.getTime() - now.getTime());
  const diffDays = parseInt(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
export function getHours(timestamp) {
  if (!timestamp) {
    return "-";
  }
  var usaTime = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  usaTime = new Date(usaTime);
  const now = usaTime.getTime();
  const gameDate = new Date(timestamp);
  // get total seconds between the times
  var delta = Math.abs(gameDate - now) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  return hours;
  // // calculate (and subtract) whole minutes
  // var minutes = Math.floor(delta / 60) % 60;
  // delta -= minutes * 60;

  // // what's left is seconds
  // var seconds = delta % 60; // in theory the modulus is not required
}

export function getMinuts(timestamp) {
  if (!timestamp) {
    return "-";
  }
  var usaTime = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  usaTime = new Date(usaTime);
  const now = usaTime.getTime();
  const gameDate = new Date(timestamp);
  // get total seconds between the times
  var delta = Math.abs(gameDate - now) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  return minutes;
  // // what's left is seconds
  // var seconds = delta % 60; // in theory the modulus is not required
}
export function getSeconds(timestamp) {
  if (!timestamp) {
    return "-";
  }
  var usaTime = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  usaTime = new Date(usaTime);
  var now = usaTime.getTime();
  const gameDate = new Date(timestamp);
  // get total seconds between the times
  var delta = Math.abs(gameDate - now) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  // // what's left is seconds
  var seconds = delta % 60; // in theory the modulus is not required
  return parseInt(seconds, 10);
}
export function getStringDate(mDate) {
  if (mDate == null) {
    return "";
  }
  var mydate = new Date(mDate);
  var month = [
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
  ][mydate.getMonth()];
  var str = month + " " + mydate.getDate() + ", " + mydate.getFullYear() + " ";
  return str;
}
export function getStringTime(time) {
  if (time) {
    time = time.split(" ")[1];
  } else {
    return "-/-";
  }
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[3] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
