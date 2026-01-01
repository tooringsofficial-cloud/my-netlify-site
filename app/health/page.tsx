"use client";

import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, ChevronRight, Store, TrendingUp, 
  CheckCircle, Users, Briefcase, Calculator, 
  Megaphone, HeartPulse, Building, ShoppingBag, Send, 
  Gift, XCircle, Target, BookOpen, Lightbulb
} from 'lucide-react';
import Link from 'next/link';

// --- [1. 대한민국 행정구역 풀 데이터] ---
const locationData: Record<string, Record<string, string[]>> = {
  '서울특별시': {
    '강남구': ['대치동', '도곡동', '삼성동', '역삼동', '신사동', '압구정동', '청담동', '논현동', '개포동', '일원동'],
    '서초구': ['서초동', '잠원동', '반포동', '방배동', '양재동', '내곡동'],
    '송파구': ['잠실동', '가락동', '문정동', '방이동', '오금동', '석촌동', '삼전동'],
    '강동구': ['천호동', '명일동', '상일동', '성내동'],
    '마포구': ['서교동', '연남동', '망원동', '상암동', '공덕동'],
    '영등포구': ['여의도동', '당산동', '문래동'],
    '종로구': ['혜화동', '평창동', '종로1.2.3.4가동'],
    '중구': ['명동', '을지로동', '신당동'],
    '용산구': ['한남동', '이태원동', '이촌동'],
    '성동구': ['성수동', '옥수동', '왕십리동'],
    '광진구': ['자양동', '구의동', '화양동'],
    '서대문구': ['신촌동', '연희동'],
  },
  '경기도': {
    '성남시 분당구': ['정자동', '판교동', '수내동', '서현동', '이매동', '야탑동'],
    '수원시 영통구': ['영통동', '매탄동', '광교동'],
    '용인시 수지구': ['풍덕천동', '동천동', '죽전동'],
    '고양시 일산동구': ['장항동', '마두동'],
    '안양시 동안구': ['평촌동', '범계동'],
    '하남시': ['미사동', '위례동'],
    '화성시': ['동탄동', '반송동'],
  },
  '부산광역시': { '해운대구': ['우동', '좌동', '중동'], '부산진구': ['부전동', '전포동'] },
  '대구광역시': { '수성구': ['범어동', '만촌동', '황금동'] },
  '인천광역시': { '연수구': ['송도동'], '서구': ['청라동'] },
  '광주광역시': { '서구': ['치평동', '풍암동'], '동구': ['동명동'] },
  '대전광역시': { '유성구': ['봉명동', '도룡동'], '서구': ['둔산동'] },
  '울산광역시': { '남구': ['삼산동'] },
  '세종특별자치시': { '세종시': ['나성동', '어진동', '도담동'] },
  '제주특별자치도': { '제주시': ['노형동', '연동'] }
};

