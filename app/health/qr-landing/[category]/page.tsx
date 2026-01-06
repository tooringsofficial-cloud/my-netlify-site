"use client";

import React from 'react';
import { 
  ArrowLeft, Gift, Briefcase, Calculator, Building, 
  BookOpen, Lightbulb, MapPin, Phone, Calendar
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// --- [카테고리별 데이터 설정] ---
// 각 주소(slug)에 따라 보여줄 제목, 아이콘, 색상, 예시 데이터를 정의합니다.
const categoryData: Record<string, any> = {
  'benefits': {
    title: '우리동네 혜택',
    subtitle: '쿠폰, 할인 정보',
    icon: Gift,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
    items: [
      { title: '카페 데이빗', desc: '아메리카노 10% 할인 (약국 영수증 지참)', tag: '상시할인', loc: '대치동 123' },
      { title: '스포짐 헬스장', desc: '1일 무료 체험권 증정', tag: '선착순', loc: '대치사거리' },
      { title: '성수 베이글', desc: '크림치즈 무료 증정 이벤트', tag: '이벤트', loc: '도곡로 45길' },
      { title: '바른 안경원', desc: '블루라이트 차단 렌즈 50% 할인', tag: '제휴', loc: '은마아파트 앞' },
    ]
  },
  'jobs': {
    title: '우리동네 일자리',
    subtitle: '알바, 직원 채용',
    icon: Briefcase,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    items: [
      { title: '푸른 약국', desc: '오후 파트타임 구합니다 (전산 보조)', tag: '급구', loc: '대치동' },
      { title: '파리바게트', desc: '주말 마감 알바 모집 (경력자 우대)', tag: '채용중', loc: '한티역' },
      { title: '서울 내과', desc: '간호조무사 정규직 채용', tag: '정규직', loc: '대치역 3번출구' },
    ]
  },
  'tips': {
    title: '우리동네 꿀팁',
    subtitle: '생활 정보, 소식',
    icon: Lightbulb,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-100',
    items: [
      { title: '대치2동 분리수거 요일 변경', desc: '다음주부터 목요일 배출로 변경됩니다.', tag: '공지', date: '2025.11.01' },
      { title: '양재천 벚꽃 개화 상황', desc: '이번 주말이 절정일 것 같아요! (사진 있음)', tag: '정보', date: '2025.04.05' },
      { title: '주말 문 여는 약국 리스트', desc: '갑자기 아플 때 참고하세요.', tag: '건강', date: '상시' },
    ]
  },
  'consulting': {
    title: '전문가 상담 예약',
    subtitle: '세무, 법무, 부동산',
    icon: Calculator,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-100',
    items: [
      { title: '김세무 세무사', desc: '상속세/증여세 무료 기초 상담 (30분)', tag: '세무', contact: '예약가능' },
      { title: '이법률 변호사', desc: '임대차 계약 관련 법률 자문', tag: '법률', contact: '상담대기' },
      { title: '박부동 공인중개사', desc: '상가 임대차 보호법 관련 상담', tag: '부동산', contact: '예약가능' },
    ]
  },
  'columns': {
    title: '전문가 칼럼',
    subtitle: '건강, 재테크 지식',
    icon: BookOpen,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    items: [
      { title: '환절기 알레르기 비염 관리법', desc: '약사가 알려주는 생활 속 꿀팁 3가지', tag: '건강', author: '김약사' },
      { title: '지금 주목해야 할 동네 상권', desc: '부동산 전문가의 대치동 상권 분석', tag: '부동산', author: '성상현 대표' },
      { title: '13월의 월급, 연말정산 꿀팁', desc: '놓치기 쉬운 의료비 공제 항목', tag: '세무', author: '이세무사' },
    ]
  },
  'real-estate': {
    title: '부동산 매물',
    subtitle: '검증된 추천 매물',
    icon: Building,
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    items: [
      { title: '대치동 1층 상가 임대', desc: '실평수 15평, 유동인구 많음, 권리금 협의', tag: '임대', price: '보 5000 / 월 350' },
      { title: '은마 아파트 전세', desc: '올수리 완료, 즉시 입주 가능, 남향', tag: '전세', price: '전세 8억' },
      { title: '역세권 꼬마빌딩', desc: '수익률 4% 이상, 리모델링 추천', tag: '매매', price: '매매 55억' },
    ]
  }
};

export default function CategoryDetailPage() {
  const params = useParams();
  const category = params.category as string; // URL에서 category 부분 가져오기
  const data = categoryData[category];

  // 데이터가 없는 경우 (잘못된 주소)
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <p className="text-slate-500 mb-4">존재하지 않는 페이지입니다.</p>
        <Link href="/health/qr-landing" className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm">돌아가기</Link>
      </div>
    );
  }

  const Icon = data.icon;

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      {/* --- Sticky Header --- */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-4 p-4 max-w-md mx-auto">
            <Link href="/health/qr-landing" className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6"/>
            </Link>
            <h1 className="font-bold text-lg text-slate-900">{data.title}</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4">
        
        {/* --- Hero Section (Title Card) --- */}
        <div className={`${data.bg} p-6 rounded-3xl mb-8 flex items-center gap-5 border ${data.border}`}>
            <div className={`w-16 h-16 bg-white rounded-full flex items-center justify-center ${data.color} shadow-sm`}>
                <Icon className="w-8 h-8"/>
            </div>
            <div>
                <h2 className={`text-2xl font-extrabold ${data.color.replace('text-', 'text-slate-900 ')}`}>{data.title}</h2>
                <p className="text-slate-500 font-medium">{data.subtitle}</p>
            </div>
        </div>

        {/* --- List Items --- */}
        <div className="space-y-4">
            {data.items.map((item: any, idx: number) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-green-500 hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-green-700 transition-colors">{item.title}</h3>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${data.bg} ${data.color}`}>
                            {item.tag}
                        </span>
                    </div>
                    <p className="text-slate-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                        {item.desc}
                    </p>
                    
                    {/* 하단 메타 정보 (조건부 렌더링) */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 border-t border-slate-50 pt-3">
                        {item.loc && (
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {item.loc}</span>
                        )}
                        {item.contact && (
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {item.contact}</span>
                        )}
                        {item.date && (
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {item.date}</span>
                        )}
                        {item.price && (
                            <span className="font-bold text-slate-700">{item.price}</span>
                        )}
                        {item.author && (
                            <span className="text-slate-500">By. {item.author}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>

        {/* --- Bottom Action --- */}
        <div className="mt-12 text-center">
            <p className="text-xs text-slate-400 mb-4">원하는 정보가 없으신가요?</p>
            <button className="w-full py-4 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-colors">
                PharmaD에 정보 요청하기
            </button>
        </div>

      </main>
    </div>
  );
}