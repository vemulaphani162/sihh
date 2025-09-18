// This script assumes that `auth.js` is loaded first,
// which provides the `sampleData` object.

// Load student dashboard
function loadStudentDashboard() {
    loadStudentTab('dashboard');
    window.setupSidebarMenus();
}

// Load student tab content
function loadStudentTab(tab) {
    const contentDiv = document.getElementById('studentDashboardContent');
    const sampleData = window.sampleData;
    
    if (tab === 'quizzes') {
        window.location.href = 'quiz.html';
        return;
    }
    
    
    switch(tab) {
        case 'dashboard':
            contentDiv.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Welcome to Vidyanhub</h2>
                    </div>
                    <p>Access your learning materials, assignments, and track your progress.</p>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Recent Activities</h2>
                    </div>
                    <div class="content-grid">
                        <div class="content-item">
                            <div class="content-thumbnail">Video</div>
                            <div class="content-details">
                                <div class="content-title">Mathematics - Algebra Basics</div>
                                <div class="content-meta">Watched 2 days ago</div>
                            </div>
                        </div>
                        <div class="content-item">
                            <div class="content-thumbnail">Assignment</div>
                            <div class="content-details">
                                <div class="content-title">Science Project</div>
                                <div class="content-meta">Submitted • Graded: 85%</div>
                            </div>
                        </div>
                        <div class="content-item">
                            <div class="content-thumbnail">Quiz</div>
                            <div class="content-details">
                                <div class="content-title">Science Quiz 1</div>
                                <div class="content-meta">Completed • Score: 7/8</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Ask a Teacher</h2>
                    </div>
                    <p>Have a doubt? Send a message directly to your teacher.</p>
                    <textarea id="studentMessage" class="form-control" rows="4" placeholder="Type your question here..."></textarea>
                    <button id="sendMessageBtn" class="btn btn-primary" style="margin-top: 15px; width: auto;">Send Message</button>
                </div>
            `;
            break;
            
        case 'videos':
            contentDiv.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Video Lectures</h2>
                    </div>
                    <div class="content-grid">
                        ${sampleData.videos.map(video => `
                            <div class="content-item">
                                <div class="content-thumbnail">Video Preview</div>
                                <div class="content-details">
                                    <div class="content-title">${video.title}</div>
                                    <div class="content-meta">${video.subject} • ${video.duration}</div>
                                    <button class="btn btn-primary watch-video-btn" data-video-url="${video.videoUrl}" data-video-title="${video.title}" style="margin-top: 10px; width: 100%;">Watch Video</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;
            
        case 'notes':
            contentDiv.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Study Notes</h2>
                    </div>
                    <div class="content-grid">
                        ${sampleData.notes.map(note => `
                            <div class="content-item">
                                <div class="content-thumbnail">PDF Document</div>
                                <div class="content-details">
                                    <div class="content-title">${note.title}</div>
                                    <div class="content-meta">${note.subject} • ${note.pages} pages</div>
                                    <button class="btn btn-primary view-note-btn" data-pdf-url="${note.pdfUrl}" data-pdf-title="${note.title}" style="margin-top: 10px; width: 100%;">View Notes</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;
            
        case 'assignments':
            contentDiv.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Assignments</h2>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Subject</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sampleData.assignments.map(assignment => `
                                <tr>
                                    <td>${assignment.title}</td>
                                    <td>${assignment.subject}</td>
                                    <td>${assignment.dueDate}</td>
                                    <td>
                                        <span class="badge ${assignment.status === 'Pending' ? 'badge-warning' : 
                                                              assignment.status === 'Submitted' ? 'badge-success' : 
                                                              'badge-primary'}">
                                            ${assignment.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button class="btn btn-primary view-assignment-btn" data-pdf-url="${assignment.pdfUrl}" data-pdf-title="${assignment.title}">View</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;
            
        case 'progress':
            contentDiv.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">My Progress</h2>
                    </div>
                    <div class="chart-container-grid">
                        <div class="doughnut-chart-container">
                            <h3>Overall Attendance</h3>
                            <canvas id="attendanceChart"></canvas>
                        </div>
                        <div class="doughnut-chart-container">
                            <h3>Assignment Completion</h3>
                            <canvas id="assignmentChart"></canvas>
                        </div>
                    </div>
                    
                    <div style="margin-top: 40px;">
                        <h3 style="text-align: center; margin-bottom: 20px; color: var(--primary);">Subject-wise Performance</h3>
                        <div class="bar-chart-container">
                            <canvas id="subjectPerformanceChart"></canvas>
                        </div>
                    </div>
                </div>
            `;
            renderProgressCharts();
            break;
    }
}
window.loadStudentTab = loadStudentTab;

function renderProgressCharts() {
    // Attendance Chart
    const attendanceCtx = document.getElementById('attendanceChart')?.getContext('2d');
    if (attendanceCtx) {
        new Chart(attendanceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Attended', 'Missed'],
                datasets: [{
                    label: 'Attendance',
                    data: [87, 13], // Using hardcoded values
                    backgroundColor: ['#2ecc71', '#e9ecef'],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ${context.raw}%`
                        }
                    }
                }
            }
        });
    }

    // Assignment Chart
    const assignmentCtx = document.getElementById('assignmentChart')?.getContext('2d');
    if (assignmentCtx) {
        new Chart(assignmentCtx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Pending'],
                datasets: [{
                    label: 'Assignments',
                    data: [75, 25], // Using hardcoded values
                    backgroundColor: ['#00A8E8', '#e9ecef'],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ${context.raw}%`
                        }
                    }
                }
            }
        });
    }

    // Subject Performance Chart
    const subjectCtx = document.getElementById('subjectPerformanceChart')?.getContext('2d');
    if (subjectCtx) {
        new Chart(subjectCtx, {
            type: 'bar',
            data: {
                labels: ['Mathematics', 'Science', 'English', 'History'],
                datasets: [{
                    label: 'Average Score',
                    data: [82, 78, 85, 75], // Using hardcoded values
                    backgroundColor: [
                        '#00A8E8',
                        '#2ecc71',
                        '#F9C80E',
                        '#FF5733'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y', // Horizontal bar chart
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.raw}%`
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%'
                            }
                        }
                    }
                }
            }
        });
    }
}

