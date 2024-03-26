# HW_Hospital_App

## Version: 1.0
## Details: Hospital API 
/*******************************************************************************************************************************************************
### Features:
1. **Patient API:** 
   - CRUD operations for patient records.
   - Search patients by ID or details.
   - Rule-based authentication for patient details.

2. **Appointment, Treatment, and Referral:**
   - Extension of patient API to include appointment, treatment, and referral features.
   - Rule-based authentication for creating details.

3. **User Authentication API:**
   - Token-based authentication for user registration and login.

4. **Ward Management:**
   - API for managing wards.

### Endpoints:
- **User Registration:** `POST /users/register`
- **User Login:** `POST /users/login` (Token returned)
- **Create Patient:** `POST /patients`
- **Get All Patients:** `GET /patients`
- **Get Patient By ID:** `GET /patients/id/:PatientID`
- **Get Patient By Details:** `GET /patients/details?firstName=John` (Search by Name, ID, Email, or Contact No.)
- **Create Appointment:** `PATCH /patients/:PatientID`
- **Get Appointment By Doctor:** `GET /doctors/:Doctor_name/appointments`
- **Get All Appointments By Patient:** `GET /patients/appointments/:PatientID`
- **Get Current Appointment By Patient:** `GET /patients/curappointments/:PatientID`
- **Create Treatment:** `PATCH /patients/:PatientID`
- **Get All Patient Treatments:** `GET /patients/treatments/:PatientID`
- **Get Current Patient Treatment:** `GET /patients/curtreatments/:PatientID`

**Note:** Use the token from User login to access the API.

### Additional Information:
Changes related to Jenkins CICD pipeline have been introduced.
*******************************************************************************************************************************************************/
