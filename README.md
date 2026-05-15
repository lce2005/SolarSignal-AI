# SolarSignal-AI: Intelligent Stock Analysis & Automation Pipeline ☀️📈

**Lee Chae-eun** *Department of Artificial Intelligence Engineering, Sookmyung Women's University*

---

## 📌 Overview
현대 투자자들은 과도한 정보 노이즈(Information Noise)로 인해 중요한 시장 시그널을 놓치는 경우가 많습니다. 본 프로젝트는 **Upstage Solar LLM**의 정교한 한국어 문맥 분석 능력과 **n8n**의 워크플로우 자동화를 결합하여 이 문제를 해결합니다.

* **Problem**: 비정형 뉴스 데이터의 과부하, 자극적인 헤드라인으로 인한 정보 왜곡.
* **Solution**: AI 기반의 객관적 팩트 추출 및 데이터 구조화(JSON)를 통한 자동 분석 시스템 구축.

---

## 🛠 System Architecture
> 본 시스템은 **Multi-Agent** 구조를 채택하여 데이터의 정확성과 처리 속도를 극대화했습니다.

1. **Data Ingestion**: NewsAPI를 통해 특정 종목의 최신 기사 수집.
2. **Analysis (Solar LLM)**: 핵심 팩트 3줄 요약 및 긍/부정 시그널 판단.
3. **Automation (n8n)**: 추출된 데이터를 기반으로 뉴스레터 자동 생성 및 발송.

---

## ✨ Key Features
* **Semantic Summarization**: 단순 요약이 아닌 인과관계 중심의 문맥 요약.
* **Structured Data**: 비정형 기사를 JSON 형식으로 변환하여 DB 연동 지원.
* **Impact Scoring**: 호재와 악재를 수치화(0-100)하여 객관적 지표 제공.

---

## 🚀 Getting Started
```bash
git clone [https://github.com/lce2005/SolarSignal-AI.git](https://github.com/lce2005/SolarSignal-AI.git)
pip install -r requirements.txt
