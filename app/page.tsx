import React from 'react';
import { ArrowRight, Building2, Pill, Youtube, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* 1. 상단 내비게이션 바 (GNB) */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-900">PharmaD</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-blue-900 transition-colors">소개</a>
              <a href="#portfolio" className="text-gray-600 hover:text-blue-900 transition-colors">포트폴리오</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-900 transition-colors">문의하기</a>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. 히어로 섹션 (대문) */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            신뢰를 바탕으로 가치를 드립니다
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
            약학의 전문성과<br />
            부동산의 <span className="text-blue-600">통찰력</span>을 잇다.
          </h1>
          
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            안녕하세요, <strong>PharmaD</strong>입니다.<br/>
            건강을 지키는 약사이자, 자산을 불리는 공인중개사로서<br/>
            당신의 삶에 가장 확실한 솔루션을 제안합니다.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              프로필 자세히 보기 <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all">
              협업/문의 요청
            </button>
          </div>
        </div>
      </section>

      {/* 3. 주요 서비스 요약 (카드 섹션) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 카드 1: 약사 정체성 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                <Pill className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Pharmacist</h3>
              <p className="text-gray-500 mb-6">
                정확한 복약지도와 건강 상담.<br/>
                약봉투 QR을 통한 스마트한 케어 시스템.
              </p>
              <a href="#" className="text-blue-600 font-medium flex items-center hover:underline">
                복약지도 서비스 <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* 카드 2: 공인중개사 정체성 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 text-green-600">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Real Estate</h3>
              <p className="text-gray-500 mb-6">
                약국 입지 분석부터 개국 컨설팅까지.<br/>
                전문가의 시선으로 가치를 분석합니다.
              </p>
              <a href="#" className="text-green-600 font-medium flex items-center hover:underline">
                부동산 컨설팅 <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* 카드 3: ReaLanguage */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6 text-red-600">
                <Youtube className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">ReaLanguage</h3>
              <p className="text-gray-500 mb-6">
                일본어, 중국어, 영어 뉘앙스 차이 완벽 정리.<br/>
                AI 기술을 활용한 숏폼 콘텐츠.
              </p>
              <a href="#" className="text-red-600 font-medium flex items-center hover:underline">
                콘텐츠 보러가기 <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}