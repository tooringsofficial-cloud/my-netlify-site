"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Building, BookOpen, PlayCircle, 
  Search, ChevronRight, Users, 
  Mail, MessageCircle, FileText, ArrowRight, Menu, X, Send
} from 'lucide-react';
import Link from 'next/link';

// --- [초기 데이터] ---
const initialInsights = [
  { id: 're-1', category: 'Real Estate', title: '부동산 글 1 (오래됨)', desc: '날짜가 예전이라 안 나와야 함.', date: '2024.01.01', tag: '상권분석', readTime: '5 min', link: null },
  { id: 're-2', category: 'Real Estate', title: '부동산 글 2 (최신)', desc: '이건 최신이라 나와야 함.', date: '2025.01.28', tag: '투자분석', readTime: '5 min', link: null },
  { id: 're-3', category: 'Real Estate', title: '부동산 글 3 (중간)', desc: '적당히 최신.', date: '2025.01.15', tag: '개국팁', readTime: '6 min', link: null },
  { id: 're-4', category: 'Real Estate', title: '부동산 글 4 (아주 최신)', desc: '제일 위에 떠야 함.', date: '2025.01.30', tag: '법률상식', readTime: '4 min', link: null },
  { id: 're-5', category: 'Real Estate', title: '부동산 글 5 (그럭저럭)', desc: '순위권.', date: '2025.01.20', tag: '상권분석', readTime: '5 min', link: null },
  { id: 'ph-1', category: 'Pharmacy', title: '약학 글 1 (최신)', desc: '...', date: '2025.01.29', tag: '복약지도', readTime: '3 min', link: null },
  { id: 'ph-2', category: 'Pharmacy', title: '약학 글 2', desc: '...', date: '2025.01.10', tag: '약국경영', readTime: '4 min', link: null },
  { id: 'ph-3', category: 'Pharmacy', title: '약학 글 3 (최신)', desc: '...', date: '2025.01.25', tag: '데이터분석', readTime: '5 min', link: null },
  { id: 'ph-4', category: 'Pharmacy', title: '약학 글 4', desc: '...', date: '2025.01.05', tag: '일반약판매', readTime: '3 min', link: null },
  { id: 'ph-5', category: 'Pharmacy', title: '약학 글 5 (최신)', desc: '...', date: '2025.01.22', tag: '복약지도', readTime: '3 min', link: null },
  { id: 'vd-1', category: 'Video', title: '영상 1', desc: '...', date: '2025.01.15', tag: '부동산강의', readTime: '10 min', link: null },
  { id: 'vd-2', category: 'Video', title: '영상 2 (최신)', desc: '...', date: '2025.01.28', tag: '약국인테리어', readTime: '8 min', link: null },
  { id: 'vd-3', category: 'Video', title: '영상 3 (최신)', desc: '...', date: '2025.01.27', tag: '세무특강', readTime: '12 min', link: null },
  { id: 'vd-4', category: 'Video', title: '영상 4 (최신)', desc: '...', date: '2025.01.26', tag: '현장탐방', readTime: '15 min', link: null },
];

