from flask import Flask, request, jsonify, send_from_directory
import sqlite3
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
print("MY FOLDER",BASE_DIR)


def create_database():
    conn = sqlite3.connect("database.db")

    conn.execute("""
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            mobile TEXT NOT NULL,
            service TEXT NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            details TEXT
        )
    """)

    conn.commit()
    conn.close()


@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/<path:filename>")
def website_files(filename):
    return send_from_directory(BASE_DIR, filename)


@app.route("/api/appointments", methods=["POST"])
def add_appointment():

    data = request.get_json()

    conn = sqlite3.connect("database.db")

    conn.execute("""
        INSERT INTO appointments
        (name, mobile, service, date, time, details)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        data.get("name"),
        data.get("mobile"),
        data.get("type"),
        data.get("date"),
        data.get("time"),
        data.get("details", "")
    ))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Appointment saved successfully!"
    })


@app.route("/api/appointments", methods=["GET"])
def get_appointments():

    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row

    appointments = conn.execute(
        "SELECT * FROM appointments"
    ).fetchall()

    conn.close()

    return jsonify([dict(row) for row in appointments])

create_database()

if __name__ == "__main__":
    app.run(debug=True)