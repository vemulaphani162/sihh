// This script assumes that `auth.js` is loaded first,
// which provides the `sampleData` object.

function loadQuizPage() {
    const contentDiv = document.getElementById('quizPageContent');
    if (!contentDiv) return;

    const sampleData = window.sampleData;

    contentDiv.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Quizzes</h2>
            </div>
            <div class="content-grid">
                ${sampleData.quizzes.map(quiz => `
                    <div class="content-item">
                        <div class="content-thumbnail">Quiz</div>
                        <div class="content-details">
                            <div class="content-title">${quiz.title}</div>
                            <div class="content-meta">${quiz.subject} • ${quiz.questions} questions • ${quiz.timeLimit} mins</div>
                            <div class="content-meta">Status: <strong>${quiz.status}</strong></div>
                            <button class="btn btn-primary" style="margin-top: 10px; width: 100%;">
                                ${quiz.status === 'Completed' ? 'View Results' : 'Start Quiz'}
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', loadQuizPage);