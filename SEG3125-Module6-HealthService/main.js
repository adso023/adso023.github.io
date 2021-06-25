$(document).on("ready", () => {
  console.log("Document is ready");
});

let wizardBodyMap = {
  1: "appointmentSection",
  2: "paymentSection",
  3: "confirmedSection",
};

// Think about validation later

$("button#wizNext").on("click", () => {
  if (currWizardStep < 3) {
    currWizardStep++;
    $(`div#${wizardBodyMap[currWizardStep - 1]}`)
      .removeClass("active-view")
      .addClass("inactive-view");
    $(`div#${wizardBodyMap[currWizardStep]}`)
      .removeClass("inactive-view")
      .addClass("active-view");

    $(`div#${wizardStepMaps[currWizardStep - 1]} > div.view-count`)
      .removeClass("bg-danger")
      .removeClass("text-white")
      .removeClass("border-danger")
      .addClass("border-secondary");

    $(`div#${wizardStepMaps[currWizardStep]} > div.view-count`)
      .removeClass("border-secondary")
      .addClass("bg-danger")
      .addClass("border-danger")
      .addClass("text-white");
  }

  // Workaround until validation is set up
  if (currWizardStep === 3) {
    // appointmentInfo.service = $("select#serviceSelect")
    //   .find(":selected")
    //   .text();
    // appointmentInfo.service = $("select#serviceSelect").find(":selected").val();
    // appointmentInfo.expert = $("select#expertSelect").find(":selected").text();
    // appointmentInfo.dateTime.day = $("select#daySelect")
    //   .find(":selected")
    //   .text();
    // appointmentInfo.dateTime.month = $("select#MonthSelect")
    //   .find(":selected")
    //   .text();
    // appointmentInfo.dateTime.year = $("select#YearSelect")
    //   .find(":selected")
    //   .text();
    // appointmentInfo.dateTime.time = $("select#timeSelect")
    //   .find(":selected")
    //   .text();
    // appointmentInfo.contactName.first = $("input#first").val();
    // appointmentInfo.contactName.last = $("input#last").val();
    // appointmentInfo.contactName.email = $("input#email").val();
    // appointmentInfo.contactName.phone = $("input#phone").val();

    // $("div#appointmentDetails")
    //   .append($("<label />").text("Appointment Details"))
    //   .append($("<hr />"))
    //   .append($())

    // paymentInfo.cardNumber = $("input#cardNumber").val();
    // paymentInfo.cardExp = $("input#cardExp").val();
    // paymentInfo.cardCvv = $("input#cardCvv").val();

    $("button#wizNext").text("Submit Appointment");
    $("button#wizNext").attr("id", "submitAppointment");
    $("button#submitAppointment").on("click", () => {
      $('#appointmentModal').modal('toggle');
      $('div#snackbar').addClass('show');
      setTimeout(() => {
        $('div#snackbar').removeClass('show');
      }, 3000);
    });
  }
});

$("button#wizBack").on("click", () => {
  if (currWizardStep > 1) {
    if (currWizardStep === 3) {
      $("button#submitAppointment").text("Next");
      $("button#submitAppointment").attr("id", "wizNext");
      $("button#submitAppointment").on('click', () => {});
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
      .addClass("bg-danger")
      .addClass("border-danger")
      .addClass("text-white");

    $(`div#${wizardStepMaps[currWizardStep + 1]} > div.view-count`)
      .removeClass("bg-danger")
      .removeClass("text-white")
      .removeClass("border-danger")
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