function setupVideoPlayer() {
    const modal = document.getElementById('videoModal');
    if (!modal) return; // Only run if modal exists on the page

    const videoPlayer = document.getElementById('videoPlayer');
    const modalTitle = document.getElementById('videoModalTitle');
    const closeBtn = modal.querySelector('.close-btn');

    // Function to close the modal
    function closeModal() {
        modal.style.display = "none";
        videoPlayer.pause();
        videoPlayer.src = ""; // Clear src to stop background loading
    }

    // Close modal events
    closeBtn.onclick = closeModal;
}

function setupPdfViewer() {
    const modal = document.getElementById('pdfModal');
    if (!modal) return;

    const pdfViewer = document.getElementById('pdfViewer');
    const closeBtn = modal.querySelector('.close-btn');

    // Function to close the modal
    function closeModal() {
        modal.style.display = "none";
        pdfViewer.src = ""; // Clear src to stop background loading
    }

    // Close modal events
    closeBtn.onclick = closeModal;
}

function handleSendMessage() {
    const messageText = document.getElementById('studentMessage').value;
    if (!messageText.trim()) {
        alert('Please type a message before sending.');
        return;
    }

    const newData = JSON.parse(JSON.stringify(window.sampleData));
    newData.messages.push({
        // In a real app, you'd get the logged-in student's name
        studentName: "Phani kumar", 
        message: messageText,
        timestamp: new Date().toISOString()
    });

    window.updateAppData(newData);
    alert('Your message has been sent to the teacher!');
    document.getElementById('studentMessage').value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    loadStudentDashboard();
    setupVideoPlayer();
    setupPdfViewer();

    // Central event listener for dynamic content
    document.getElementById('studentDashboardContent').addEventListener('click', function(event) {
        // Handle Send Message
        if (event.target && event.target.id === 'sendMessageBtn') {
            handleSendMessage();
        }

        // Handle Watch Video
        const videoButton = event.target.closest('.watch-video-btn');
        if (videoButton) {
            const videoUrl = videoButton.dataset.videoUrl;
            const videoTitle = videoButton.dataset.videoTitle;
            const videoModal = document.getElementById('videoModal');
            videoModal.querySelector('#videoModalTitle').textContent = videoTitle;
            videoModal.querySelector('#videoPlayer').src = videoUrl;
            videoModal.style.display = 'block';
            videoModal.querySelector('#videoPlayer').play();
        }

        // Handle View Assignment
        const assignmentButton = event.target.closest('.view-assignment-btn');
        if (assignmentButton) {
            const pdfUrl = assignmentButton.dataset.pdfUrl;
            const pdfTitle = assignmentButton.dataset.pdfTitle;
            const pdfModal = document.getElementById('pdfModal');
            pdfModal.querySelector('#pdfModalTitle').textContent = pdfTitle;
            pdfModal.querySelector('#pdfViewer').src = pdfUrl;
            pdfModal.style.display = 'block';
        }

        // Handle View Notes
        const noteButton = event.target.closest('.view-note-btn');
        if (noteButton) {
            const pdfUrl = noteButton.dataset.pdfUrl;
            const pdfTitle = noteButton.dataset.pdfTitle;
            const pdfModal = document.getElementById('pdfModal');
            pdfModal.querySelector('#pdfModalTitle').textContent = pdfTitle;
            pdfModal.querySelector('#pdfViewer').src = pdfUrl;
            pdfModal.style.display = 'block';
        }
    });

    // Generic modal closing when clicking outside the content
    window.addEventListener('click', (event) => {
        const videoModal = document.getElementById('videoModal');
        const pdfModal = document.getElementById('pdfModal');
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
            videoModal.querySelector('video').pause();
        }
        if (event.target === pdfModal) {
            pdfModal.style.display = 'none';
            pdfModal.querySelector('iframe').src = '';
        }
    });
});
