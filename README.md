<h1 align="center">Task Caller 📞</h1>

<p align="center">
  This Node.js application uses Twilio to call Indian phone numbers, asks a question, and stores the user's answer in a PostgreSQL database. It’s a customizable and extensible solution for handling automated phone interactions.
</p>

---

<h2>🚀 Features</h2>

<ul>
  <li><strong>Automated Calls</strong>: Initiate calls to Indian phone numbers.</li>
  <li><strong>Record Responses</strong>: Ask questions and record responses via voice.</li>
  <li><strong>Store in PostgreSQL</strong>: Save the recorded responses into a PostgreSQL database.</li>
</ul>

---

<h2>📦 Installation</h2>

<ol>
  <li>Clone the repository:
    <pre><code>git clone https://github.com/yourusername/task-caller.git</code></pre>
  </li>
  <li>Install dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Create a <code>.env</code> file and add your environment variables:
    <pre><code>
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
DB_USER=your_postgres_user
DB_HOST=your_postgres_host
DB_NAME=your_postgres_db_name
DB_PASSWORD=your_postgres_password
DB_PORT=your_postgres_port
    </code></pre>
  </li>
  <li>Create the <code>responses</code> table in PostgreSQL:
    <pre><code>CREATE TABLE responses (
    id SERIAL PRIMARY KEY,
    phone_number VARCHAR(15),
    answer TEXT
);</code></pre>
  </li>
</ol>

---

<h2>🔧 Usage</h2>

<ol>
  <li>Start the server:
    <pre><code>npm start</code></pre>
  </li>
  <li>Make a POST request to the <code>/call</code> API:
    <pre><code>curl -X POST http://localhost:3000/call \
    -H "Content-Type: application/json" \
    -d '{"phoneNumber": "9876543210"}'</code></pre>
  </li>
</ol>

---

<h2>🛠 API Endpoints</h2>

<ul>
  <li><strong>POST</strong> <code>/call</code> - Initiates a call to the provided phone number and asks a question.</li>
  <li><strong>POST</strong> <code>/store-answer</code> - Stores the recorded answer in the database. Triggered by Twilio.</li>
</ul>

---

<h2>🛑 Prerequisites</h2>

<ul>
  <li><a href="https://nodejs.org/">Node.js</a></li>
  <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
  <li><a href="https://www.twilio.com/">Twilio Account</a></li>
</ul>

---

<h2>📂 Project Structure</h2>

<pre><code>/task-caller
 ├── /node_modules        # Dependencies
 ├── /config              # Configuration files
 ├── /controllers         # Route controllers
 ├── .env                 # Environment variables
 ├── app.js               # Main entry point
 └── README.md            # Project documentation
</code></pre>

---

<h2>📝 License</h2>

<p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

---

<h2>🌐 Connect</h2>

<ul>
  <li><a href="https://github.com/sarathchan">GitHub</a></li>
  <li><a href="https://twilio.com">Twilio</a></li>
</ul>

---

<h3>📄 Note</h3>

<p>Feel free to customize this project to suit your needs. You can extend it to add more questions, use other databases, or integrate additional services like text messaging.</p>
