/**
 *
 * @param {String} id
 */
function updateAppointmentViaDropdown(id) {
  const dd = document.getElementsByClassName("dd-service");

  for (var item of dd) {
    item.classList.remove("active");
  }

  if (id !== "dropdown-item-clear") {
    const ddItem = document.getElementById(id);
    ddItem.classList.add("active");

    document.getElementById("dropdownMenuServices").innerText =
      ddItem.innerText;

    userAppointmentDetails.service = ddItem.innerText;
  } else {
    document.getElementById("dropdownMenuServices").innerText =
      "Select Service";
    userAppointmentDetails.service = "Select Service";
  }
}

function updateAppointmentDateTime(id) {
  const datetime = document.getElementById(id);

  if (id === "appDate") {
    userAppointmentDetails.date = datetime.value;
  } else if (id === "appTime") {
    userAppointmentDetails.date = datetime.value;
  } else {
    console.error("Invalid id for this function");
  }
}

function submitAppointment() {
  const name = document.getElementById("contactName").value;
  const phone = document.getElementById("contactPhone").value;
  const email = document.getElementById("contactEmail").value;

  userAppointmentDetails.name = name;
  userAppointmentDetails.phone = phone;
  userAppointmentDetails.email = email;

  currentAppointments = [...currentAppointments, userAppointmentDetails];

  resetFields();
  updateTable();
}

function resetFields() {
  updateAppointmentViaDropdown("dropdown-item-clear");
  document.getElementById("appDate").value = "";
  document.getElementById("appTime").value = "";
  document.getElementById("contactName").value = "";
  document.getElementById("contactPhone").value = "";
  document.getElementById("contactEmail").value = "";

  userAppointmentDetails = {
    service: "Select-Service",
    date: "mm/dd/yyyy",
    time: "--:-- --",
    name: "",
    phone: "--- --- ----",
    email: "",
  };
}

function updateTable() {
  const tBody = document.getElementById("table-body");

  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  let flag = 0;
  for (var app of currentAppointments) {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.innerText = flag + 1;

    const td2 = document.createElement("td");
    td2.innerText = app.name;

    const td3 = document.createElement("td");
    td3.innerText = app.phone;

    const td4 = document.createElement("td");
    td4.innerText = app.email;

    const td5 = document.createElement("td");
    td5.innerText = app.service;

    const td6 = document.createElement("td");
    td6.innerText = `${app.date} ${app.time}`;

    tr.append(td1, td2, td3, td4, td5, td6);
    tBody.append(tr);

    flag++;
  }
}
