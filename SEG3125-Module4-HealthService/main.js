/**
 * 
 * @param {String} id 
 */
function selectService(id) {
  const dropdownItems = document.getElementsByClassName('dd-service');
  for(var item of dropdownItems) {
    item.classList.remove('active');
  }

  const title = document.getElementById(id);
  title.classList.add('active');

  document.getElementById('dropdownService').innerText = title.innerText;
}

/**
 * 
 * @param {String} id 
 */
function selectMonth(id) {
  const dropdownItems = document.getElementsByClassName('month');
  for(var item of dropdownItems) {
    item.classList.remove('active');
  }

  const month = document.getElementById(id);
  
  document.getElementById('dropdownMonth').innerText = month.innerText;
}

/**
 * 
 * @param {String} id 
 */
function selectDay(id) {
  const dropdownItems = document.getElementsByClassName('day');
  for(var item of dropdownItems) {
    item.classList.remove('active');
  }

  const day = document.getElementById(id);

  document.getElementById('dropdownDay').innerText = day.innerText;
}

/**
 * 
 * @param {String} id 
 */
function selectYear(id) {
  const dropdownYear = document.getElementsByClassName('year');
  for(var item of dropdownYear) {
    item.classList.remove('active');
  }

  const year = document.getElementById(id);
  
  document.getElementById('dropdownYear').innerText = year.innerText;
}

/**
 * 
 * @param {String} id 
 */
function selectTime(id) {
  const dropdownItems = document.getElementsByClassName('time');
  for(var item of dropdownItems) {
    item.classList.remove('active');
  }

  const time = document.getElementById(id);

  document.getElementById('dropdownTime').innerText = time.innerText;
}

function submitAppointment() {
  var snackbar = document.getElementById('snackbar');
  snackbar.classList.add('show');
  reset();
  setTimeout(() => {
    snackbar.classList.remove('show');
  }, 3000);
}

function reset() {
  const dropdownServices = document.getElementsByClassName('dd-service');
  for(var service of dropdownServices) {
    service.classList.remove('active');
  }
  document.getElementById('dropdownService').innerText = 'Select Services';

  const dropdownMonth = document.getElementsByClassName('month');
  for(var month of dropdownMonth) {
    month.classList.remove('active');
  }
  document.getElementById('dropdownMonth').innerText = 'Month';

  const dropdownDay = document.getElementsByClassName('day');
  for(var day of dropdownDay) {
    day.classList.remove('active');
  }
  document.getElementById('dropdownDay').innerText = 'Day';

  const dropdownYear = document.getElementsByClassName('year');
  for(var year of dropdownYear) {
    year.classList.remove('year');
  }
  document.getElementById('dropdownYear').innerText = 'Year';

  const dropdownTime = document.getElementsByClassName('time');
  for(var time of dropdownTime) {
    time.classList.remove('active');
  }
  document.getElementById('dropdownTime').innerText = 'Time';

  document.getElementById('floatingName').value = '';
  document.getElementById('floatingEmail').value = '';
  document.getElementById('floatingPhone').value = '';
}