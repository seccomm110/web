// Example of fetching files from GitHub repo
const repoUrl = 'https://api.github.com/repos/seccomm110/web/contents/';

async function fetchFiles(folder, elementId) {
    const response = await fetch(`${repoUrl}${folder}`);
    const files = await response.json();

    const fileList = document.getElementById(elementId);
    if (Array.isArray(files)) {
        files.forEach(file => {
            if (file.download_url) {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = file.download_url;
                link.textContent = file.name;
                listItem.appendChild(link);
                fileList.appendChild(listItem);
            }
        });
    }
}

// Fetch files for each section
fetchFiles('Attendance', 'attendance-files');
fetchFiles('MinutesOfMeeting', 'mom-files');
fetchFiles('CheckList/Weekly', 'weekly-files');
fetchFiles('CheckList/Monthly', 'monthly-files');
fetchFiles('CheckList/Quarterly', 'quarterly-files');
fetchFiles('CheckList/HalfYearly', 'half-yearly-files');
fetchFiles('PlanningAndAchievement', 'planning-files');
fetchFiles('Report/SensusReport', 'sensus-report-files');
fetchFiles('Report/StudentReport', 'student-report-files');
fetchFiles('Report/ClassReport', 'class-report-files');
fetchFiles('Report/IrregularStudentReport', 'irregular-student-report-files');
fetchFiles('Books/Tawheed', 'tawheed-files');
fetchFiles('Books/Adl', 'adl-files');
fetchFiles('Books/Nabuwat', 'nabuwat-files');
fetchFiles('Books/Imamat', 'imamat-files');
fetchFiles('Books/Qayamat', 'qayamat-files');
fetchFiles('Books/Mahdaviyat', 'mahdaviyat-files');
fetchFiles('Books/Ahqaam', 'ahqaam-files');
fetchFiles('Books/General', 'general-files');
fetchFiles('Articles', 'articles-files');
fetchFiles('SelfAssessment', 'self-assessment-files');
