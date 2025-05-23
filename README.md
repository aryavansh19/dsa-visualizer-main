Data Structure Visualizer ✨



 ## 🌟 Introduction

This project, Data Structure Visualizer, aims to create an interactive web application using React.js and Tailwind CSS to help learners grasp the fundamental concepts of data structures through engaging visual animations and real-time user interaction. By offering a hands-on interface, this tool bridges the gap between theoretical learning and practical understanding, making abstract data structures tangible and encouraging experimentation.




Users can input data, choose operations like insertion or deletion, and instantly see how the data structure changes dynamically on screen.


🚀 Features
Interactive Visualizations: Witness data structures come alive with dynamic animations for operations like insertion, deletion, and traversal.


Real-time Feedback: Instantly see changes to the data structure as you interact with it.

Modular Components: Each data structure (Linked List, Queue, Tree) is implemented as an independent React component, ensuring clean code and scalability.
Responsive UI: Styled with Tailwind CSS, the visualizer ensures a seamless experience across different screen sizes.

Intuitive Controls: Type-safe input validation and user-friendly controls provide an engaging learning experience.


Toast Notifications: Immediate feedback for errors and successful actions using react-hot-toast.


Separation of Concerns: Codebase separates logic from configuration, linking each data structure to a dedicated data file containing STL code, custom implementation, and documentation.


💻 Currently Supported Data Structures & Algorithms
Singly Linked Lists (Visualization with animations for insert/delete operations) 


Queues (Visualization with animations for enqueue/dequeue operations) 


Basic Trees (Visualization with add/search functionality) 


Binary Tree Visualizer 

Graph Data Structure (and dynamic node/edge visualization) 
Code Editor Integration with Command Parsing 

🔮 Planned Future Enhancements 
Circular Linked Lists Visualization 




Binary Search Trees (BSTs) and AVL Trees (with rotation animations) 




Graph Traversal Algorithms: BFS (Breadth-First Search), DFS (Depth-First Search) 




Dijkstra's Shortest Path Algorithm Visualization 




Full Testing and Final App Validation 

📸 Screenshots
(Replace these placeholders with actual screenshots or a GIF of your visualizer in action for maximum impact!)

Data Structure Visualization in Action
(Example: A screenshot showing a linked list insertion animation)

Project Folder Structure
(This image shows the commands, core, .venv directories, etc., which is relevant for showing the project's organization.)

🏗️ Project Approach & Architecture
The project is developed using React.js for building dynamic, component-based user interfaces and Tailwind CSS for responsive, utility-first styling.

Modularity: Each data structure is implemented as an independent React component to maintain modularity and simplify future expansions.
State Management: User interactions are managed using React's useState hook, allowing real-time updates to the UI as users perform operations like insertion or deletion.
Dynamic Visuals: Visual components represent individual nodes or elements, styled with Tailwind and updated dynamically to reflect changes.
Input Validation: Input types are validated against predefined formats (e.g., Number, Character) to ensure data consistency.
Code Organization: The codebase separates logic from configuration, with each data structure linked to a dedicated data file containing STL code, custom implementation, and documentation. This structure supports scalability and clean code organization.


📊 Project Status
The project is currently around 60-70% complete, with core data structure visualizations successfully implemented and fully functional for Singly Linked Lists, Queues, and Basic Trees.

Completed:
React project setup with routing and base UI components.

Singly Linked List, Queue, and Basic Tree visualizers are fully functional, with animated visual feedback, input validation, and real-time user interaction integrated into a responsive UI.

Application's foundational architecture, including modular React components, routing, dynamic state management, and data-driven configuration files, is in place.
UI elements and reusable components are ahead of schedule.
Responsive UI and Styling.
Code Editor Integration with Command Parsing.
In Progress:
Animation logic for Trees (currently being reviewed).
Advanced modules including Circular Linked Lists, Binary Search Trees (BSTs), AVL Trees, and Graph algorithms (BFS, DFS, Dijkstra's Algorithm).

Pending:
Algorithm output testing for BST, AVL, and Graphs.
Final testing and validation.

🛠️ Installation
Follow these steps to get the Data Structure Visualizer up and running on your local machine.

Prerequisites
Node.js (LTS version recommended)
npm or yarn (Node.js package manager)
Steps
Clone the repository:

Bash

git clone https://github.com/aryavansh19/dsa-visualizer-main.git [cite: 54]
cd dsa-visualizer-main
Install dependencies:
This project uses standard Node.js package management. You'll need a package.json file in your project root which lists dependencies like react, react-dom, tailwindcss, react-hot-toast, etc.

Bash

npm install
# OR
yarn install
Run the development server:

Bash

npm start
# OR
yarn start
This will open the application in your browser, usually at http://localhost:3000.

🚀 Usage
Once the development server is running, navigate to http://localhost:3000 in your web browser.

You will see the interactive interface where you can:

Select a data structure (Singly Linked List, Queue, Basic Tree, etc.).
Input data using the provided controls.

Perform operations like insertion, deletion, and (for trees) search.

Observe the real-time visual changes and animations of the data structure.

🚧 Challenges & Solutions
During development, the team faced several challenges:

Dynamic Visualization Logic: Ensuring smooth and synchronized animations for operations like insertion, deletion, and traversal took significant time and testing.
Graph and Tree Layout Complexity: Visualizing graphs and trees posed a layout challenge, especially in keeping the structure readable and non-overlapping as nodes and edges were added dynamically.
Command Parsing: Implementing a parser to accurately interpret user input from a code editor (e.g., insert(10)) into actual operations required careful design to avoid errors and misuse. The team is building a custom parser with error handling and plans to integrate syntax suggestions for better usability.

User Input Validation: Ensuring consistent type and range validation across all inputs. The plan is to reuse and centralize validation functions.
Performance: Rendering large trees or graphs can cause lag. The plan is to introduce a maximum node limit and use React.Memo for optimization.
Mobile Responsiveness & Scalability: Ensuring the visualizer works well across different screen sizes while supporting growing structures (like large trees or graphs) remains a challenge. The team is working on responsive designs and zoom/pan features to improve usability.

✅ Testing and Validation Status
Extensive testing has been conducted to ensure the reliability of core components:

Manual UI Testing: Passed for Linked List and Queue.
Animation Logic: In Progress; Tree animations are being reviewed.
Input Validation: Passed; Type validation works for arrays/queues.
Algorithm Output: Pending; To be tested for BST, AVL, and Graphs.
👥 Team Information 
Team Name: Hacktix 

Aryavansh Saini (Team Lead) - Student ID: 230112777, Email: aryavansh.120@gmail.com 
Vijayvrat Singh - Student ID: 230211574, Email: svijayvrat@outlook.com 
Diya Rawat - Student ID: 23012841, Email: rawatdiya85@gmail.com 
Mohit Rautela - Student ID: 230112646, Email: mrautela12@gmail.com 
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
(If you don't have a LICENSE file in your repository, you should create one.)
