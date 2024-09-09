Task Caller 📞
This is a Node.js application that uses the Twilio API to call Indian phone numbers, ask a question, and store the user's answer in a PostgreSQL database.

🚀 Features
Make calls to Indian phone numbers.
Ask questions during the call and record responses.
Store responses in a PostgreSQL database.
Fully customizable and easily extensible.
📦 Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/task-caller.git
cd task-caller
Install dependencies:

bash
Copy code
npm install
Set up environment variables by creating a .env file in the project root:

bash
Copy code
touch .env
Inside the .env file, add the following:

bash
Copy code
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
DB_USER=your_postgres_user
DB_HOST=your_postgres_host
DB_NAME=your_postgres_db_name
DB_PASSWORD=your_postgres_password
DB_PORT=your_postgres_port
Set up PostgreSQL and create the responses table:

sql
Copy code
CREATE TABLE responses (
    id SERIAL PRIMARY KEY,
    phone_number VARCHAR(15),
    answer TEXT
);
🔧 Usage
Start the server:

bash
Copy code
npm start
Trigger a call using the /call API by sending a POST request:

bash
Copy code
curl -X POST http://localhost:3000/call \
-H "Content-Type: application/json" \
-d '{"phoneNumber": "9876543210"}'
This will initiate a call to the provided phone number and record the answer.

🛠 API Endpoints
POST /call

Description: Initiates a call to the provided phone number and asks a question.
Body: { "phoneNumber": "9876543210" }
POST /store-answer

Description: Stores the recorded answer in the database. Automatically triggered by Twilio.
🛑 Prerequisites
Make sure you have the following installed:

Node.js
PostgreSQL
Twilio Account
📂 Project Structure
bash
Copy code
/task-caller
 ├── /node_modules        # Dependencies
 ├── /config              # Configuration files
 ├── /controllers         # Route controllers
 ├── .env                 # Environment variables
 ├── app.js               # Main entry point
 └── README.md            # Project documentation
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🌐 Connect
GitHub: https://github.com/sarathchan
Twilio: https://twilio.com
📄 Note
Feel free to customize this project to suit your needs. You can extend it to add more questions, use other databases, or integrate additional services like text messaging.
