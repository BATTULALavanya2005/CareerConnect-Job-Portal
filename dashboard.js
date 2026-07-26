// Check if user is logged in
const loggedIn = localStorage.getItem("loggedIn");

if (loggedIn !== "true") {
    window.location.href = "login.html";
}

// Get user data
const user = JSON.parse(localStorage.getItem("user"));

// Show welcome message only if the element exists
if (user) {

    const welcomeText =
        document.getElementById("welcomeText");

    if (welcomeText) {
        welcomeText.innerText =
            "Welcome, " + user.name;
    }

}

// Logout function
function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";
}

// Apply Job Function
function applyJob(jobTitle) {

    let applications =
        JSON.parse(
            localStorage.getItem("applications")
        ) || [];

    // Prevent duplicate applications
    const alreadyApplied =
        applications.some(
            app => app.title === jobTitle
        );

    if (alreadyApplied) {

        alert(
            "You have already applied for this job."
        );

        return;
    }

    applications.push({
        title: jobTitle,
        status: "Applied",
        appliedDate:
            new Date().toLocaleDateString()
    });

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );

    alert(
        jobTitle +
        " application submitted successfully!"
    );

}

function filterJobs(category){

    document.getElementById("jobsContainer").style.display = "grid";

    let jobs =
        document.getElementsByClassName("job-card");

    for(let i = 0; i < jobs.length; i++){

        if(
            jobs[i].classList.contains(category)
        ){

            jobs[i].style.display = "block";

        }
        else{

            jobs[i].style.display = "none";

        }

    }

}
const searchInput =
    document.getElementById("searchJob");

if(searchInput){
    console.log(searchInput.value);
}
function searchJobs() {

    const searchText = document
        .getElementById("searchJob")
        .value
        .toLowerCase()
        .trim();

    const jobsContainer = document.getElementById("jobsContainer");
    jobsContainer.style.display = "block";

    const cards = document.querySelectorAll("#jobsContainer .card");

    let found = false;

    cards.forEach(card => {

        const text = card.innerText.toLowerCase();

        if (text.includes(searchText)) {
            card.style.display = "block";
            found = true;
        } else {
            card.style.display = "none";
        }

    });

    if (!found) {
        jobsContainer.innerHTML =
        `
        <h2 style="margin-top:40px;">Search Result</h2>

        <div class="card" style="text-align:center;padding:40px;">
            <h3>No jobs found 😔</h3>
            <p>Try searching with another keyword.</p>
        </div>
        `;
    }

}


function showAllJobs(){

    document.getElementById("jobsContainer").style.display = "grid";

    let jobs =
        document.getElementsByClassName("job-card");

    for(let i = 0; i < jobs.length; i++){

        jobs[i].style.display = "block";

    }

}
function goToJobs(){

    const searchText =
        document.getElementById("searchJob").value;

    localStorage.setItem(
        "jobSearch",
        searchText
    );

    window.location.href =
        "jobs.html";
}

function updateApplicationsCount(){

    const applications =
        JSON.parse(localStorage.getItem("applications")) || [];

    const dashboardApplications =
        document.getElementById("dashboardApplications");

    if(dashboardApplications){

        dashboardApplications.innerText =
            applications.length;

    }

}

