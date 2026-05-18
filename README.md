# ☀️ Solar-n8n-StockAgent: Intelligent Market Intelligence Pipeline
> **2026 Upstage Low-Code AI Challenge | Team Project**

[![Upstage Solar](https://img.shields.io/badge/AI-Upstage%20Solar-orange)](https://www.upstage.ai/)
[![Document AI](https://img.shields.io/badge/Vision-Document%20Parse-blue)](https://console.upstage.ai/)
[![n8n](https://img.shields.io/badge/Automation-n8n-red)](https://n8n.io/)
[![Status: Hackathon](https://img.shields.io/badge/Status-Hackathon-success)](https://github.com/lce2005)

**Solar-n8n-FinFlow**는 단순한 뉴스 요약기를 넘어, 비정형 금융 데이터를 가공하여 투자 인사이트를 자동 생성하는 **엔드 투 엔드(End-to-End) AI 에이전트 시스템**입니다. 

본 프로젝트는 **Upstage Document AI**의 정교한 문서 파싱과 **Solar LLM**의 논리적 추론을 결합하여, 투자자가 수많은 리포트와 뉴스 속에서 '진짜 시그널'을 놓치지 않도록 설계되었습니다.

---

## 📌 Problem & Solution
### ❌ 기존 방식의 한계
* **정보의 파편화**: 뉴스 기사뿐만 아니라 증권사 PDF, 실적 발표 이미지 등 분석해야 할 데이터 형식이 너무 다양함.
* **수동 분석의 피로도**: 수백 페이지의 IR 자료와 리포트를 일일이 읽고 핵심 수치를 추출하는 데 막대한 시간 소요.
* **단순 텍스트의 한계**: 요약 결과가 단순 줄글로 제공되어, 데이터베이스화하거나 2차 자동화에 활용하기 어려움.

### ✅ Solar-n8n-FinFlow의 해결책
* **Multi-modal Parsing**: **Upstage Document Parse**를 통해 이미지/PDF 속의 표와 차트를 Markdown으로 정교하게 추출.
* **Structured Reasoning**: **Solar Pro2** 모델을 활용해 요약문을 넘어서는 **JSON 형태의 정량적 투자 지표** 도출.
* **Zero-Touch Automation**: n8n 워크플로우를 통해 수집-분석-구조화-배포의 전 과정을 무인 자동화.

---

## 🛠 System Architecture



1.  **Ingestion**: News API 및 구글 드라이브를 통해 최신 뉴스 및 증권사 리포트(PDF/JPG) 수집.
2.  **Document AI (Upstage)**: 비정형 데이터(표, 차트 등)를 LLM이 이해하기 쉬운 구조화된 텍스트로 변환.
3.  **Solar LLM (Reasoning)**: 추출된 텍스트를 분석하여 긍/부정 스코어링 및 핵심 투자 포인트 도출.
4.  **Structured Output**: 분석 결과를 **JSON 형식**으로 강제 출력하여 데이터 일관성 확보.
5.  **n8n Workflow**: 구조화된 데이터를 기반으로 Gmail, Notion, Discord 등 맞춤형 뉴스레터 자동 발행.

---

## ✨ Key Technical Features

### 1. Document AI 기반 실무형 분석
단순 텍스트 기사뿐만 아니라 **기업 실적표(Table)**나 **IR 자료**를 정확히 인식합니다. Upstage Document Parse를 통해 복잡한 표 데이터를 Markdown으로 변환하여 분석의 정밀도를 높였습니다.

### 2. JSON 기반 데이터 구조화 (Structured Output)
AI의 답변을 단순 문장이 아닌 **데이터(Data)**로 취급합니다. 
```json
{
  "company": "삼성전자",
  "market_sentiment": 82,
  "signal": "Positive",
  "key_metrics": { "HBM_demand": "High", "Operating_Profit": "8.2T" },
  "summary": ["HBM 매출 비중 확대", "AI 서버용 메모리 수요 지속"]
}
