// Yoga Variables and Functions
let currentPoseIndex = 0; // Track the current yoga pose index
let timerInterval; // Store the timer interval
let isPaused = false; // Track if the timer is paused
let remainingTime = 0; // Track remaining time when paused

// Array of yoga poses with their details
const yogaPoses = [
    { name: "Pranamasana", image: "images/pranamasana.jpeg", duration: 15 },
    { name: "Hasta Uttanasana", image: "images/hasta_uttanasana.jpeg", duration: 15 },
    { name: "Hasta Padasana", image: "images/hasta_padasana.jpeg", duration: 15 },
    { name: "Ashwa Sanchalanasana", image: "images/ashwa_sanchalanasana.jpeg", duration: 15 },
    { name: "Dandasana", image: "images/dandasana.jpeg", duration: 15 },
    { name: "Bhujangasana", image: "images/bhujangasana.jpeg", duration: 15 },
    { name: "Adho Mukha Svanasana", image: "images/adho_mukha_svanasana.jpeg", duration: 15 },
    { name: "Tadasana", image: "images/tadasana.jpeg", duration: 5 }
];

// Function to check if images exist in the given path
function checkImageExists(imagePath, callback) {
    const img = new Image();
    img.src = imagePath;
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
}

// Example: Checking if images exist (for debugging)
yogaPoses.forEach(pose => {
    checkImageExists(pose.image, exists => {
        if (!exists) {
            console.error(`Image not found: ${pose.image}`);
        }
    });
});


// Mudra Variables and Functions
let currentMudraIndex = 0; // Track the current mudra index
const mudras = [
    { name: "Bhramara Mudra", image: "images/bhramara_mudra.jpg", duration: 15 },
    { name: "Linga Mudra", image: "images/linga_mudra.jpeg", duration: 15 },
    { name: "Mahasirs Mudra", image: "images/mahasirs_mudra.jpeg", duration: 15 },
    { name: "Matsya Mudra", image: "images/matsya_mudra.jpeg", duration: 15 },
    { name: "Asthma Mudra", image: "images/asthma_mudra.jpeg", duration: 15 },
    { name: "Apan Mudra", image: "images/apana_mudra.jpeg", duration: 15 },
    { name: "Varun Mudra", image: "images/varun_mudra.jpeg", duration: 15 },
    { name: "Surya Mudra", image: "images/surya_mudra.jpeg", duration: 15 },
    { name: "Pushan Mudra", image: "images/pushan_mudra.jpeg", duration: 15 },
    { name: "Yoni Mudra", image: "images/yoni_mudra.jpeg", duration: 15 },
    { name: "Kapha Shamak Mudra", image: "images/kapha_shamak_mudra.jpeg", duration: 15 },
    { name: "Prithvi Mudra", image: "images/prithvi_mudra.jpeg", duration: 15 }
];

// Function to display the current yoga pose
function showCurrentPose() {
    const pose = yogaPoses[currentPoseIndex];
    const isLastPose = currentPoseIndex === yogaPoses.length - 1;

    const content = `
        <h2>Yogasana: ${pose.name}</h2>
        <div class="yoga-pose">
            <img src="${pose.image}" alt="${pose.name}">
            <p>${pose.name} - ${pose.duration} seconds</p>
            <div class="timer-controls">
                ${currentPoseIndex === 0 ? '<button onclick="startTimer()">Start</button>' : ''}
                <button id="pauseResumeButton" onclick="pauseResumeTimer()">${isPaused ? 'Resume' : 'Pause'}</button>
                ${!isLastPose ? '<button onclick="skipPose()">Skip</button>' : ''}
                ${!isLastPose ? '<button onclick="stopTimer()">Stop</button>' : ''}
                ${isLastPose ? '<button onclick="restartSession()">Restart</button>' : ''}
            </div>
            <p id="timer">Time remaining: ${remainingTime > 0 ? remainingTime : pose.duration} seconds</p>
        </div>
    `;
    document.getElementById('content').innerHTML = content;

    if (currentPoseIndex > 0) {
        startTimer();
    }
}

