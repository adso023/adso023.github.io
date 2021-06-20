$(document).on("ready", () => {
  console.log("Document is ready");
});

let wizardBodyMap = {
  1: 'appointmentSection',
  2: 'paymentSection',
  3: 'confirmedSection'
}

$("button#wizNext").on("click", () => {
  currWizardStep++;

  if (currWizardStep <= 3) {
    
    $(`div#${wizardBodyMap[currWizardStep - 1]}`).removeClass('active-view').addClass('inactive-view');
    $(`div#${wizardBodyMap[currWizardStep]}`).removeClass('inactive-view').addClass('active-view');

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
});

$("button#wizBack").on("click", () => {
  if (currWizardStep > 1) {
    currWizardStep--;

    $(`div#${wizardBodyMap[currWizardStep + 1]}`).removeClass('active-view').addClass('inactive-view');
    $(`div#${wizardBodyMap[currWizardStep]}`).removeClass('inactive-view').addClass('active-view');

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
  } else {
    currWizardStep = 1;
  }
});

let cardUnSelectMap = {
  'visa-card': './images/visa-mono.svg',
  'master-card': './images/mastercard-mono.svg',
  'amex': './images/amex-mono.svg'
}

let cardSelectedMap = {
  'visa-card': './images/visa.svg',
  'master-card': './images/mastercard.svg',
  'amex': './images/amex.svg'
}

$('img#visa-card').on('click', () => {
  selectCard('visa-card');
})

$('img#master-card').on('click', () => {
  selectCard('master-card');
})

$('img#amex').on('click', () => {
  selectCard('amex');
})

function selectCard(cardId) {
  if (selectedCard === '') {
    selectedCard = cardId;
    $(`img#${cardId}`).attr('src', cardSelectedMap[cardId]);
  } else {
    $(`img#${selectedCard}`).attr('src', cardUnSelectMap[selectedCard]);
    $(`img#${cardId}`).attr('src', cardSelectedMap[cardId]);
    selectedCard = cardId;
  }
}

$.each([1], () => {
  for (i = 1; i <= 31; i++) {
    $('select#daySelect').append($('<option />').val(i).text(i));
  }

  for (i = 1; i <= Object.keys(monthMap).length; i++) {
    $('select#MonthSelect').append($('<option />').val(i).text(monthMap[i]));
  }
})