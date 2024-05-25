const dbConfig = {
    HOST: process.env.PG_HOST || "pg-2c826c68-demo-699.h.aivencloud.com",
    USER: process.env.PG_USER || "avnadmin",
    PASSWORD: process.env.PG_PASSWORD || "AVNS_PLd696JpkCUFN2nYQ3v",
    DB: process.env.PG_DB || "defaultdb",
    dialect: "postgres",
    port: process.env.PG_PORT || 24002,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

export default dbConfig;