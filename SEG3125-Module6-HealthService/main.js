$(document).on("ready", () => {
  console.log("Document is ready");
});

let wizardBodyMap = {
  1: "appointmentSection",
  2: "paymentSection",
  3: "confirmedSection",
};

const validateStep1 = () => {
  let errors = new Array(8).map((_) => true);
  let serviceSelect = $("#serviceSelect").find(":selected").text();
  let serviceVal = $("#serviceSelect").find(":selected").val();
  let expertSelect = $("#expertSelect").find(":selected").text();
  let daySelect = $("#daySelect").find(":selected").text();
  let monthSelect = $("#MonthSelect").find(":selected").val();
  let yearSelect = $("#YearSelect").find(":selected").text();
  let timeSelect = $("#timeSelect").find(":selected").text();
  let first = $("#first").val();
  let last = $("#last").val();
  let email = $("#email").val();
  let phone = $("#phone").val();

  if (serviceSelect === "Choose a Service...") {
    $("#serviceError").removeClass("d-none").addClass("d-block");
    appointmentInfo.serviceSelect = undefined;
    appointmentInfo.serviceVal = undefined;
  } else {
    $("#serviceError").addClass("d-none").removeClass("d-block");
    errors[0] = false;
    appointmentInfo.serviceSelect = serviceSelect;
    appointmentInfo.serviceVal = serviceVal;
  }

  if (expertSelect === "Choose a Expert") {
    $("#expertError").removeClass("d-none").addClass("d-block");
    appointmentInfo.expertSelect = undefined;
  } else {
    $("#expertError").addClass("d-none").removeClass("d-block");
    errors[1] = false;
    appointmentInfo.expertSelect = expertSelect;
  }

  let tempDate = new Date().toLocaleDateString().split("/");
  appointmentInfo.dateTime.daySelect = undefined;
  appointmentInfo.dateTime.MonthSelect = undefined;
  appointmentInfo.dateTime.YearSelect = undefined;
  if (daySelect === "Day" || monthSelect === "Month" || yearSelect === "Year") {
    $("#dateError").html("Select a valid value for the options below");
    $("#dateError").removeClass("d-none").addClass("d-block");
  } else if (
    +daySelect < +tempDate[1] &&
    +monthSelect < +tempDate[0] &&
    +yearSelect < +tempDate[2]
  ) {
    $("#dateError").html("Choose a valid date");
    $("#dateError").removeClass("d-none").addClass("d-block");
  } else {
    $("#dateError").removeClass("d-block").addClass("d-none");
    errors[2] = false;
    appointmentInfo.dateTime.daySelect = daySelect;
    appointmentInfo.dateTime.MonthSelect = monthMap[+monthSelect];
    appointmentInfo.dateTime.YearSelect = yearSelect;
  }

  if (timeSelect === "Choose Time") {
    $("#timeError").removeClass("d-none").addClass("d-block");
    appointmentInfo.dateTime.timeSelect = undefined;
  } else {
    $("#timeError").addClass("d-none").removeClass("d-block");
    errors[3] = false;
    appointmentInfo.dateTime.timeSelect = timeSelect;
  }

  if (first === "") {
    $("#fnameError").removeClass("d-none").addClass("d-block");
    appointmentInfo.first = undefined;
  } else {
    $("#fnameError").removeClass("d-block").addClass("d-none");
    errors[4] = false;
    appointmentInfo.first = first;
  }

  if (last === "") {
    $("#lnameError").removeClass("d-none").addClass("d-block");
    appointmentInfo.last = undefined;
  } else {
    $("#lnameError").addClass("d-none").removeClass("d-block");
    errors[5] = false;
    appointmentInfo.last = last;
  }

  if (email === "") {
    $("#emailError").removeClass("d-none").addClass("d-block");
    appointmentInfo.email = undefined;
  } else {
    $("#emailError").addClass("d-none").removeClass("d-block");
    errors[6] = false;
    appointmentInfo.email = email;
  }

  let tempPhone = phone.split("-");
  appointmentInfo.phone = undefined;
  if (phone === "") {
    $("#phoneError").removeClass("d-none").addClass("d-block");
  } else if (
    tempPhone.length !== 3 &&
    tempPhone[0].length !== 3 &&
    tempPhone[1].length !== 3 &&
    tempPhone[2].length !== 4
  ) {
    $("#phoneError").removeClass("d-none").addClass("d-block");
  } else {
    $("#phoneError").addClass("d-none").removeClass("d-block");
    errors[7] = false;
    appointmentInfo.phone = phone;
  }

  console.log(appointmentInfo);
  return errors.filter((value) => value === false).length === 8;
};

