import pg from "pg"
import _ from "lodash"

const pool = new pg.Pool({ connectionString: "postgres://postgres:password@localhost:5432/pets" })

class Pet {
  constructor({
    id,
    name,
    img_url,
    imgUrl,
    age,
    vaccination_status,
    vaccinationStatus,
    adoption_story,
    adoptionStory,
    adoption_status,
    adoptionStatus,
    type_id,
    typeId,
  }) {
    this.id = id
    this.name = name
    this.imgUrl = imgUrl || img_url
    this.age = age
    this.vaccinationStatus = vaccinationStatus || vaccination_status
    this.adoptionStory = adoptionStory || adoption_story
    this.adoptionStatus = adoptionStatus || adoption_status
    this.typeId = typeId || type_id
  }

  static async findByType(petType) {
    try {
      const client = await pool.connect()
      const result = await client.query(
        "SELECT ap.* FROM adoptable_pets ap JOIN pet_types pt ON ap.type_id = pt.id WHERE pt.type = $1",
        [petType]
      )
      const petsData = result.rows
      const pets = petsData.map((pet) => new this(pet))

      client.release()
      return pets
    } catch (error) {
      console.error(error)
      pool.end()
    }
  }
}

export default Pet
