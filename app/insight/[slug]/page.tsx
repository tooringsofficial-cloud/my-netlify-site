"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, Building, BookOpen, PlayCircle, 
  TrendingUp, ChevronRight, Users, Briefcase, FileText
} from 'lucide-react';
import Link from 'next/link';

// 데이터 생성기 (일반 콘텐츠용 - 더미지만 날짜는 다양하게)
const generateSubData = (mainCat: string, subTags: string[]) => {
  let data: any[] = [];
  subTags.forEach((tag, idx) => {
    // 각 태그별로 4개씩 생성, 날짜는 임의로 설정
    for (let i = 1; i <= 4; i++) {
      data.push({
        id: `${mainCat}-${tag}-${i}`,
        category: mainCat,
        title: `[${tag}] ${mainCat === 'Video' ? '영상' : '리포트'} 콘텐츠 제목 예시 ${i}`,
        desc: `${tag}에 대한 심층적인 분석과 데이터를 다루는 본문 요약 내용입니다.`,
        date: `2025.01.${String((idx * 4 + i)).padStart(2, '0')}`, // 날짜 다양화
        tag: tag,
        readTime: mainCat === 'Video' ? '10 min' : '5 min'
      });
    }
  });
  return data;
};

const realEstateTags = ['상권분석', '투자분석', '개국팁', '법률상식'];
const pharmacyTags = ['복약지도', '약국경영', '데이터분석', '일반약판매'];
const videoTags = ['부동산강의', '약국인테리어', '세무특강', '현장탐방'];

const generalInsights = [
  ...generateSubData('Real Estate', realEstateTags),
  ...generateSubData('Pharmacy', pharmacyTags),
  ...generateSubData('Video', videoTags),
];

const experts = [
  { id: 'semusatax', role: 'Tax', roleName: '세무사', name: '김파트너 세무사', desc: '약국 세무 전문, 절세 전략의 귀재', imageColor: 'bg-blue-100' },
  { id: 'expert-2', role: 'Tax', roleName: '세무사', name: '이세무 세무사', desc: '법인 전환 및 상속 증여 전문', imageColor: 'bg-indigo-100' },
  { id: 'expert-3', role: 'Labor', roleName: '노무사', name: '박노무 노무사', desc: '약국 직원 관리 및 노무 이슈 해결', imageColor: 'bg-green-100' },
  { id: 'expert-4', role: 'Realtor', roleName: '공인중개사', name: '최중개 공인중개사', desc: '서울 전역 메디컬 빌딩 전문 중개', imageColor: 'bg-orange-100' }
];

const categoryMap: Record<string, string> = {
  'real-estate': 'Real Estate', 'pharmacy': 'Pharmacy', 'video': 'Video', 'partner': 'Partner'
};
const categoryTitleMap: Record<string, string> = {
  'real-estate': '부동산 Analysis', 'pharmacy': '약학 Analysis', 'video': '영상 콘텐츠', 'partner': '파트너 콘텐츠'
};

