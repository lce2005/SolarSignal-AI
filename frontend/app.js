const state = {
  mode: "text", // "text" (뉴스 수집) 또는 "file" (리포트 분석)
  reportData: null,
};

const $ = (selector) => document.querySelector(selector);

$("#textMode").addEventListener("click", () => setMode("text"));
$("#fileMode").addEventListener("click", () => setMode("file"));
$("#analyze").addEventListener("click", analyze);

function setMode(mode) {
  state.mode = mode;
  $("#textMode").classList.toggle("active", mode === "text");
  $("#fileMode").classList.toggle("active", mode === "file");
  $("#textBox").classList.toggle("hidden", mode !== "text");
  $("#fileBox").classList.toggle("hidden", mode !== "file");
  $("#status").textContent = "";
}

async function analyze() {
  const webhookUrl = $("#webhookUrl").value.trim();
  const status = $("#status");

  status.className = "status";
  status.textContent = "Upstage AI 엔진 분석 중...";
  $("#analyze").disabled = true;

  try {
    const request = await buildRequest();
    const response = await fetch(webhookUrl, request);

    const data = await response.json();
    if (!response.ok || data.error) {
      throw new Error(data.error || `n8n 요청 실패 (${response.status})`);
    }

    renderResult(data);
    status.textContent = "분석이 성공적으로 완료되었습니다.";
  } catch (error) {
    status.className = "status error";
    status.textContent = error.message;
  } finally {
    $("#analyze").disabled = false;
  }
}

async function buildRequest() {
  if (state.mode === "file") {
    const file = $("#document").files;
    if (!file) throw new Error("이미지 또는 PDF 파일을 선택해주세요.");

    const fileBase64 = await readFileAsDataUrl(file);

    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "file",
        file_name: file.name,
        mime_type: file.type || "application/pdf",
        file_base64: fileBase64,
      }),
    };
  }

  const stockName = $("#content").value.trim();
  if (!stockName) throw new Error("분석할 종목명을 입력해주세요.");

  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mode: "news",
      stock_name: stockName,
    }),
  };
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(new Error("파일을 읽지 못했습니다.")));
    reader.readAsDataURL(file);
  });
}

// 고도화된 JSON 구조를 받아 화면에 출력하는 핵심 엔진
function renderResult(data) {
  state.reportData = data;
  const feedback = $("#feedback");
  feedback.className = "feedback";

  // 1. 새 JSON 명세에 맞추어 데이터 안전하게 추출
  const stockName = data.report_metadata?.stock_name || "분석 종목";
  const analyzedAt = data.report_metadata?.analyzed_at || "-";
  const bullets = data.dashboard_summary?.bullets || [];
  const keyNumbers = data.financial_metrics?.key_numbers || [];
  const momentumScore = data.chart_analytics?.momentum_score || 0;
  const sentimentSignal = data.chart_analytics?.sentiment_signal || "NEUTRAL";
  const signalReason = data.chart_analytics?.signal_reason || "분석 내용이 없습니다.";

  // 2. 리스트 컴포넌트 동적 생성
  const summaryList = bullets.map(item => `<li>• ${escapeHtml(item)}</li>`).join("");
  const metricsList = keyNumbers.map(item => `<li>✔ ${escapeHtml(item)}</li>`).join("");

  feedback.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="background: #1e3a8a; color: white; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 14px;">${escapeHtml(stockName)}</span>
        <span class="badge ${sentimentSignal.toLowerCase()}" style="font-weight: bold;">${escapeHtml(sentimentSignal)}</span>
      </div>
      <div style="font-size: 12px; color: #4b5563; margin-top: 4px;">
        분석일시: ${escapeHtml(analyzedAt)} | 모멘텀 지수: <strong>${momentumScore} / 5.0</strong>
      </div>
      <hr style="border: 0; border-top: 1px solid #dde3ef; margin: 8px 0;">
      
      <h4 style="margin: 0 0 6px 0; color: #1e3a8a;">🎯 대시보드 핵심 브리핑</h4>
      <ul style="padding-left: 0; list-style: none; margin: 0; display: grid; gap: 6px; font-size: 13px; color: #374151;">${summaryList}</ul>
      
      <h4 style="margin: 12px 0 6px 0; color: #1e3a8a;">📊 파이프라인 주요 매트릭스</h4>
      <ul style="padding-left: 0; list-style: none; margin: 0; display: grid; gap: 4px; font-size: 12.5px; color: #4b5563;">${metricsList}</ul>
      
      <h4 style="margin: 12px 0 6px 0; color: #1e3a8a;">💡 AI 에이전트 판단 근거</h4>
      <p style="background: #fff7df; border-left: 4px solid #f5b533; padding: 12px; margin: 0; border-radius: 0 4px 4px 0; font-style: italic; font-size: 12.5px; line-height: 1.5; color: #1f2937;">
        ${escapeHtml(signalReason)}
      </p>
    </div>
  `;

  // 하단 영역에 정형 JSON 구조 시각화 (디버깅용)
  const quiz = $("#quiz");
  quiz.className = "quiz";
  quiz.innerHTML = `<pre style="margin: 0; background: #1f2937; color: #f9fafb; padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 11px;"><code>${JSON.stringify(data, null, 2)}</code></pre>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}