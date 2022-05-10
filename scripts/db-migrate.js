const DRIVER = process.env.DATABASE_DRIVER || "sqlite"

if (DRIVER === undefined) {
  console.error("DATABASE is undefined")
}

require(`./db-migrate-${DRIVER}`)
