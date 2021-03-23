import pg from "pg"
import fs from "fs"
import _ from "lodash"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/pets"
})

class Pet {
  constructor ({ name, location, id=null}) {
    this.id = id
    this.title = title
    this.location = location
  }

  static async findAll() {
    try {
      const client = await pool.connect()
      const result = await client.query("SELECT * FROM pet_surrender_applications;")

      const petData = result.rows

      const pets = petData.map((pet) => {
        return new this(pet)
      })

      client.release()

      return pets
    } catch (error) {
      console.log(error)
      pool.end()
    }
  }
  
//   static async findById(id) {
//     try {
//       const client = await pool.connect()
//       const result = await client.query("SELECT * FROM adventures WHERE id = $1;", [id])

//       const adventuresData = result.rows[0]

//       const adventure = new this(adventuresData)

//       client.release()

//       return adventure
//     } catch (error) {
//       console.error(error)
//       pool.end()
//     }
//   }

//   async save() {
//     try {
//       const client = await pool.connect();
//       let query = "INSERT INTO adventures (title, location) VALUES ($1, $2)";

//       await client.query(query, [
//         this.title,
//         this.location
//       ]);

//       const result = await client.query(
//         "SELECT * FROM adventures ORDER BY ID DESC LIMIT 1"
//       );
//       const newAdventureData = result.rows[0];
//       this.id = newAdventureData.id;

//       client.release();
//       return true;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }
}

export default Pet