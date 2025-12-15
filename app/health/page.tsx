import React from 'react';
import { Pill, Phone, Gift, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function HealthPage() {
  return (
    <div className="min-h-screen bg-green-50 text-gray-900 font-sans">
      {/* 상단 헤더: 뒤로가기 + 로고 */}
      <header className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center text-gray-500 hover:text-green-600">
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm">메인으로</span>
        </Link>
        <h1 className="text-lg font-bold text-green-800">PharmaD 케어</h1>
        <div className="w-16"></div> {/* 레이아웃 균형용 빈칸 */}
      </header>

      <main className="max-w-md mx-auto p-6 flex flex-col gap-6 mt-4">
        {/* 환영 메시지 */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold mb-2">방문해 주셔서 감사합니다!</h2>
          <p className="text-gray-600">
            약사 PharmaD가 꼼꼼하게 챙겨드리는<br/>
            당신의 건강 파트너입니다.
          </p>
        </div>

        {/* 핵심 기능 버튼 3개 (모바일 최적화) */}
        
        {/* 1. 복약 정보 확인 */}
        <button className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 hover:bg-green-50 transition-all border border-green-100">
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <Pill className="w-8 h-8" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-800">내 약 정보 확인하기</h3>
            <p className="text-sm text-gray-500">지금 드시는 약의 효능과 주의사항</p>
          </div>
        </button>

        {/* 2. 1:1 건강 상담 */}
        <button className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 hover:bg-blue-50 transition-all border border-blue-100">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <Phone className="w-8 h-8" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-800">1:1 약사 상담</h3>
            <p className="text-sm text-gray-500">궁금한 점을 바로 물어보세요</p>
          </div>
        </button>

        {/* 3. 이벤트/혜택 */}
        <button className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-2xl shadow-lg flex items-center gap-4 text-white hover:opacity-90 transition-all transform hover:scale-105">
          <div className="bg-white/20 p-3 rounded-full text-white">
            <Gift className="w-8 h-8" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold">건기식 10% 할인받기</h3>
            <p className="text-sm text-green-100">PharmaD 구독자 전용 혜택</p>
          </div>
        </button>

      </main>

      <footer className="mt-12 text-center text-gray-400 text-sm pb-8">
        © 2025 PharmaD. All rights reserved.
      </footer>
    </div>
  );
}