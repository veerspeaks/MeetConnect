// server/seed/seedQuestions.cjs
const mongoose = require('mongoose');
const Questions = require('../models/questionsModel.cjs');



const questionsData = [
    // Full Stack Questions
    { questionCategory: 'full stack', question: 'What is the difference between SQL and NoSQL?', answer: 'SQL databases are relational, while NoSQL databases are non-relational.' },
    { questionCategory: 'full stack', question: 'Explain the concept of RESTful APIs.', answer: 'RESTful APIs use HTTP requests to access and use data.' },
    { questionCategory: 'full stack', question: 'What is a closure in JavaScript?', answer: 'A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope.' },
    { questionCategory: 'full stack', question: 'What is the purpose of a virtual DOM?', answer: 'The virtual DOM is a lightweight copy of the actual DOM that optimizes rendering and improves performance.' },
    { questionCategory: 'full stack', question: 'How do you manage state in a React application?', answer: 'State can be managed using React’s built-in state management or libraries like Redux.' },
    { questionCategory: 'full stack', question: 'What is the difference between synchronous and asynchronous programming?', answer: 'Synchronous programming executes tasks sequentially, while asynchronous programming allows tasks to run concurrently.' },
    { questionCategory: 'full stack', question: 'What is the purpose of WebSockets?', answer: 'WebSockets provide a full-duplex communication channel over a single TCP connection.' },
    { questionCategory: 'full stack', question: 'Explain the MVC architecture.', answer: 'MVC stands for Model-View-Controller, a design pattern that separates an application into three interconnected components.' },
    { questionCategory: 'full stack', question: 'What is CORS?', answer: 'CORS stands for Cross-Origin Resource Sharing, a security feature that allows or restricts resources from different origins.' },
    { questionCategory: 'full stack', question: 'What is the purpose of a build tool?', answer: 'Build tools automate tasks like minification, compilation, and packaging of code.' },
    { questionCategory: 'full stack', question: 'What is a RESTful service?', answer: 'A RESTful service is an API that adheres to REST principles, using standard HTTP methods.' },
    { questionCategory: 'full stack', question: 'What is the role of a package manager?', answer: 'A package manager automates the installation, upgrading, and removal of software packages.' },
    { questionCategory: 'full stack', question: 'What is the difference between a library and a framework?', answer: 'A library is a collection of functions, while a framework provides a structure for building applications.' },
    { questionCategory: 'full stack', question: 'What is server-side rendering?', answer: 'Server-side rendering is the process of rendering web pages on the server instead of the client.' },
    { questionCategory: 'full stack', question: 'What is a microservice?', answer: 'A microservice is an architectural style that structures an application as a collection of loosely coupled services.' },
    { questionCategory: 'full stack', question: 'What is the purpose of a CDN?', answer: 'A CDN (Content Delivery Network) distributes content across multiple servers to improve load times.' },
    { questionCategory: 'full stack', question: 'What is the difference between GET and POST requests?', answer: 'GET requests retrieve data, while POST requests send data to the server.' },
    { questionCategory: 'full stack', question: 'What is a Progressive Web App (PWA)?', answer: 'A PWA is a web application that uses modern web capabilities to deliver an app-like experience.' },
    { questionCategory: 'full stack', question: 'What is the purpose of a linter?', answer: 'A linter analyzes code for potential errors and enforces coding standards.' },
    { questionCategory: 'full stack', question: 'What is the role of a reverse proxy?', answer: 'A reverse proxy forwards client requests to the appropriate server and can provide load balancing and security.' },

    // Front End Questions
    { questionCategory: 'front end', question: 'What is the purpose of the "this" keyword in JavaScript?', answer: 'It refers to the object from which it was called.' },
    { questionCategory: 'front end', question: 'What are CSS preprocessors?', answer: 'They extend CSS with variables, nesting, and mixins.' },
    { questionCategory: 'front end', question: 'What is the box model in CSS?', answer: 'The box model describes the rectangular boxes generated for elements in the document tree.' },
    { questionCategory: 'front end', question: 'What is the difference between classes and IDs in CSS?', answer: 'Classes are reusable and can be applied to multiple elements, while IDs are unique to a single element.' },
    { questionCategory: 'front end', question: 'What is the purpose of the alt attribute in images?', answer: 'The alt attribute provides alternative text for an image if it cannot be displayed.' },
    { questionCategory: 'front end', question: 'What is the difference between inline and block elements?', answer: 'Inline elements do not start on a new line, while block elements do.' },
    { questionCategory: 'front end', question: 'What is a CSS grid?', answer: 'CSS grid is a layout system that allows for the creation of complex responsive layouts.' },
    { questionCategory: 'front end', question: 'What is the purpose of the z-index property?', answer: 'The z-index property controls the vertical stacking order of overlapping elements.' },
    { questionCategory: 'front end', question: 'What is the difference between event bubbling and event capturing?', answer: 'Event bubbling propagates events from child to parent, while capturing goes from parent to child.' },
    { questionCategory: 'front end', question: 'What is a single-page application (SPA)?', answer: 'A SPA is a web application that loads a single HTML page and dynamically updates content.' },
    { questionCategory: 'front end', question: 'What is the purpose of the viewport meta tag?', answer: 'The viewport meta tag controls the layout on mobile browsers.' },
    { questionCategory: 'front end', question: 'What is the difference between local storage and session storage?', answer: 'Local storage persists data even after the browser is closed, while session storage is cleared when the session ends.' },
    { questionCategory: 'front end', question: 'What is a responsive web design?', answer: 'Responsive web design ensures that web pages look good on all devices by using flexible layouts.' },
    { questionCategory: 'front end', question: 'What is the purpose of the <head> tag in HTML?', answer: 'The <head> tag contains meta-information about the document, such as title and links to stylesheets.' },
    { questionCategory: 'front end', question: 'What is the difference between a CSS reset and a CSS normalize?', answer: 'A CSS reset removes all default styling, while normalize preserves useful default styles.' },
    { questionCategory: 'front end', question: 'What is the purpose of the <script> tag?', answer: 'The <script> tag is used to embed or reference JavaScript code in an HTML document.' },
    { questionCategory: 'front end', question: 'What is the role of ARIA in web accessibility?', answer: 'ARIA (Accessible Rich Internet Applications) enhances accessibility for users with disabilities.' },
    { questionCategory: 'front end', question: 'What is the purpose of the <form> tag in HTML?', answer: 'The <form> tag is used to collect user input.' },
    { questionCategory: 'front end', question: 'What is the difference between a GET and a POST request?', answer: 'GET requests retrieve data, while POST requests send data to the server.' },

    // Back End Questions
    { questionCategory: 'back end', question: 'What is middleware in Express?', answer: 'Middleware is a function that has access to the request, response, and next middleware function.' },
    { questionCategory: 'back end', question: 'Explain the concept of sessions in web applications.', answer: 'Sessions are used to store user data across multiple requests.' },
    { questionCategory: 'back end', question: 'What is the purpose of a database?', answer: 'A database is used to store, retrieve, and manage data.' },
    { questionCategory: 'back end', question: 'What is the difference between SQL and NoSQL databases?', answer: 'SQL databases are relational, while NoSQL databases are non-relational.' },
    { questionCategory: 'back end', question: 'What is an API?', answer: 'An API (Application Programming Interface) allows different software applications to communicate with each other.' },
    { questionCategory: 'back end', question: 'What is the purpose of authentication?', answer: 'Authentication verifies the identity of a user or system.' },
    { questionCategory: 'back end', question: 'What is the role of a web server?', answer: 'A web server processes requests from clients and serves web content.' },
    { questionCategory: 'back end', question: 'What is the purpose of a RESTful API?', answer: 'A RESTful API allows for interaction with web services using standard HTTP methods.' },
    { questionCategory: 'back end', question: 'What is the difference between PUT and PATCH requests?', answer: 'PUT updates a resource completely, while PATCH updates a resource partially.' },
    { questionCategory: 'back end', question: 'What is the purpose of a load balancer?', answer: 'A load balancer distributes incoming network traffic across multiple servers.' },
    { questionCategory: 'back end', question: 'What is the role of a reverse proxy?', answer: 'A reverse proxy forwards client requests to the appropriate server and can provide load balancing and security.' },
    { questionCategory: 'back end', question: 'What is the purpose of a session token?', answer: 'A session token is used to identify a user session and maintain state.' },
    { questionCategory: 'back end', question: 'What is the difference between synchronous and asynchronous programming?', answer: 'Synchronous programming executes tasks sequentially, while asynchronous programming allows tasks to run concurrently.' },
    { questionCategory: 'back end', question: 'What is the purpose of a database index?', answer: 'A database index improves the speed of data retrieval operations.' },
    { questionCategory: 'back end', question: 'What is the role of a message queue?', answer: 'A message queue allows for asynchronous communication between different parts of an application.' },
    { questionCategory: 'back end', question: 'What is the purpose of data validation?', answer: 'Data validation ensures that the data entered into a system is accurate and meets certain criteria.' },
    { questionCategory: 'back end', question: 'What is the difference between a monolithic and microservices architecture?', answer: 'Monolithic architecture is a single unified unit, while microservices architecture consists of small, independent services.' },
    { questionCategory: 'back end', question: 'What is the purpose of caching?', answer: 'Caching stores frequently accessed data in memory to improve performance.' },
    { questionCategory: 'back end', question: 'What is the role of a cron job?', answer: 'A cron job is a scheduled task that runs at specified intervals.' },

    // Behavioral Questions
    { questionCategory: 'behavioral', question: 'Describe a challenge you faced at work and how you overcame it.', answer: 'I faced a tight deadline and prioritized tasks effectively to meet it.' },
    { questionCategory: 'behavioral', question: 'How do you handle conflict in a team?', answer: 'I address issues directly and seek a collaborative solution.' },
    { questionCategory: 'behavioral', question: 'Tell me about a time you failed and what you learned from it.', answer: 'I learned the importance of thorough testing after a bug caused a delay in deployment.' },
    { questionCategory: 'behavioral', question: 'How do you prioritize your work?', answer: 'I assess deadlines and importance, then create a structured plan to tackle tasks.' },
    { questionCategory: 'behavioral', question: 'Describe a time when you had to learn a new skill quickly.', answer: 'I had to learn a new programming language for a project and dedicated time to online courses.' },
    { questionCategory: 'behavioral', question: 'How do you handle feedback?', answer: 'I view feedback as an opportunity for growth and actively seek it out.' },
    { questionCategory: 'behavioral', question: 'Tell me about a time you worked on a team project.', answer: 'I collaborated with a team to develop a web application, ensuring clear communication and task delegation.' },
    { questionCategory: 'behavioral', question: 'How do you stay motivated during repetitive tasks?', answer: 'I set small goals and reward myself upon completion to maintain motivation.' },
    { questionCategory: 'behavioral', question: 'Describe a situation where you had to adapt to change.', answer: 'I adapted to a new project management tool by attending training sessions and practicing with it.' },
    { questionCategory: 'behavioral', question: 'How do you handle tight deadlines?', answer: 'I prioritize tasks and communicate with my team to ensure we meet deadlines.' },
    { questionCategory: 'behavioral', question: 'Tell me about a time you had to persuade someone.', answer: 'I convinced a stakeholder to adopt a new technology by presenting data on its benefits.' },
    { questionCategory: 'behavioral', question: 'How do you approach problem-solving?', answer: 'I analyze the problem, brainstorm solutions, and evaluate the best course of action.' },
    { questionCategory: 'behavioral', question: 'Describe a time you received constructive criticism.', answer: 'I received feedback on my presentation skills and took a public speaking course to improve.' },
    { questionCategory: 'behavioral', question: 'How do you manage stress at work?', answer: 'I practice time management and take breaks to recharge when needed.' },
    { questionCategory: 'behavioral', question: 'Tell me about a time you went above and beyond.', answer: 'I volunteered to lead a project that was outside my usual responsibilities, resulting in a successful outcome.' },
    { questionCategory: 'behavioral', question: 'How do you build relationships with colleagues?', answer: 'I make an effort to communicate openly and participate in team activities.' },
    { questionCategory: 'behavioral', question: 'Describe a time you had to make a difficult decision.', answer: 'I had to choose between two candidates for a position and based my decision on their skills and fit for the team.' },
    { questionCategory: 'behavioral', question: 'How do you handle failure?', answer: 'I reflect on what went wrong, learn from it, and apply those lessons to future situations.' },
    { questionCategory: 'behavioral', question: 'Tell me about a time you had to work with a difficult person.', answer: 'I focused on maintaining professionalism and finding common ground to collaborate effectively.' },
    { questionCategory: 'behavioral', question: 'How do you ensure effective communication in a team?', answer: 'I encourage open dialogue and regular check-ins to keep everyone informed.' },
];

const seedQuestions = async () => {
    try {
        await Questions.deleteMany({}); // Clear existing questions
        await Questions.insertMany(questionsData); // Insert new questions
        console.log('Seeding successful!');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        mongoose.connection.close(); // Close the connection
    }
};

// Connect to MongoDB and run the seeding function
mongoose.connect('mongodb://localhost:27017/meetconnect', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        seedQuestions();
    })
    .catch(err => console.error('MongoDB connection error:', err));
