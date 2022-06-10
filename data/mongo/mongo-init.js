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

function createOrUpdateAddress(
    street,
    city,
    zipCode) {
    let addressData = {
        street: street,
        city: city,
        zipCode: zipCode
    };

    db.addresses.update({
        addressData
    }, {
        $setOnInsert: addressData
    }, { upsert: true });
}

function createUser(
    firstName,
    age,
    lastName,
    gender,
    street,
    city,
    zipCode,
    email,
    phone,
    birthday
) {
    createOrUpdateAddress(street, city, zipCode);
    let address = db.addresses.findOne( {street: street}, {city: city}, {zipCode: zipCode})

    return db.users.insertOne({
        firstName: firstName,
        age: parseInt(age),
        lastName: lastName,
        gender: gender,
        address: address._id,
        email: email,
        phone: phone,
        birthday: Date.parse(birthday)
    });
}

function createPatient(
    firstName,
    age,
    lastName,
    gender,
    street,
    city,
    zipCode,
    email,
    phone,
    birthday,
    bloodtype,
    weight,
    height
) {
    let userRecord = createUser(firstName, age, lastName, gender, street, city, zipCode, email, phone, birthday)
    db.patients.insertOne({
        user: userRecord.insertedId,
        body_physics: {
            bloodtype: bloodtype,
            weight: parseFloat(weight),
            height: parseInt(height)
        }
    });
}

createPatient('Jennifer',33,'Schröder','female','Knesebeckstrasse 87','Reiferscheid','57632','JenniferSchroder@teleworm.us','02685 83 30 77','10/15/1988','B+','55.8','158');
createPatient('Mandy',49,'Vogt','female','Rosenstrasse 81','München','81519','MandyVogt@fleckens.hu','089 12 00 07','5/25/1973','B+','88.9','166');
createPatient('Michelle',68,'König','female','Rankestraße 55','Hohenwart','86558','MichelleKonig@dayrep.com','08443 18 87 25','1/12/1954','A+','62.0','154');
createPatient('Stephan',19,'Wexler','male','Unter den Linden 27','Magdeburg','39130','StephanWexler@teleworm.us','0391 17 81 78','12/9/2002','O+','95.7','183');
createPatient('Patrick',61,'Bürger','male','An Der Urania 95','Nutteln','25594','PatrickBurger@superrito.com','04827 76 86 49','3/23/1961','O+','81.1','185');
createPatient('Sarah',19,'Kappel','female','Bleibtreustrasse 69','Detmold Oettern-Bremke','32758','SarahKappel@cuvox.de','05231 22 57 85','11/19/2002','B+','58.1','157');
createPatient('Kerstin',71,'Fischer','female','Hans-Grade-Allee 19','Besenthal','23899','KerstinFischer@rhyta.com','04547 35 59 60','9/2/1950','O+','77.4','162');