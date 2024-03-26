# HW_Hospital_App

# Version: 1.0
# Details: Hospital API 

# 1. Patient API: We can create Patient record, search all patients, search with specific ID, Delete a patient from Data base & update patient details.
# 2. Patient API: The patient API is extended with appointment, treatment and referral with added features to get more details with rule based authentication to create details
# 3. User Authentication API: Token based authentication is enabled where user can be registered as well as login can be established for the user
# 4. Ward Management: Ward management is enabled for users and one can perform ward management using the ward management API.

  
  /*
  End Points	End Point URL	Notes test
  
  POST	User Registration	http://localhost:3000/users/register
  POST	User Login	http://localhost:3000/users/login (Token can be fetched as output)
  •	POST	Create Patient	http://localhost:3000/patients
  •	GET	Get All patients	http://localhost:3000/patients
  •	GET	Get Patient BY ID	http://localhost:3000/patients/id/:PatientID
  •	GET	Get Patient BY Details	http://localhost:3000/patients/details?firstName=John
    o	User can searchPatient Name, ID, Email, Contact No.
  •	PATCH	Create Appointment	http://localhost:3000/patients/:PatientID
  •	GET	Get Appointment by Doctor	http://localhost:3000/doctors/:Doctor_name/appointments
  •	GET	Get All appointments by Patient	http://localhost:3000/patients/appointments/:PatientID
  •	GET	Get Current Appointment by Patient	http://localhost:3000/patients/curappointments/:PatientID
  •	PATCH	Create Treatment	http://localhost:3000/patients/:PatientID
  •	GET 	All Patient Treatment	http://localhost:3000/patients/treatments/:PatientID
  •	GET 	Current Patient Treatment	http://localhost:3000/patients/curtreatments/:PatientID

  The Token information from User login to be used to access rest of the API. 

  Changes w.r.t Jenkins CICD pipeline is introduced
  */
