import pg from "pg"
import _ from "lodash"


const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/adopt_a_pet"
})

class PetType {
  constructor({ id, type, description }) {
    this.id = id
    this.type = type
    this.description = description
    }

   static async findAll() {
     try{
       const client = await pool.connect()
       const result = await client.query("SELECT * FROM pet_types;")

       const petTypeData = result.rows

       const petTypes = petTypeData.map(
         (petType) => new this(petType)
         )

         client.release()

         return petTypes

     }catch(error){
       console.log(error)
     }
   } 
}

export default PetType