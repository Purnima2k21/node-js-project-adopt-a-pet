DROP TABLE IF EXISTS pet_types CASCADE;                     
CREATE TABLE pet_types (
  id SERIAL PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  description text
);

DROP TABLE IF EXISTS adoptable_pets CASCADE;
CREATE TABLE adoptable_pets (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255) NOT NULL,
  img_url TEXT NOT NULL,
  age INTEGER,
  vaccination_status BOOLEAN,
  adoption_story TEXT NOT NULL,
  adoption_status VARCHAR NOT NULL,
  type_id INTEGER REFERENCES pet_types(id)
);

DROP TABLE IF EXISTS adoption_applications CASCADE;
CREATE TABLE adoption_applications (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255) NOT NULL,
  phone_number VARCHAR (15) NOT NULL,
  email VARCHAR (255) NOT NULL,
  home_status VARCHAR (255) NOT NULL,
  application_status VARCHAR (255) NOT NULL,
  pet_id INTEGER REFERENCES adoptable_pets(id)
);

DROP TABLE IF EXISTS pet_surrender_applications CASCADE;
CREATE TABLE pet_surrender_applications (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR (15) NOT NULL,
  email VARCHAR(255) NOT NULL, 
  pet_name VARCHAR(255) NOT NULL,
  pet_age INTEGER,
  pet_type_id INTEGER REFERENCES pet_types(id),
  pet_image_url VARCHAR(255) NOT NULL,
  vaccination_status BOOLEAN,
  application_status VARCHAR(255) NOT NULL
);
