import pg from "pg"

const pool = new pg.Pool({ connectionString: "postgres://postgres:password@localhost:5432/pets" })

class PetSurrenderApplication {
  constructor({
    id = null,
    name,
    phone_number,
    phoneNumber,
    email,
    pet_name,
    petName,
    pet_age = null,
    petAge = null,
    pet_type_id,
    petTypeId,
    pet_image_url,
    petImageUrl,
    vaccination_status = null,
    vaccinationStatus = null,
    application_status = "pending",
    applicationStatus = "pending",
    petType
  }) {
    this.id = id
    this.name = name
    this.phoneNumber = phoneNumber || phone_number
    this.email = email
    this.petName = petName || pet_name
    this.petAge = petAge || pet_age
    this.petTypeId = petTypeId || pet_type_id
    this.petImageUrl = petImageUrl || pet_image_url
    this.vaccinationStatus = vaccinationStatus || vaccination_status
    this.applicationStatus = applicationStatus || application_status
    this.petType = petType
  }

  async save() {
    try {
      const client = await pool.connect()
      const typeId = await client.query("SELECT id FROM pet_type WHERE type=$1", [this.petType])
      this.petTypeId = typeId.rows[0].id
      if(Number.isNaN(parseInt(this.petAge))){
        this.petAge=null
      }
      const queryString =
        "INSERT INTO pet_surrender_applications (name, phone_number, email, pet_name, pet_age, pet_type_id, pet_image_url, vaccination_status, application_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"
      const values = [
        this.name,
        this.phoneNumber,
        this.email,
        this.petName,
        this.petAge,
        this.petTypeId,
        this.petImageUrl,
        this.vaccinationStatus,
        this.applicationStatus
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
