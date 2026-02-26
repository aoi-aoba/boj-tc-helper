// Extract problem number (from URL)
const problemId = window.location.pathname.split('/').pop();

function init() {
    // To insert next to the question title
    const target = document.querySelector('.problem-title');
    if (!target) return;

    const container = target.parentElement;

    const tcBtn = document.createElement('span');
    tcBtn.innerText = 'TC 확인';

    Object.assign(tcBtn.style, {
        cursor: 'pointer',
        display: 'inline-block',
        padding: '0px 8px',
        marginLeft: '5px',
        fontSize: '11px',
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(52, 152, 219)',
        verticalAlign: 'middle',
        lineHeight: '20px',
        height: '20px'
    })

    // To prioritize and insert it right after the title=
    titleElement.after(tcBtn);

    tcBtn.onclick = () => {
        console.log(`Get problem data from problem number #${problemId}`);
        toggleSidebar();
    };
}

function toggleSidebar() {
    // sidebar logic
    alert('사이드바 구현 필요');
}

// 페이지 로드 후 실행
init();