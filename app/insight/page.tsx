"use client";

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Building, BookOpen, PlayCircle, 
  TrendingUp, Search, ChevronRight, Users,
  Mail, MessageCircle, FileText
} from 'lucide-react';
import Link from 'next/link';

// --- [초기 데이터 (날짜 섞음 확인용)] ---
// 상권분석, 투자분석 등 세부 카테고리가 섞여 있어도 날짜순으로 정렬되는지 확인하세요.
const initialInsights = [
  // 부동산 (Real Estate) - 날짜 다양함
  { id: 're-1', category: 'Real Estate', title: '부동산 글 1 (오래됨)', desc: '날짜가 예전이라 안 나와야 함.', date: '2024.01.01', tag: '상권분석', readTime: '5 min', link: null },
  { id: 're-2', category: 'Real Estate', title: '부동산 글 2 (최신)', desc: '이건 최신이라 나와야 함.', date: '2025.01.28', tag: '투자분석', readTime: '5 min', link: null },
  { id: 're-3', category: 'Real Estate', title: '부동산 글 3 (중간)', desc: '적당히 최신.', date: '2025.01.15', tag: '개국팁', readTime: '6 min', link: null },
  { id: 're-4', category: 'Real Estate', title: '부동산 글 4 (아주 최신)', desc: '제일 위에 떠야 함.', date: '2025.01.30', tag: '법률상식', readTime: '4 min', link: null },
  { id: 're-5', category: 'Real Estate', title: '부동산 글 5 (그럭저럭)', desc: '순위권.', date: '2025.01.20', tag: '상권분석', readTime: '5 min', link: null },

  // 약학 (Pharmacy)
  { id: 'ph-1', category: 'Pharmacy', title: '약학 글 1 (최신)', desc: '...', date: '2025.01.29', tag: '복약지도', readTime: '3 min', link: null },
  { id: 'ph-2', category: 'Pharmacy', title: '약학 글 2', desc: '...', date: '2025.01.10', tag: '약국경영', readTime: '4 min', link: null },
  { id: 'ph-3', category: 'Pharmacy', title: '약학 글 3 (최신)', desc: '...', date: '2025.01.25', tag: '데이터분석', readTime: '5 min', link: null },
  { id: 'ph-4', category: 'Pharmacy', title: '약학 글 4', desc: '...', date: '2025.01.05', tag: '일반약판매', readTime: '3 min', link: null },
  { id: 'ph-5', category: 'Pharmacy', title: '약학 글 5 (최신)', desc: '...', date: '2025.01.22', tag: '복약지도', readTime: '3 min', link: null },

  // 영상 (Video)
  { id: 'vd-1', category: 'Video', title: '영상 1', desc: '...', date: '2025.01.15', tag: '부동산강의', readTime: '10 min', link: null },
  { id: 'vd-2', category: 'Video', title: '영상 2 (최신)', desc: '...', date: '2025.01.28', tag: '약국인테리어', readTime: '8 min', link: null },
  { id: 'vd-3', category: 'Video', title: '영상 3 (최신)', desc: '...', date: '2025.01.27', tag: '세무특강', readTime: '12 min', link: null },
  { id: 'vd-4', category: 'Video', title: '영상 4 (최신)', desc: '...', date: '2025.01.26', tag: '현장탐방', readTime: '15 min', link: null },
];

