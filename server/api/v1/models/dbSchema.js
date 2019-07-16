import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import debug from 'debug';
import db from './dbConnect';


dotenv.config();

const infoLog = debug('query:info');
const adminPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
const firstUser1Password = bcrypt.hashSync(process.env.USER1_PASSWORD, 10);

const tableSchema = `
    DROP TABLE IF EXISTS users CASCADE;

    DROP TABLE IF EXISTS buses CASCADE;

    DROP TABLE IF EXISTS trips CASCADE; 

    DROP TABLE IF EXISTS bookings CASCADE;

    CREATE TABLE "users" (
        "id" serial NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL UNIQUE,
        "first_name" TEXT,
        "last_name" TEXT,
        "password" TEXT NOT NULL,
        "is_admin" BOOLEAN NOT NULL DEFAULT 'false'
    ) WITH (
        OIDS=FALSE
    );
    
    CREATE TABLE "buses" (
        "id" serial NOT NULL PRIMARY KEY,
        "number_plate" TEXT NOT NULL,
        "manufacturer" TEXT NOT NULL,
        "model" TEXT NOT NULL,
        "year" INT NOT NULL,
        "capacity" INT NOT NULL,
        "available" BOOLEAN NOT NULL DEFAULT 'true'
    ) WITH (
        OIDS=FALSE
    );
    
    CREATE TABLE "trips" (
        "id" serial NOT NULL PRIMARY KEY,
        "bus_id" INT NOT NULL REFERENCES buses(id),
        "origin" TEXT NOT NULL,
        "destination" TEXT NOT NULL,
        "trip_date" DATE NOT NULL DEFAULT NOW(),
        "fare" NUMERIC(10, 2) NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'active'
    ) WITH (
        OIDS=FALSE
    );
    
    CREATE TABLE "bookings" (
        "id" serial NOT NULL,
        "trip_id" INT NOT NULL REFERENCES trips(id),
        "user_id" INT NOT NULL REFERENCES users(id),
        "created_on" DATE NOT NULL DEFAULT NOW(),
        "seat_number" INT NOT NULL,
        CONSTRAINT booking_pkey PRIMARY KEY ("trip_id" , "user_id")
    ) WITH (
        OIDS=FALSE
    );
    
    INSERT INTO users ( 
        first_name, 
        last_name, 
        email, 
        password,
        is_admin
        ) 
    VALUES (
        'Admin', 
        'Admin', 
        'admin@mail.com', 
        '${adminPassword}',
        'true'
    ),
    (
        'firstuser1firstname', 
        'firstuser1lastname', 
        'firstuser1@mail.com', 
        '${firstUser1Password}',
        'false'
    );

    INSERT INTO buses ( 
        number_plate, 
        manufacturer, 
        model, 
        year, 
        capacity
        ) 
    VALUES (
        'kja-193aa', 
        'tata motors', 
        'Starbus 32', 
        '2017', 
        '32'
    ),
    (
        'kja-193aa', 
        'tata motors', 
        'Starbus 32', 
        '2017', 
        '32'
    ),
    (
        'gge-aa689', 
        'volvo', 
        'volvo 9700', 
        '2018', 
        '49'
    ),
    (
        'gge-aa689', 
        'volvo', 
        'volvo 9700', 
        '2018', 
        '49'
    ),
    (
        'aaa-mh531', 
        'mercedes-benz', 
        '0500r', 
        '2012', 
        '59'
    );
    INSERT INTO trips ( 
        bus_id, 
        origin, 
        destination, 
        fare
        ) 
    VALUES (
        '1', 
        'kano', 
        'jos',  
        '3244'
    ),
    (
        '3', 
        'lagos', 
        'jos', 
        '4944'
    ),
    (
        '2', 
        'abuja', 
        'benue', 
        '5933'
    );
    INSERT INTO bookings ( 
        trip_id, 
        user_id,
        seat_number  
        ) 
    VALUES (
        '3', 
        '1',
        '5'
    );
`;


db.query(tableSchema, (err) => {
    if (err) {
        throw (err);
    } else {
        infoLog('Database query successful (Tables Created)');
    }
});
