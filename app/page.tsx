"use client";

import React from 'react';
import { 
  ArrowRight, Building2, Pill, Youtube, ChevronRight, 
  Download, Award, Instagram, Mail, FileText, Phone 
} from 'lucide-react';

export default function Home() {
  
  // 1. 연락처 저장 기능 (vCard 생성 및 다운로드)
  const handleSaveContact = () => {
    // vCard 데이터 생성
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:성상현 (PharmaD)
N:성;상현;;;
ORG:PharmaD & ReaLanguage
TITLE:약사 / 공인중개사 / 크리에이터
TEL;TYPE=CELL:010-5348-2981
EMAIL:tooringsofficial@gmail.com
URL:https://pharmad.netlify.app
NOTE:신뢰를 바탕으로 가치를 드립니다
END:VCARD`;

    // 파일 다운로드 트리거
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "PharmaD_성상현.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      
      {/* 상단 내비게이션 */}
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-xl font-bold text-blue-900">PharmaD</span>
            <div className="flex space-x-6 text-sm font-medium">
              <a href="#profile" className="text-gray-600 hover:text-blue-900">프로필</a>
              <a href="#services" className="text-gray-600 hover:text-blue-900">서비스</a>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. 히어로 섹션 (메인) */}
      <section className="relative pt-20 pb-24 overflow-hidden text-center px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            Health & Wealth Partner
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            건강을 설계하고<br />
            <span className="text-blue-600">공간의 가치</span>를 더합니다.
          </h1>
          
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            안녕하세요, <strong>PharmaD 성상현</strong>입니다.<br/>
            약사의 전문성과 공인중개사의 통찰력으로<br/>
            당신의 삶에 가장 확실한 솔루션을 제안합니다.
          </p>

          {/* ★ 핵심 기능: 연락처 저장 버튼 */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleSaveContact}
              className="px-8 py-4 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Download className="w-5 h-5" /> 연락처 휴대폰에 저장
            </button>
            <a 
              href="https://open.kakao.com/o/sExample" 
              target="_blank"
              className="px-8 py-4 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Phone className="w-5 h-5" /> 카카오톡 문의하기
            </a>
          </div>
        </div>
      </section>

      {/* 3. 자격증 및 전문성 인증 섹션 (신뢰도 UP) */}
      <section id="profile" className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Professional Licenses</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {/* 자격증 뱃지들 */}
            <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-200">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-gray-700">약사 면허 보유</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-200">
              <Award className="w-5 h-5 text-green-600" />
              <span className="font-bold text-gray-700">공인중개사 자격</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-200">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-gray-700">투자자산운용사</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 주요 파이프라인 (카드 섹션) */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 약사 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 group">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Pill className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Pharmacist</h3>
            <p className="text-gray-500 mb-6">
              정확한 복약지도와 건강 상담.<br/>
              약봉투 QR을 통한 스마트 케어.
            </p>
            <a href="/health" className="text-blue-600 font-bold flex items-center hover:underline">
              복약지도 서비스 <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* 부동산 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 group">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Real Estate</h3>
            <p className="text-gray-500 mb-6">
              약국 입지 분석 및 개국 컨설팅.<br/>
              전문가의 시선으로 가치를 분석합니다.
            </p>
            <span className="text-green-600 font-bold flex items-center cursor-pointer">
              컨설팅 문의하기 <ChevronRight className="w-4 h-4 ml-1" />
            </span>
          </div>

          {/* 리얼랭귀지 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 group">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <Youtube className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-3">ReaLanguage</h3>
            <p className="text-gray-500 mb-6">
              3개 국어 뉘앙스 완벽 정리.<br/>
              언어의 미묘한 차이를 알려드립니다.
            </p>
            <a href="/realanguage" className="text-red-600 font-bold flex items-center hover:underline">
              콘텐츠 보러가기 <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. 소셜 링크 (푸터) */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-8">Connect with PharmaD</h3>
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://instagram.com" target="_blank" className="p-3 bg-white/10 rounded-full hover:bg-pink-600 transition-all">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://youtube.com" target="_blank" className="p-3 bg-white/10 rounded-full hover:bg-red-600 transition-all">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="mailto:pharmad@example.com" className="p-3 bg-white/10 rounded-full hover:bg-blue-600 transition-all">
              <Mail className="w-6 h-6" />
            </a>
            <a href="https://blog.naver.com" target="_blank" className="p-3 bg-white/10 rounded-full hover:bg-green-600 transition-all">
              <FileText className="w-6 h-6" />
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 PharmaD. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}