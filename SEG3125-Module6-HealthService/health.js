let currWizardStep = 1;

let selectedCard = '';

let wizardStepMaps = {
  1: 'appointmentInfo',
  2: 'paymentInfo',
  3: 'checkoutInfo'
}

let servicePriceMap = {
  1: 90,
  2: 120,
  3: 130,
  4: 150,
  5: 150,
  6: 90
}

let monthMap =  {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
}

// Validate this information
let appointmentInfo = {
  service: undefined,
  serviceNum: undefined,
  expert: undefined,
  dateTime: {
    day: undefined,
    month: undefined,
    year: undefined,
    time: undefined
  },
  contactName: {
    first: undefined,
    last: undefined,
    email: undefined,
    phone: undefined
  }
};

let paymentInfo = {
  cardType: selectedCard,
  cardNumber: undefined,
  cardExp: undefined,
  cardCvv: undefined
};
