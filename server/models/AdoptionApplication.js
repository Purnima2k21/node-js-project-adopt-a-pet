import pg from "pg"
import _ from "lodash"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/pets"
})

class AdoptionApplication {
  constructor({ name, phone_number, email, home_status, application_status, pet_id }) {
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

      // get results
      const applicationData = result.rows;
      const applications = applicationData.map((application) => {
        return new this(application);
      });

      // release connection back to the pool
      client.release();
      return applications;

    } catch (err) {
      console.log(err);
      throw (err);
    }
  }

  static async findById(id) {
    try {
      const client = await pool.connect()
      const query = "SELECT * FROM adoption_applications WHERE id = $1"
      const result = await client.query(query, [id])
      const applicationData = result.rows[0]
      const application = new this(applicationData)

      client.release()
      return application

    } catch (error) {
      console.log(error)
      throw error;
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
      const client = await pool.connect()

      let query = 'INSERT INTO adoption_applications (name, phone_number, email, home_status) VALUES ($1, $2, $3, $4)'
      await client.query(query, [this.name, this.phone_number, this.email, this.home_status])

      client.release()
      return true

    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default AdoptionApplication;