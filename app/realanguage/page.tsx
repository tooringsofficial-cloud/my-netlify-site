import React from 'react';
import { Youtube, BookOpen, Video, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ReaLanguagePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* 헤더 */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center text-gray-500 hover:text-red-600">
             <ArrowLeft className="w-5 h-5 mr-1" /> 메인
          </Link>
          <span className="font-bold text-xl tracking-tighter text-red-600">ReaLanguage</span>
          <div className="w-10"></div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <div className="bg-red-50 py-16 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
          언어의 <span className="text-red-600">뉘앙스</span>,<br/>
          한 끗 차이를 알려드립니다.
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
          일본어, 중국어, 영어. <br/>
          단순 번역이 아닌 '진짜 원어민의 느낌'을 배웁니다.
        </p>
        <a href="https://youtube.com" target="_blank" className="inline-flex items-center bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg">
          <Youtube className="w-5 h-5 mr-2" /> 유튜브 채널 바로가기
        </a>
      </div>

      {/* 콘텐츠 그리드 */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">최신 콘텐츠</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 콘텐츠 1 */}
          <div className="group cursor-pointer">
            <div className="bg-gray-200 aspect-video rounded-xl mb-3 overflow-hidden relative">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
               {/* 나중에 썸네일 이미지 넣을 곳 */}
               <div className="flex items-center justify-center h-full text-gray-400">썸네일 이미지</div>
            </div>
            <h3 className="font-bold text-lg leading-tight group-hover:text-red-600 transition-colors">
              [일본어] '스미마셍'만 하면 안 되는 이유? 사과할 때 쓰는 3가지 표현
            </h3>
            <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <Video className="w-3 h-3" /> Shorts
            </div>
          </div>

          {/* 콘텐츠 2 */}
          <div className="group cursor-pointer">
            <div className="bg-gray-200 aspect-video rounded-xl mb-3 overflow-hidden">
               <div className="flex items-center justify-center h-full text-gray-400">썸네일 이미지</div>
            </div>
            <h3 className="font-bold text-lg leading-tight group-hover:text-red-600 transition-colors">
              [영어] 'Drug'와 'Medicine'의 결정적 차이 (약사가 알려줌)
            </h3>
             <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <Video className="w-3 h-3" /> Video
            </div>
          </div>

           {/* 전자책 홍보 */}
           <div className="bg-gray-900 rounded-xl p-6 text-white flex flex-col justify-between">
            <div>
              <BookOpen className="w-8 h-8 mb-4 text-yellow-400" />
              <h3 className="font-bold text-xl mb-2">3개 국어 뉘앙스 마스터북</h3>
              <p className="text-gray-300 text-sm">초보자가 가장 많이 틀리는 표현 100선</p>
            </div>
            <button className="mt-6 w-full bg-white text-gray-900 py-2 rounded-lg font-bold hover:bg-gray-100 text-sm">
              전자책 구경하기
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}