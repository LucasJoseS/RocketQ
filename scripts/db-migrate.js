const DRIVER = process.env.DATABASE_DRIVER

if (DRIVER === undefined) {
  console.error("DATABASE is undefined")
}

require(`./db-migrate-${DRIVER}`)