export default function PharmaDServicePage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  
  // 탭 상태
  const [activeTab, setActiveTab] = useState<'patient' | 'pharmacist' | 'advertiser'>('patient');

  // --- [스크롤 이동 함수] ---
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 탭 변경 및 해당 섹션으로 스크롤
  const handleTabChange = (tab: 'patient' | 'pharmacist' | 'advertiser') => {
    setActiveTab(tab);
    scrollToSection('persona-details');
  };

  const resetSelection = () => {
    setSelectedCity(null);
    setSelectedDistrict(null);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* --- [Sticky Header: 네이비 톤 적용] --- */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm transition-all h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          
          {/* Left */}
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="flex items-center text-slate-500 hover:text-green-700 text-sm font-medium">
              <ArrowLeft className="w-4 h-4 mr-1" /> 메인으로
            </Link>
          </div>
          
          {/* Center: Logo (로고 색상: 네이비) */}
          <div className="shrink-0">
            <button onClick={handleLogoClick} className="font-extrabold text-2xl text-slate-900 tracking-tighter hover:scale-105 transition-transform">
              PharmaD
            </button>
          </div>
          
          {/* Right: Menu (포인트 색상: 초록) */}
          <div className="flex-1 flex items-center justify-end">
            <nav className="hidden md:flex gap-6 text-sm font-bold text-slate-600 items-center">
              <button onClick={() => scrollToSection('intro')} className="hover:text-green-700 transition">소개</button>
              <button onClick={() => scrollToSection('overview')} className="hover:text-green-700 transition">서비스</button>
              <button onClick={() => scrollToSection('locations')} className="hover:text-green-700 transition">우리동네 혜택 확인하기</button>
              <button onClick={() => scrollToSection('contact')} className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition">문의하기</button>
            </nav>
          </div>

        </div>
      </header>

      {/* --- [1. Intro: 선순환 구조 (Hero) - 네이비/그린 테마] --- */}
      <section id="intro" className="pt-16 pb-16 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto text-center animate-fadeIn">
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-slate-900">
            약국과 동네 상권을 잇는<br/>
            <span className="text-green-700">선순환 플랫폼, PharmaD</span>
          </h1>
          
          <p className="text-slate-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            한 번 보고 버리는 전단지가 아닙니다.<br/>
            <strong>평균 3일간 보유하는 '약봉투'의 신뢰</strong>를 빌려<br/>
            가장 확실한 우리 동네 타겟 마케팅을 실현합니다.
          </p>

          {/* Win-Win-Win 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-slate-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-slate-700"><HeartPulse className="w-7 h-7" /></div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">약국 (Pharmacy)</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                방문 환자에게 <strong>'우리 동네 혜택'</strong>을 제공하여 재방문율을 높이고, 단골 고객을 확보합니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-green-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-green-700"><Store className="w-7 h-7" /></div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">동네 상권 (Biz)</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                약사라는 <strong>전문가의 신뢰</strong>가 담긴 매체에 광고하며, 버려지지 않는 높은 노출 효과를 누립니다.
              </p>
            </div>

             <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-slate-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-slate-700"><Users className="w-7 h-7" /></div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">환자 (Customer)</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                QR 스캔 한 번으로 <strong>쿠폰, 일자리, 전문가 상담</strong> 등 실생활에 필요한 알짜 정보를 얻습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- [Ecosystem Overview - 네이비 톤 강조] --- */}
      <section id="overview" className="py-16 px-4 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto animate-fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold mb-4 text-slate-900">PharmaD Ecosystem</h2>
              <p className="text-slate-500">환자에게는 혜택을, 파트너에게는 성장의 기회를 제공합니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Left: QR Content */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 border-l-4 border-green-700 pl-3">
                  QR 스캔 시 제공되는 콘텐츠
                </h3>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    {/* 아이콘 색상들을 네이비/그린 톤에 맞게 조정 */}
                    <div className="p-5 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-4">
                        <div className="bg-green-50 p-3 rounded-xl text-green-700 h-fit"><Gift className="w-5 h-5"/></div>
                        <div><h4 className="font-bold text-slate-900">우리 동네 혜택 & 쿠폰</h4><p className="text-xs text-slate-500 mt-1">주변 맛집, 카페, 헬스장 할인</p></div>
                    </div>
                    <div className="p-5 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-4">
                        <div className="bg-slate-100 p-3 rounded-xl text-slate-700 h-fit"><Briefcase className="w-5 h-5"/></div>
                        <div><h4 className="font-bold text-slate-900">우리 동네 일자리 (구인구직)</h4><p className="text-xs text-slate-500 mt-1">약국 및 인근 아르바이트 정보</p></div>
                    </div>
                    <div className="p-5 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-4">
                        <div className="bg-green-50 p-3 rounded-xl text-green-700 h-fit"><Calculator className="w-5 h-5"/></div>
                        <div><h4 className="font-bold text-slate-900">전문가 상담 예약 & 칼럼</h4><p className="text-xs text-slate-500 mt-1">세무, 부동산, 법률 전문가 연결</p></div>
                    </div>
                    <div className="p-5 hover:bg-slate-50 transition-colors flex gap-4">
                        <div className="bg-slate-100 p-3 rounded-xl text-slate-700 h-fit"><Building className="w-5 h-5"/></div>
                        <div><h4 className="font-bold text-slate-900">추천 부동산 매물</h4><p className="text-xs text-slate-500 mt-1">PharmaD가 검증한 알짜 매물</p></div>
                    </div>
                </div>
              </div>

              {/* Right: Partner Benefits */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 border-l-4 border-slate-700 pl-3">
                  파트너 제공 서비스
                </h3>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
                            <HeartPulse className="w-5 h-5 text-slate-700"/> 약국장님께 드리는 혜택
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-700 shrink-0"/> 약봉투 무상/저가 공급 (비용 절감)</li>
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-700 shrink-0"/> 경영 리포트 (상권 분석 데이터)</li>
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-700 shrink-0"/> 구인구직 (약국 직원 채용 공고 무료)</li>
                        </ul>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
                            <Store className="w-5 h-5 text-green-700"/> 광고주님께 드리는 혜택
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-700 shrink-0"/> 네이버 플레이스 관리 (검색 노출)</li>
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-700 shrink-0"/> 전문가 매칭 (세무/부동산 1:1 상담)</li>
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-700 shrink-0"/> 초정밀 타겟팅 (건강 관심층 집중 공략)</li>
                        </ul>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* --- [남색 박스 (Perspective Selector) - 네이비 배경 적용] --- */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center bg-slate-900 rounded-3xl p-8 shadow-2xl animate-fadeIn">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center justify-center gap-2">
                👀 누구의 입장에서 확인해 볼까요?
            </h3>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
                {/* 1. 환자 체험 버튼 */}
                <button 
                    onClick={() => handleTabChange('patient')}
                    className={`flex-1 p-5 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 ${activeTab === 'patient' ? 'bg-green-700 text-white shadow-lg scale-105' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
                >
                    <div className={`${activeTab === 'patient' ? 'bg-white/20' : 'bg-slate-100'} p-2 rounded-full`}><Gift className={`w-5 h-5 ${activeTab === 'patient' ? 'text-white' : 'text-slate-700'}`}/></div>
                    <span className="font-bold text-lg">환자 체험</span>
                </button>

                {/* 2. 약사 안내 버튼 */}
                <button 
                    onClick={() => handleTabChange('pharmacist')}
                    className={`flex-1 p-5 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 ${activeTab === 'pharmacist' ? 'bg-slate-700 text-white shadow-lg scale-105' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
                >
                    <div className={`${activeTab === 'pharmacist' ? 'bg-white/20' : 'bg-slate-100'} p-2 rounded-full`}><HeartPulse className={`w-5 h-5 ${activeTab === 'pharmacist' ? 'text-white' : 'text-slate-700'}`}/></div>
                    <span className="font-bold text-lg">약사님 안내</span>
                </button>

                {/* 3. 광고주 안내 버튼 */}
                <button 
                    onClick={() => handleTabChange('advertiser')}
                    className={`flex-1 p-5 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 ${activeTab === 'advertiser' ? 'bg-green-700 text-white shadow-lg scale-105' : 'bg-white text-slate-700 hover:bg-green-50'}`}
                >
                    <div className={`${activeTab === 'advertiser' ? 'bg-white/20' : 'bg-green-50'} p-2 rounded-full`}><Megaphone className={`w-5 h-5 ${activeTab === 'advertiser' ? 'text-white' : 'text-green-700'}`}/></div>
                    <span className="font-bold text-lg">광고주 안내</span>
                </button>
            </div>
        </div>
      </section>

      {/* --- [3. Dynamic Content Area (상세 내용)] --- */}
      <section id="persona-details" className="min-h-[600px] bg-white py-16 px-4">
        
        {/* === VIEW 1: Patient (QR 랜딩페이지 데모 연결 유도) === */}
        {activeTab === 'patient' && (
          <div className="max-w-4xl mx-auto animate-fadeIn text-center">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-3 text-slate-900">환자는 이런 화면을 보게 됩니다</h2>
              <p className="text-slate-500">약봉투의 QR코드를 스마트폰으로 스캔했을 때 나타나는<br/><strong>모바일 웹 혜택 페이지 데모</strong>를 확인해보세요.</p>
            </div>
            
            <Link href="/health/qr-landing" className="inline-flex items-center gap-2 bg-green-700 text-white font-bold px-8 py-4 rounded-2xl hover:bg-green-800 shadow-lg transition-transform hover:-translate-y-1 text-lg">
              <Gift className="w-6 h-6"/> QR 랜딩페이지 데모 체험하기
            </Link>

            <div className="mt-12 opacity-50 pointer-events-none select-none filter blur-sm transition-all hover:blur-0 hover:opacity-100">
                <p className="text-sm text-slate-400 mb-4">(데모 페이지 미리보기)</p>
                {/* (기존 모바일 목업은 새 페이지로 이동했으므로 여기선 흐릿하게 보여주거나 생략) */}
                <img src="/qr-landing-preview.png" alt="QR Landing Preview" className="max-w-sm mx-auto rounded-[2.5rem] border-8 border-slate-800 shadow-2xl"/>
            </div>
          </div>
        )}

        {/* === VIEW 2: Pharmacist (네이비/그린 톤) === */}
        {activeTab === 'pharmacist' && (
          <div className="max-w-5xl mx-auto animate-fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">약국장님을 위한 3가지 약속</h2>
              <p className="text-slate-500">단순 소모품 비용 절감을 넘어, 경영에 필요한 데이터를 드립니다.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-slate-700">
                <ShoppingBag className="w-10 h-10 text-slate-700 mb-4"/>
                <h3 className="text-xl font-bold mb-2">약봉투 비용 0원 도전</h3>
                <p className="text-slate-600 text-sm">제휴 등급에 따라 고품질 컬러 약봉투를 무상 또는 시장 최저가로 정기 공급해 드립니다.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-slate-700">
                <TrendingUp className="w-10 h-10 text-slate-700 mb-4"/>
                <h3 className="text-xl font-bold mb-2">상권 분석 리포트</h3>
                <p className="text-slate-600 text-sm">QR 스캔 데이터를 분석하여, 내 약국 방문객의 관심사와 이동 경로를 리포트로 제공합니다.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-slate-700">
                <Briefcase className="w-10 h-10 text-slate-700 mb-4"/>
                <h3 className="text-xl font-bold mb-2">구인난 해결</h3>
                <p className="text-slate-600 text-sm">PharmaD 지역 구인 게시판에 '채용 공고'를 무료로 상단 노출해 드립니다.</p>
              </div>
            </div>
            <div className="text-center">
              <button onClick={() => scrollToSection('contact')} className="bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-800 shadow-lg transition-transform hover:-translate-y-1">
                 제휴 약국 신청하기 (문의)
              </button>
            </div>
          </div>
        )}

        {/* === VIEW 3: Advertiser & Pricing (네이비/그린 톤) === */}
        {activeTab === 'advertiser' && (
          <div className="max-w-6xl mx-auto animate-fadeIn">
            
            {/* Value Proposition */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">약봉투 광고, 왜 효과적일까요?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex gap-4 items-start shadow-sm">
                    <div className="bg-red-50 p-3 rounded-lg"><XCircle className="w-6 h-6 text-red-500"/></div>
                    <div>
                        <h4 className="font-bold text-lg mb-1">전단지: 3초 후 쓰레기통</h4>
                        <p className="text-slate-500 text-sm">일반 전단지는 받자마자 버려지는 경우가 90% 이상입니다.</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border-2 border-green-700 flex gap-4 items-start shadow-md relative">
                    <div className="absolute -top-3 right-4 bg-green-700 text-white text-[10px] font-bold px-2 py-1 rounded-full">비교 불가!</div>
                    <div className="bg-green-50 p-3 rounded-lg"><CheckCircle className="w-6 h-6 text-green-700"/></div>
                    <div>
                        <h4 className="font-bold text-lg mb-1">약봉투: 평균 3일 보관</h4>
                        <p className="text-slate-500 text-sm">약을 다 먹을 때까지 식탁 위에 놓여있어, 가족 구성원 모두에게 반복 노출됩니다.</p>
                    </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center items-center">
                 <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                    <Target className="w-5 h-5 text-slate-600"/>
                    <span className="text-sm font-bold text-slate-700">우리 동네 실거주자 100% 타겟팅</span>
                 </div>
                 <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                    <HeartPulse className="w-5 h-5 text-slate-600"/>
                    <span className="text-sm font-bold text-slate-700">건강/삶의 질에 투자하는 구매력 있는 고객</span>
                 </div>
              </div>
            </div>

            {/* Pricing Table (색상 변경) */}
            <div id="pricing" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {/* BASIC */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:border-green-700 transition-colors">
                <div className="text-center border-b border-slate-100 pb-6 mb-6">
                  <h3 className="text-lg font-bold text-slate-500">BASIC</h3>
                  <div className="text-4xl font-extrabold mt-2 text-slate-900">20만원</div>
                  <div className="text-sm text-red-500 font-bold line-through">18만원 (프로모션)</div>
                  <div className="mt-4 bg-slate-100 w-24 h-16 mx-auto border border-slate-400 relative">
                    <div className="absolute top-0 left-0 w-12 h-8 bg-green-700/30 border-r border-b border-slate-400 flex items-center justify-center text-[8px] font-bold text-slate-900">1/4</div>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-700"/> 마케팅 성과표 제공</li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-700"/> 업종 맞춤 약국 매칭</li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-700"/> <strong>네이버 플레이스 관리</strong></li>
                </ul>
                <button onClick={() => scrollToSection('contact')} className="w-full mt-8 bg-slate-100 text-slate-800 font-bold py-3 rounded-xl hover:bg-slate-200">문의하기</button>
              </div>

              {/* PREMIUM */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-green-700 relative transform md:-translate-y-4">
                <div className="absolute top-0 right-0 bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">BEST</div>
                <div className="text-center border-b border-slate-100 pb-6 mb-6">
                  <h3 className="text-lg font-bold text-green-700">PREMIUM</h3>
                  <div className="text-4xl font-extrabold mt-2 text-slate-900">40만원</div>
                  <div className="text-sm text-red-500 font-bold line-through">36만원 (프로모션)</div>
                  <div className="mt-4 bg-slate-100 w-24 h-16 mx-auto border border-slate-400 relative">
                    <div className="absolute top-0 left-0 w-12 h-16 bg-green-700 border-r border-slate-400 flex items-center justify-center text-[10px] font-bold text-white">1/2</div>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="font-bold text-slate-900 flex gap-2"><CheckCircle className="w-4 h-4"/> BASIC 혜택 전체 포함</li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-700"/> <strong>부동산 및 세무 1:1 상담</strong></li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-700"/> 프리미엄 노출 영역</li>
                </ul>
                <button onClick={() => scrollToSection('contact')} className="w-full mt-8 bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-800 shadow-lg">상담 신청</button>
              </div>

              {/* EXCLUSIVE */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:border-slate-900 transition-colors">
                <div className="text-center border-b border-slate-100 pb-6 mb-6">
                  <h3 className="text-lg font-bold text-slate-700">독점 (Exclusive)</h3>
                  <div className="text-4xl font-extrabold mt-2 text-slate-900">80만원</div>
                  <div className="text-sm text-red-500 font-bold line-through">72만원 (프로모션)</div>
                  <div className="mt-4 bg-slate-900 w-24 h-16 mx-auto border border-slate-400 flex items-center justify-center text-xs font-bold text-white">FULL</div>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="font-bold text-slate-700 flex gap-2"><CheckCircle className="w-4 h-4"/> PREMIUM 혜택 전체 포함</li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-slate-700"/> <strong>세무 기장 서비스 지원</strong></li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-slate-700"/> '주목할 가게' 배너 제공</li>
                </ul>
                <button onClick={() => scrollToSection('contact')} className="w-full mt-8 bg-slate-100 text-slate-800 font-bold py-3 rounded-xl hover:bg-slate-200">문의하기</button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* --- [4. 우리 동네 (Locations) - 색상 변경] --- */}
      <section id="locations" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">전국 서비스 지역</h2>
            <p className="text-slate-500">PharmaD는 전국 17개 시/도 어디서나 함께할 수 있습니다.</p>
          </div>
          <div className="bg-slate-50 rounded-3xl p-6 md:p-10 border border-slate-200 min-h-[400px]">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm mb-8 text-slate-600">
              <button onClick={resetSelection} className={`hover:underline flex items-center gap-1 ${!selectedCity ? 'font-bold text-green-700' : ''}`}>
                <MapPin className="w-4 h-4"/> 전국
              </button>
              {selectedCity && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <button onClick={() => setSelectedDistrict(null)} className={`hover:underline ${!selectedDistrict ? 'font-bold text-green-700' : ''}`}>
                    {selectedCity}
                  </button>
                </>
              )}
              {selectedDistrict && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-bold text-green-700">{selectedDistrict}</span>
                </>
              )}
            </div>

            {!selectedCity && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {Object.keys(locationData).map((city) => (
                  <button key={city} onClick={() => setSelectedCity(city)} className="bg-white hover:bg-green-700 hover:text-white border border-slate-200 p-3 rounded-xl font-bold text-slate-700 transition-all shadow-sm text-center text-sm">{city}</button>
                ))}
              </div>
            )}
            {selectedCity && !selectedDistrict && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
                {locationData[selectedCity] && Object.keys(locationData[selectedCity]).map((district) => (
                  <button key={district} onClick={() => setSelectedDistrict(district)} className="bg-white hover:bg-green-700 hover:text-white border border-slate-200 p-4 rounded-xl font-bold text-slate-700 transition-all shadow-sm text-center">{district}</button>
                ))}
              </div>
            )}
            {selectedCity && selectedDistrict && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                {locationData[selectedCity][selectedDistrict] && locationData[selectedCity][selectedDistrict].map((town) => (
                  <Link href={`/health/qr-landing?town=${town}`} key={town} className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-green-700 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-50 p-2 rounded-lg text-green-700 group-hover:bg-green-700 group-hover:text-white transition-colors"><Store className="w-5 h-5" /></div>
                      <span className="font-bold text-lg text-slate-800">{town}</span>
                    </div>
                    <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full group-hover:bg-green-700 group-hover:text-white">혜택 보기 (데모) →</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- [5. 문의하기 Form - 색상 변경] --- */}
      <section id="contact" className="py-20 bg-slate-900 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">함께 성장할 파트너를 찾습니다</h2>
          <p className="text-slate-300 mb-10">약사님, 광고주님 망설이지 말고 문의 남겨주세요.<br/>PharmaD 담당자가 24시간 내로 연락드립니다.</p>
          <form className="max-w-lg mx-auto bg-slate-800 p-8 rounded-3xl shadow-2xl text-left space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">성함 / 상호명</label>
              <input type="text" placeholder="예: 홍길동 / 대박식당" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 text-white placeholder-slate-400"/>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">연락처</label>
              <input type="text" placeholder="010-0000-0000" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 text-white placeholder-slate-400"/>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">문의 유형</label>
              <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 text-white">
                <option>광고/제휴 문의 (광고주)</option>
                <option>약국 입점 문의 (약사)</option>
                <option>기타 문의</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">문의 내용</label>
              <textarea rows={3} placeholder="궁금하신 내용을 적어주세요." className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 text-white placeholder-slate-400"></textarea>
            </div>
            <button type="button" onClick={()=> alert('문의가 접수되었습니다!')} className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
              <Send className="w-5 h-5" /> 문의 보내기
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-center text-sm border-t border-slate-900">
        <p className="mb-2 font-bold text-lg text-white">PharmaD</p>
        <p>사업자등록번호: 000-00-00000 | 대표: 성상현</p>
        <p className="mt-8">Copyright © 2025 PharmaD. All rights reserved.</p>
      </footer>

    </div>
  );
}