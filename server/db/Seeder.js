import pg from "pg"
import path from "path"
import LineReader from "line-reader"
import { fileURLToPath } from "url"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/pets",
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const adoptablePetsPath = path.join(__dirname, "../data/adoptablePets.txt")
const petSurrenderApplicationsPath = path.join(__dirname, "../data/petSurrenderApplications.txt")

class Seeder {
  static async seed1() {
    // pet_types
    const petTypes = [
      { type: "dog", description: "Man's best friend" },
      { type: "cat", description: "I own you" },
      { type: "rabbit", description: "Thumper the super cool ski instructor" },
    ]
    const insertPetTypes = "INSERT INTO pet_types (type, description) VALUES ($1, $2)"

    try {
      for (let i = 0; i < petTypes.length; ++i) {
        const petType = petTypes[i]
        await pool.query(insertPetTypes, [petType.type, petType.description])
      }
    } catch (err) {
      console.error(err)
      pool.end()
    }
  }

  static async seed2() {
    // adoptable_pets
    const insertAdoptablePet = "INSERT INTO adoptable_pets " + 
      "(name, img_url, age, vaccination_status, adoption_story, adoption_status, type_id)" + 
      "VALUES ($1, $2, $3, $4, $5, $6, $7)"
    LineReader.eachLine(adoptablePetsPath, async (line, last, done) => {
      try {
        const [name, imgUrl, age, vaccinationStatus, adoptionStory, adoptionStatus, typeName] = line.split("; ")
        const typeIdResult = await pool.query("SELECT pet_types.id FROM pet_types WHERE pet_types.type = $1", [typeName])
        const typeId = typeIdResult.rows[0].id
        const adoptablePetValues = [name, imgUrl, age, vaccinationStatus, adoptionStory, adoptionStatus, typeId]
        await pool.query(insertAdoptablePet, adoptablePetValues)
        if (last) {
          pool.end()
        }
        done()
      } catch (err) {
        console.error(err)
        pool.end()
        done()
      }
    })
  }

  static async seed3() {
    // adoption_applications
    const adoptionApplications = [
      { name: "Anita Cat", phoneNumber: "987-654-3210", email: "acat@email.com", homeStatus: "rent", applicationStatus: "pending", petId: 2 },
      { name: "Jim Bob Hopper", phoneNumber: "123-456-7890", email: "jbob@email.com", homeStatus: "own", applicationStatus: "pending", petId: 5 },
    ]
    const insertAdoptionApplications = "INSERT INTO adoption_applications " + 
      "(name, phone_number, email, home_status, application_status, pet_id)" + 
      "VALUES ($1, $2, $3, $4, $5, $6)"

    try {
      for (let i = 0; i < adoptionApplications.length; ++i) {
        const { name, phoneNumber, email, homeStatus, applicationStatus, petId } = adoptionApplications[i]
        await pool.query(insertAdoptionApplications, [name, phoneNumber, email, homeStatus, applicationStatus, petId])
      }
    } catch (err) {
      console.error(err)
      pool.end()
    }
  }

  static async seed4() {
    // pet_surrender_applications
    const insertPetSurrenderApplications = "INSERT INTO pet_surrender_applications " + 
      "(name, phone_number, email, pet_name, pet_age, pet_type_id, pet_image_url, vaccination_status, application_status)" + 
      "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"
    LineReader.eachLine(petSurrenderApplicationsPath, async (line, last, done) => {
      try {
        const [name, phoneNumber, email, petName, petAge, petTypeName, petImageUrl, vaccinationStatus, applicationStatus] = line.split("; ")
        const petTypeIdResult = await pool.query("SELECT pet_types.id FROM pet_types WHERE pet_types.type = $1", [petTypeName])
        const petTypeId = petTypeIdResult.rows[0].id
        const applicationValues = [name, phoneNumber, email, petName, petAge, petTypeId, petImageUrl, vaccinationStatus, applicationStatus]
        await pool.query(insertPetSurrenderApplications, applicationValues)
        if (last) {
          pool.end()
        }
        done()
      } catch (err) {
        console.error(err)
        pool.end()
        done()
      }
    })
  }
}

export default Seeder
