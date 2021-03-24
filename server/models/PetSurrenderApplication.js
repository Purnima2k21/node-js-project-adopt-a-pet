import pg from "pg"

const pool = new pg.Pool({ connectionString: "postgres://postgres:password@localhost:5432/pets" })

class PetSurrenderApplication {
  constructor({
    name,
    phone_number,
    email,
    pet_name,
    pet_age,
    pet_type_id,
    pet_image_url,
    vaccination_status,
    application_status = "pending"
  }) {
    this.name = name
    this.phone_number = phone_number
    this.email = email
    this.pet_name = pet_name
    this.pet_age = pet_age
    this.pet_type_id = pet_type_id
    this.pet_image_url = pet_image_url
    this.vaccination_status = vaccination_status
    this.application_status = application_status
  }

  async save() {
    try {
      const client = await pool.connect()

      // // VERSION 3: insert & returning
      const queryString =
        "INSERT INTO pet_surrender_applications (name, phone_number, email, pet_name, pet_age, pet_type_id, pet_image_url, vaccination_status, application_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"
      const values = [
        this.name,
        this.phone_number,
        this.email,
        this.pet_name,
        this.pet_age,
        this.pet_type_id,
        this.pet_image_url,
        this.vaccination_status,
        this.application_status
      ]

      await client.query(queryString, values)

      client.release()
      return true
    } catch (error) {
      console.error(error)
      pool.end()
      return false
    }
  }
}

export default PetSurrenderApplication
