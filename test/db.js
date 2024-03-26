const RAND_POSTFIX = Math.floor(Math.random() * 1000000000);

const patient = {
    "personalDetails": {
      "patientId": RAND_POSTFIX,
      "ID_type": "Passport",
      "firstName": "Emily",
      "lastName": "Johnson",
      "dateOfBirth": "1992-08-20",
      "gender": "female",
      "address": "789 Maple Ave",
      "City": "Sometown",
      "EmergencyPhonenumber": 5559876543,
      "email": `emily.johnson${RAND_POSTFIX}@example.com`,
      "Country": "United Kingdom",
      "Nationality": "British",
      "contactNumber": 9998887776,
      "Insurance_provider": "XYZ Healthcare",
      "Insurance_provider_number": RAND_POSTFIX
    },
    "knownDiseases": [
      {
        "name": "Migraine",
        "dateDiagnosed": "2017-10-05"
      },
      {
        "name": "Allergies",
        "dateDiagnosed": "2013-04-15"
      }
    ],
    "complaints": [
      {
        "complaint": "Back pain",
        "dateReported": "2024-02-20"
      },
      {
        "complaint": "Fatigue",
        "dateReported": "2024-02-28"
      }
    ],
    "referrals": [],
    "diagnosis": [],
    "treatment": [],
    "prescription": [],
    "dailyProgress": [],
    "admissionDetails": {},
    "dischargeSummary": {},
    "homeTreatmentPlan": {},
    "vitalSigns": [],
    "medicineAndTreatment": [],
    "appointments": []
  }

  module.exports = {
    patient
  }
