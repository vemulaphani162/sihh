// This script assumes that `auth.js` is loaded first,
// which provides the `sampleData` object.

// Load admin dashboard
function loadAdminDashboard() {
    loadAdminTab('dashboard');
    window.setupSidebarMenus();
}

// Load admin tab content
function loadAdminTab(tab) {
    const contentDiv = document.getElementById('adminDashboardContent');
    const sampleData = window.sampleData;

    switch(tab) {
        case 'dashboard':
            contentDiv.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Admin Dashboard</h2>
                    </div>
                    <p>Manage users, view reports, and configure system settings.</p>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">System Overview</h2>
                    </div>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 200px; text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                            <h3>152</h3>
                            <p>Total Students</p>
                        </div>
                        <div style="flex: 1; min-width: 200px; text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                            <h3>12</h3>
                            <p>Teachers</p>
                        </div>
                        <div style="flex: 1; min-width: 200px; text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                            <h3>42</h3>
                            <p>Videos</p>
                        </div>
                        <div style="flex: 1; min-width: 200px; text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                            <h3>86%</h3>
                            <p>Active Users</p>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'users':
            contentDiv.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Manage Users</h2>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                        <input type="text" class="form-control" placeholder="Search users..." style="width: 300px;">
                        <button class="btn btn-primary">Add New User</button>
                    </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Rahul Sharma</td>
                                <td>rahul@school.com</td>
                                <td>Student</td>
                                <td><span class="badge badge-success">Active</span></td>
                                <td>
                                    <button class="btn btn-primary">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Priya Patel</td>
                                <td>priya@school.com</td>
                                <td>Student</td>
                                <td><span class="badge badge-success">Active</span></td>
                                <td>
                                    <button class="btn btn-primary">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Mr. Kumar</td>
                                <td>kumar@school.com</td>
                                <td>Teacher</td>
                                <td><span class="badge badge-success">Active</span></td>
                                <td>
                                    <button class="btn btn-primary">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Ms. Desai</td>
                                <td>desai@school.com</td>
                                <td>Teacher</td>
                                <td><span class="badge badge-warning">Inactive</span></td>
                                <td>
                                    <button class="btn btn-primary">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
            break;
    }
}
window.loadAdminTab = loadAdminTab;
document.addEventListener('DOMContentLoaded', () => {
    loadAdminDashboard();
});