export default function InsightPage() {
  const [allItems, setAllItems] = useState(initialInsights);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

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
          setAllItems(prev => [...formattedPosts, ...prev]);
        }
      } catch (error) {
        console.error("블로그 로딩 실패:", error);
      }
    };
    fetchBlogPosts();
  }, []);

  const getTop3Latest = (category: string) => {
    return allItems
      .filter(item => 
        item.category === category && 
        (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
         item.desc.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
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
    <div className="min-h-screen bg-slate-50 font-sans pb-0"> {/* [수정] pb-20 제거하여 하단 여백 없앰 */}
      
      {/* --- Header --- */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 relative flex items-center justify-between">
          
          <div className="flex items-center gap-4 z-10">
            <Link href="/" className="flex items-center gap-2 p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-bold text-sm">
              <ArrowLeft className="w-5 h-5"/>
              명함
            </Link>
          </div>

          <button 
            onClick={() => window.scrollTo({top:0, behavior:'smooth'})} 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold text-2xl flex items-center"
          >
            <span style={{ color: '#296082' }}>Pharm</span>
            <span style={{ color: '#37789b' }}>A</span>
            <span style={{ color: '#4c87b4' }}>nalysis</span>
          </button>
          
          <div className="hidden md:flex items-center text-sm font-medium text-slate-500 gap-8 z-10">
            <Link href="/insight/real-estate" className="hover:text-blue-600 transition-colors">부동산</Link>
            <Link href="/insight/pharmacy" className="hover:text-blue-600 transition-colors">약학</Link>
            <Link href="/insight/video" className="hover:text-blue-600 transition-colors">영상</Link>
            <Link href="/insight/partner" className="hover:text-blue-600 transition-colors">파트너</Link>
            <button 
                onClick={scrollToContact} 
                className="text-white px-4 py-2 rounded-full hover:opacity-90 transition-colors"
                style={{ backgroundColor: '#296082' }}
            >
                문의하기
            </button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-slate-600 z-10">
            {isMobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg p-4 flex flex-col gap-4 text-center z-40 animate-slideDown">
            <Link href="/insight/real-estate" className="text-slate-600 font-bold py-2" onClick={() => setIsMobileMenuOpen(false)}>부동산</Link>
            <Link href="/insight/pharmacy" className="text-slate-600 font-bold py-2" onClick={() => setIsMobileMenuOpen(false)}>약학</Link>
            <Link href="/insight/video" className="text-slate-600 font-bold py-2" onClick={() => setIsMobileMenuOpen(false)}>영상</Link>
            <Link href="/insight/partner" className="text-slate-600 font-bold py-2" onClick={() => setIsMobileMenuOpen(false)}>파트너</Link>
            <button 
                onClick={scrollToContact} 
                className="text-white py-3 rounded-xl font-bold w-full"
                style={{ backgroundColor: '#296082' }}
            >
                문의하기
            </button>
          </div>
        )}
      </header>

      <main>
        {/* --- Hero Section --- */}
        <section className="bg-white pt-10 pb-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
                        부동산과 약학,<br/>
                        <span style={{ color: '#296082' }}>깊이 있는 시선</span>으로 봅니다.
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

        {/* --- [문의 폼 섹션 (배경색 확장)] --- */}
        {/* pb-0으로 수정하여 하단 여백 제거 */}
        <section ref={contactRef} className="bg-slate-900 pt-20 pb-0 text-white w-full">
          <div className="max-w-3xl mx-auto px-4 md:px-8 text-center pb-20">
            <h2 className="text-3xl font-extrabold mb-4 text-white">전문가 파트너 제휴 문의</h2>
            <p className="text-slate-400 mb-10">세무사, 노무사, 변호사, 공인중개사 등<br/>약국 전문 분야의 전문가님들과의 협업을 기다립니다.</p>
            
            <form action="https://formspree.io/f/mgovjoez" method="POST" className="bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700 text-left space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">성함 (직함)</label>
                  <input type="text" name="name" required placeholder="예: 홍길동 세무사" className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-blue-500 focus:outline-none placeholder-slate-500"/>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">연락처</label>
                  <input type="tel" name="phone" required placeholder="010-0000-0000" className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-blue-500 focus:outline-none placeholder-slate-500"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">이메일</label>
                <input type="email" name="email" required placeholder="example@email.com" className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-blue-500 focus:outline-none placeholder-slate-500"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">전문 분야</label>
                <select name="field" className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-blue-500 focus:outline-none">
                  <option value="tax">세무</option>
                  <option value="labor">노무</option>
                  <option value="law">법률</option>
                  <option value="realestate">부동산 중개</option>
                  <option value="other">기타</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">문의 내용</label>
                <textarea name="message" rows={4} required placeholder="제휴 제안 및 문의 내용을 자유롭게 적어주세요." className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-blue-500 focus:outline-none resize-none placeholder-slate-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Send className="w-5 h-5"/> 문의 보내기
              </button>
            </form>
          </div>

          {/* --- [Footer를 문의 섹션 안으로 통합] --- */}
          <footer className="bg-slate-950 text-slate-400 py-12 text-center text-sm border-t border-slate-800 w-full">
              <p className="mb-2 font-bold text-lg text-white">PharmaD</p>
              <p>사업자등록번호: 000-00-00000 | 대표: 성상현</p>
              <p className="mt-8">Copyright © 2025 PharmaD. All rights reserved.</p>
          </footer>
        </section>

      </main>
    </div>
  );
}