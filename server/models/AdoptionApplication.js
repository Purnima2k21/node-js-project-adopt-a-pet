import pg from "pg"
import _ from "lodash"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/pets"
})

class AdoptionApplication {
  constructor({ name, phone_number, email, home_status, application_status = null, pet_id = null }) {
    this.name = name;
    this.phone_number = phone_number;
    this.email = email;
    this.home_status = home_status;
    this.application_status = application_status;
    this.pet_id = pet_id
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

        const query = 'INSERT INTO adoption_applications (name, phone_number, email, home_status) VALUES ($1, $2, $3, $4)'

        await client.query(query, [this.name, this.phone_number, this.email, this.home_status])
// will this update regardless of pending status?
        this.application_status = "pending"
        
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