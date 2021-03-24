import pg from "pg"
import fs from "fs"
import _ from "lodash"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/pets"
})

class Pet {
  constructor({
    name,
    img_url,
    age,
    vaccination_status,
    adoption_story,
    adoption_status,
    type_id,
    typeId
  }) {
    this.id = id
    this.name = name
    this.img_url = img_url
    this.age = age
    this.vaccination_status = vaccination_status
    this.adoption_story = adoption_story
    this.adoption_status = adoption_status
    this.typeId = type_id || typeId
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
        "SELECT * FROM adoptable_pets ap JOIN pet_types pt ON ap.type_id = pt.id WHERE pt.type = $1",
        [petType]
      )

      const petsData = result.rows
      console.log("petsData", petsData)

      const pets = petsData.map(pet => new this(pet))

      client.release()

      return pets
    } catch (error) {
      console.error(error)
      pool.end()
    }
  }
}

export default Pet
