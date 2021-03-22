
IF EXISTS DROP pet_types                     
CREATE TABLE pet_types (
  id SERIAL PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  description text
);

DROP TABLE IF EXISTS pet_surrender_applications;

CREATE TABLE pet_surrender_applications (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone_number INTEGER NOT NULL,
  email VARCHAR(255) NOT NULL, 
  pet_name VARCHAR(255) NOT NULL,
  pet_age VARCHAR(255),
  pet_type_id INTEGER,
  pet_image_url VARCHAR(255),
  vaccination_status BOOLEAN,
  application_status VARCHAR(255),
);