export default function InsightPage() {
  const [allItems, setAllItems] = useState(initialInsights);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. 네이버 블로그 글 가져오기 (API에서 9개 가져옴)
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await fetch('/api/partner-blog');
        const data = await res.json();
        if (data.items) {
          const formattedPosts = data.items.map((post: any, index: number) => ({
            id: `blog-${index}`,
            category: 'Partner',
            title: post.title,
            desc: post.snippet,
            date: new Date(post.pubDate).toLocaleDateString(),
            tag: '파트너세무사',
            readTime: 'Naver Blog',
            link: post.link
          }));
          // 가져온 실제 데이터만 추가 (더미 없음)
          setAllItems(prev => [...formattedPosts, ...prev]);
        }
      } catch (error) {
        console.error("블로그 로딩 실패:", error);
      }
    };
    fetchBlogPosts();
  }, []);

  // [핵심] 1. 검색어 필터 -> 2. 날짜 내림차순 정렬 -> 3. 상위 3개 자르기
  const getTop3Latest = (category: string) => {
    return allItems
      .filter(item => 
        item.category === category && 
        (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
         item.desc.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // 날짜 내림차순 (최신순)
      .slice(0, 3); // 무조건 3개만
  };

  const StaticSection = ({ title, category, icon: Icon, linkUrl, bgColor }: any) => {
    const items = getTop3Latest(category);

    return (
      <div className={`py-12 ${bgColor} border-b border-slate-100/50`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Icon className={`w-6 h-6 ${
                category === 'Real Estate' ? 'text-blue-600' :
                category === 'Pharmacy' ? 'text-green-600' :
                category === 'Video' ? 'text-red-600' : 'text-yellow-600'
              }`}/>
              {title}
            </h3>
            <Link href={linkUrl} className="text-sm font-bold text-slate-400 hover:text-blue-600 flex items-center transition-colors">
              더 보기 <ChevronRight className="w-4 h-4"/>
            </Link>
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items.map((item, idx) => (
                <div 
                  key={`${item.id}-${idx}`}
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                   {item.link ? (
                     <a href={item.link} target="_blank" rel="noreferrer" className="block h-full">
                        <CardContent item={item} category={category} icon={Icon} isLink={true}/>
                     </a>
                   ) : (
                     <div className="h-full">
                        <CardContent item={item} category={category} icon={Icon} isLink={false}/>
                     </div>
                   )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-400 text-sm">검색 결과가 없습니다.</div>
          )}
        </div>
      </div>
    );
  };

  const CardContent = ({ item, category, icon: Icon, isLink }: any) => (
    <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
            <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                category === 'Real Estate' ? 'bg-blue-50 text-blue-700' : 
                category === 'Pharmacy' ? 'bg-green-50 text-green-700' : 
                category === 'Video' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
            }`}>
                <Icon className="w-3.5 h-3.5"/>
                {item.tag}
            </span>
            <span className="text-xs font-medium text-slate-400">{item.date}</span>
        </div>
        <h4 className="font-bold text-lg text-slate-900 mb-3 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
            {item.title}
        </h4>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-2">
            {item.desc}
        </p>
        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
               {isLink && <img src="https://www.naver.com/favicon.ico" alt="N" className="w-3 h-3 grayscale opacity-50"/>}
               {item.readTime}
            </span>
            <div className="flex items-center text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {isLink ? '블로그 보기' : '자세히 보기'} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"/>
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6"/>
            </Link>
            <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="font-extrabold text-xl text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600"/>
              PharmAnalysis
            </button>
          </div>
          
          <div className="hidden md:flex text-sm font-medium text-slate-500 gap-8">
            <Link href="/insight/real-estate" className="hover:text-blue-600 transition-colors">부동산</Link>
            <Link href="/insight/pharmacy" className="hover:text-blue-600 transition-colors">약학</Link>
            <Link href="/insight/video" className="hover:text-blue-600 transition-colors">영상</Link>
            <Link href="/insight/partner" className="hover:text-blue-600 transition-colors">파트너</Link>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-white pt-10 pb-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
                        부동산과 약학,<br/>
                        <span className="text-blue-600">깊이 있는 시선</span>으로 봅니다.
                    </h2>
                    <p className="text-slate-500 text-sm md:text-base">
                        공인중개사이자 약대생인 성상현이 전하는 데이터 기반의 확실한 인사이트.
                    </p>
                </div>
                <div className="relative w-full md:w-80">
                    <input 
                      type="text" 
                      placeholder="키워드 검색" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"/>
                </div>
            </div>
        </section>

        {/* 정적 섹션 배치 (날짜순 정렬된 3개만 나옴) */}
        <StaticSection title="부동산 Analysis" category="Real Estate" icon={Building} linkUrl="/insight/real-estate" bgColor="bg-white"/>
        <StaticSection title="약학 Analysis" category="Pharmacy" icon={BookOpen} linkUrl="/insight/pharmacy" bgColor="bg-slate-50"/>
        <StaticSection title="영상 콘텐츠" category="Video" icon={PlayCircle} linkUrl="/insight/video" bgColor="bg-white"/>
        <StaticSection title="파트너 인사이트" category="Partner" icon={Users} linkUrl="/insight/partner" bgColor="bg-slate-50"/>

        <section className="bg-white py-16 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-blue-50 rounded-3xl p-8 border border-blue-100 relative overflow-hidden shadow-sm">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white p-2 rounded-xl text-blue-600"><Mail className="w-6 h-6"/></div>
                            <h3 className="text-xl font-bold text-slate-900">뉴스레터 구독</h3>
                        </div>
                        <p className="text-slate-600 text-sm mb-6">성상현의 PharmAnalysis 최신 칼럼과 영상을<br/>매주 이메일로 받아보세요.</p>
                        <form action="https://formspree.io/f/mwvpynak" method="POST" className="flex flex-col sm:flex-row gap-2">
                            <input name="email" type="email" required placeholder="이메일 주소 입력" className="flex-1 px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:border-blue-500 bg-white"/>
                            <button type="submit" className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap">구독하기</button>
                        </form>
                    </div>
                </div>
                <div className="flex-1 bg-yellow-50 rounded-3xl p-8 border border-yellow-100 relative overflow-hidden shadow-sm">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white p-2 rounded-xl text-yellow-600"><MessageCircle className="w-6 h-6"/></div>
                            <h3 className="text-xl font-bold text-slate-900">오픈채팅방 입장</h3>
                        </div>
                        <p className="text-slate-600 text-sm mb-6">약국 경영과 상권 분석에 대해 자유롭게 이야기 나누는<br/>PharmaD 커뮤니티에 참여하세요.</p>
                        <a href="https://open.kakao.com/o/gPRlC83h" target="_blank" className="inline-block w-full text-center bg-yellow-400 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors">카카오톡 오픈채팅 참여하기</a>
                    </div>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}