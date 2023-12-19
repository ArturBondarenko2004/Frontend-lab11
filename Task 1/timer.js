const time = document.querySelector(".time");

let timer = null;
let timeSpent = 0;
function startTimer() {
    timer = setInterval(() => {
        timeSpent++;
        const hours = Math.floor(timeSpent / 3600);
        const minutes = Math.floor((timeSpent - hours * 3600) / 60);
        const seconds = timeSpent - hours * 3600 - minutes * 60;
        time.textContent = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }, 1000);
}
function stopTimer() {
    clearInterval(timer);
}
startTimer();
window.addEventListener("blur", stopTimer);
window.addEventListener("focus", startTimer);
