document.addEventListener("DOMContentLoaded", function () {
  const calendarHeader = document.getElementById("calendar-title");
  const calendarDays = document.getElementById("calendar-days");

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let currentMonth = 0;

  function isSecondSaturday(year, month, day) {
    const firstDayOfMonth = new Date(year, month, 1);
    const dayOfWeek = new Date(year, month, day).getDay();

    return dayOfWeek === 6 && day > 7 && day <= 14 && firstDayOfMonth.getDay() !== 6;
  }

  function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    calendarHeader.textContent = `${months[month]} 2024`;

    calendarDays.innerHTML = daysOfWeek.map(day => `<div>${day}</div>`).join("");

    for (let i = 0; i < firstDay.getDay(); i++) {
      calendarDays.innerHTML += `<div class="empty"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSunday = new Date(year, month, day).getDay() === 0;
      const isSecondSat = isSecondSaturday(year, month, day);

      const dayElement = document.createElement("div");
      dayElement.textContent = day;
      dayElement.className = isSunday || isSecondSat ? "holiday" : "";

      calendarDays.appendChild(dayElement);
    }
  }

  function changeMonth(offset) {
    currentMonth = (currentMonth + offset + 12) % 12;
    generateCalendar(2024, currentMonth);
  }

  document.getElementById("next-month-btn").addEventListener("click", function () {
    changeMonth(1);
  });

  document.getElementById("prev-month-btn").addEventListener("click", function () {
    changeMonth(-1);
  });

  generateCalendar(2024, currentMonth);
});