window.onload = function(){

    updateApplicationsCount();
    updateSavedJobsCount();
    loadSavedJobs();
    updateProfileCompletion();

    const applications =
        JSON.parse(
            localStorage.getItem("applications")
        ) || [];

    const total =
        applications.length;

    const ctx1 =
        document.getElementById("applicationsChart");

    if(ctx1){

        new Chart(ctx1,{
            type:"line",
            data:{
                labels:[
                    "Week 1",
                    "Week 2",
                    "Week 3",
                    "Week 4"
                ],
                datasets:[{
                    label:"Applications",
                    data:[
                        total * 0.25,
                        total * 0.5,
                        total * 0.75,
                        total
                    ],
                    borderColor:"#2563eb",
                    backgroundColor:"rgba(37,99,235,0.2)",
                    fill:true,
                    tension:0.4
                }]
            }
        });

    }

    const ctx2 =
        document.getElementById("statusChart");

    if(ctx2){

        new Chart(ctx2,{
            type:"doughnut",
            data:{
                labels:[
                    "Applied",
                    "Under Review",
                    "Shortlisted",
                    "Rejected"
                ],
                datasets:[{
                    data:[
                        total,
                        Math.floor(total*0.3),
                        Math.floor(total*0.2),
                        Math.floor(total*0.1)
                    ],
                    backgroundColor:[
                        "#2563eb",
                        "#3b82f6",
                        "#60a5fa",
                        "#93c5fd"
                    ]
                }]
            }
        });

    }

};
function updateSavedJobsCount(){

    const savedJobs =
        JSON.parse(
            localStorage.getItem("savedJobs")
        ) || [];

    const count =
        document.getElementById(
            "savedJobsCount"
        );

    if(count){

        count.innerText =
            savedJobs.length;

    }

}
function saveJob(jobTitle){

    let savedJobs =
        JSON.parse(
            localStorage.getItem("savedJobs")
        ) || [];

    if(savedJobs.includes(jobTitle)){
        alert("Job already saved!");
        return;
    }

    savedJobs.push(jobTitle);

    localStorage.setItem(
        "savedJobs",
        JSON.stringify(savedJobs)
    );

    alert(jobTitle + " saved successfully!");

    updateSavedJobsCount(); // ADD THIS
}
function loadSavedJobs(){

    const savedJobs =
        JSON.parse(
            localStorage.getItem("savedJobs")
        ) || [];

    const container =
        document.getElementById(
            "savedJobsContainer"
        );

    if(!container) return;

    if(savedJobs.length === 0){

        container.innerHTML = `
            <div class="card">
                <h3>No Saved Jobs Yet</h3>
                <p>Save job from the Jobs page.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = "";

    savedJobs.forEach(job => {

        container.innerHTML += `
            <div class="card">
                <h3>${job}</h3>

                <button class="apply-btn"
                    onclick="applyJob('${job}')">
                    Apply Now
                </button>

                <button class="save-btn-job"
                    onclick="removeSavedJob('${job}')">
                    Remove
                </button>

            </div>
        `;

    });

}
function removeSavedJob(jobTitle){

    let savedJobs =
        JSON.parse(
            localStorage.getItem("savedJobs")
        ) || [];

    savedJobs =
        savedJobs.filter(
            job => job !== jobTitle
        );

    localStorage.setItem(
        "savedJobs",
        JSON.stringify(savedJobs)
    );

    loadSavedJobs();
    updateSavedJobsCount();

}
function removeApplication(jobTitle){

    let applications =
        JSON.parse(
            localStorage.getItem("applications")
        ) || [];

    applications = applications.filter(
        app => app.title !== jobTitle
    );

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );

    loadApplications();
}

function loadApplications(){

    const applications =
        JSON.parse(
            localStorage.getItem("applications")
        ) || [];

    const container =
        document.getElementById("applicationsList");

    container.innerHTML = "";

    if(applications.length === 0){

        container.innerHTML = `
            <div class="card">
                <h3>No Applications Yet</h3>
                <p>Apply for a job from the Jobs page.</p>
            </div>
        `;

        return;
    }

    applications.forEach(app => {

        container.innerHTML += `
            <div class="card">
                <h3>${app.title}</h3>

                <p>
                    <strong>Status:</strong>
                    ${app.status}
                </p>

                <p>
                    <strong>Applied Date:</strong>
                    ${app.appliedDate}
                </p>

                <button
                    class="remove-btn"
                    onclick="removeApplication('${app.title}')">
                    Remove Application
                </button>
            </div>
        `;
    });
}

function updateProfileCompletion(){

    const user =
        JSON.parse(
            localStorage.getItem("user")
        ) || {};

    let completed = 0;
    let total = 4;

    if(user.name) completed++;
    if(user.email) completed++;
    if(user.phone) completed++;
    if(user.bio) completed++;

    const percentage =
        Math.round(
            (completed / total) * 100
        );

    const text =
        document.getElementById(
            "profileCompletion"
        );

    const fill =
        document.getElementById(
            "progressFill"
        );

    if(text){
        text.innerText =
            percentage + "%";
    }

    if(fill){
        fill.style.width =
            percentage + "%";
    }

}