export default function CategoryPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : ''; 
  const currentCategory = categoryMap[slug] || 'All';
  const displayTitle = categoryTitleMap[slug] || '전체 보기';

  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [partnerPosts, setPartnerPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleExpertClick = async (expertId: string) => {
    setSelectedExpert(expertId);
    setLoading(true);
    setPartnerPosts([]);

    if (expertId === 'semusatax') {
      try {
        // [수정] 더미 데이터 로직 완전 삭제. API 데이터만 사용.
        const res = await fetch('/api/partner-blog');
        const data = await res.json();
        if (data.items) {
          const posts = data.items.map((post: any, i: number) => ({
            id: `blog-${i}`, title: post.title, desc: post.snippet,
            date: new Date(post.pubDate).toLocaleDateString(), link: post.link, tag: '네이버블로그'
          }));
          setPartnerPosts(posts); // 9개가 오면 9개 다 보여줌
        }
      } catch (e) { console.error(e); }
    } else {
      // 다른 전문가는 아직 블로그가 없으므로 준비중 표시
      setPartnerPosts([
        { id: 'd1', title: '전문가 콘텐츠 준비 중입니다.', desc: '곧 유익한 정보로 찾아뵙겠습니다.', date: '2025.01.01', tag: '공지', link: null },
      ]);
    }
    setLoading(false);
  };

  const currentInsights = generalInsights.filter(item => item.category === currentCategory);
  // 태그별 그룹핑 (부동산/약학/영상용)
  const groupedInsights = currentInsights.reduce((acc: any, item) => {
    (acc[item.tag] = acc[item.tag] || []).push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/insight" className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6"/>
            </Link>
            <Link href="/insight" className="font-extrabold text-xl text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600"/>
              PharmAnalysis
            </Link>
          </div>
          
          <div className="hidden md:flex text-sm font-medium text-slate-500 gap-8">
            <Link href="/insight/real-estate" className={`hover:text-blue-600 transition-colors ${slug === 'real-estate' ? 'text-blue-600 font-bold' : ''}`}>부동산</Link>
            <Link href="/insight/pharmacy" className={`hover:text-blue-600 transition-colors ${slug === 'pharmacy' ? 'text-blue-600 font-bold' : ''}`}>약학</Link>
            <Link href="/insight/video" className={`hover:text-blue-600 transition-colors ${slug === 'video' ? 'text-blue-600 font-bold' : ''}`}>영상</Link>
            <Link href="/insight/partner" className={`hover:text-blue-600 transition-colors ${slug === 'partner' ? 'text-blue-600 font-bold' : ''}`}>파트너</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">{displayTitle}</h1>
            <p className="text-slate-500">
              {slug === 'partner' ? '분야별 최고의 전문가들과 함께합니다.' : `PharmAnalysis의 ${displayTitle} 전체 목록입니다.`}
            </p>
        </div>

        {/* --- [파트너 페이지 로직] --- */}
        {slug === 'partner' ? (
          <div>
            {!selectedExpert ? (
              <div className="space-y-12">
                {['Tax', 'Labor', 'Realtor'].map(role => {
                   const roleTitle = role === 'Tax' ? '세무사' : role === 'Labor' ? '노무사' : '공인중개사';
                   const roleExperts = experts.filter(e => e.role === role);
                   return (
                     <div key={role}>
                       <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                         <span className="w-2 h-6 bg-blue-600 rounded-full"></span> {roleTitle}
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         {roleExperts.map(expert => (
                            <div key={expert.id} onClick={() => handleExpertClick(expert.id)} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group">
                              <div className={`w-24 h-24 rounded-full mb-4 flex items-center justify-center text-2xl font-bold text-slate-500 ${expert.imageColor} group-hover:scale-105 transition-transform`}>
                                {expert.name[0]}
                              </div>
                              <h3 className="text-xl font-bold text-slate-900 mb-1">{expert.name}</h3>
                              <p className="text-slate-500 text-sm">{expert.desc}</p>
                            </div>
                         ))}
                       </div>
                     </div>
                   )
                })}
              </div>
            ) : (
              <div className="animate-fadeIn">
                <button onClick={() => setSelectedExpert(null)} className="mb-6 flex items-center text-slate-500 hover:text-blue-600 font-bold text-sm">
                  <ArrowLeft className="w-4 h-4 mr-1"/> 전문가 목록으로 돌아가기
                </button>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">
                  {experts.find(e => e.id === selectedExpert)?.name}님의 인사이트
                </h3>
                {loading ? <div className="py-20 text-center text-slate-400">글을 불러오는 중...</div> : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {partnerPosts.map((post, idx) => (
                      <a key={idx} href={post.link || '#'} target={post.link ? "_blank" : "_self"} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-green-500 transition-all group h-full flex flex-col">
                           <div className="flex justify-between mb-3">
                             <span className="bg-yellow-50 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full">{post.tag}</span>
                             <span className="text-xs text-slate-400">{post.date}</span>
                           </div>
                           <h4 className="font-bold text-lg text-slate-900 mb-3 group-hover:text-green-600 line-clamp-2">{post.title}</h4>
                           <p className="text-sm text-slate-500 line-clamp-3 flex-1">{post.desc}</p>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-16">
             {Object.keys(groupedInsights).length > 0 ? Object.entries(groupedInsights).map(([tagName, items]: any) => (
               <div key={tagName}>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                     <span className="w-2 h-6 bg-slate-800 rounded-full"></span> {tagName}
                  </h3>
                  {/* 날짜 역순 정렬 (최신글이 앞에 오게) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {items.sort((a:any, b:any) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((item: any) => (
                        <div key={item.id} className="bg-white flex flex-col h-full p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                           <div className="flex justify-between items-start mb-3">
                              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-600">{item.tag}</span>
                              <span className="text-[10px] text-slate-400">{item.date}</span>
                           </div>
                           <h4 className="font-bold text-base text-slate-900 mb-2 line-clamp-2">{item.title}</h4>
                           <p className="text-xs text-slate-500 line-clamp-2 flex-1 mb-3">{item.desc}</p>
                           <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-50">{item.readTime}</div>
                        </div>
                     ))}
                  </div>
               </div>
             )) : (
               <div className="text-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">등록된 게시물이 없습니다.</div>
             )}
          </div>
        )}

      </main>
    </div>
  );
}