"use client";

import React, { Suspense } from 'react';
import { 
  MapPin, Gift, Briefcase, Calculator, Building, 
  BookOpen, Lightbulb, ChevronRight, Star
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// 1. 실제 내용을 보여주는 컴포넌트 (검색 파라미터 사용)
function QRLandingContent() {
  const searchParams = useSearchParams();
  // URL에서 동네 이름을 가져오거나 기본값 사용
  const townName = searchParams.get('town') || '대치동'; 

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
        
      {/* --- 1. Header (약국 정보) --- */}
      <header className="bg-slate-900 text-white p-6 pb-12 rounded-b-[2.5rem] relative shadow-md">
        <Link href="/health" className="absolute top-6 left-6 opacity-70 text-sm hover:opacity-100 flex items-center">
            <ChevronRight className="w-4 h-4 rotate-180" /> 서비스 소개로 돌아가기
        </Link>
        <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-1 opacity-80 text-sm font-medium mb-2 bg-slate-800 px-3 py-1 rounded-full">
                <MapPin className="w-3 h-3"/> 서울시 강남구 {townName}
            </div>
            <h1 className="text-2xl font-bold mb-2">{townName} 푸른 약국</h1>
            <p className="text-slate-300 text-sm">방문해주셔서 감사합니다. 건강하세요!</p>
        </div>
      </header>

      {/* --- Main Content Container --- */}
      <main className="px-4 -mt-8 pb-12 space-y-6 relative z-10 max-w-md mx-auto">
        
        {/* --- 2. Premium Ad: 우리 동네 주목할 가게 (Story Base) --- */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                <Star className="w-3 h-3 fill-current"/> 주목할 가게
            </div>
            <div className="flex gap-4 items-start mt-2">
                {/* 이미지 placeholder */}
                <div className="w-20 h-20 bg-slate-200 rounded-xl shrink-0 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs font-bold">IMG</div>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-900">성수 베이글 맛집, {townName} 상륙!</h3>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                        매일 아침 직접 굽는 쫄깃한 베이글. 약국 영수증 보여주시면 크림치즈 무료 증정 이벤트 중입니다.
                    </p>
                    <button className="mt-3 text-xs font-bold text-green-700 flex items-center">
                        이야기 더 보기 <ChevronRight className="w-3 h-3 ml-0.5"/>
                    </button>
                </div>
            </div>
        </section>

        {/* --- 3. Categories Grid (6개 메뉴) --- */}
        <section className="grid grid-cols-2 gap-3">
            
            {/* Card 1: 우리동네 혜택 */}
            <button className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-green-500 transition-all text-left group">
                <div className="bg-red-100 w-10 h-10 rounded-lg flex items-center justify-center text-red-600 mb-3 group-hover:bg-red-200 transition-colors">
                    <Gift className="w-5 h-5"/>
                </div>
                <h4 className="font-bold text-slate-900">우리동네 혜택</h4>
                <p className="text-xs text-slate-500 mt-1">쿠폰, 할인 정보</p>
            </button>

             {/* Card 2: 우리동네 일자리 */}
             <button className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-500 transition-all text-left group">
                <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center text-blue-600 mb-3 group-hover:bg-blue-200 transition-colors">
                    <Briefcase className="w-5 h-5"/>
                </div>
                <h4 className="font-bold text-slate-900">우리동네 일자리</h4>
                <p className="text-xs text-slate-500 mt-1">알바, 직원 채용</p>
            </button>

             {/* Card 3: 우리동네 꿀팁 */}
             <button className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-yellow-500 transition-all text-left group">
                <div className="bg-yellow-100 w-10 h-10 rounded-lg flex items-center justify-center text-yellow-600 mb-3 group-hover:bg-yellow-200 transition-colors">
                    <Lightbulb className="w-5 h-5"/>
                </div>
                <h4 className="font-bold text-slate-900">우리동네 꿀팁</h4>
                <p className="text-xs text-slate-500 mt-1">생활 정보, 소식</p>
            </button>

             {/* Card 4: 전문가 상담 예약 */}
             <button className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-green-500 transition-all text-left group">
                <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center text-green-600 mb-3 group-hover:bg-green-200 transition-colors">
                    <Calculator className="w-5 h-5"/>
                </div>
                <h4 className="font-bold text-slate-900">전문가 상담 예약</h4>
                <p className="text-xs text-slate-500 mt-1">세무, 법무, 부동산</p>
            </button>

             {/* Card 5: PharmaD 전문가 칼럼 */}
             <button className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-purple-500 transition-all text-left group">
                <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center text-purple-600 mb-3 group-hover:bg-purple-200 transition-colors">
                    <BookOpen className="w-5 h-5"/>
                </div>
                <h4 className="font-bold text-slate-900">전문가 칼럼</h4>
                <p className="text-xs text-slate-500 mt-1">건강, 재테크 지식</p>
            </button>

             {/* Card 6: 부동산 매물 */}
             <button className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-slate-500 transition-all text-left group">
                <div className="bg-slate-100 w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 mb-3 group-hover:bg-slate-200 transition-colors">
                    <Building className="w-5 h-5"/>
                </div>
                <h4 className="font-bold text-slate-900">부동산 매물</h4>
                <p className="text-xs text-slate-500 mt-1">검증된 추천 매물</p>
            </button>

        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 py-8 text-center text-xs">
        <p className="mb-1 font-bold text-white">PharmaD</p>
        <p>약국과 동네 상권을 잇다</p>
      </footer>

    </div>
  );
}

// 2. 메인 페이지 컴포넌트 (Suspense로 감싸기)
export default function QRLandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-100 flex items-center justify-center font-bold text-slate-500">로딩중...</div>}>
      <QRLandingContent />
    </Suspense>
  );
}