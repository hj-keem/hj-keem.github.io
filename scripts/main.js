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

    // 동영상 팝업창
    const projectLinks = document.querySelectorAll('.project-img-link');
    const closeButtons = document.querySelectorAll('.video-close');

    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const videoSrc = link.getAttribute('data-video');
            const modalId = link.getAttribute('href').substring(1);
            const modal = document.getElementById(modalId);
            const videoElement = modal.querySelector('video source');

            // 비디오 소스 설정
            videoElement.src = videoSrc;
            modal.style.display = 'flex'; // 중앙에 표시되도록 flex로 변경
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.video-modal');
            modal.style.display = 'none';
        });
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('video-modal')) {
            e.target.style.display = 'none';
        }
    });
});
