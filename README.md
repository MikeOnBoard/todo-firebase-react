# **Todo Firebase React**

![Review](https://github.com/MikeOnBoard/todo-firebase-react/blob/master/github_source/preview-react-firebase-todo.JPG)

A React application integrated with Firebase that serves as a simple to-do list manager. It allows users to add, update, and delete tasks while storing data in Firebase for persistence.

## **Project Structure**
```bash
todo-firebase-react/
├── src/
│   ├── components/       # Reusable UI components like TodoItem and TodoList
│   ├── firebase.js       # Firebase configuration
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point of the application
│   ├── styles.css        # Custom styling
├── public/               # Static files (e.g., index.html)
├── .env                  # Environment variables (e.g., Firebase config)
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```
## **Features**
- **Add Tasks**: Create tasks to organize your to-do list.
- **Update Tasks**: Modify task descriptions directly in the app.
- **Delete Tasks**: Remove tasks that are no longer needed.
- **Firebase Integration**: Real-time storage of tasks in Firebase.
## **Prerequisites**
- **Node.js** (v14 or above) and **npm** (or yarn).
- A Firebase project with Firestore enabled.
Getting Started
1. Clone the repository:

```bash
git clone https://github.com/MikeOnBoard/todo-firebase-react.git
cd todo-firebase-react
```
2. Install dependencies:

````bash
npm install
````
3. Set up Firebase:

- Go to the Firebase Console.
- Create a new project or use an existing one.
- Enable Cloud Firestore and create a database.
- Add your web app to Firebase and copy the configuration settings.
4. Add Firebase credentials:

- Create a ``.env`` file in the root directory and add:

````env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
````
5. Start the development server:

````bash
npm start
````
Open http://localhost:3000 to view it in the browser.

## **Firebase Integration**
### **Firestore Database Structure**
Firestore is used to store tasks in a collection. The structure is as follows:

````sql
Copiar código
tasks/
  ├── taskId (auto-generated)
      ├── description: string
      ├── completed: boolean
      ├── timestamp: timestamp
````
### **Firebase Configuration**
The ``firebase.js`` file is responsible for initializing Firebase and setting up Firestore. Ensure that this file reads your environment variables correctly.

## **Available Scripts**
### **``npm start``**
Runs the app in development mode.

### **``npm test``**
Launches the test runner in interactive mode.

### **``npm run build``**
Builds the app for production in the build/ folder.

### **``npm run eject``**
Ejects the default CRA configuration for full customization.

## **Contributing**
We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch:

````bash
git checkout -b feature/your-feature
````
3. Commit your changes:

````bash
git commit -m "Add your feature"
````
4. Push the branch and open a Pull Request.
## **Conclusion**
The Todo Firebase React app demonstrates the integration of React with Firebase for real-time database functionality. It’s a simple and scalable project ideal for learning Firebase basics and implementing CRUD operations in React.

For any questions or issues, feel free to create an issue on the repository.