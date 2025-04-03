// drawflow-editor.js

window.initDrawflowEditor = function(containerId) {
  const container = document.getElementById(containerId);
  const editor = new Drawflow(container);
  window.drawflowInstance = editor;
  editor.reroute = true;
  editor.start();

  // 노드 HTML 템플릿 함수 (이미지를 노드로 사용)
  function getNodeHtml(type, label) {
    let imagePath = "";
    if (type === "input") {
      imagePath = "images/키키핑.webp";
    } else if (type === "process") {
      imagePath = "images/흑화뿌뿌핑.png";
    } else if (type === "output") {
      imagePath = "images/빙글핑.png";
    }
    return `
      <div class="node-image-wrapper">
        <img src="${imagePath}" alt="${label}" class="node-image" />
        <div class="node-label">${label}</div>
      </div>
    `;
  }
  

  // 노드 추가 함수
  function addNode(type, x, y) {
    let config = {
      input: { count: 0, label: '입력' },
      process: { count: 1, label: '처리' },
      output: { count: 1, label: '출력' }
    };
    const info = config[type];
    const outputs = type === 'output' ? 0 : 1;
    editor.addNode(
      type,
      info.count,
      outputs,
      x,
      y,
      type,
      { label: info.label },
      getNodeHtml(type, info.label)
    );
  }

  // 초기 노드 추가
  addNode('input', 80, 100);
  addNode('process', 300, 100);
  addNode('output', 550, 100);

  // 노드 연결 제한 (입력 → 처리 → 출력)
  editor.on('connectionCreated', ({ output_id, input_id }) => {
    const valid = validateConnection(output_id, input_id);
    if (!valid) {
      editor.removeSingleConnection(output_id, input_id);
      alert("올바르지 않은 연결입니다. 입력 → 처리 → 출력 순서만 허용됩니다.");
    }
  });

  function validateConnection(fromId, toId) {
    const fromType = editor.getNodeFromId(fromId).name;
    const toType = editor.getNodeFromId(toId).name;
    if (fromType === 'input' && toType === 'process') return true;
    if (fromType === 'process' && toType === 'output') return true;
    return false;
  }

  // 노드 클릭 시 우측 패널 표시
  container.addEventListener('click', function (event) {
    const node = event.target.closest('.drawflow-node');
    if (node) {
      const id = node.dataset.id;
      const data = editor.getNodeFromId(id);
      selectedNodeId = id;
      document.getElementById('node-title').value = data.data.label || '';
      document.getElementById('node-settings').style.display = 'block';
    } else {
      document.getElementById('node-settings').style.display = 'none';
    }
  });

  // Delete 키로 노드 삭제
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Delete') {
      if (selectedNodeId) {
        editor.removeNodeId(selectedNodeId);
        selectedNodeId = null;
        document.getElementById('node-settings').style.display = 'none';
      }
    }
  });

  // 외부에서 노드 추가를 위해 window에 등록
  window.addCustomNode = function(type) {
    addNode(type, 200 + Math.random() * 200, 150 + Math.random() * 100);
  }
};