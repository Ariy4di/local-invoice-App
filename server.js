const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let db;

// Inisialisasi Database SQLite
(async () => {
    db = await open({
        filename: './invoices.db',
        driver: sqlite3.Database
    });

    // Buat tabel jika belum ada
    await db.exec(`
        CREATE TABLE IF NOT EXISTS invoices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            invoice_number TEXT,
            client_name TEXT,
            items TEXT,
            total_amount REAL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
})();

// API: Simpan Invoice Baru
app.post('/api/invoices', async (req, res) => {
    const { client_name, items, total_amount } = req.body;
    const invoice_number = `INV-${Date.now().toString().slice(-6)}`; // Nomor otomatis simpel

    try {
        await db.run(
            `INSERT INTO invoices (invoice_number, client_name, items, total_amount) VALUES (?, ?, ?, ?)`,
            [invoice_number, client_name, JSON.stringify(items), total_amount]
        );
        res.json({ success: true, message: 'Invoice berhasil disimpan!', invoice_number });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// API: Ambil Semua Invoice
app.get('/api/invoices', async (req, res) => {
    try {
        const rows = await db.all('SELECT * FROM invoices ORDER BY id DESC');
        // Parsing data items yang tadinya string JSON menjadi Object kembali
        const formattedRows = rows.map(row => ({
            ...row,
            items: JSON.parse(row.items)
        }));
        res.json(formattedRows);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 Aplikasi Invoice sukses berjalan di Local!`);
    console.log(`💻 Di Laptop, buka: http://localhost:${PORT}`);
    console.log(`==================================================\n`);
});