const validateStep2 = () => {
  let errors = new Array(3).map((_) => true);
  let cardType = paymentInfo.cardType;
  let cardNumber = $("#cardNumber").val();
  let expNumber = $("#cardExp").val();
  let cvvNumber = $("#cardCvv").val();

  if (
    cardType === "visa-card" &&
    cardNumber !== "" &&
    cardNumber[0] === "4" &&
    (cardNumber.length >= 13 || cardNumber.length <= 16)
  ) {
    errors[0] = false;
    paymentInfo.cardNumber = cardNumber;
    $("#creditcard-error").addClass("d-none").removeClass("d-block");
  } else if (
    cardType === "master-card" &&
    cardNumber !== "" &&
    +cardNumber.substr(0, 2) >= 51 &&
    +cardNumber.substr(0, 2) <= 55 &&
    cardNumber.length === 16
  ) {
    errors[0] = false;
    paymentInfo.cardNumber = cardNumber;
    $("#creditcard-error").addClass("d-none").removeClass("d-block");
  } else if (
    cardType === "amex" &&
    cardNumber !== "" &&
    (+cardNumber.substr(0, 2) === 31 || +cardNumber.substr(0, 2) === 37) &&
    cardNumber.length === 15
  ) {
    errors[0] = false;
    paymentInfo.cardNumber = cardNumber;
    $("#creditcard-error").addClass("d-none").removeClass("d-block");
  } else {
    $("#creditcard-error").removeClass("d-none").addClass("d-block");
    paymentInfo.cardNumber = undefined;
  }

  let tempExp = [...expNumber.trim().split("/")];
  if (expNumber === "") {
    $("#expnum-error").removeClass("d-none").addClass("d-block");
  } else if (
    tempExp.length !== 2 &&
    tempExp[0].trim() !== "" &&
    tempExp[1].trim() !== "" &&
    (+tempExp[0] >= 1 || +tempExp[0] <= 12) &&
    (+tempExp[1] >= 1 || +tempExp[1] <= 31)
  ) {
    $("#expnum-error").removeClass("d-none").addClass("d-block");
    paymentInfo.cardExp = undefined;
  } else {
    $("#expnum-error").addClass("d-none").removeClass("d-block");
    errors[1] = false;
    paymentInfo.cardExp = expNumber;
  }

  if (cvvNumber === "" || (cvvNumber.length < 3 && cvvNumber.length > 4)) {
    $("#cvv-error").removeClass("d-none").addClass("d-block");
    paymentInfo.cardCvv = undefined;
  } else {
    $("#cvv-error").addClass("d-none").removeClass("d-block");
    errors[2] = false;
    paymentInfo.cardCvv = cvvNumber;
  }

  return errors.filter((value) => value === false).length === 3;
};

$("button#wizNext").on("click", () => {
  if (currWizardStep < 3) {
    if (
      (currWizardStep === 1 && validateStep1()) ||
      (currWizardStep === 2 && validateStep2())
    ) {
      currWizardStep++;
    }

    $(`div#${wizardBodyMap[currWizardStep - 1]}`)
      .removeClass("active-view")
      .addClass("inactive-view");
    $(`div#${wizardBodyMap[currWizardStep]}`)
      .removeClass("inactive-view")
      .addClass("active-view");

    $(`div#${wizardStepMaps[currWizardStep - 1]} > div.view-count`)
      .removeClass("bg-success")
      .removeClass("text-white")
      .removeClass("border-success")
      .addClass("border-secondary");

    $(`div#${wizardStepMaps[currWizardStep]} > div.view-count`)
      .removeClass("border-secondary")
      .addClass("bg-success")
      .addClass("border-success")
      .addClass("text-white");
  }

  // Workaround until validation is set up
  if (currWizardStep === 3) {
    $("#checkout").html(
      `Checkout amount $${servicePriceMap[appointmentInfo.serviceVal]}`
    );

    $("button#wizNext").text("Submit Appointment");
    $("button#wizNext").attr("id", "submitAppointment");
    $("button#submitAppointment").on("click", () => {
      $("#appointmentModal").modal("toggle");
      $("div#snackbar").addClass("show");
      setTimeout(() => {
        $("div#snackbar").removeClass("show");
      }, 3000);
    });
  }
});

