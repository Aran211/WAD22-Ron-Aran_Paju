const express = require('express');
const pool = require('./database');
const cors = require('cors')

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});

app.get('/api/mycourses', async(req, res) => {
    try {
        console.log("A get all request has arrived");
        const courses = await pool.query(
            "SELECT * FROM mycourses"
        );
        res.json(courses.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.put('/api/courses/:id/note', async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const updateNote = await pool.query(
      "UPDATE mycourses SET note = $1 WHERE id = $2",
      [note, id]
    );

    res.json("Note updated successfully!");
  } catch (err) {
    console.error(err.message);
  }
});