// Function to display the current mudra
function showCurrentMudra() {
    const mudra = mudras[currentMudraIndex];
    const isLastMudra = currentMudraIndex === mudras.length - 1;

    const content = `
        <h2>Mudra: ${mudra.name}</h2>
        <div class="mudra">
            <img src="${mudra.image}" alt="${mudra.name}">
            <p>${mudra.name} - ${mudra.duration} seconds</p>
            <div class="timer-controls">
                ${currentMudraIndex === 0 ? '<button onclick="startMudraTimer()">Start</button>' : ''}
                <button id="pauseResumeButton" onclick="pauseResumeTimer()">${isPaused ? 'Resume' : 'Pause'}</button>
                ${!isLastMudra ? '<button onclick="skipMudra()">Skip</button>' : ''}
                ${!isLastMudra ? '<button onclick="stopTimer()">Stop</button>' : ''}
                ${isLastMudra ? '<button onclick="restartMudraSession()">Restart</button>' : ''}
            </div>
            <p id="timer">Time remaining: ${remainingTime > 0 ? remainingTime : mudra.duration} seconds</p>
        </div>
    `;
    document.getElementById('content').innerHTML = content;

    if (currentMudraIndex > 0) {
        startMudraTimer();
    }
}

// Function to start the yoga timer
function startTimer() {
    const pose = yogaPoses[currentPoseIndex];
    let time = remainingTime > 0 ? remainingTime : pose.duration;
    const timerDisplay = document.getElementById('timer');

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (!isPaused) {
            timerDisplay.textContent = `Time remaining: ${time} seconds`;
            time--;

            if (time < 0) {
                clearInterval(timerInterval);
                if (currentPoseIndex < yogaPoses.length - 1) {
                    nextPose();
                } else {
                    timerDisplay.textContent = "Time's up!";
                }
            }
        } else {
            remainingTime = time;
        }
    }, 1000);
}

// Function to start the mudra timer
function startMudraTimer() {
    const mudra = mudras[currentMudraIndex];
    let time = remainingTime > 0 ? remainingTime : mudra.duration;
    const timerDisplay = document.getElementById('timer');

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (!isPaused) {
            timerDisplay.textContent = `Time remaining: ${time} seconds`;
            time--;

            if (time < 0) {
                clearInterval(timerInterval);
                if (currentMudraIndex < mudras.length - 1) {
                    nextMudra();
                } else {
                    timerDisplay.textContent = "Time's up!";
                }
            }
        } else {
            remainingTime = time;
        }
    }, 1000);
}

// Function to pause/resume the timer
function pauseResumeTimer() {
    isPaused = !isPaused;
    const pauseResumeButton = document.getElementById('pauseResumeButton');
    pauseResumeButton.textContent = isPaused ? 'Resume' : 'Pause';

    if (!isPaused) {
        if (currentPoseIndex >= 0) startTimer();
        if (currentMudraIndex >= 0) startMudraTimer();
    }
}

// Function to skip the current yoga pose
function skipPose() {
    clearInterval(timerInterval);
    if (currentPoseIndex < yogaPoses.length - 1) {
        currentPoseIndex++;
        isPaused = false;
        remainingTime = 0;
        showCurrentPose();
    }
}

// Function to skip the current mudra
function skipMudra() {
    clearInterval(timerInterval);
    if (currentMudraIndex < mudras.length - 1) {
        currentMudraIndex++;
        isPaused = false;
        remainingTime = 0;
        showCurrentMudra();
    }
}

// Function to stop the timer and reset to the first pose/mudra
function stopTimer() {
    clearInterval(timerInterval);
    isPaused = false;
    remainingTime = 0;
    if (currentPoseIndex >= 0) {
        currentPoseIndex = 0;
        showCurrentPose();
    }
    if (currentMudraIndex >= 0) {
        currentMudraIndex = 0;
        showCurrentMudra();
    }
}

// Function to move to the next yoga pose
function nextPose() {
    clearInterval(timerInterval);
    if (currentPoseIndex < yogaPoses.length - 1) {
        currentPoseIndex++;
        isPaused = false;
        remainingTime = 0;
        showCurrentPose();
    }
}

// Function to move to the next mudra
function nextMudra() {
    clearInterval(timerInterval);
    if (currentMudraIndex < mudras.length - 1) {
        currentMudraIndex++;
        isPaused = false;
        remainingTime = 0;
        showCurrentMudra();
    }
}

// Function to restart the yoga session
function restartSession() {
    clearInterval(timerInterval);
    currentPoseIndex = 0;
    isPaused = false;
    remainingTime = 0;
    showCurrentPose();
    startTimer();
}

// Function to restart the mudra session
function restartMudraSession() {
    clearInterval(timerInterval);
    currentMudraIndex = 0;
    isPaused = false;
    remainingTime = 0;
    showCurrentMudra();
    startMudraTimer();
}

// Function to show yoga poses
function showYoga() {
    clearInterval(timerInterval);
    currentPoseIndex = 0;
    isPaused = false;
    remainingTime = 0;
    showCurrentPose();
}

// Function to show mudras
function showMudra() {
    clearInterval(timerInterval);
    currentMudraIndex = 0;
    isPaused = false;
    remainingTime = 0;
    showCurrentMudra();
}