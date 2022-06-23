conn = new Mongo();
db = conn.getDB("epa-poc")
// db.createUser(
//     {
//         user: "testuser",
//         pwd: "test1234",
//         roles: [
//             {
//                 role: "readWrite",
//                 db: "epa-poc"
//             }
//         ]
//     }
// );

db.createCollection('users');
db.createCollection('patients');
db.createCollection('doctors');
db.createCollection('representatives');
db.createCollection('addresses');
db.createCollection('insurances');
db.createCollection('facilities');

function createOrUpdateAddress(
    street,
    city,
    zipCode) {
    let addressData = {
        street: street,
        city: city,
        zipCode: zipCode
    };

    db.addresses.update(addressData, {
        $setOnInsert: addressData
    }, { upsert: true });
}

function createHealthInsurance(
    name, 
    group,
    street,
    zipCode,
    city
) {
    createOrUpdateAddress(street, city, zipCode);
    let address = db.addresses.findOne( {street: street}, {city: city}, {zipCode: zipCode})

    let insuranceData = {
        name: name,
        group: group,
        address: address._id
    };

    db.insurances.update(insuranceData, {
        $setOnInsert: insuranceData
    }, { upsert: true });
}

function createHealthFacility(
    name,
    street,
    city, 
    zipCode
) {
    createOrUpdateAddress(street, city, zipCode);
    let address = db.addresses.findOne( {street: street}, {city: city}, {zipCode: zipCode})

    let facilityData = {
        name: name,
        address: address._id
    };
    db.facilities.update(facilityData, {
        $setOnInsert: facilityData
    }, { upsert: true });
}

