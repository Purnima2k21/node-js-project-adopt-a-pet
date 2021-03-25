import pg from "pg"
import _ from "lodash"


const pool = new pg.Pool({ connectionString: "postgres://postgres:password@localhost:5432/pets" })

class Pet {
  constructor({
    id = null,
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

  async petType() {
    const petTypeFile = await import("./PetType.js")
    const PetType = petTypeFile.default

    try {
      const client = await pool.connect()
      const result = await client.query("SELECT * FROM pet_types WHERE id = $1", [this.typeId])

      const relatedPetTypeData = result.rows[0]
      const relatedPetType = new PetType(relatedPetTypeData)

      client.release()
      return relatedPetType
    } catch (error) {
      console.error(error)
      pool.end()
    }
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

  static async findById(id) {
    try {
      const client = await pool.connect()
      const queryString = "SELECT * FROM adoptable_pets WHERE id = $1"

      const result = await client.query(queryString, [id])
      if (result.rows.length === 0) return false
      const petData = result.rows[0]
      const pet = new this(petData)

      client.release()
      return pet
    } catch (error) {
      console.error(error)
      pool.end()
    }
  }
}

export default Pet
