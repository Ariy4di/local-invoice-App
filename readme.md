# 📄 Local Invoice App (Mobile-Ready Snapshot)

A lightweight, self-hosted local invoice web application designed for personal or small business use. This app is optimized for mobile browser screens and provides a smart workaround for mobile printing limitations by generating high-quality image snapshots of receipts, tailored for standard 76mm/80mm thermal printers.

## 🚀 Key Features

- **Dynamic Invoice Generator:** Real-time total amount calculation with auto-incrementing structured invoice numbers.
- **Client & Item Management:** Quick input for client names and dynamic line items (products/services).
- **Local Embedded Database:** Powered by SQLite (`sqlite3`), storing all data securely in a single local file without requiring heavy database setup.
- **Mobile-Friendly Snapshot Layout:** Uses `html2canvas` to capture and generate a high-definition PNG/JPEG of the thermal receipt directly on the screen, bypassing native mobile browser pop-up blockages.
- **Responsive UI:** Built with Tailwind CSS (v3) for a sleek, modern, and mobile-responsive interface.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite (sqlite3)
- **Frontend:** HTML5, Tailwind CSS (v3 CDN), html2canvas

## 💻 Installation & Local Setup

Follow these steps to run the application on your local machine:

1. Clone this repository or download the source code:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/local-invoice-app.git](https://github.com/YOUR_USERNAME/local-invoice-app.git)
   cd local-invoice-app