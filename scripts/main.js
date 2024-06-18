// 예를 들어, 버튼 클릭 시 알림을 표시하는 스크립트
document.addEventListener('DOMContentLoaded', function() {
    const button = document.createElement('button');
    button.textContent = 'Click Me';
    button.addEventListener('click', function() {
        alert('Button was clicked!');
    });
    document.body.appendChild(button);
});