function createUser(
    title,
    firstName,
    age,
    lastName,
    gender,
    street,
    city,
    zipCode,
    phone,
    birthday
) {
    createOrUpdateAddress(street, city, zipCode);
    let address = db.addresses.findOne( {street: street}, {city: city}, {zipCode: zipCode})

    return db.users.insertOne({
        title: title,
        firstName: firstName,
        lastName: lastName,
        age: parseInt(age),
        birthday: Date.parse(birthday),
        gender: gender,
        address: address._id,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@epa-poc.de`,
        phone: phone,
    });
}

function createPatient(
    keycloakId,
    title,
    firstName,
    age,
    lastName,
    gender,
    street,
    city,
    zipCode,
    phone,
    birthday,
    bloodtype,
    weight,
    height,
    healthInsuranceName,
    insuranceNumber
) {
    let userRecord = createUser(title, firstName, age, lastName, gender, street, city, zipCode, phone, birthday)
    let healthInsurance = db.insurances.findOne( {name: healthInsuranceName})
    db.patients.insertOne({
        _id: keycloakId,
        personalDetails: userRecord.insertedId,
        healthInsurance: {
            company: healthInsurance._id,
            insuranceNumber: insuranceNumber
        },
        bodyPhysics: {
            bloodtype: bloodtype,
            weight: parseFloat(weight),
            height: parseInt(height)
        },
        doctors: [],
        representatives: []
    });
}

function createDoctor(
    keycloakId,
    title,
    firstName,
    lastName,
    age,
    gender,
    phone,
    birthday,
    discipline,
    facilityName
) {
    let facility = db.facilities.findOne({name: facilityName});
    let address = db.addresses.findOne({_id: facility.address})

    let userRecord = createUser(title, firstName, age, lastName, gender, address.street, address.city, address.zipCode, phone, birthday)
    db.doctors.insertOne({
        _id: keycloakId,
        personalDetails: userRecord.insertedId,
        discipline,
        facility: facility._id,
        patients: []
    });
}

function assignDoctorToPatient(
    doctorKeycloakId,
    patientKeycloakId) {
        db.patients.update(
            { "_id": patientKeycloakId },
            {
                $push: {
                    doctors: doctorKeycloakId
                }
            }
        );
        db.doctors.update(
            { "_id": doctorKeycloakId },
            {
                $push: {
                    patients: patientKeycloakId
                }
            }
        )
}

/*
#########################
Create Health Facilities
#########################
*/

createHealthFacility('Facharztklinik Hamburg', 'Blankeneser Bahnhofstrasse 24', 'Hamburg', '20251');
createHealthFacility('Praxis-Klinik Bergedorf Krankenhaus', 'Schlossstrasse 38', 'Hamburg', '21031');
createHealthFacility('Ärzte Am Kaiserkai', 'Am Kaiserkai 67', 'Hamburg', '20457');
createHealthFacility('Praxis am Marktplatz', 'Rothenburgsorter Marktplatz 12', 'Hamburg', '20539');
createHealthFacility('Hafenpraxis Prof. Dr. Böhnke & Dr. Steinberg', 'Shanghaiallee 36-39', 'Hamburg', '20457');


/*
#########################
Create Health Insurance
#########################
*/

createHealthInsurance('BARMER', 'Ersatzkassen (EK) und Knappschaft', 'Axel-Springer-Straße 44', '10969', 'Berlin');
createHealthInsurance('Techniker Krankenkasse (TK)', 'Ersatzkassen (EK) und Knappschaft', 'Bramfelder Straße 140', '22305', 'Hamburg');
createHealthInsurance('IKK gesund plus', 'Innungskrankenkassen (IKK)', 'Umfassungsstraße 85', '39124', 'Magdeburg');
createHealthInsurance('AOK Niedersachsen', 'Allgemeine Ortskrankenkassen (AOK)', 'Hildesheimer Straße 273', '30519', 'Hannover');
createHealthInsurance('BAHN-BKK', 'Betriebskrankenkassen (BKK)', 'Franklinstraße 54', '60486', 'Frankfurt');

/*
#########################
Create Patients
#########################
*/
createPatient('a7f6550d-80ce-4bc2-b6e9-434c014c8a8b','','Jennifer',33,'Schröder','female','Eppendorfer Baum 35','Hamburg','20249','040 4801810','10/15/1988','B+','55.8','158', 'BARMER', 347189359316570);
createPatient('d1822a8d-7951-4fae-beee-25feee17c6af','','Mandy',49,'Vogt','female','Doerriesweg 7','Hamburg','22525','040 547050','5/25/1973','B+','88.9','166', 'IKK gesund plus', 6011353986490180);
createPatient('689569fd-2283-4e32-8898-b94e77d8a817','','Michelle',68,'König','female','Hannoversche Strasse 86','Hamburg','21079','040 2515200','1/12/1954','A+','62.0','154', 'BARMER', 4539460282023033);
createPatient('45215f7d-e7cd-47d4-a27c-6734b8f1424c','','Stephan',19,'Wexler','male','Stellinger Weg 33','Hamburg','20255','040 5232983','12/9/2002','O+','95.7','183', 'Techniker Krankenkasse (TK)', 3539053584078490);
createPatient('c3540aaa-728d-441e-8898-f5c157d7f941','','Patrick',61,'Bürger','male','Osdorfer Landstrasse 131','Hamburg','22609','040 80010377','3/23/1961','O+','81.1','185', 'BAHN-BKK', 3674348905256782);
createPatient('79126fa6-4323-4376-8da8-46ec6dedbe02','','Sarah',24,'Kappel','female','Schellingstrasse 83','Hamburg','22089','040 20982833','11/19/2002','B+','58.1','157', 'Techniker Krankenkasse (TK)', 2014581316357366);
createPatient('ed129ff3-5732-4d11-9ba6-39a53efd7386','','Kerstin',71,'Fischer','female','Hindenburgstrasse 2','Hamburg','22303','040 275054','9/2/1950','O+','77.4','162', 'AOK Niedersachsen', 5260496002667156);
createPatient('eab56c5a-f5be-4c86-8b1d-e2be8eeb80da','','Thomas',33,'Kortig','male', 'Elbgaustrasse 128', 'Hamburg', '22547', '040 847755', '9/11/1988','A+','74.1','177', 'Techniker Krankenkasse (TK)', 6282795092894550);
createPatient('3326d733-31fb-4313-8070-68c705accbd5','','Franziska',54,'Freytag','female', 'Stiftstrasse 14', 'Hamburg', '20099', '040 38075236', '9/20/1967', 'A+','91.9','164', 'AOK Niedersachsen', 6011713460873559);
createPatient('03419e71-b4b3-43bc-ad9c-166b7912bd6e','','Jürgen',46,'Fiedler','male', 'Südring 46', 'Hamburg', '22303', '040 65056331', '8/26/1975','O+','105.5','186', 'BAHN-BKK', 340852948654309);

/*
#########################
Create Doctors
#########################
*/
createDoctor('145a1e9b-64c5-4831-b3ac-ef12a73eb90e', 'Dr. med.', 'Deborah', 'Amberg', 37, 'female', '040 537989840', '1/14/1985', 'Fachärztin für Allgemeinmedizin', 'Facharztklinik Hamburg');
createDoctor('3e10f956-632d-4c0f-abfe-cbe529731600', 'Dr. med.', 'Hanna', 'Bierwirth', 43, 'female', '040 3893477', '4/26/1979', 'Fachärztin für Innere Medizin', 'Praxis am Marktplatz');
createDoctor('16803954-bd42-40e1-8fba-a847f9ba8f78', '', 'Eric', 'Guhlmann', 46, 'male', '040 67586133', '8/13/1976', 'Facharzt für Innere Medizin','Facharztklinik Hamburg');
createDoctor('58852ee4-2a60-4101-80dc-61e9497aaded', 'Dr. med.', 'Friedrich', 'Ziebula', 58, 'male', '040 7906190', '1/17/1964', 'Facharzt für Allgemeinmedizin', 'Ärzte Am Kaiserkai');
createDoctor('a676675e-0a8a-4321-9703-37be0d79678c', 'Dr. med.', 'Thomas', 'Feilscher', 51, 'male', '040 824187', '8/25/1971', 'Facharzt für Hals-, Nasen-, Ohrenheilkunde', 'Facharztklinik Hamburg');
createDoctor('2078949c-dcb8-41cd-a26e-fe0925c33f5c', 'Priv.-Doz. Dr. med', 'Johannes', 'Steinberg', 39, 'male', '040 343878', '2/1/1983', 'Facharzt für Augenheilkunde', 'Hafenpraxis Prof. Dr. Böhnke & Dr. Steinberg');
createDoctor('0f6d79a3-9930-43ec-8f6c-51d5b28f7e29', 'Prof. Dr.', 'Matthias', 'Böhnke', 62, 'male', '040 55440463', '5/11/1960', 'Facharzt für Augenheilkunde', 'Hafenpraxis Prof. Dr. Böhnke & Dr. Steinberg');
createDoctor('46a64ab9-253e-4d94-a26a-ddd4fed31b2f', 'Dr. med. dent.', 'Monika', 'Horschler-Fricke', 58, 'female', '040 27075901', '4/9/1964', 'Zahnärztin', 'Ärzte Am Kaiserkai');
createDoctor('590d3869-5d07-4cca-96d4-60557ace64c6', '', 'Deniz', 'Heitmann', 31, 'female', '040 2297198', '9/29/1991', 'Fachärztin für Kieferorthopädie', 'Ärzte Am Kaiserkai');
createDoctor('abb1f05f-0c08-49b5-aeab-2c887fc22c6e', 'Dr. med. dent.', 'Christina', 'Essers', 34, 'female', '040 51906895', '3/15/1988', 'Fachzahnärztin für Kieferorthopädie', 'Praxis-Klinik Bergedorf Krankenhaus');
createDoctor('99e21648-ece5-4ff6-be65-865614c7cba9', 'Dr. med.', 'Gunnar', 'Broß', 45, 'male', '040 5522781', '6/1/1977', 'Facharzt für Othopädie und Unfallchirurgie', 'Facharztklinik Hamburg');
createDoctor('f232afc4-746e-4640-b455-e7af1972bff2', 'Dr. med.', 'Magdalena', 'Meffert', 42, 'female', '040 68913018', '11/11/1981', 'Fachärztin für Gynäkologie und Geburtshilfe', 'Facharztklinik Hamburg');

/*
#########################################
Assign Doctor <--> Patient Relationships
#########################################
*/
assignDoctorToPatient('f232afc4-746e-4640-b455-e7af1972bff2','a7f6550d-80ce-4bc2-b6e9-434c014c8a8b')
assignDoctorToPatient('46a64ab9-253e-4d94-a26a-ddd4fed31b2f','a7f6550d-80ce-4bc2-b6e9-434c014c8a8b')
assignDoctorToPatient('3e10f956-632d-4c0f-abfe-cbe529731600', 'a7f6550d-80ce-4bc2-b6e9-434c014c8a8b')

assignDoctorToPatient('f6d79a3-9930-43ec-8f6c-51d5b28f7e29', 'd1822a8d-7951-4fae-beee-25feee17c6af')
assignDoctorToPatient('a676675e-0a8a-4321-9703-37be0d79678c', 'd1822a8d-7951-4fae-beee-25feee17c6af')
assignDoctorToPatient('46a64ab9-253e-4d94-a26a-ddd4fed31b2f', 'd1822a8d-7951-4fae-beee-25feee17c6af')

assignDoctorToPatient('145a1e9b-64c5-4831-b3ac-ef12a73eb90e', '689569fd-2283-4e32-8898-b94e77d8a817')
assignDoctorToPatient('590d3869-5d07-4cca-96d4-60557ace64c6', '689569fd-2283-4e32-8898-b94e77d8a817')
assignDoctorToPatient('a676675e-0a8a-4321-9703-37be0d79678c', '689569fd-2283-4e32-8898-b94e77d8a817')

assignDoctorToPatient('2078949c-dcb8-41cd-a26e-fe0925c33f5c', '45215f7d-e7cd-47d4-a27c-6734b8f1424c')
assignDoctorToPatient('abb1f05f-0c08-49b5-aeab-2c887fc22c6e', '45215f7d-e7cd-47d4-a27c-6734b8f1424c')
assignDoctorToPatient('99e21648-ece5-4ff6-be65-865614c7cba9', '45215f7d-e7cd-47d4-a27c-6734b8f1424c')

assignDoctorToPatient('abb1f05f-0c08-49b5-aeab-2c887fc22c6e', 'c3540aaa-728d-441e-8898-f5c157d7f941')
assignDoctorToPatient('0f6d79a3-9930-43ec-8f6c-51d5b28f7e29', 'c3540aaa-728d-441e-8898-f5c157d7f941')
assignDoctorToPatient('16803954-bd42-40e1-8fba-a847f9ba8f78', 'c3540aaa-728d-441e-8898-f5c157d7f941')
assignDoctorToPatient('145a1e9b-64c5-4831-b3ac-ef12a73eb90e', 'c3540aaa-728d-441e-8898-f5c157d7f941')

assignDoctorToPatient('f232afc4-746e-4640-b455-e7af1972bff2', '79126fa6-4323-4376-8da8-46ec6dedbe02')
assignDoctorToPatient('46a64ab9-253e-4d94-a26a-ddd4fed31b2f', '79126fa6-4323-4376-8da8-46ec6dedbe02')

assignDoctorToPatient('46a64ab9-253e-4d94-a26a-ddd4fed31b2f', 'ed129ff3-5732-4d11-9ba6-39a53efd7386')
assignDoctorToPatient('590d3869-5d07-4cca-96d4-60557ace64c6', 'ed129ff3-5732-4d11-9ba6-39a53efd7386')
assignDoctorToPatient('58852ee4-2a60-4101-80dc-61e9497aaded', 'ed129ff3-5732-4d11-9ba6-39a53efd7386')
assignDoctorToPatient('a676675e-0a8a-4321-9703-37be0d79678c', 'ed129ff3-5732-4d11-9ba6-39a53efd7386')
assignDoctorToPatient('0f6d79a3-9930-43ec-8f6c-51d5b28f7e29', 'ed129ff3-5732-4d11-9ba6-39a53efd7386')

assignDoctorToPatient('2078949c-dcb8-41cd-a26e-fe0925c33f5c', 'eab56c5a-f5be-4c86-8b1d-e2be8eeb80da')
assignDoctorToPatient('a676675e-0a8a-4321-9703-37be0d79678c', 'eab56c5a-f5be-4c86-8b1d-e2be8eeb80da')
assignDoctorToPatient('abb1f05f-0c08-49b5-aeab-2c887fc22c6e', 'eab56c5a-f5be-4c86-8b1d-e2be8eeb80da')
assignDoctorToPatient('46a64ab9-253e-4d94-a26a-ddd4fed31b2f', 'eab56c5a-f5be-4c86-8b1d-e2be8eeb80da')

assignDoctorToPatient('3e10f956-632d-4c0f-abfe-cbe529731600', '3326d733-31fb-4313-8070-68c705accbd5')
assignDoctorToPatient('46a64ab9-253e-4d94-a26a-ddd4fed31b2f', '3326d733-31fb-4313-8070-68c705accbd5')
assignDoctorToPatient('99e21648-ece5-4ff6-be65-865614c7cba9', '3326d733-31fb-4313-8070-68c705accbd5')
assignDoctorToPatient('145a1e9b-64c5-4831-b3ac-ef12a73eb90e', '3326d733-31fb-4313-8070-68c705accbd5')
assignDoctorToPatient('f232afc4-746e-4640-b455-e7af1972bff2', '3326d733-31fb-4313-8070-68c705accbd5')

assignDoctorToPatient('46a64ab9-253e-4d94-a26a-ddd4fed31b2f', '03419e71-b4b3-43bc-ad9c-166b7912bd6e')
assignDoctorToPatient('58852ee4-2a60-4101-80dc-61e9497aaded', '03419e71-b4b3-43bc-ad9c-166b7912bd6e')
assignDoctorToPatient('16803954-bd42-40e1-8fba-a847f9ba8f78', '03419e71-b4b3-43bc-ad9c-166b7912bd6e')
