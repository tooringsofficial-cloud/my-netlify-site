"use client";

import React, { useState, useEffect } from 'react';
import { 
  Download, Phone, ChevronRight, Pill, Building2, Youtube, 
  Award, Copy, Check, Share2, MapPin
} from 'lucide-react';

export default function Home() {
  const [copied, setCopied] = useState(false);

  // URL 복사 기능
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 연락처 저장 기능
  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:성상현
N:성;상현;;;
ORG:PharmaD (파마디)
TITLE:약사 / 공인중개사 / 크리에이터
TEL;TYPE=CELL:010-5348-2981
EMAIL:tooringsofficial@gmail.com
URL:https://pharmad.netlify.app
NOTE:약학과 부동산을 잇는 전문가 PharmaD입니다.
END:VCARD`;

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
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      
      {/* --- [모바일 최적화: 디지털 명함 섹션] --- */}
      {/* 배경 그라데이션 (상단 장식) */}
      <div className="h-48 bg-gradient-to-r from-blue-900 to-blue-700 relative">
        <div className="absolute top-4 right-4 flex gap-3">
          <button onClick={handleCopyLink} className="bg-white/20 p-2 rounded-full text-white backdrop-blur-md">
            {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 명함 카드 컨테이너 */}
      <div className="max-w-md mx-auto px-4 -mt-24 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden text-center p-6 pb-8 border border-gray-100">
          
          {/* 1. 프로필 사진 */}
          <div className="relative inline-block mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
              <img src="/profile.jpg" alt="PharmaD" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white" title="활동 중"></div>
          </div>

          {/* 2. 핵심 신원 정보 (1초 컷) */}
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">성상현 <span className="text-blue-600 text-lg font-bold">PharmaD</span></h1>
          <p className="text-gray-500 font-medium text-sm mb-4">약사 · 공인중개사 · 투자자산운용사</p>

          {/* 3. 소속/태그 (신뢰도) */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 text-xs text-gray-600 font-medium">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">#건강설계</span>
            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100">#약국중개</span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200">#자산관리</span>
          </div>

          {/* 4. 액션 버튼 (가장 중요 ★) */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button 
              onClick={handleSaveContact}
              className="bg-blue-900 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors shadow-lg active:scale-95"
            >
              <Download className="w-4 h-4" /> 연락처 저장
            </button>
            <a 
              href="https://open.kakao.com/o/sExample" 
              target="_blank"
              className="bg-yellow-400 text-black py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors shadow-md active:scale-95"
            >
              <Phone className="w-4 h-4" /> 1:1 문의
            </a>
          </div>

          <p className="text-gray-400 text-xs">
            "신뢰를 바탕으로 가치를 드립니다."
          </p>
        </div>
      </div>

      {/* --- [상세 정보 섹션: 스크롤하면 나옴] --- */}
      <div className="max-w-md mx-auto px-4 mt-8 space-y-4">
        
        <h2 className="text-sm font-bold text-gray-400 ml-1">PORTFOLIO & SERVICE</h2>

        {/* 메뉴 1: 약사 */}
        <a href="/health" className="block bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
              <Pill className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-900">약사 서비스</h3>
              <p className="text-xs text-gray-500">복약지도 & 건강 상담</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </a>

        {/* 메뉴 2: 부동산 */}
        <div className="block bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl text-green-600">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-900">부동산 컨설팅</h3>
              <p className="text-xs text-gray-500">약국 입지 & 개국 분석</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>

        {/* 메뉴 3: ReaLanguage */}
        <a href="/realanguage" className="block bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-xl text-red-600">
              <Youtube className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-900">ReaLanguage</h3>
              <p className="text-xs text-gray-500">3개 국어 뉘앙스 교육</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </a>

      </div>

      {/* 하단 정보 */}
      <footer className="max-w-md mx-auto px-4 mt-12 text-center pb-8">
        <div className="flex justify-center gap-2 mb-4">
            <span className="flex items-center gap-1 text-xs text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                <Award className="w-3 h-3" /> 약사 면허
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                <Award className="w-3 h-3" /> 공인중개사
            </span>
        </div>
        <p className="text-xs text-gray-400">© 2025 PharmaD. All rights reserved.</p>
      </footer>
    </div>
  );
}