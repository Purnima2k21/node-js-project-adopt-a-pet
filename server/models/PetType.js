import pg from "pg"

const pool = new pg.Pool({ connectionString: "postgres://postgres:password@localhost:5432/pets" })

class PetType {
  constructor({ id = null, type, description = null }) {
    this.id = id
    this.type = type
    this.description = description
  }

  static async findAll() {
    try {
      const client = await pool.connect()
      const result = await client.query("SELECT * FROM pet_types")

      const petTypeData = result.rows
      const petTypes = petTypeData.map((petType) => new this(petType))
      client.release()
      return petTypes
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default PetType
