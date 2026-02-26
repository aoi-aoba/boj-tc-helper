let sidebarElement = null;

async function fetchTestcases(problemId) {
    const USERNAME = "aoi-aoba"; 
    const REPO_NAME = "boj-tc-helper";
    const DATA_URL = `https://raw.githubusercontent.com/${USERNAME}/${REPO_NAME}/main/TCdata/${problemId}.json`;

    try {
        // 캐시 방지를 위해 10분(600000ms) 단위 타임스탬프 사용
        const cacheBuster = Math.floor(Date.now() / 600000);
        const response = await fetch(`${DATA_URL}?v=${cacheBuster}`);
        
        if (response.status === 404) {
            console.info(`[BOJ-TC] ${problemId}번에 대해 등록된 데이터가 아직 없습니다.`);
            return { status: 'empty', data: [] };
        }

        if (!response.ok) throw new Error('Network response error');

        const json = await response.json();
        return { status: 'success', data: json.testcases || [] };

    } catch (error) {
        console.error("[BOJ-TC] Fetch error:", error);
        return { status: 'error', message: error.message };
    }
}

async function toggleSidebar(problemId) {
    if (!sidebarElement) createSidebar();

    const isActive = sidebarElement.classList.toggle('active');
    if (!isActive) return;

    const contentArea = document.getElementById('tc-content-area');

    contentArea.innerHTML = `
        <div style="text-align:center; margin-top:50px; color:#888;">
            <div class="loading-spinner"></div>
            <p>${problemId}번 데이터를 동기화 중...</p>
        </div>
    `;

    const result = await fetchTestcases(problemId);

    if (result.status === 'empty') {
        contentArea.innerHTML = `
            <div style="text-align:center; padding:20px; color:#999;">
                <p>등록된 추가 테스트케이스가 없습니다.</p>
                <a href="https://www.acmicpc.net/board/search/all/problem/${problemId}" target="_blank" style="color:#3498db; font-size:12px;">질문 게시판에서 찾아보기 ↗</a>
            </div>
        `;
    } else if (result.status === 'error') {
        contentArea.innerHTML = `<p style="color:#e74c3c; padding:20px;">데이터를 불러오는 중 오류가 발생했습니다.</p>`;
    } else {
        renderTestcases(result.data);
    }
}

function renderTestcases(testcases) {
    const contentArea = document.getElementById('tc-content-area');
    contentArea.innerHTML = '';

    // 각각의 TC 카드를 별도로 생성
    testcases.forEach(tc => {
        const card = document.createElement('div');
        card.className = 'tc-card';

        // renderTestcases 내부의 버튼 HTML 부분 수정
        card.innerHTML = `
            <div class="tc-header">
                <span style="color: #333;">테스트케이스 ${tc.id}</span>
                <button class="tc-copy-btn" data-type="all">📋 Copy Input</button>
            </div>
            <div class="tc-body">
                <div class="tc-label-wrapper">
                    <div class="tc-label">INPUT</div>
                    <button class="tc-inner-copy" data-type="input">Copy</button>
                </div>
                <div class="tc-code">${tc.input}</div>

                <div class="tc-label-wrapper" style="margin-top: 10px;">
                    <div class="tc-label">OUTPUT</div>
                    <button class="tc-inner-copy" data-type="output">Copy</button>
                </div>
                <div class="tc-code">${tc.output}</div>
            </div>
        `;

        // 생성된 카드 내부의 버튼들에 이벤트 연결
        card.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.getAttribute('data-type');
                let textToCopy = '';
                
                if (type === 'all' || type === 'input') textToCopy = tc.input;
                else if (type === 'output') textToCopy = tc.output;

                copyToClipboard(textToCopy, e.target);
            });
        });

        contentArea.appendChild(card);
    });
}

async function copyToClipboard(text, button) {
    try {
        await navigator.clipboard.writeText(text);
        
        // 기존의 버튼 상태를 저장하고 다시 불러오게 하기 위함
        const originalHTML = button.innerHTML;
        const originalColor = button.style.color;
        const originalBgColor = button.style.backgroundColor;
        
        // Copy 완료 상태를 띄우기 위함
        button.innerHTML = '✅ Copied!';
        button.style.color = '#ffffff';
        button.style.backgroundColor = '#27ae60';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.color = originalColor;
            button.style.backgroundColor = originalBgColor;
            button.disabled = false;
        }, 700);
    } catch (err) {
        console.error('복사 실패:', err);
        alert('복사에 실패했습니다.');
    }
}

function createSidebar() {
    if (document.getElementById('boj-tc-sidebar')) return;

    sidebarElement = document.createElement('div');
    sidebarElement.id = 'boj-tc-sidebar';

    sidebarElement.innerHTML = `
        <button class="tc-close-btn">×</button>
        <h2 style="font-size: 18px; margin-bottom: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
            Testcases
        </h2>
        <div id="tc-content-area">
            <p style="color: #888;">데이터를 불러오는 중...</p>
        </div>
    `;

    document.body.appendChild(sidebarElement);

    sidebarElement.querySelector('.tc-close-btn').onclick = () => {
        sidebarElement.classList.remove('active');
    };
}

function init() {
    const problemId = window.location.pathname.match(/\/problem\/(\d+)/)?.[1];
    if (!problemId) return;

    const titleElement = document.querySelector('#problem_title');
    if (!titleElement) return;

    if (document.getElementById('boj-tc-btn')) return;

    const tcBtn = document.createElement('span');
    tcBtn.id = 'boj-tc-btn';
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
        height: '20px',
        borderRadius: '3px'
    });

    titleElement.after(tcBtn);

    tcBtn.onclick = () => {
        toggleSidebar(problemId);
    };
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}