$("button#wizBack").on("click", () => {
  if (currWizardStep > 1) {
    if (currWizardStep === 3) {
      $("button#submitAppointment").text("Next");
      $("button#submitAppointment").attr("id", "wizNext");
      $("button#submitAppointment").on("click", () => {});
    }

    currWizardStep--;
    $(`div#${wizardBodyMap[currWizardStep + 1]}`)
      .removeClass("active-view")
      .addClass("inactive-view");
    $(`div#${wizardBodyMap[currWizardStep]}`)
      .removeClass("inactive-view")
      .addClass("active-view");

    $(`div#${wizardStepMaps[currWizardStep]} > div.view-count`)
      .removeClass("border-secondary")
      .addClass("bg-success")
      .addClass("border-success")
      .addClass("text-white");

    $(`div#${wizardStepMaps[currWizardStep + 1]} > div.view-count`)
      .removeClass("bg-success")
      .removeClass("text-white")
      .removeClass("border-success")
      .addClass("border-secondary");
  }
});

let cardUnSelectMap = {
  "visa-card": "./images/visa-mono.svg",
  "master-card": "./images/mastercard-mono.svg",
  amex: "./images/amex-mono.svg",
};

let cardSelectedMap = {
  "visa-card": "./images/visa.svg",
  "master-card": "./images/mastercard.svg",
  amex: "./images/amex.svg",
};

$("img#visa-card").on("click", () => {
  selectCard("visa-card");
});

$("img#master-card").on("click", () => {
  selectCard("master-card");
});

$("img#amex").on("click", () => {
  selectCard("amex");
});

function selectCard(cardId) {
  if (paymentInfo.cardType === "") {
    $(`img#${cardId}`).attr("src", cardSelectedMap[cardId]);
  } else {
    $(`img#${paymentInfo.cardType}`).attr(
      "src",
      cardUnSelectMap[paymentInfo.cardType]
    );
    $(`img#${cardId}`).attr("src", cardSelectedMap[cardId]);
    selectedCard = cardId;
  }

  $("#credit-card-alert").addClass("d-none");
  $("#cardNumber").removeAttr("disabled");
  $("#cardExp").removeAttr("disabled");
  $("#cardCvv").removeAttr("disabled");

  paymentInfo.cardType = cardId;
}

$.each([1], () => {
  for (i = 1; i <= 31; i++) {
    $("select#daySelect").append($("<option />").val(i).text(i));
  }

  for (i = 1; i <= Object.keys(monthMap).length; i++) {
    $("select#MonthSelect").append($("<option />").val(i).text(monthMap[i]));
  }

  for (i = 0; i < 12; i++) {
    if (i >= 5) {
      $("select#timeSelect").append(
        $("<option />")
          .val(`${i - 5 + 1}`)
          .text(`${i - 5 + 1}:00 PM`)
      );

      if (i !== 11) {
        $("select#timeSelect").append(
          $("<option />")
            .val(`${i - 5 + 1}`)
            .text(`${i - 5 + 1}:30 PM`)
        );
      }
    } else {
      $("select#timeSelect").append(
        $("<option />")
          .val(`${i + 8}`)
          .text(`${i + 8}:00 AM`)
      );
      $("select#timeSelect").append(
        $("<option />")
          .val(`${i + 8}`)
          .text(`${i + 8}:30 AM`)
      );
    }
  }
});
