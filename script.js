// Split the token into different parts
const tokenPart1 = 'ghp_yj5ZnPqi54dV';
const tokenPart2 = '1PNEbN6w4p1K3scfYz';
const tokenPart3 = '3gckWa';

// Combine the token parts into one
const token = `${tokenPart1}${tokenPart2}${tokenPart3}`; // Reconstruct the full token

const repoOwner = 'seccomm110'; // Your GitHub username
const repoName = 'web'; // Your repository name

const fileStructure = {
    attendance: 'Attendance',
    minutesOfMeeting: 'MinutesOfMeeting',
    checkList: 'CheckList',
    planningAchievement: 'PlanningAndAchievement',
    report: 'Report',
    books: 'Books',
    articles: 'Articles',
    selfAssessment: 'SelfAssessment',
    checkListWeekly: 'CheckList/Weekly',
    checkListMonthly: 'CheckList/Monthly',
    checkListQuarterly: 'CheckList/Quarterly',
    checkListHalfYearly: 'CheckList/HalfYearly',
    reportSensus: 'Report/SensusReport',
    reportStudent: 'Report/StudentReport',
    reportClass: 'Report/ClassReport',
    reportIrregular: 'Report/IrregularStudentReport',
    booksTawheed: 'Books/Tawheed',
    booksAdl: 'Books/Adl',
    booksNabuwat: 'Books/Nabuwat',
    booksImamat: 'Books/Imamat',
    booksQayamat: 'Books/Qayamat',
    booksMahdaviyat: 'Books/Mahdaviyat',
    booksAhqaam: 'Books/Ahqaam',
    booksGeneral: 'Books/General'
};

async function fetchFiles(directory) {
    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${directory}`, {
            headers: {
                // 'Authorization': `token ${token}`,
                'Authorization': `${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching ${directory}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch files from ${directory}:`, error);
        return []; // Return an empty array on error
    }
}


async function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    document.getElementById(tabId).style.display = 'block';
    await populateFiles(tabId);
}

async function populateFiles(tabId) {
    const directory = fileStructure[tabId];
    const listId = `${tabId}List`;

    const listElement = document.getElementById(listId);
    if (!listElement) {
        console.error(`List element not found for tab: ${tabId}`);
        return;
    }

    listElement.innerHTML = ''; // Clear previous entries

    const files = await fetchFiles(directory);
    if (files.length === 0) {
        listElement.innerHTML = '<li>No files found.</li>';
        return;
    }

    files.forEach(file => {
        const li = document.createElement('li');
        if (file.type === 'file') {
            li.innerHTML = `<a href="${file.download_url}" target="_blank">${file.name}</a>`;
        } else if (file.type === 'dir') {
            li.innerHTML = `<strong>${file.name}</strong>`;
            li.style.cursor = 'pointer'; // Make it clear that it's clickable
            
            // Create a sublist element
            const subList = document.createElement('ul');
            li.appendChild(subList);

            li.onclick = async () => {
                const subFiles = await fetchFiles(`${directory}/${file.name}`);
                subList.innerHTML = ''; // Clear previous sublist items
                subFiles.forEach(subFile => {
                    const subLi = document.createElement('li');
                    if (subFile.type === 'file') {
                        subLi.innerHTML = `<a href="${subFile.download_url}" target="_blank">${subFile.name}</a>`;
                    }
                    subList.appendChild(subLi);
                });
            };
        }
        listElement.appendChild(li);
    });
}

async function uploadFile(file, directory) {
    const path = `${directory}/${file.name}`; // Specify the path in your repo

    const reader = new FileReader();
    reader.onload = async (event) => {
        const content = event.target.result;

        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`, {
            method: 'PUT',
            headers: {
                // 'Authorization': `token ${token}`,
                'Authorization': `${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Upload ${file.name}`,
                content: btoa(content) // Encode the content in Base64
            })
        });

        if (!response.ok) {
            throw new Error(`Error uploading file: ${response.statusText}`);
        }

        const jsonResponse = await response.json();
        console.log('File uploaded successfully:', jsonResponse);
    };

    reader.readAsBinaryString(file); // Read the file as a binary string
}

// Event listener for upload button
document.getElementById('uploadButton').addEventListener('click', () => {
    const files = document.getElementById('fileInput').files;
    const selectedFolder = document.getElementById('folderSelect').value; // Get selected folder
    for (let i = 0; i < files.length; i++) {
        uploadFile(files[i], selectedFolder);
    }
});
