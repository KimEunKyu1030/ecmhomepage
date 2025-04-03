// menu-handlers.js

// 버튼 함수 전역 등록 (onclick에서 호출 가능하게)

function handleMenuClick(menu, item, content, secondItem = null) {
  if (menu === '제품' && item === '제품 설치') {
    content.innerHTML = `
      <h2>📘 ECMiner<sup>TM</sup> 설치</h2>
      <img src="images/설치.png" alt="ECMiner 설치 이미지" style = "width: 50%; display: block; margin: 0 auto 50px;">
      <p style="text-align: center;">
        <a href="downloads/BounceBall.zip" download style="padding: 10px 16px; background-color: #1e3a8a; color: white; border-radius: 6px; text-decoration: none;">
            ⬇️ 설치파일 다운로드
        </a>
      </p>
    `;
  }
  else if (menu === '제품' && item === '제품 개요') {
    let currentSlide = 1;
    const totalSlides = 5;

    function renderSlide(n) {
      content.innerHTML = `
        <h2 style="text-align: center; color: #1e3a8a;">ECMiner<sup>TM</sup> 개요</h2>
        <div style="position: relative; text-align: center;">
          <img id="slide-img" src="images/Introduce/intro${n}.jpg" alt="슬라이드 이미지" style="width: 60%; max-width: 1000px; border: 1px solid #ccc; border-radius: 8px;" />
          <button onclick="prevSlide()" style="position: absolute; top: 50%; left: 20px; transform: translateY(-50%); font-size: 28px;">&#10094;</button>
          <button onclick="nextSlide()" style="position: absolute; top: 50%; right: 20px; transform: translateY(-50%); font-size: 28px;">&#10095;</button>
          <div id="page-indicator" style="margin-top: 12px; color: #555;">${n} / ${totalSlides}</div>
        </div>
      `;
    }

    renderSlide(currentSlide);

    window.prevSlide = function() {
      if (currentSlide > 1) {
        currentSlide--;
        renderSlide(currentSlide);
      }
    };
    window.nextSlide = function() {
      if (currentSlide < totalSlides) {
        currentSlide++;
        renderSlide(currentSlide);
      }
    };
  }
  else if (menu === '제품' && item === '제품 체험') {
    content.innerHTML = `
      <h2 style="text-align: center; color: #1e3a8a; margin-bottom: 16px;">
        <img src="images/ECMiner머리.png" alt="아이콘" style="width: 28px; vertical-align: middle; margin-right: 8px;">
        ECMiner<sup>TM</sup> 체험하기
      </h2>
      <div style="margin-top: 20px; text-align: center;">
        <button onclick="addCustomNode('input')">입력 노드 추가</button>
        <button onclick="addCustomNode('process')">처리 노드 추가</button>
        <button onclick="addCustomNode('output')">출력 노드 추가</button>
      </div>
      <br>
      <div id="editor-container" style="height: 500px; border: 1px solid #ccc;"></div>
    `;
    setTimeout(() => {
      if (typeof initDrawflowEditor === 'function') {
        initDrawflowEditor("editor-container");
      }
    }, 0);
  }
  else if (menu === '수행실적' && item === '프로젝트1' && secondItem === '2024년') {
    content.innerHTML = `
      <h2>2024년 - 프로젝트1</h2>
      <img src="images/WP.png" alt="2024 프로젝트1 이미지" style="max-width: 70%; height: auto; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 20px;">
      <p>
        <a href="WP_완료보고서.pdf" target="_blank" rel="noopener" style="padding: 10px 16px; background-color: #1e3a8a; color: white; border-radius: 6px; text-decoration: none;">
          📄 PDF 열기 (새 탭)
        </a>
      </p>
    `;
  }
  else if (menu === '고객지원' && item === 'AI도우미') {
    content.innerHTML = `
      <h2>🗨️ AI도우미</h2>
      <iframe src="http://localhost:7860" width="100%" height="600" style="border:none;"></iframe>
    `;
  }
  else if (menu === '자료실' && item === '도움말') {
    content.innerHTML = `
      <h2>📘 ECMiner 도움말</h2>
      <iframe src="ECMiner2.html" width="100%" height="800px"></iframe>
    `;
  }
  else if (menu === '자료실' && item === '매뉴얼') {
    content.innerHTML = `
      <h2>📘 ECMiner 매뉴얼</h2>
      <iframe src="Manual.htm" width="100%" height="800px"></iframe>
    `;
  }
  else if (menu === '자료실' && item === '교육자료') {
    content.innerHTML = `
      <h2>🎥 교육자료</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: left;">
        
      <div style="width: 23%; cursor: pointer;" onclick="loadVideo('videos/KIKIPING.mp4', '키키핑 소개 영상입니다.')">
          <img src="images/키키핑.webp" alt="영상 썸네일" style="width: 100%; border-radius: 8px;">
          <p style="text-align: center;">키키핑 소개</p>
        </div>
        <div style="width: 23%; cursor: pointer;" onclick="loadVideo('videos/Ayaping.mp4', '아야핑 소개 영상입니다.')">
          <img src="images/아야핑.jpg" alt="영상 썸네일" style="width: 100%; border-radius: 8px;">
          <p style="text-align: center;">아야핑 소개</p>
        </div>
        <div style="width: 23%; cursor: pointer;" onclick="loadVideo('videos/BUBUPING.mp4', '뿌뿌핑 소개 영상입니다.')">
          <img src="images/뿌뿌핑.jpg" alt="영상 썸네일" style="width: 100%; border-radius: 8px;">
          <p style="text-align: center;">뿌뿌핑 소개</p>
        </div>
        <div style="width: 23%; cursor: pointer;" onclick="loadVideo('videos/분류모델_2강.mp4', '분류모델 2강 강의영상입니다.')">
          <img src="images/분류모델_2강.png" alt="영상 썸네일" style="width: 100%; border-radius: 8px;">
          <p style="text-align: center;">분류모델 2강 강의영상</p>
        </div>
        <div style="width: 23%; cursor: pointer;" onclick="loadVideo('videos/BinglePing.mp4', '빙글핑 소개 영상입니다.')">
          <img src="images/빙글핑.png" alt="영상 썸네일" style="width: 100%; border-radius: 8px;">
          <p style="text-align: center;">빙글핑 소개</p>
        </div>
        <div style="width: 23%; cursor: pointer;" onclick="loadVideo('videos/CHANAPING.mp4', '차나핑 소개 영상입니다.')">
          <img src="images/차나핑.jpg" alt="영상 썸네일" style="width: 100%; border-radius: 8px;">
          <p style="text-align: center;">차나핑 소개</p>
        </div>
        <div style="width: 23%; cursor: pointer;" onclick="loadVideo('videos/CHANAPING.mp4', '깜빡핑 소개 영상입니다.')">
          <img src="images/깜빡핑.jpg" alt="영상 썸네일" style="width: 100%; border-radius: 8px;">
          <p style="text-align: center;">깜빡핑 소개</p>
        </div>
        <div style="width: 23%; cursor: pointer;" onclick="loadVideo('videos/CHANAPING.mp4', '초롱핑 소개 영상입니다.')">
          <img src="images/초롱핑.jpg" alt="영상 썸네일" style="width: 100%; border-radius: 8px;">
          <p style="text-align: center;">초롱핑 소개</p>
        </div>
        <div style="width: 23%; cursor: pointer;" onclick="loadVideo('videos/CHANAPING.mp4', '솔찌핑 소개 영상입니다.')">
          <img src="images/솔찌핑.jpg" alt="영상 썸네일" style="width: 100%; border-radius: 8px;">
          <p style="text-align: center;">솔찌핑 소개</p>
        </div>
      
        </div>
    `;
  }
  else if (menu === '커뮤니티' && item === '공지사항') {
    content.innerHTML = `
      <h2> ⚓️ 공지사항</h2>
      <img src="images/공지사항.jpg" alt="ECMiner 홈페이지 공지사항 이미지" style = "width: 50%; display: block; margin: 0 auto 50px;">
    `;
  }
  else {
    content.innerHTML = `<h2>${item}</h2><p>${item}에 대한 내용이 여기에 표시됩니다.</p>`;
  }
}

function loadVideo(videoSrc, description) {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>🎥 교육자료 보기</h2>
    <button onclick="showMenu('자료실'); setTimeout(() => document.querySelector('#sidebar a:nth-child(3)').click(), 100);"
      style="margin-top: 20px; margin-bottom: 24px; padding: 8px 14px; background-color: #1e3a8a; color: white; border: none; border-radius: 6px; cursor: pointer;">
      🔙 목록으로 돌아가기
    </button>
    <video width="100%" height="500" controls>
      <source src="${videoSrc}" type="video/mp4">
      브라우저가 video 태그를 지원하지 않습니다.
    </video>
    <p style="margin-top: 12px;">${description}</p>
  `;
}
