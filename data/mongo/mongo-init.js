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
db.createCollection('records');

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
        representatives: [],
        records: []
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

function createRepresentative(
    keycloakId,
    title,
    firstName,
    lastName,
    gender,
    birthday,
    age,
    street,
    city,
    zipCode,
    phone,
) {
    let userRecord = createUser(title, firstName, age, lastName, gender, street, city, zipCode, phone, birthday)
    db.representatives.insertOne({
        _id: keycloakId,
        personalDetails: userRecord.insertedId,
        representedPatients: []
    });
}

function createRecord(keycloakPatientId) {
    let patient = db.patients.findOne( {_id: keycloakPatientId} )

    patient.doctors.forEach(doctorId => {
        let maxRecordsCount = getRandomNumber(1, getMaxRecordCount(patient.age))
        for(var i=0; i<=maxRecordsCount; i++) {
            let recordType = getRandomRecordType()
            let recordContent = getRecordContent(recordType)
            let recordResult = db.records.insertOne({
                patient: keycloakPatientId,
                doctor: doctorId,
                date: getRandomDate('02/13/2016', '07/16/2022'),
                type: recordType,
                content: recordContent
            })
            db.patients.update(
                { "_id": keycloakPatientId },
                {
                    $push: {
                        records: recordResult.insertedId
                    }
                }
            );
        }
    });
}

function assignDoctorToPatient(
    doctorKeycloakId,
    patientKeycloakId
) {
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

function assignRepresentativeToPatient(
    representativeKeycloakId,
    patientKeycloakId
) {
        db.representatives.update(
            { "_id": representativeKeycloakId },
            {
                $push: {
                    representedPatients: patientKeycloakId
                }
            }
        );
        db.patients.update(
            { "_id": patientKeycloakId },
            {
                $push: {
                    representatives: representativeKeycloakId
                }
            }
        )
}

/*
#######################
Helper functions
#######################
*/

function getRandomDate(date1, date2){
    function randomValueBetween(min, max) {
      return Math.random() * (max - min) + min;
    }
    var date1 = date1 || '01-01-1970'
    var date2 = date2 || new Date().toLocaleDateString()
    date1 = new Date(date1).getTime()
    date2 = new Date(date2).getTime()

    // let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    if( date1>date2){
        return new Date(randomValueBetween(date2,date1)).getTime()//.toLocaleDateString("de-DE")   
    } else{
        return new Date(randomValueBetween(date1, date2)).getTime()//.toLocaleDateString("de-DE")  

    }
}

