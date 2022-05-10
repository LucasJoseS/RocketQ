const DRIVER = process.env.DATABASE_DRIVER || "sqlite"
const SuportedDrivers = ['sqlite', 'postgres']

if (DRIVER === undefined) {
  throw "DATABASE is undefined"
}

if (SuportedDrivers.some(driver => { driver === DRIVER })) {
  throw `DRIVER {DRIVER} is NOT suported\n suported drivers are: ${SuportedDrivers}`
}

console.log(`Runing migrate for ${DRIVER}`)
require(`./db-migrate-${DRIVER}`)
