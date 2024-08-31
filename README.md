
# Todoist
Welcome to the Todo project! This project aims to create a basic todo application where you can add, delete and mark you todos.
If you want to keep your todo in track this is the way to go!

# Features
- User Authentication & Authorization using JWT.
- Update user's details.
- Add, remove or mark todos as completed.

# Technology Stack
- Frontend: React.js, Tailwind CSS , Recoil
- Backend: Node.js, Express.js
- Database: MongoDB

# Getting Started

## To get started with the Wallet Clone project, follow these steps:

1. **Clone the Repository**: Clone the repository from GitHub:

   ```bash
   git clone https://github.com/ImSanc/Todo.git


2. **Set Environment Variables**: Navigate to backend folders and add config. You may need to create a config.js file and configure it with required variables: In the backend/config.js file:

    ```bash
    const jwtToken = "your JWT token"
    const Port = 'your port';
    const databaseConnection = 'your db connection';

module.exports  ={jwtToken,Port,databaseConnection};

3. **Install Dependencies** : Install dependencies in the frontend and backend folders using npm or yarn:

    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install


4. **Start the Backend Server** : In the backend folder, start the development server using npm:
    ```bash
    node index.js

5. **Start the Frontend** : In the frontend folder, start the frontend application:
    ```bash 
    npm run dev

# Recoil
This application uses Recoil for state management.
Selectors and atoms are beautiful but some time cracks the head when they cache data.

# Upcoming
1. Might add paging and infinite scrolling for list (currently couldn't implement it).
2. Add the completed todos as well to display to the user


# Contributions
Contributions to the Todoist are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

Thank you for using Todoist! Happy Coding! 🚀