function getRandomItem(items) {
    return items[Math.floor(Math.random()*items.length)];
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

function getRandomRecordType() {
    let recordTypes = ["Arbeitsunf??higkeitsbescheinigung", "Arztbrief", "Befund", "Rezept", "??berweisung"]
    return getRandomItem(recordTypes)
}

function getMaxRecordCount(age) {
    if (age < 20) {
        return 1
    }
    if (age < 30 || age < 40) {
        return 3
    }
    if (age < 50) {
        return 5
    }
    if (age < 60) {
        return 7
    }
    return 10
}

function getRecordContent(recordType) {
    switch(recordType) {
        case "Arbeitsunf??higkeitsbescheinigung":
        case "Rezept":
            return "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
        case "Arztbrief":
        case "Befund":
            return `
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.   

Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.   

Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer
            `
        case "??berweisung":
            return "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
    }
}

/*
#########################
Create Health Facilities
#########################
*/

createHealthFacility('Facharztklinik Hamburg', 'Blankeneser Bahnhofstrasse 24', 'Hamburg', '20251');
createHealthFacility('Praxis-Klinik Bergedorf Krankenhaus', 'Schlossstrasse 38', 'Hamburg', '21031');
createHealthFacility('??rzte Am Kaiserkai', 'Am Kaiserkai 67', 'Hamburg', '20457');
createHealthFacility('Praxis am Marktplatz', 'Rothenburgsorter Marktplatz 12', 'Hamburg', '20539');
createHealthFacility('Hafenpraxis Prof. Dr. B??hnke & Dr. Steinberg', 'Shanghaiallee 36-39', 'Hamburg', '20457');


/*
#########################
Create Health Insurance
#########################
*/

createHealthInsurance('BARMER', 'Ersatzkassen (EK) und Knappschaft', 'Axel-Springer-Stra??e 44', '10969', 'Berlin');
createHealthInsurance('Techniker Krankenkasse (TK)', 'Ersatzkassen (EK) und Knappschaft', 'Bramfelder Stra??e 140', '22305', 'Hamburg');
createHealthInsurance('IKK gesund plus', 'Innungskrankenkassen (IKK)', 'Umfassungsstra??e 85', '39124', 'Magdeburg');
createHealthInsurance('AOK Niedersachsen', 'Allgemeine Ortskrankenkassen (AOK)', 'Hildesheimer Stra??e 273', '30519', 'Hannover');
createHealthInsurance('BAHN-BKK', 'Betriebskrankenkassen (BKK)', 'Franklinstra??e 54', '60486', 'Frankfurt');

/*
#########################
Create Patients
#########################
*/
createPatient('a7f6550d-80ce-4bc2-b6e9-434c014c8a8b','','Jennifer',33,'Schr??der','female','Eppendorfer Baum 35','Hamburg','20249','040 4801810','10/15/1988','B+','55.8','158', 'BARMER', 347189359316570);
createPatient('d1822a8d-7951-4fae-beee-25feee17c6af','','Mandy',49,'Vogt','female','Doerriesweg 7','Hamburg','22525','040 547050','5/25/1973','B+','88.9','166', 'IKK gesund plus', 6011353986490180);
createPatient('689569fd-2283-4e32-8898-b94e77d8a817','','Michelle',68,'K??nig','female','Hannoversche Strasse 86','Hamburg','21079','040 2515200','1/12/1954','A+','62.0','154', 'BARMER', 4539460282023033);
createPatient('45215f7d-e7cd-47d4-a27c-6734b8f1424c','','Stephan',19,'Wexler','male','Stellinger Weg 33','Hamburg','20255','040 5232983','12/9/2002','O+','95.7','183', 'Techniker Krankenkasse (TK)', 3539053584078490);
createPatient('c3540aaa-728d-441e-8898-f5c157d7f941','','Patrick',61,'B??rger','male','Osdorfer Landstrasse 131','Hamburg','22609','040 80010377','3/23/1961','O+','81.1','185', 'BAHN-BKK', 3674348905256782);
createPatient('79126fa6-4323-4376-8da8-46ec6dedbe02','','Sarah',24,'Kappel','female','Schellingstrasse 83','Hamburg','22089','040 20982833','11/19/2002','B+','58.1','157', 'Techniker Krankenkasse (TK)', 2014581316357366);
createPatient('ed129ff3-5732-4d11-9ba6-39a53efd7386','','Kerstin',71,'Fischer','female','Hindenburgstrasse 2','Hamburg','22303','040 275054','9/2/1950','O+','77.4','162', 'AOK Niedersachsen', 5260496002667156);
createPatient('eab56c5a-f5be-4c86-8b1d-e2be8eeb80da','','Thomas',33,'Kortig','male', 'Elbgaustrasse 128', 'Hamburg', '22547', '040 847755', '9/11/1988','A+','74.1','177', 'Techniker Krankenkasse (TK)', 6282795092894550);
createPatient('3326d733-31fb-4313-8070-68c705accbd5','','Franziska',54,'Freytag','female', 'Stiftstrasse 14', 'Hamburg', '20099', '040 38075236', '9/20/1967', 'A+','91.9','164', 'AOK Niedersachsen', 6011713460873559);
createPatient('03419e71-b4b3-43bc-ad9c-166b7912bd6e','','J??rgen',46,'Fiedler','male', 'S??dring 46', 'Hamburg', '22303', '040 65056331', '8/26/1975','O+','105.5','186', 'BAHN-BKK', 340852948654309);

/*
#########################
Create Doctors
#########################
*/
createDoctor('145a1e9b-64c5-4831-b3ac-ef12a73eb90e', 'Dr. med.', 'Deborah', 'Amberg', 37, 'female', '040 537989840', '1/14/1985', 'Fach??rztin f??r Allgemeinmedizin', 'Facharztklinik Hamburg');
createDoctor('3e10f956-632d-4c0f-abfe-cbe529731600', 'Dr. med.', 'Hanna', 'Bierwirth', 43, 'female', '040 3893477', '4/26/1979', 'Fach??rztin f??r Innere Medizin', 'Praxis am Marktplatz');
createDoctor('16803954-bd42-40e1-8fba-a847f9ba8f78', '', 'Eric', 'Guhlmann', 46, 'male', '040 67586133', '8/13/1976', 'Facharzt f??r Innere Medizin','Facharztklinik Hamburg');
createDoctor('58852ee4-2a60-4101-80dc-61e9497aaded', 'Dr. med.', 'Friedrich', 'Ziebula', 58, 'male', '040 7906190', '1/17/1964', 'Facharzt f??r Allgemeinmedizin', '??rzte Am Kaiserkai');
createDoctor('a676675e-0a8a-4321-9703-37be0d79678c', 'Dr. med.', 'Thomas', 'Feilscher', 51, 'male', '040 824187', '8/25/1971', 'Facharzt f??r Hals-, Nasen-, Ohrenheilkunde', 'Facharztklinik Hamburg');
createDoctor('2078949c-dcb8-41cd-a26e-fe0925c33f5c', 'Priv.-Doz. Dr. med', 'Johannes', 'Steinberg', 39, 'male', '040 343878', '2/1/1983', 'Facharzt f??r Augenheilkunde', 'Hafenpraxis Prof. Dr. B??hnke & Dr. Steinberg');
createDoctor('0f6d79a3-9930-43ec-8f6c-51d5b28f7e29', 'Prof. Dr.', 'Matthias', 'B??hnke', 62, 'male', '040 55440463', '5/11/1960', 'Facharzt f??r Augenheilkunde', 'Hafenpraxis Prof. Dr. B??hnke & Dr. Steinberg');
createDoctor('46a64ab9-253e-4d94-a26a-ddd4fed31b2f', 'Dr. med. dent.', 'Monika', 'Horschler-Fricke', 58, 'female', '040 27075901', '4/9/1964', 'Zahn??rztin', '??rzte Am Kaiserkai');
createDoctor('590d3869-5d07-4cca-96d4-60557ace64c6', '', 'Deniz', 'Heitmann', 31, 'female', '040 2297198', '9/29/1991', 'Fach??rztin f??r Kieferorthop??die', '??rzte Am Kaiserkai');
createDoctor('abb1f05f-0c08-49b5-aeab-2c887fc22c6e', 'Dr. med. dent.', 'Christina', 'Essers', 34, 'female', '040 51906895', '3/15/1988', 'Fachzahn??rztin f??r Kieferorthop??die', 'Praxis-Klinik Bergedorf Krankenhaus');
createDoctor('99e21648-ece5-4ff6-be65-865614c7cba9', 'Dr. med.', 'Gunnar', 'Bro??', 45, 'male', '040 5522781', '6/1/1977', 'Facharzt f??r Othop??die und Unfallchirurgie', 'Facharztklinik Hamburg');
createDoctor('f232afc4-746e-4640-b455-e7af1972bff2', 'Dr. med.', 'Magdalena', 'Meffert', 42, 'female', '040 68913018', '11/11/1981', 'Fach??rztin f??r Gyn??kologie und Geburtshilfe', 'Facharztklinik Hamburg');


/*
#########################
Create Representatives
#########################
*/
createRepresentative('24464036-38bc-48ec-bce0-b4aa6e43a5de', '', 'Joseph', 'Sch??tte', 'male', '11/26/1973', 49, 'Gorch-Fock-Wall 4', 'Hamburg', '20354', '040 340113');
createRepresentative('7c804ed3-25f3-45d4-96eb-4ec924f85e7c', '', 'Natalja', 'Sch??tze', 'female', '03/16/1985', 37, 'Billstrasse 208', 'Hamburg', '20354', '040 7807690');
createRepresentative('45bf36f8-21d2-4c48-81c2-00ea462d30d5', 'Dr. phil.', 'Emine', 'Haag', 'female', '03/19/1971', 51, 'Ditmar-Koel-Strasse 22', 'Hamburg', '20354', '040 31792158');
createRepresentative('52bf3fb2-e3a6-4585-8c14-793b73d92307', '', 'Christian', 'Kruse', 'male', '04/19/1991', 31, 'Lange Reihe 14', 'Hamburg', '20099', '040 35796922');


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


/*
#################################################
Assign Representative <--> Patient Relationships
#################################################
*/

assignRepresentativeToPatient('45bf36f8-21d2-4c48-81c2-00ea462d30d5', 'ed129ff3-5732-4d11-9ba6-39a53efd7386')
assignRepresentativeToPatient('52bf3fb2-e3a6-4585-8c14-793b73d92307', 'ed129ff3-5732-4d11-9ba6-39a53efd7386')
assignRepresentativeToPatient('7c804ed3-25f3-45d4-96eb-4ec924f85e7c', '689569fd-2283-4e32-8898-b94e77d8a817')
assignRepresentativeToPatient('24464036-38bc-48ec-bce0-b4aa6e43a5de', 'c3540aaa-728d-441e-8898-f5c157d7f941')
assignRepresentativeToPatient('45bf36f8-21d2-4c48-81c2-00ea462d30d5', '3326d733-31fb-4313-8070-68c705accbd5')


/*
#########################
Create Patient Records
#########################
*/
createRecord('a7f6550d-80ce-4bc2-b6e9-434c014c8a8b');
createRecord('d1822a8d-7951-4fae-beee-25feee17c6af');
createRecord('689569fd-2283-4e32-8898-b94e77d8a817');
createRecord('45215f7d-e7cd-47d4-a27c-6734b8f1424c');
createRecord('c3540aaa-728d-441e-8898-f5c157d7f941');
createRecord('79126fa6-4323-4376-8da8-46ec6dedbe02');
createRecord('ed129ff3-5732-4d11-9ba6-39a53efd7386');
createRecord('eab56c5a-f5be-4c86-8b1d-e2be8eeb80da');
createRecord('3326d733-31fb-4313-8070-68c705accbd5');
createRecord('03419e71-b4b3-43bc-ad9c-166b7912bd6e');