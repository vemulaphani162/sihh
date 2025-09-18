// Sample data for the application
const initialSampleData = {
    videos: [
        { id: 1, title: "Mathematics - Algebra Basics", subject: "Mathematics", duration: "15:30", uploadDate: "2023-10-15", videoUrl: "videos/phani.mp4" },
        { id: 2, title: "Science - Photosynthesis", subject: "Science", duration: "12:45", uploadDate: "2023-10-12", videoUrl: "videos/phani.mp4" },
        { id: 3, title: "English Grammar - Tenses", subject: "English", duration: "18:20", uploadDate: "2023-10-10", videoUrl: "videos/phani.mp4" },
        { id: 4, title: "History - Indian Independence", subject: "History", duration: "22:10", uploadDate: "2023-10-05", videoUrl: "videos/phani.mp4" }
    ],
    notes: [
        { id: 1, title: "Algebra Formulas", subject: "Mathematics", pages: 5, uploadDate: "2023-10-14", pdfUrl: "assignments/sample.pdf" },
        { id: 2, title: "Biology - Cell Structure", subject: "Science", pages: 8, uploadDate: "2023-10-11", pdfUrl: "assignments/sample.pdf" },
        { id: 3, title: "Essay Writing Tips", subject: "English", pages: 3, uploadDate: "2023-10-09", pdfUrl: "assignments/sample.pdf" },
        { id: 4, title: "Indian Constitution", subject: "Civics", pages: 6, uploadDate: "2023-10-04", pdfUrl: "assignments/sample.pdf" }
    ],
    assignments: [
        { id: 1, title: "Algebra Problem Set", subject: "Mathematics", dueDate: "2023-10-20", status: "Pending", pdfUrl: "assignments/sample.pdf" },
        { id: 2, title: "Science Project", subject: "Science", dueDate: "2023-10-25", status: "Submitted", pdfUrl: "assignments/sample.pdf" },
        { id: 3, title: "English Essay", subject: "English", dueDate: "2023-10-18", status: "Graded", pdfUrl: "assignments/sample.pdf" }
    ],
    quizzes: [
        { id: 1, title: "Mathematics Quiz 1", subject: "Mathematics", questions: 10, timeLimit: 15, status: "Not Started" },
        { id: 2, title: "Science Quiz 1", subject: "Science", questions: 8, timeLimit: 10, status: "Completed" },
        { id: 3, title: "General Knowledge", subject: "General", questions: 5, timeLimit: 5, status: "Not Started" }
    ],
    messages: [
        { studentName: "Priya Patel", message: "I'm having trouble understanding photosynthesis. Can you suggest some extra resources?", timestamp: "2023-10-25T14:30:00Z" }
    ],
    students: [
        { id: 1, name: "Rahul Sharma", class: "8th", attendance: "85%", performance: "78%" },
        { id: 2, name: "Priya Patel", class: "8th", attendance: "92%", performance: "88%" },
        { id: 3, name: "Amit Kumar", class: "8th", attendance: "76%", performance: "72%" },
        { id: 4, name: "Sneha Singh", class: "8th", attendance: "95%", performance: "92%" }
    ]
};

// Function to get data from sessionStorage or use initial data
function getAppData() {
    const storedData = sessionStorage.getItem('vidyanhubData');
    if (storedData) {
        return JSON.parse(storedData);
    }
    // First time load, store initial data in sessionStorage
    sessionStorage.setItem('vidyanhubData', JSON.stringify(initialSampleData));
    return initialSampleData;
}

// Load data and make it available globally
window.sampleData = getAppData();

// Current user state
let currentUser = null;

window.updateAppData = function(newData) {
    window.sampleData = newData;
    sessionStorage.setItem('vidyanhubData', JSON.stringify(newData));
};

// Initialize the application
function init() {
    // DOM elements for the login page
    const userTypeButtons = document.querySelectorAll('.user-type-btn');
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return; // Exit if not on the login page

    // User type selection
    userTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            userTypeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const selectedRole = document.querySelector('.user-type-btn.active').dataset.role;
        
        login(username, password, selectedRole);
    });
}

// Login function
function login(username, password, role) {
    // Simple authentication - in a real app, this would connect to a backend
    // In a real app, you would store a session token, e.g., in sessionStorage
    
    // Redirect to appropriate dashboard
    if (role === 'student') {
        window.location.href = 'student.html';
    } else if (role === 'teacher') {
        window.location.href = 'teacher.html';
    } else if (role === 'admin') {
        window.location.href = 'admin.html';
    }
}

// Logout function
function logout() {
    window.location.href = 'index.html';
}

// Setup sidebar menus for dashboard pages
function setupSidebarMenus() {
    const sidebarMenus = document.querySelectorAll('.sidebar-menu li');
    sidebarMenus.forEach(item => {
        item.addEventListener('click', function() {
            const tab = this.dataset.tab;
            const dashboard = this.closest('.dashboard');
            
            // Update active menu item
            const menuItems = dashboard.querySelectorAll('.sidebar-menu li');
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Load appropriate content
            if (dashboard.id === 'studentDashboard') {
                loadStudentTab(tab);
            } else if (dashboard.id === 'teacherDashboard') {
                loadTeacherTab(tab);
            } else if (dashboard.id === 'adminDashboard') {
                loadAdminTab(tab);
            }
        });
    });
}
window.setupSidebarMenus = setupSidebarMenus; // Make function available to other scripts

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // This ensures login page logic runs only on the login page,
    // and doesn't conflict with other scripts on dashboard pages.
    if (document.getElementById('loginForm')) {
        init();
    }
});