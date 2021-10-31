const express = require("express");
const db = require("../database");
const router = express.Router();

router.post("/", async (req, res) => {
  const seedTables = `
        CREATE TABLE IF NOT EXISTS tokens (
            id  SERIAL PRIMARY KEY,
            value VARCHAR(255)
        );

        CREATE TABLE IF NOT EXISTS users (
            id  SERIAL PRIMARY KEY,
            first_name varchar(255),
            last_name varchar(255),
            age INT,
            token_id INT,
            active BOOLEAN NOT NULL DEFAULT true,
            FOREIGN KEY (token_id) REFERENCES tokens(id)
        );
        
        CREATE TABLE IF NOT EXISTS orders (
            id  SERIAL PRIMARY KEY,
            price FLOAT,
            date TIMESTAMP,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        
        INSERT INTO users (first_name, last_name, age) 
            VALUES 
                ('John', 'Doe', 18),
                ('Bob', 'Dylan', 30),
                ('Jane', 'Doe', 25);
        
        INSERT INTO orders (price, date, user_id)
            VALUES
                (18, '2021-01-01 00:00:00', 1),
                (18, '2021-01-03 05:00:00', 2),
                (18, '2021-01-04 06:00:00', 2);
        `;
  try {
    const response = await db.query(seedTables);
    res.json(response);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete("/", async (req, res) => {
  const dropTables = `
    DROP TABLE IF EXISTS users, orders, tokens CASCADE;
    `;
  try {
    const response = await db.query(dropTables);
    res.json(response);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
