const express = require("express");
const cors = require("cors");
const pool = require("./db");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());




// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running");
});




// GET ALL LEADS
app.get("/leads", async (req, res) => {

  try {

    const allLeads = await pool.query(
      "SELECT * FROM Leads ORDER BY lead_id DESC"
    );

    res.json(allLeads.rows);

  } catch (err) {

    console.log(err.message);
  }
});






// ADD LEAD
app.post("/leads", async (req, res) => {

  try {

    const {
      customer_name,
      ph_no,
      email_id,
      lead_source,
      lead_status,
    } = req.body;

    const newLead = await pool.query(

      `INSERT INTO Leads
      (
        customer_name,
        ph_no,
        email_id,
        lead_source,
        lead_status
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,

      [
        customer_name,
        ph_no,
        email_id,
        lead_source,
        lead_status,
      ]
    );

    res.json(newLead.rows[0]);

  } catch (err) {

    console.log(err.message);
  }
});







// UPDATE LEAD STATUS
app.put("/leads/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const { lead_status } = req.body;

    await pool.query(

      "UPDATE Leads SET lead_status = $1 WHERE lead_id = $2",

      [lead_status, id]
    );

    res.json("Lead Updated");

  } catch (err) {

    console.log(err.message);
  }
});








// DELETE LEAD
app.delete("/leads/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(

      "DELETE FROM Leads WHERE lead_id = $1",

      [id]
    );

    res.json("Lead Deleted");

  } catch (err) {

    console.log(err.message);
  }
});








app.listen(process.env.PORT, () => {

  console.log(
    `Server running on port ${process.env.PORT}`
  );
});

