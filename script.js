// Birthday countdown
// January 20, 2026 at 8:10 PM CST
// Month is 0-indexed (0 = Jan), so January = 0
// new Date(year, month, day, hour, minute, second)
const birthdayDate = new Date(2026, 0, 20, 20, 10, 0).getTime();

// Track if birthday celebration has already been triggered
let birthdayCelebrated = false;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    // If countdown is finished
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = `
            <div class="birthday-message">
                🎉🎂 HAPPY BIRTHDAY TABITHA! 🎂🎉
            </div>
        `;
        document.querySelector('.birthday-date').textContent = "It's YOUR day!";
        // Auto-trigger balloon drop on birthday (only once)
        if (!birthdayCelebrated) {
            birthdayCelebrated = true;
            dropBalloons();
        }
        return;
    }

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update display
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
if (document.getElementById('countdown')) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Balloon drop functionality
const balloonEmojis = ['🎈', '🎈', '🎈', '🎁', '🎊', '🎉', '⭐', '💖', '✨', '🌟'];

// Track state
let isDropping = false;
let dropInterval = null;

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];

    // Random position
    balloon.style.left = Math.random() * 100 + 'vw';

    // Random size
    const size = 2 + Math.random() * 3;
    balloon.style.fontSize = size + 'rem';

    // Random animation duration
    const duration = 3 + Math.random() * 4;
    balloon.style.animationDuration = duration + 's';

    return balloon;
}

function createBjoBalloon() {
    const bjoBalloon = document.createElement('div');
    bjoBalloon.className = 'bjo-balloon';
    bjoBalloon.innerHTML = '<img src="bjo-balloon.png" alt="BJO Balloon">';

    // Random position
    bjoBalloon.style.left = Math.random() * 90 + 5 + 'vw';

    // Random animation duration
    const duration = 4 + Math.random() * 3;
    bjoBalloon.style.animationDuration = duration + 's';

    return bjoBalloon;
}

function dropBalloons() {
    const container = document.getElementById('balloonContainer');
    if (!container || isDropping) return;

    isDropping = true;
    let dropCount = 0;

    // Drop balloons continuously for 10 seconds
    dropInterval = setInterval(() => {
        dropCount++;

        // Drop a BJO balloon every 8th drop, otherwise drop a regular balloon
        const element = (dropCount % 8 === 0) ? createBjoBalloon() : createBalloon();
        container.appendChild(element);

        // Remove element after it falls
        setTimeout(() => {
            element.remove();
        }, 7000);
    }, 100);

    // Stop dropping after 10 seconds and clear remaining elements
    setTimeout(() => {
        clearInterval(dropInterval);
        isDropping = false;

        // Clear remaining elements after they finish falling
        setTimeout(() => {
            container.innerHTML = '';
        }, 7000);
    }, 10000);
}

// Button event listener
const balloonBtn = document.getElementById('balloonBtn');

if (balloonBtn) {
    balloonBtn.addEventListener('click', dropBalloons);
}

// Fun console message
console.log('%c🎂 Happy Birthday Tabitha! 🎂', 'font-size: 24px; color: #f5576c; font-weight: bold;');
console.log('%cMade with 💖', 'font-size: 14px; color: #764ba2;');
