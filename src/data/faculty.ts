import type { FacultyMember } from '@/types';

/**
 * ICT융합학부 교수진 23명.
 * 출처: ict.ulsan.ac.kr/ict/6629 교수소개.
 *
 * 원 페이지에는 명예교수 22명·산학협력중점교원 3명·연구교수 1명·초빙교수 1명이
 * 함께 실려 있으나 여기에는 교수·부교수·조교수만 담는다.
 *
 * 김명균 교수는 명예교수가 되어 뺐다. 2026-08-16 기준 페이지에는 아직 '교수'로
 * 남아 있는데, 같은 날 명예교수 명단이 새로 붙은 걸 보면 반영이 늦은 것으로 보인다.
 *
 * 연구분야 표기가 없는 경우가 있어 fields 를 비운다.
 * 빈 배열은 "없음"이 아니라 "공개 안 됨"이다 — 화면에서도 그렇게 표시한다.
 */
export const FACULTY: FacultyMember[] = [
  {
    name: '권영근',
    rank: 'PROFESSOR',
    fields: ['진화연산', '기계학습', '생물정보학', '금융시장예측'],
    tel: '052-259-2728',
    email: 'kwonyk@ulsan.ac.kr',
  },
  {
    name: '김유라',
    rank: 'PROFESSOR',
    fields: ['응용수학', '확률', '통신수학'],
    tel: '052-259-2318',
    email: 'yrkim@ulsan.ac.kr',
  },
  {
    name: '김종면',
    rank: 'PROFESSOR',
    fields: ['산업인공지능', '고장예측진단', '임베디드시스템'],
    tel: '052-259-2217',
    email: 'jmkim07@ulsan.ac.kr',
    note: 'SW중심대학사업단장',
  },
  {
    name: '김지은',
    rank: 'PROFESSOR',
    fields: ['실험 통사-의미론'],
    tel: '052-259-2523',
    email: 'kimje@ulsan.ac.kr',
  },
  {
    name: '박창권',
    rank: 'PROFESSOR',
    fields: ['생산일정계획'],
    tel: '052-259-2853',
    email: 'ckpark@mail.ulsan.ac.kr',
  },
  {
    name: '심인보',
    rank: 'PROFESSOR',
    fields: ['편미분방정식', '비선형 해석학'],
    tel: '052-259-2314',
    email: 'ibsim@ulsan.ac.kr',
  },
  {
    name: '윤석훈',
    rank: 'PROFESSOR',
    fields: ['지능형네트워크', '최적화알고리즘', '인공지능기반 금융공학'],
    tel: '052-259-1403',
    email: 'seokhoonyoon@ulsan.ac.kr',
  },
  {
    name: '이현호',
    rank: 'PROFESSOR',
    fields: ['함수해석', '작용소대수', '비가환 기하학', '양자정보이론'],
    tel: '052-259-2581',
    email: 'hadamard@ulsan.ac.kr',
  },
  {
    name: '장준명',
    rank: 'PROFESSOR',
    fields: ['대수기하학'],
    tel: '052-259-2704',
    email: 'jmjang@ulsan.ac.kr',
  },
  {
    name: '정기효',
    rank: 'PROFESSOR',
    fields: ['인간공학', '산업안전보건', '데이터 분석'],
    tel: '052-259-2709',
    email: 'kjung@ulsan.ac.kr',
  },
  {
    name: '조지운',
    rank: 'PROFESSOR',
    fields: ['산업공학'],
    tel: '052-259-2287',
    email: 'chiwoon6@ulsan.ac.kr',
  },
  {
    name: '추상목',
    rank: 'PROFESSOR',
    fields: ['시스템 생물학', '인공신경망', '수치해석'],
    tel: '052-259-2312',
    email: 'smchoo@ulsan.ac.kr',
  },

  {
    name: '이수동',
    rank: 'ASSOCIATE',
    fields: ['데이터 분석', '기계학습', '인공지능', '데이터 마이닝'],
    tel: '052-259-2174',
  },
  {
    name: '정진호',
    rank: 'ASSOCIATE',
    fields: ['정보이론', '연합학습', '물리계층 보안'],
    tel: '052-259-1644',
  },
  {
    name: '조동식',
    rank: 'ASSOCIATE',
    fields: ['VR', 'AR', '메타버스', 'HCI', '가상 인물'],
    tel: '052-259-1647',
  },
  {
    name: '황규선',
    rank: 'ASSOCIATE',
    fields: ['산업경영공학'],
    tel: '052-259-2175',
  },

  {
    name: '고동현',
    rank: 'ASSISTANT',
    fields: ['인간-컴퓨터 상호작용', 'UX 디자인'],
  },
  {
    name: '김대열',
    rank: 'ASSISTANT',
    fields: ['생체신호처리', '원격광혈류측정', '블록체인 기반 연합학습'],
  },
  {
    name: '김대환',
    rank: 'ASSISTANT',
    fields: ['컴퓨터 비전', '딥러닝', '머신러닝', '인공지능'],
  },
  {
    name: '안대한',
    rank: 'ASSISTANT',
    fields: ['산업인공지능', '지능형시스템'],
  },
  { name: '이세호', rank: 'ASSISTANT', fields: ['인공지능'] },
  { name: '진동섭', rank: 'ASSISTANT', fields: ['SW 전 분야'] },
  { name: '최영근', rank: 'ASSISTANT', fields: ['산업경영공학'] },
];

export const RANK_LABEL: Record<FacultyMember['rank'], string> = {
  PROFESSOR: '교수',
  ASSOCIATE: '부교수',
  ASSISTANT: '조교수',
};
