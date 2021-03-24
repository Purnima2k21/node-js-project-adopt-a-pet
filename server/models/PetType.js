import pg from "pg";

const pool = new pg.Pool({connectionString: "postgres://postgres:password@localhost5432/pets"});

class PetType {
  constructor({type, description=null}) {
    this.type = type;
    this.description = description;
  }



  static async findAll() {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM pet_types")

      const petTypeData = result.rows;
      const petTypes = petTypeData.map((petType) => {
        return new this(petType)
      })
      client.release();
      return petTypes;
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}


export default PetType