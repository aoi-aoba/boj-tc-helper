# 🚀 BOJ Testcase Helper (Chrome Extension)

## ⚠️ 이 프로그램은 아직 개발 중입니다!

**BOJ Testcase Helper**는 백준 온라인 저지(BOJ)에서 제공되는 기본 예제 외에, 사용자들이 공유한 추가 테스트케이스를 사이드바 형식으로 편리하게 확인하고 복사할 수 있도록 돕는 브라우저 익스텐션입니다.

This is a Chrome extension designed to help Baekjoon Online Judge (BOJ) users by providing additional test cases through a sleek sidebar UI, synced directly from a GitHub repository.

---

## ✨ Key Features (주요 기능)

* **GitHub Data Sync**: GitHub 레포지토리에 저장된 JSON 데이터를 실시간으로 동기화하여 최신 테스트케이스를 제공합니다.
* **Sleek Sidebar UI**: 문제 페이지에서 'TC 확인' 버튼을 클릭하면 세련된 애니메이션과 함께 사이드바가 나타납니다.
* **One-Click Copy**: Input 전체 복사 및 개별 Input/Output 복사 기능을 제공하여 로컬 환경에서의 테스트를 가속화합니다.
* **Large TC Handling**: 데이터가 큰 테스트케이스는 자동으로 스크롤바를 생성하여 가독성을 해치지 않습니다.
* **Intuitive Feedback**: 복사 성공 시 버튼 색상과 텍스트가 변하는 즉각적인 피드백을 제공합니다.

---

## 🛠 Installation (설치 방법)

**⚠️ 이 설치 방법은 아직 공식 배포가 되지 않은 방식입니다. 또한, 사용에 있어 아직 큰 제약이 있을 수 있습니다!**

1.  이 레포지토리를 클론하거나 ZIP 파일로 다운로드합니다.
    ```bash
    git clone [https://github.com/aoi-aoba/boj-tc-helper.git](https://github.com/aoi-aoba/boj-tc-helper.git)
    ```
2.  Chrome 브라우저에서 `chrome://extensions/` 주소로 이동합니다.
3.  우측 상단의 **'개발자 모드'**를 활성화합니다.
4.  **'압축해제된 확장 프로그램을 로드합니다'** 버튼을 클릭하고 프로젝트 폴더를 선택합니다.

---

## 📈 Performance & UI Improvements (성능 및 UI 개선 기록)

지금까지 진행된 주요 업데이트와 성능 개선 내역입니다.

| Category | Commit Message / Milestone | Key Improvements |
| :--- | :--- | :--- |
| **Init** | `Initial commit` | **프로젝트 시작**: 기본 환경 설정 및 초기 소스 코드 구성 |
| **Frame** | `Establishment of initial extension frame` | **구조 설계**: 익스텐션의 기본 동작 매커니즘 및 사이드바 레이아웃 베이스 구축 |
| **Feature** | `integrate GitHub-based JSON data sync with asynchronous loading...` | **동기화 및 피드백**: GitHub Raw 데이터 비동기 연동 및 복사 시 시각적 피드백(버튼 상태 변화) UI 강화 |
| **UX** | `refine loading animation duration and update problem testcases` | **로딩 최적화**: 데이터 로딩 시간동안의 애니메이션 노출 보정 및 테스트케이스 json 파일 수동 업데이트 (테스트 용도) |
| **Branding** | `implement dual-icon system and unify sidebar header UI` | **디자인 통합**: 아이콘 이원화(내부 전용 white 아이콘 적용) 및 헤더 디자인 최적화, 공간 효율성 증대 |

---

## 🏗 System Architecture

1.  **Data Generation**: Python 스크립트(`gen.py`) 제너레이터를 통해 `problemId.json` 자동 생성 (모든 제너레이터를 보관하지 않음)
2.  **Storage**: GitHub 레포지토리 [aoi-aoba/boj-tc-helper](https://github.com/aoi-aoba/boj-tc-helper)의 `TCdata/` 폴더 내에 JSON 파일 관리.
3.  **Client**: `content.js`가 문제 번호를 인식하여 GitHub API(Raw)를 호출, 사이드바에 데이터 렌더링.

---

## 🤝 Collaborators

* **Main Developer**: [aoi-aoba](https://github.com/aoi-aoba)
* **AI Used**: [Gemini](https://gemini.google.com/)
* 상기 프로그램에서 AI는 코드에 있어 보완이 필요한 부분에 주로 사용하였음을 밝힙니다.