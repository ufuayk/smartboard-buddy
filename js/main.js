// Timer
let timerInterval;
let timerRunning = false;
let timerSeconds = 0;

function updateTimerDisplay() {
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = timerSeconds % 60;
    document.querySelector('.timer-display').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

document.getElementById('startTimer').addEventListener('click', () => {
    if (!timerRunning) {
        timerRunning = true;
        timerInterval = setInterval(() => {
            timerSeconds++;
            updateTimerDisplay();
        }, 1000);
    }
});

document.getElementById('pauseTimer').addEventListener('click', () => {
    timerRunning = false;
    clearInterval(timerInterval);
});

document.getElementById('resetTimer').addEventListener('click', () => {
    timerRunning = false;
    clearInterval(timerInterval);
    timerSeconds = 0;
    updateTimerDisplay();
});

// Quick Notepad
const quickNote = document.getElementById('quickNote');
quickNote.value = localStorage.getItem('quickNoteContent') || '';
quickNote.addEventListener('input', () => {
    localStorage.setItem('quickNoteContent', quickNote.value);
});

// Student Picker
const studentList = document.getElementById('studentList');
const selectedStudent = document.getElementById('selectedStudent');
const pickStudentBtn = document.getElementById('pickStudent');

studentList.value = localStorage.getItem('studentListContent') || '';
studentList.addEventListener('input', () => {
    localStorage.setItem('studentListContent', studentList.value);
});

pickStudentBtn.addEventListener('click', () => {
    const students = studentList.value.split('\n').filter(student => student.trim() !== '');
    if (students.length > 0) {
        const randomIndex = Math.floor(Math.random() * students.length);
        selectedStudent.textContent = students[randomIndex];
    }
});

// Drawing Board
const canvas = document.getElementById('drawingBoard');
const ctx = canvas.getContext('2d');
const clearCanvas = document.getElementById('clearCanvas');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    loadDrawing();
}

function saveDrawing() {
    localStorage.setItem('drawingBoardContent', canvas.toDataURL());
}

function loadDrawing() {
    const savedDrawing = localStorage.getItem('drawingBoardContent');
    if (savedDrawing) {
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
        img.src = savedDrawing;
    }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    [lastX, lastY] = [e.offsetX, e.offsetY];
    saveDrawing();
}

function stopDrawing() {
    isDrawing = false;
}

clearCanvas.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveDrawing();
});

// Noise Meter
let audioContext;
let analyser;
let microphone;
let animationFrame;
const noiseMeterBtn = document.getElementById('startNoiseMeter');
const noiseLevel = document.getElementById('noiseLevel');

noiseMeterBtn.addEventListener('click', async () => {
    try {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            function updateNoiseMeter() {
                analyser.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((a, b) => a + b) / bufferLength;
                const height = (average / 256) * 100;
                noiseLevel.style.height = `${height}%`;
                animationFrame = requestAnimationFrame(updateNoiseMeter);
            }
            
            updateNoiseMeter();
            noiseMeterBtn.textContent = 'Stop Noise Meter';
        } else {
            cancelAnimationFrame(animationFrame);
            microphone.disconnect();
            audioContext.close();
            audioContext = null;
            noiseLevel.style.height = '0%';
            noiseMeterBtn.textContent = 'Start Noise Meter';
        }
    } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Error accessing microphone. Please check your microphone settings and try again.');
    }
});

// Group Creator
const groupStudentList = document.getElementById('groupStudentList');
const groupSize = document.getElementById('groupSize');
const createGroupsBtn = document.getElementById('createGroups');
const groupsResult = document.getElementById('groupsResult');

groupStudentList.value = localStorage.getItem('groupStudentListContent') || '';
groupSize.value = localStorage.getItem('groupSize') || '2';

groupStudentList.addEventListener('input', () => {
    localStorage.setItem('groupStudentListContent', groupStudentList.value);
});

groupSize.addEventListener('change', () => {
    localStorage.setItem('groupSize', groupSize.value);
});

createGroupsBtn.addEventListener('click', () => {
    const students = groupStudentList.value.split('\n').filter(student => student.trim() !== '');
    const size = parseInt(groupSize.value);
    
    if (students.length === 0) {
        alert('Please enter student names');
        return;
    }
    
    if (size < 2 || size > students.length) {
        alert('Invalid group size');
        return;
    }
    
    const shuffled = [...students].sort(() => Math.random() - 0.5);
    const groups = [];
    
    for (let i = 0; i < shuffled.length; i += size) {
        groups.push(shuffled.slice(i, i + size));
    }
    
    groupsResult.innerHTML = groups.map((group, index) => `
        <div class="card mb-2">
            <div class="card-body">
                <h6 class="card-title">Group ${index + 1}</h6>
                <p class="card-text">${group.join(', ')}</p>
            </div>
        </div>
    `).join('');
});