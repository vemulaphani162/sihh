// This script assumes that `auth.js` is loaded first,
// which provides the `sampleData` object.

// Load teacher dashboard
function loadTeacherDashboard() {
    loadTeacherTab('dashboard');
    window.setupSidebarMenus();
    updateMessageCount();
}

function updateMessageCount() {
    const messageTab = document.querySelector('.sidebar-menu li[data-tab="messages"]');
    if (messageTab && window.sampleData.messages.length > 0) {
        const messageCount = window.sampleData.messages.length;
        if (!messageTab.querySelector('.badge')) {
            messageTab.innerHTML += ` <span class="badge badge-danger">${messageCount}</span>`;
        } else {
            messageTab.querySelector('.badge').textContent = messageCount;
        }
    }
}

// Load teacher tab content
function loadTeacherTab(tab) {
    const contentDiv = document.getElementById('teacherDashboardContent');
    const sampleData = window.sampleData;

    switch(tab) {
        case 'dashboard':
            contentDiv.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Teacher Dashboard</h2>
                    </div>
                    <p>Manage your classes, upload content, and track student progress.</p>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Quick Stats</h2>
                    </div>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 200px; text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                            <h3>24</h3>
                            <p>Students</p>
                        </div>
                        <div style="flex: 1; min-width: 200px; text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                            <h3>8</h3>
                            <p>Videos Uploaded</p>
                        </div>
                        <div style="flex: 1; min-width: 200px; text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                            <h3>12</h3>
                            <p>Assignments</p>
                        </div>
                        <div style="flex: 1; min-width: 200px; text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                            <h3>92%</h3>
                            <p>Average Attendance</p>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Recent Messages</h2>
                        <a href="#" onclick="document.querySelector('[data-tab=messages]').click(); return false;">View All</a>
                    </div>
                    ${sampleData.messages.length === 0 ? '<p>You have no new messages.</p>' : `
                        <div class="message-list">
                            ${sampleData.messages.slice(-3).reverse().map(msg => `
                                <div class="message-item">
                                    <div class="message-header">
                                        <strong>From:</strong> ${msg.studentName}
                                        <span class="message-time">${new Date(msg.timestamp).toLocaleString()}</span>
                                    </div>
                                    <p class="message-body">${msg.message}</p>
                                </div>
                            `).join('')}
                        </div>
                    `}
                </div>
            `;
            break;
            
        case 'upload':
            contentDiv.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Upload Content</h2>
                    </div>
                    <form id="uploadForm">
                        <div class="form-row">
                            <div class="form-col">
                                <label for="contentType">Content Type</label>
                                <select id="contentType" class="form-control">
                                    <option>Video Lecture</option>
                                    <option>Study Notes</option>
                                    <option>Assignment</option>
                                    <option>Quiz</option>
                                </select>
                            </div>
                            <div class="form-col">
                                <label for="subject">Subject</label>
                                <select id="subject" class="form-control">
                                    <option>Mathematics</option>
                                    <option>Science</option>
                                    <option>English</option>
                                    <option>History</option>
                                    <option>Geography</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col">
                                <label for="title">Title</label>
                                <input type="text" id="title" class="form-control" placeholder="Enter title" required>
                            </div>
                            <div class="form-col">
                                <label for="description">Description</label>
                                <textarea id="description" class="form-control" placeholder="Enter description" rows="3"></textarea>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col">
                                <label for="fileUpload">Upload File</label>
                                <input type="file" id="fileUpload" class="form-control">
                            </div>
                        </div>
                        
                        <button type="button" id="uploadContentBtn" class="btn btn-primary" style="margin-top: 20px;">Upload Content</button>
                    </form>
                </div>
            `;
            break;
            
        case 'manage':
            contentDiv.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Manage Content</h2>
                    </div>
                    
                    <h3>Video Lectures</h3>
                    <table class="table">
                        <thead><tr><th>Title</th><th>Subject</th><th>Upload Date</th><th>Action</th></tr></thead>
                        <tbody>
                            ${sampleData.videos.map(video => `
                                <tr>
                                    <td>${video.title}</td>
                                    <td>${video.subject}</td>
                                    <td>${video.uploadDate}</td>
                                    <td><button class="btn btn-danger btn-sm">Delete</button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <h3 style="margin-top: 30px;">Study Notes</h3>
                    <table class="table">
                        <thead><tr><th>Title</th><th>Subject</th><th>Upload Date</th><th>Action</th></tr></thead>
                        <tbody>
                            ${sampleData.notes.map(note => `
                                <tr>
                                    <td>${note.title}</td>
                                    <td>${note.subject}</td>
                                    <td>${note.uploadDate}</td>
                                    <td><button class="btn btn-danger btn-sm">Delete</button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <h3 style="margin-top: 30px;">Assignments</h3>
                    <table class="table">
                        <thead><tr><th>Title</th><th>Subject</th><th>Due Date</th><th>Action</th></tr></thead>
                        <tbody>
                            ${sampleData.assignments.map(assignment => `
                                <tr>
                                    <td>${assignment.title}</td>
                                    <td>${assignment.subject}</td>
                                    <td>${assignment.dueDate}</td>
                                    <td><button class="btn btn-danger btn-sm">Delete</button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;
        
        case 'messages':
            contentDiv.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Student Messages</h2>
                    </div>
                    ${sampleData.messages.length === 0 ? '<p>You have no new messages.</p>' : `
                        <div class="message-list">
                            ${sampleData.messages.map(msg => `
                                <div class="message-item">
                                    <div class="message-header">
                                        <strong>From:</strong> ${msg.studentName}
                                        <span class="message-time">${new Date(msg.timestamp).toLocaleString()}</span>
                                    </div>
                                    <p class="message-body">${msg.message}</p>
                                </div>
                            `).reverse().join('')}
                        </div>
                    `}
                </div>
            `;
            break;
            
        case 'students':
            contentDiv.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Student Progress</h2>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Class</th>
                                <th>Attendance</th>
                                <th>Performance</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sampleData.students.map(student => `
                                <tr>
                                    <td>${student.name}</td>
                                    <td>${student.class}</td>
                                    <td>
                                        <div class="progress">
                                            <div class="progress-bar" style="width: ${student.attendance}"></div>
                                        </div>
                                        <small>${student.attendance}</small>
                                    </td>
                                    <td>
                                        <div class="progress">
                                            <div class="progress-bar" style="width: ${student.performance}"></div>
                                        </div>
                                        <small>${student.performance}</small>
                                    </td>
                                    <td>
                                        <button class="btn btn-primary">View Details</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;
    }
}
window.loadTeacherTab = loadTeacherTab;

function handleContentUpload() {
    const contentType = document.getElementById('contentType').value;
    const subject = document.getElementById('subject').value;
    const title = document.getElementById('title').value;
    const fileInput = document.getElementById('fileUpload');

    if (!title.trim()) {
        alert('Please enter a title.');
        return;
    }

    const newData = JSON.parse(JSON.stringify(window.sampleData)); // Deep copy
    const newId = Date.now(); // Simple unique ID
    const uploadDate = new Date().toISOString().split('T')[0];

    switch (contentType) {
        case 'Video Lecture':
            newData.videos.push({
                id: newId,
                title: title,
                subject: subject,
                duration: "10:00", // Placeholder
                uploadDate: uploadDate,
                videoUrl: "videos/phani.mp4" // Placeholder for uploaded videos
            });
            break;
        case 'Study Notes':
            newData.notes.push({
                id: newId,
                title: title,
                subject: subject,
                pages: 5, // Placeholder
                uploadDate: uploadDate
            });
            break;
        case 'Assignment':
            newData.assignments.push({
                id: newId,
                title: title,
                subject: subject,
                dueDate: "2024-01-15", // Placeholder
                status: "Pending",
                pdfUrl: "assignments/sample.pdf" // Placeholder for uploaded assignments
            });
            break;
    }

    window.updateAppData(newData);
    alert(`"${title}" has been uploaded successfully! Students can now see it.`);
    document.getElementById('uploadForm').reset();
}

document.addEventListener('DOMContentLoaded', () => {
    loadTeacherDashboard();

    // Use event delegation for the dynamic upload button
    document.getElementById('teacherDashboardContent').addEventListener('click', (event) => {
        if (event.target && event.target.id === 'uploadContentBtn') {
            handleContentUpload();
        }
    });
});
