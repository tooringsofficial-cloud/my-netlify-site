"use client";

import React, { useState } from 'react';
import { 
  Download, Phone, Check, Share2, ExternalLink, Mail, Printer, 
  MessageCircle, Globe, MessageSquare, Gift, TrendingUp 
} from 'lucide-react';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 공유 기능
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PharmaD 성상현',
          text: '약대생 & 공인중개사 성상현입니다.',
          url: window.location.href,
        });
      } catch (error) {
        console.log('공유 취소됨', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 이미지 변환 (vCard용)
  const getBase64Image = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            resolve(base64String.split(',')[1]); 
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      return null;
    }
  };

  // 연락처 저장 기능
  const handleSaveContact = async () => {
    setIsSaving(true);
    const photoBase64 = await getBase64Image('/profile.jpg');
    
    let vcard = `BEGIN:VCARD
VERSION:3.0
FN:성상현 공인중개사
N:성;상현;;;
ORG:PharmaD
TITLE:약학과 6학년 / 공인중개사 / 자산관리사 / 투자자산운용사
TEL;TYPE=CELL:010-5348-2981
TEL;TYPE=FAX:0504-279-2981
EMAIL:tooringsofficial@gmail.com
URL:https://pharmad.netlify.app
NOTE:약학과 6학년\n국가공인 공인중개사\n국가공인 자산관리사(FP)\n한국금융투자협회 투자자산운용사
X-SOCIALPROFILE;type=kakao:https://open.kakao.com/o/scgmHJ6h`;

    if (photoBase64) {
      vcard += `\nPHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}`;
    }

    vcard += `\nEND:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "PharmaD_성상현.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-0 md:p-8 font-sans">
      
      <div className="w-full max-w-5xl bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-screen md:min-h-[600px]">
        
        {/* --- [좌측: 프로필 섹션] --- */}
        <div className="md:w-2/5 bg-slate-900 text-white relative p-8 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 blur-[60px] opacity-20 rounded-full pointer-events-none"></div>
          
          <div>
            <div className="flex justify-between items-start mb-8">
              <span className="text-blue-400 font-bold tracking-wider text-sm border border-blue-400/30 px-3 py-1 rounded-full">PharmaD</span>
              <button onClick={handleShare} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors backdrop-blur-md">
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Share2 className="w-5 h-5" />}
              </button>
            </div>

            <div className="text-center md:text-left">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/10 shadow-xl mx-auto md:mx-0">
                  <img src="/profile.jpg" alt="PharmaD" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-slate-900"></div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">성상현</h1>
              
              <div className="text-blue-300 font-medium text-sm md:text-base mb-8 leading-relaxed space-y-1">
                <p>약학과 6학년</p>
                <p>국가공인 공인중개사</p>
                <p>국가공인 자산관리사(FP)</p>
                <p>한국금융투자협회 투자자산운용사</p>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-8 border-t border-white/10 pt-6">
                "신뢰를 바탕으로 가치를 드립니다.<br/>
                약국과 동네 상권을 잇다. PharmaD."
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleSaveContact}
              disabled={isSaving}
              className="w-full bg-white text-slate-900 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
            >
              {isSaving ? <span className="animate-pulse">저장 중...</span> : <><Download className="w-5 h-5" /> 연락처 저장하기</>}
            </button>
            <div className="flex justify-center md:justify-start gap-4 text-gray-400 pt-4 md:pt-0 border-t border-white/10 md:border-none mt-6 md:mt-0">
               <span className="text-xs">© 2025 PharmaD</span>
            </div>
          </div>
        </div>

        {/* --- [우측: 콘텐츠 & 상세 연락처 섹션] --- */}
        <div className="md:w-3/5 bg-gray-50 p-6 md:p-10 overflow-y-auto">
          
          <h2 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">Contact Channels</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-8">
            <div className="flex items-center justify-between p-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg"><Phone className="w-4 h-4" /></div>
                <span className="text-sm font-bold text-gray-700">Mobile</span>
              </div>
              <div className="w-32 flex gap-2">
                <a href="tel:01053482981" className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition text-center flex items-center justify-center">전화</a>
                <a href="sms:01053482981" className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition text-center flex items-center justify-center">문자</a>
              </div>
            </div>

             <div className="flex items-center justify-between p-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-50 text-yellow-600 p-2 rounded-lg"><MessageCircle className="w-4 h-4" /></div>
                <span className="text-sm font-bold text-gray-700">KakaoTalk</span>
              </div>
              <div className="w-32">
                <a href="https://open.kakao.com/o/scgmHJ6h" target="_blank" className="w-full block bg-yellow-400 text-black py-2 rounded-lg text-xs font-bold hover:bg-yellow-300 transition text-center">
                  1:1 채팅
                </a>
              </div>
            </div>

             <div className="flex items-center justify-between p-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="bg-gray-50 text-gray-600 p-2 rounded-lg"><Mail className="w-4 h-4" /></div>
                <span className="text-sm font-bold text-gray-700">Email</span>
              </div>
              <div className="w-32">
                <a href="mailto:tooringsofficial@gmail.com" className="w-full block bg-gray-200 text-gray-700 py-2 rounded-lg text-xs font-bold hover:bg-gray-300 transition text-center">
                  보내기
                </a>
              </div>
            </div>

            <div className="flex items-center justify-around pt-3 pb-1">
              <a href="tel:05042792981" className="flex flex-col items-center gap-1 group">
                <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                  <Printer className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-gray-400 font-medium">Fax</span>
              </a>
              <a href="https://wa.me/821053482981" target="_blank" className="flex flex-col items-center gap-1 group">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-gray-400 font-medium">WhatsApp</span>
              </a>
              <a href="https://pharmad.netlify.app" target="_blank" className="flex flex-col items-center gap-1 group">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-gray-400 font-medium">Website</span>
              </a>
            </div>
          </div>
          
          <h2 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">Services</h2>
          <div className="grid gap-4">
            
            {/* 1. PharmaD (색상: #298d81) */}
            <a href="/health" className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#298d81]/50 transition-all flex items-start justify-between">
              <div className="flex gap-4">
                <div className="bg-[#298d81]/10 p-3 rounded-xl text-[#298d81] h-fit">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-[#298d81] transition-colors">PharmaD</h3>
                  <p className="text-xs text-gray-500 mt-1">우리 동네 혜택 확인하러 가기</p>
                </div>
              </div>
              {/* 아이콘 변경: ArrowRight -> ExternalLink */}
              <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-[#298d81] transition-colors" />
            </a>

            {/* 2. PharmAnalysis (색상: #296082) */}
            <a href="/insight" className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#296082]/50 transition-all flex items-start justify-between">
              <div className="flex gap-4">
                <div className="bg-[#296082]/10 p-3 rounded-xl text-[#296082] h-fit">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-[#296082] transition-colors">PharmAnalysis</h3>
                  <p className="text-xs text-gray-500 mt-1">부동산 & 약학 인사이트</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-[#296082] transition-colors" />
            </a>

            {/* 3. ReaLanguage (기존 유지) */}
            <a href="/realanguage" className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-red-200 transition-all flex items-start justify-between">
              <div className="flex gap-4">
                <div className="bg-red-100 p-3 rounded-xl text-red-600 h-fit">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-red-700 transition-colors">ReaLanguage</h3>
                  <p className="text-xs text-gray-500 mt-1">3개 국어 뉘앙스 차이 완벽 정리</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-red-600 transition-colors" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}