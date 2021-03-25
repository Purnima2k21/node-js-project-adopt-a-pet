import pg from "pg"
import _ from "lodash"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/pets"
})

class AdoptionApplication {
  constructor({ 
    id=null,
    applicationStatus = null, 
    application_status = null,
    petId = null,
    pet_id,
    name, 
    email, 
    phoneNumber,
    phone_number, 
    homeStatus, 
    home_status,
  }) {
    this.id = id
    this.applicationStatus = applicationStatus || application_status
    this.petId = petId || pet_id
    this.name = name 
    this.email = email
    this.phoneNumber = phoneNumber || phone_number
    this.homeStatus = homeStatus || home_status
  }

  static async findAll() {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM adoption_applications;");

      const applicationData = result.rows;
      const applications = applicationData.map((application) => {
        return new this(application);
      });

      client.release();
      return applications;

    } catch (err) {
      console.log(err);
      throw (err);
    }
  }

  isValid() {
    this.errors = {}
    const requiredFields = ["name", "phoneNumber", "email", "homeStatus"]
    let isValid = true

    for (const requiredField of requiredFields) {
      this.errors[requiredField] = []
      if (!this[requiredField]) {
        isValid = false
        this.errors[requiredField].push("can't be blank")
      }
    }
    return isValid
  }

  async save() {
    try {
      if (this.isValid()) {
        delete this.errors

        const client = await pool.connect()

        const queryString =
        "INSERT INTO adoption_applications (name, phone_number, email, home_status, application_status, pet_id) " +
        "VALUES ($1, $2, $3, $4, $5, $6)"

        await client.query(queryString, [
          this.name,
          this.phoneNumber,
          this.email,
          this.homeStatus,
          this.applicationStatus,
          this.petId,
        ])
        
        client.release()
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      pool.end()
      return false
    }
  }
}

export default AdoptionApplication;