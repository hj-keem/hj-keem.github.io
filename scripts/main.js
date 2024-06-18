const text = "Back-end Developer 김현정입니다.";
const typingDelay = 100; // Delay between each character typing (in milliseconds)
let index = 0;

function typeWriter() {
    const typingEffect = document.getElementById('typing-effect');
    typingEffect.innerHTML += `<span>${text.charAt(index)}</span>`;
    index++;
    
    // 각 글자의 너비를 구하여 마우스 커서 위치 설정
    const characters = typingEffect.querySelectorAll('span');
    const lastCharacter = characters[characters.length - 1];
    const cursor = document.querySelector('.blink-cursor');
    const cursorPosition = lastCharacter.getBoundingClientRect().right + window.scrollX;
    cursor.style.left = `${cursorPosition}px`;

    if (index < text.length) {
        setTimeout(typeWriter, typingDelay);
    }
}

// Start typing effect when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // 시작할 때 마우스 커서 깜빡이는 효과 추가
    const cursor = document.querySelector('.blink-cursor');
    cursor.classList.add('blink');

    // 타이핑 효과 시작
    typeWriter();
});
