require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const seedSuperAdmin = require("./superAdmin.seed");

const runSeed = async () => {
  try {
    await connectDB();

    await seedSuperAdmin();

    console.log("Seeding completed");

    process.exit();
  } catch (error) {
    console.error("Seed Error:", error);
    process.exit(1);
  }
};

runSeed();