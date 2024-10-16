# MeetConnect

MeetConnect is a web application designed to streamline the interview scheduling process for both interviewers and candidates. The platform allows users to manage interviews, view questions, and maintain user profiles efficiently.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure sign-in and user management.
- **Interview Scheduling**: Schedule and manage interviews with various categories.
- **Interview Management**: View and filter interviews based on their status (completed, upcoming).
- **Question Bank**: Access a variety of interview questions categorized by type.
- **User Profiles**: Manage user details, including work experience and profile pictures.
- **Responsive Design**: Optimized for both mobile and desktop views.

## Technologies Used

- **Frontend**: 
  - React
  - Redux for state management
  - Tailwind CSS for styling
  - Axios for API calls
  - Framer Motion for animations
  - MUI (Material-UI) for UI components

- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB with Mongoose for database management
  - Passport.js for authentication

## Installation

To run the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/meetconnect.git
   cd meetconnect
   ```

2. Navigate to the client directory and install dependencies:
   ```bash
   cd client
   npm install
   ```

3. Navigate to the server directory and install dependencies:
   ```bash
   cd server
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the server directory and add your environment variables (e.g., database connection string, JWT secret).

5. Start the application:
   ```bash
   npm run dev
   ```

   This command will run both the client and server concurrently.

## Usage

- Navigate to `http://localhost:3000` in your web browser.
- Sign in or create a new account to start using the application.
- Explore the features such as scheduling interviews, viewing questions, and managing your profile.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need further assistance!

