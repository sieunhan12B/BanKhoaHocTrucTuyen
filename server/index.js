const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// API endpoints
app.get('/api/khoahoc', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM khoaHoc');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/khoahoc/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM khoaHoc WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Không tìm thấy khóa học' });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 