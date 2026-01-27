"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, MapPin, ChevronRight, Store, TrendingUp, 
  CheckCircle, Users, Briefcase, Calculator, 
  Megaphone, HeartPulse, Building, ShoppingBag, Send, 
  Gift, Target, BookOpen, Lightbulb, Search, FileText
} from 'lucide-react';
import Link from 'next/link';

// --- [1. 대한민국 행정구역 풀 데이터] ---
const locationData: Record<string, Record<string, string[]>> = {
  '서울특별시': {
    '강남구': ['개포1동', '개포2동', '개포3동', '개포4동', '논현1동', '논현2동', '대치1동', '대치2동', '대치4동', '도곡1동', '도곡2동', '삼성1동', '삼성2동', '세곡동', '수서동', '신사동', '압구정동', '역삼1동', '역삼2동', '일원1동', '일원2동', '일원본동', '청담동'],
    '강동구': ['강일동', '고덕1동', '고덕2동', '길동', '둔촌1동', '둔촌2동', '명일1동', '명일2동', '상일1동', '상일2동', '성내1동', '성내2동', '성내3동', '암사1동', '암사2동', '암사3동', '천호1동', '천호2동', '천호3동'],
    '강북구': ['미아동', '번1동', '번2동', '번3동', '삼각산동', '삼양동', '송중동', '송천동', '수유1동', '수유2동', '수유3동', '우이동', '인수동'],
    '강서구': ['가양1동', '가양2동', '가양3동', '공항동', '등촌1동', '등촌2동', '등촌3동', '발산1동', '방화1동', '방화2동', '방화3동', '염창동', '우장산동', '화곡1동', '화곡2동', '화곡3동', '화곡4동', '화곡6동', '화곡8동', '화곡본동'],
    '관악구': ['낙성대동', '난곡동', '난향동', '남현동', '대학동', '미성동', '보라매동', '삼성동', '서림동', '서원동', '성현동', '신림동', '신사동', '신원동', '은천동', '인헌동', '조원동', '중앙동', '청룡동', '청림동', '행운동'],
    '광진구': ['광장동', '구의1동', '구의2동', '구의3동', '군자동', '능동', '자양1동', '자양2동', '자양3동', '자양4동', '중곡1동', '중곡2동', '중곡3동', '중곡4동', '화양동'],
    '구로구': ['가리봉동', '개봉1동', '개봉2동', '개봉3동', '고척1동', '고척2동', '구로1동', '구로2동', '구로3동', '구로4동', '구로5동', '수궁동', '신도림동', '오류1동', '오류2동', '항동'],
    '금천구': ['가산동', '독산1동', '독산2동', '독산3동', '독산4동', '시흥1동', '시흥2동', '시흥3동', '시흥4동', '시흥5동'],
    '노원구': ['공릉1동', '공릉2동', '상계10동', '상계1동', '상계2동', '상계3.4동', '상계5동', '상계6.7동', '상계8동', '상계9동', '월계1동', '월계2동', '월계3동', '중계1동', '중계2.3동', '중계4동', '중계본동', '하계1동', '하계2동'],
    '도봉구': ['도봉1동', '도봉2동', '방학1동', '방학2동', '방학3동', '쌍문1동', '쌍문2동', '쌍문3동', '쌍문4동', '창1동', '창2동', '창3동', '창4동', '창5동'],
    '동대문구': ['답십리1동', '답십리2동', '용신동', '이문1동', '이문2동', '장안1동', '장안2동', '전농1동', '전농2동', '제기동', '청량리동', '회기동', '휘경1동', '휘경2동'],
    '동작구': ['노량진1동', '노량진2동', '대방동', '사당1동', '사당2동', '사당3동', '사당4동', '사당5동', '상도1동', '상도2동', '상도3동', '상도4동', '신대방1동', '신대방2동', '흑석동'],
    '마포구': ['공덕동', '대흥동', '도화동', '망원1동', '망원2동', '상암동', '서강동', '서교동', '성산1동', '성산2동', '신수동', '아현동', '연남동', '염리동', '용강동', '합정동'],
    '서대문구': ['남가좌1동', '남가좌2동', '북가좌1동', '북가좌2동', '북아현동', '신촌동', '연희동', '천연동', '충현동', '홍은1동', '홍은2동', '홍제1동', '홍제2동', '홍제3동'],
    '서초구': ['내곡동', '반포1동', '반포2동', '반포3동', '반포4동', '반포본동', '방배1동', '방배2동', '방배3동', '방배4동', '방배본동', '서초1동', '서초2동', '서초3동', '서초4동', '양재1동', '양재2동', '잠원동'],
    '성동구': ['금호1가동', '금호2.3가동', '금호4가동', '마장동', '사근동', '성수1가1동', '성수1가2동', '성수2가1동', '성수2가3동', '송정동', '옥수동', '왕십리2동', '왕십리도선동', '용답동', '응봉동', '행당1동', '행당2동'],
    '성북구': ['길음1동', '길음2동', '돈암1동', '돈암2동', '동선동', '보문동', '삼선동', '석관동', '성북동', '안암동', '월곡1동', '월곡2동', '장위1동', '장위2동', '장위3동', '정릉1동', '정릉2동', '정릉3동', '정릉4동', '종암동'],
    '송파구': ['가락1동', '가락2동', '가락본동', '거여1동', '거여2동', '마천1동', '마천2동', '문정1동', '문정2동', '방이1동', '방이2동', '삼전동', '석촌동', '송파1동', '송파2동', '오금동', '오륜동', '위례동', '잠실2동', '잠실3동', '잠실4동', '잠실6동', '잠실7동', '잠실본동', '장지동', '풍납1동', '풍납2동'],
    '양천구': ['목1동', '목2동', '목3동', '목4동', '목5동', '신월1동', '신월2동', '신월3동', '신월4동', '신월5동', '신월6동', '신월7동', '신정1동', '신정2동', '신정3동', '신정4동', '신정6동', '신정7동'],
    '영등포구': ['당산1동', '당산2동', '대림1동', '대림2동', '대림3동', '도림동', '문래동', '신길1동', '신길3동', '신길4동', '신길5동', '신길6동', '신길7동', '양평1동', '양평2동', '여의동', '영등포동', '영등포본동'],
    '용산구': ['남영동', '보광동', '서빙고동', '용문동', '용산2가동', '원효로1동', '원효로2동', '이촌1동', '이촌2동', '이태원1동', '이태원2동', '청파동', '한강로동', '한남동', '효창동', '후암동'],
    '은평구': ['갈현1동', '갈현2동', '구산동', '녹번동', '대조동', '불광1동', '불광2동', '수색동', '신사1동', '신사2동', '역촌동', '응암1동', '응암2동', '응암3동', '증산동', '진관동'],
    '종로구': ['가회동', '교남동', '무악동', '부암동', '사직동', '삼청동', '숭인1동', '숭인2동', '이화동', '종로1.2.3.4가동', '종로5.6가동', '창신1동', '창신2동', '창신3동', '청운효자동', '평창동', '혜화동'],
    '중구': ['광희동', '다산동', '동화동', '명동', '소공동', '신당5동', '신당동', '약수동', '을지로동', '장충동', '중림동', '청구동', '필동', '황학동', '회현동'],
    '중랑구': ['망우3동', '망우본동', '면목2동', '면목3.8동', '면목4동', '면목5동', '면목7동', '면목본동', '묵1동', '묵2동', '상봉1동', '상봉2동', '신내1동', '신내2동', '중화1동', '중화2동'],
  },
  '경기도': {
    '수원시 장안구': ['파장동', '율천동', '정자1동', '정자2동', '정자3동', '영화동', '송죽동', '조원1동', '조원2동', '연무동'],
    '수원시 권선구': ['세류1동', '세류2동', '세류3동', '평동', '서둔동', '구운동', '금곡동', '호매실동', '권선1동', '권선2동', '곡선동', '입북동'],
    '수원시 팔달구': ['매교동', '매산동', '고등동', '화서1동', '화서2동', '지동', '우만1동', '우만2동', '인계동', '행궁동'],
    '수원시 영통구': ['매탄1동', '매탄2동', '매탄3동', '매탄4동', '원천동', '영통1동', '영통2동', '영통3동', '망포1동', '망포2동', '광교1동', '광교2동'],
    '성남시 수정구': ['신흥1동', '신흥2동', '신흥3동', '태평1동', '태평2동', '태평3동', '태평4동', '수진1동', '수진2동', '단대동', '산성동', '양지동', '복정동', '위례동', '시흥동', '고등동'],
    '성남시 중원구': ['성남동', '중앙동', '금광1동', '금광2동', '은행1동', '은행2동', '상대원1동', '상대원2동', '상대원3동', '하대원동', '도촌동'],
    '성남시 분당구': ['분당동', '수내1동', '수내2동', '수내3동', '정자동', '정자1동', '정자2동', '정자3동', '서현1동', '서현2동', '이매1동', '이매2동', '야탑1동', '야탑2동', '야탑3동', '금곡동', '구미동', '구미1동', '판교동', '삼평동', '백현동', '운중동'],
    '의정부시': ['의정부1동', '의정부2동', '호원1동', '호원2동', '장암동', '신곡1동', '신곡2동', '용현동', '자금동', '가능동', '흥선동', '녹양동', '송산1동', '송산2동', '송산3동'],
    '안양시 만안구': ['안양1동', '안양2동', '안양3동', '안양4동', '안양5동', '안양6동', '안양7동', '안양8동', '안양9동', '석수1동', '석수2동', '석수3동', '박달1동', '박달2동'],
    '안양시 동안구': ['비산1동', '비산2동', '비산3동', '부흥동', '달안동', '부림동', '평촌동', '평안동', '귀인동', '호계1동', '호계2동', '호계3동', '범계동', '신촌동', '갈산동'],
    '용인시 수지구': ['풍덕천1동', '풍덕천2동', '신봉동', '죽전1동', '죽전2동', '죽전3동', '동천동', '상현1동', '상현2동', '상현3동', '성복동'],
    '용인시 기흥구': ['신갈동', '영덕1동', '영덕2동', '구갈동', '상갈동', '보라동', '기흥동', '서농동', '구성동', '마북동', '동백1동', '동백2동', '동백3동', '상하동', '보정동'],
    '고양시 일산동구': ['식사동', '중산1동', '중산2동', '정발산동', '풍산동', '백석1동', '백석2동', '마두1동', '마두2동', '장항1동', '장항2동', '고봉동'],
    '고양시 일산서구': ['일산1동', '일산2동', '일산3동', '탄현1동', '탄현2동', '주엽1동', '주엽2동', '대화동', '송포동', '덕이동', '가좌동'],
    '화성시': ['새솔동', '진안동', '병점1동', '병점2동', '반월동', '기배동', '화산동', '동탄1동', '동탄2동', '동탄3동', '동탄4동', '동탄5동', '동탄6동', '동탄7동', '동탄8동', '동탄9동'],
  },
  '부산광역시': { '해운대구': ['우1동', '우2동', '우3동', '중1동', '중2동', '좌1동', '좌2동', '좌3동', '좌4동', '송정동', '반여1동', '반여2동', '반여3동', '반여4동', '반송1동', '반송2동', '재송1동', '재송2동'] },
  '제주특별자치도': { '제주시': ['일도1동', '일도2동', '이도1동', '이도2동', '삼도1동', '삼도2동', '용담1동', '용담2동', '건입동', '화북동', '삼양동', '봉개동', '아라동', '오라동', '연동', '노형동', '외도동', '이호동', '도두동'] }
};

export default function PharmaDServicePage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [partnerTab, setPartnerTab] = useState<'pharmacist' | 'advertiser'>('pharmacist');
  
  // 스크롤 감지 상태 (이미지 회전용)
  const [isFlipped, setIsFlipped] = useState(false);

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = () => {
      // 10px 이상 스크롤되면 뒤집기
      if (window.scrollY > 10) {
        setIsFlipped(true);
      } else {
        setIsFlipped(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const resetSelection = () => {
    setSelectedCity(null);
    setSelectedDistrict(null);
    setSearchQuery('');
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const searchResults = useMemo(() => {
    if (!searchQuery) return null;
    const results: { city: string, district: string, town: string }[] = [];
    Object.keys(locationData).forEach(city => {
      Object.keys(locationData[city]).forEach(district => {
        if (district.includes(searchQuery)) {
           locationData[city][district].forEach(town => {
             results.push({ city, district, town });
           });
        }
        locationData[city][district].forEach(town => {
          if (town.includes(searchQuery)) {
            results.push({ city, district, town });
          }
        });
      });
    });
    return results;
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm transition-all h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="flex items-center text-slate-500 hover:text-green-700 text-sm font-medium">
              <ArrowLeft className="w-4 h-4 mr-1" /> 명함
            </Link>
          </div>
          <div className="shrink-0">
            {/* [변경] 로고 색상 적용 */}
            <button onClick={handleLogoClick} className="font-extrabold text-2xl tracking-tighter hover:scale-105 transition-transform">
              <span style={{ color: '#298d81' }}>Pharm</span>
              <span style={{ color: '#47afa5' }}>a</span>
              <span style={{ color: '#96cbc8' }}>D</span>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-end">
            <nav className="hidden md:flex gap-6 text-sm font-bold text-slate-600 items-center">
              <button onClick={() => scrollToSection('intro')} className="hover:text-green-700 transition">소개</button>
              <button onClick={() => scrollToSection('partners')} className="hover:text-green-700 transition">파트너 안내</button>
              <button onClick={() => scrollToSection('qr-contents')} className="hover:text-green-700 transition">QR 스캔</button>
              <button onClick={() => scrollToSection('locations')} className="hover:text-green-700 transition">우리동네혜택</button>
              {/* [변경] 문의하기 버튼 색상 적용 */}
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-white px-4 py-2 rounded-full hover:opacity-90 transition"
                style={{ backgroundColor: '#298d81' }}
              >
                문의하기
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Intro */}
      <section id="intro" className="pt-16 pb-16 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto text-center animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-slate-900">
            약국과 동네 상권을 잇다<br/>
            {/* [변경] 인트로 타이틀 색상 적용 */}
            <span className="text-4xl md:text-6xl">
              <span style={{ color: '#298d81' }}>토탈 경영 솔루션, Pharm</span>
              <span style={{ color: '#47afa5' }}>a</span>
              <span style={{ color: '#96cbc8' }}>D</span>
            </span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            약봉투는 거들 뿐, 핵심은 '상생'입니다.<br/>
            약국과 이웃 상권의 동반 성장을 돕고, 환자에게는 혜택을 돌려드리는<br/>
            우리 동네만의 선순환 구조를 만듭니다.
          </p>

          {/* --- [New] 3D Rotating Card Image Section (유지) --- */}
          <div className="relative w-64 h-64 mx-auto mb-16 perspective-1000">
            {/* Inner Container: Holds the rotation */}
            <div 
              className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
              style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              {/* Front Image (처음 보이는 이미지) */}
              <div 
                className="absolute inset-0 w-full h-full backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* ⚠️ public 폴더에 card-front.png 파일을 넣어주세요 */}
                <img 
                  src="/card-front.png" 
                  alt="PharmaD Intro Front" 
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              </div>

              {/* Back Image (뒤집히면 보이는 이미지 - 미리 180도 돌아가 있음) */}
              <div 
                className="absolute inset-0 w-full h-full backface-hidden"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                {/* ⚠️ public 폴더에 card-back.png 파일을 넣어주세요 */}
                <img 
                  src="/card-back.png" 
                  alt="PharmaD Intro Back" 
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
          {/* --------------------------------------------- */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-slate-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-slate-700"><HeartPulse className="w-7 h-7" /></div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">약국</h3>
              <p className="text-sm text-slate-600 leading-relaxed">방문 환자에게 <strong>'우리 동네 혜택'</strong>을 제공하여 재방문율을 높이고, 단골 고객을 확보</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-green-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-green-700"><Store className="w-7 h-7" /></div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">동네 상권</h3>
              <p className="text-sm text-slate-600 leading-relaxed">약사라는 <strong>전문가의 신뢰</strong>가 담긴 매체에 광고하며, 쉽게 버려지지 않는 높은 상시 노출 효과</p>
            </div>
             <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-slate-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-slate-700"><Users className="w-7 h-7" /></div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">환자</h3>
              <p className="text-sm text-slate-600 leading-relaxed">QR 스캔 한 번으로 <strong>쿠폰, 일자리, 전문가 상담</strong> 등 실생활에 필요한 유용한 정보 습득</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Guides */}
      <section id="partners" className="py-20 px-4 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold mb-4 text-slate-900">함께 성장할 파트너를 모십니다</h2>
                <p className="text-slate-500">약사님께는 효율적인 경영을, 광고주님께는 확실한 타겟 마케팅을 약속합니다.</p>
            </div>

            <div className="flex justify-center gap-4 mb-12">
                <button 
                    onClick={() => setPartnerTab('pharmacist')} 
                    className={`px-8 py-3 rounded-full font-bold transition-all border-2 ${partnerTab === 'pharmacist' ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
                >
                    약사님 안내
                </button>
                <button 
                    onClick={() => setPartnerTab('advertiser')} 
                    className={`px-8 py-3 rounded-full font-bold transition-all border-2 ${partnerTab === 'advertiser' ? 'bg-green-700 text-white border-green-700 shadow-lg' : 'bg-white text-green-600 border-green-200 hover:border-green-400'}`}
                >
                    광고주 안내
                </button>
            </div>

            <div className="transition-all duration-300">
                {partnerTab === 'pharmacist' && (
                    <div className="bg-slate-50 rounded-3xl p-8 lg:p-12 border border-slate-200 max-w-5xl mx-auto animate-fadeIn">
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-200">
                            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-700 shrink-0">
                                <HeartPulse className="w-8 h-8"/>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">약국장님께 드리는 혜택</h3>
                                <p className="text-slate-600">약국 경영에 필요한 실질적인 솔루션을 제공합니다.</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            {/* 1. 약봉투 */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex items-start gap-4">
                                    <ShoppingBag className="w-6 h-6 text-slate-700 mt-1 shrink-0"/>
                                    <div><strong className="block text-slate-900 text-lg mb-1">약봉투 제공</strong><span className="text-sm text-slate-500">지연 없이 혜택가에 공급 (개별 디자인 문의 가능)</span></div>
                                </div>
                            </div>
                            {/* 2. 구인구직 */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex items-start gap-4">
                                    <Briefcase className="w-6 h-6 text-slate-700 mt-1 shrink-0"/>
                                    <div><strong className="block text-slate-900 text-lg mb-1">구인구직</strong><span className="text-sm text-slate-500">약국 직원 채용 공고 무료 등록</span></div>
                                </div>
                            </div>
                            {/* 3. 부동산 */}
                             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex items-start gap-4">
                                    <Building className="w-6 h-6 text-slate-700 mt-1 shrink-0"/>
                                    <div><strong className="block text-slate-900 text-lg mb-1">부동산 중개 서비스</strong><span className="text-sm text-slate-500">약국 양도양수 및 개국 입지 전문 중개</span></div>
                                </div>
                            </div>
                            {/* 4. 전문가 컨설팅 */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex items-start gap-4">
                                    <Calculator className="w-6 h-6 text-slate-700 mt-1 shrink-0"/>
                                    <div><strong className="block text-slate-900 text-lg mb-1">전문가 컨설팅</strong><span className="text-sm text-slate-500">노무, 법률 등 분야별 전문가 상담</span></div>
                                </div>
                            </div>
                            {/* 5. 세무 기장 */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex items-start gap-4">
                                    <FileText className="w-6 h-6 text-slate-700 mt-1 shrink-0"/>
                                    <div><strong className="block text-slate-900 text-lg mb-1">세무 기장 서비스</strong><span className="text-sm text-slate-500">전문 세무사 연결 및 기장료 할인</span></div>
                                </div>
                            </div>
                            {/* 6. 네이버 플레이스 */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-slate-700 mt-1 shrink-0"/>
                                    <div><strong className="block text-slate-900 text-lg mb-1">네이버 플레이스 관리</strong><span className="text-sm text-slate-500">지역 검색 노출 최적화 및 리뷰 관리</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <button onClick={() => scrollToSection('contact')} className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg hover:-translate-y-1 transform duration-200">
                                제휴 약국 신청하기 <ArrowLeft className="w-4 h-4 rotate-180"/>
                            </button>
                        </div>
                    </div>
                )}

                {partnerTab === 'advertiser' && (
                    <div className="bg-green-50 rounded-3xl p-8 lg:p-12 border border-green-200 max-w-5xl mx-auto animate-fadeIn">
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-green-200">
                            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-green-700 shrink-0">
                                <Megaphone className="w-8 h-8"/>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">광고주님께 드리는 혜택</h3>
                                <p className="text-slate-600">버려지지 않는 광고 매체로 구매력 있는 타겟을 공략하세요.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
                                <div className="flex items-start gap-4">
                                    <Briefcase className="w-6 h-6 text-green-700 mt-1 shrink-0"/>
                                    <div><strong className="block text-slate-900 text-lg mb-1">구인구직</strong><span className="text-sm text-slate-500">인근 지역 인재 채용 지원</span></div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
                                <div className="flex items-start gap-4">
                                    <Calculator className="w-6 h-6 text-green-700 mt-1 shrink-0"/>
                                    <div><strong className="block text-slate-900 text-lg mb-1">전문가 컨설팅</strong><span className="text-sm text-slate-500">세무, 부동산 등 비즈니스 전문 상담</span></div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
                                <div className="flex items-start gap-4">
                                    <TrendingUp className="w-6 h-6 text-green-700 mt-1 shrink-0"/>
                                    <div><strong className="block text-slate-900 text-lg mb-1">마케팅 성과표 제공</strong><span className="text-sm text-slate-500">QR 스캔 데이터 기반 성과 리포트</span></div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
                                <div className="flex items-start gap-4">
                                    <Building className="w-6 h-6 text-green-700 mt-1 shrink-0"/>
                                    <div><strong className="block text-slate-900 text-lg mb-1">부동산 중개 서비스</strong><span className="text-sm text-slate-500">상가 전문 부동산 연결</span></div>
                                </div>
                            </div>
                             <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-green-700 mt-1 shrink-0"/>
                                    <div><strong className="block text-slate-900 text-lg mb-1">네이버 플레이스 관리</strong><span className="text-sm text-slate-500">지도 검색 노출 최적화</span></div>
                                </div>
                            </div>
                             <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
                                <div className="flex items-start gap-4">
                                    <Store className="w-6 h-6 text-green-700 mt-1 shrink-0"/>
                                    <div><strong className="block text-slate-900 text-lg mb-1">업종 고려 매칭</strong><span className="text-sm text-slate-500">진료과 및 환자군(타겟) 맞춤 매칭</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button onClick={() => scrollToSection('contact')} className="inline-flex items-center gap-2 px-10 py-4 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition shadow-lg hover:-translate-y-1 transform duration-200">
                                광고 상담 신청하기 <ArrowLeft className="w-4 h-4 rotate-180"/>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </section>

      {/* QR Contents */}
      <section id="qr-contents" className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
             <div className="text-center mb-16">
                {/* [변경] 'SERVICE CONTENTS' 텍스트 삭제됨 */}
                <h2 className="text-3xl font-extrabold mt-2 mb-4 text-slate-900">QR 스캔 시 제공되는 콘텐츠</h2>
                <p className="text-slate-500">환자의 스마트폰 속으로, 지역의 알짜 정보를 전달합니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Item 1 */}
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-green-500 hover:shadow-md transition-all">
                    <div className="bg-slate-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-slate-700"><BookOpen className="w-6 h-6"/></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">프리미엄 칼럼</h3>
                    <p className="text-slate-600 text-sm">약학, 부동산 인사이트</p>
                 </div>
                 {/* Item 2 */}
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-green-500 hover:shadow-md transition-all">
                    <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-green-700"><Building className="w-6 h-6"/></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">추천 부동산 매물</h3>
                    <p className="text-slate-600 text-sm">PharmaD가 검증한 알짜 매물</p>
                 </div>
                 {/* Item 3 */}
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-green-500 hover:shadow-md transition-all">
                    <div className="bg-slate-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-slate-700"><Lightbulb className="w-6 h-6"/></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">실시간 약국 정보</h3>
                    <p className="text-slate-600 text-sm">영업시간, 상담 예약, 이벤트 등</p>
                 </div>
                 {/* Item 4 */}
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-green-500 hover:shadow-md transition-all">
                    <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-green-700"><Calculator className="w-6 h-6"/></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">우리 동네 전문가 매칭</h3>
                    <p className="text-slate-600 text-sm">세무, 부동산, 법률 전문가 연결</p>
                 </div>
                 {/* Item 5 */}
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-green-500 hover:shadow-md transition-all">
                    <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-green-700"><Gift className="w-6 h-6"/></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">우리 동네 혜택 & 쿠폰</h3>
                    <p className="text-slate-600 text-sm">주변 맛집, 카페, 헬스장 할인</p>
                 </div>
                 {/* Item 6 */}
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-green-500 hover:shadow-md transition-all">
                    <div className="bg-slate-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-slate-700"><Briefcase className="w-6 h-6"/></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">우리 동네 일자리 (구인구직)</h3>
                    <p className="text-slate-600 text-sm">약국 및 인근 아르바이트 정보</p>
                 </div>
            </div>
        </div>
      </section>

      {/* Patient Experience */}
      <section id="patient-exp" className="py-20 px-4 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center animate-fadeIn">
            <div className="mb-10">
                <h2 className="text-3xl font-extrabold mt-2 mb-4 text-slate-900">환자는 이런 화면을 보게 됩니다</h2>
                <p className="text-slate-500">약봉투의 QR코드를 스마트폰으로 스캔했을 때 나타나는<br/><strong>모바일 웹 혜택 페이지 데모</strong>를 확인해보세요.</p>
            </div>
            
            <div className="relative group cursor-pointer inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-slate-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <Link href="/health/qr-landing" className="relative inline-flex items-center gap-3 bg-white text-slate-900 font-bold px-10 py-5 rounded-2xl border border-slate-200 hover:border-green-500 transition-all text-lg shadow-sm">
                    <Gift className="w-6 h-6 text-green-700"/> 
                    <span>QR 랜딩페이지 데모 체험하기</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform"/>
                </Link>
            </div>

            <div className="mt-12 opacity-50 pointer-events-none select-none filter blur-sm transition-all hover:blur-0 hover:opacity-100 duration-500">
                <p className="text-sm text-slate-400 mb-4">(데모 페이지 미리보기)</p>
                <img src="/qr-landing-preview.png" alt="QR Landing Preview" className="max-w-xs mx-auto rounded-[2rem] border-[6px] border-slate-800 shadow-2xl"/>
            </div>
        </div>
      </section>

      <section id="locations" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">전국 서비스 지역</h2>
            <p className="text-slate-500">PharmaD는 전국 17개 시/도 어디서나 함께할 수 있습니다.</p>
          </div>
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 min-h-[500px] shadow-sm">
            <div className="max-w-md mx-auto mb-10 relative">
                <input type="text" placeholder="내 지역 검색 (예: 대치동, 수지구)" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all shadow-sm"/>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"/>
            </div>
            {searchQuery && (
                <div className="mb-8 animate-fadeIn">
                    <h4 className="text-sm font-bold text-slate-500 mb-4">검색 결과</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {searchResults && searchResults.length > 0 ? (
                            searchResults.map((item, idx) => (
                                <Link href={`/health/qr-landing?town=${item.town}`} key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-green-500 flex justify-between items-center group transition-colors">
                                    <span className="text-slate-700 font-medium"><span className="text-xs text-slate-400 mr-2">{item.city} {item.district}</span>{item.town}</span><ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-green-500"/>
                                </Link>
                            ))
                        ) : (<div className="col-span-2 text-center text-slate-400 py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">'{searchQuery}'에 대한 검색 결과가 없습니다.</div>)}
                    </div>
                </div>
            )}
            {!searchQuery && (
                <div className={`flex items-center gap-2 text-sm mb-8 text-slate-600 ${searchQuery ? 'opacity-50 pointer-events-none' : ''}`}>
                  <button onClick={resetSelection} className={`hover:underline flex items-center gap-1 ${!selectedCity ? 'font-bold text-green-700' : ''}`}><MapPin className="w-4 h-4"/> 전국</button>
                  {selectedCity && <><ChevronRight className="w-4 h-4" /><button onClick={() => setSelectedDistrict(null)} className={`hover:underline ${!selectedDistrict ? 'font-bold text-green-700' : ''}`}>{selectedCity}</button></>}
                  {selectedDistrict && <><ChevronRight className="w-4 h-4" /><span className="font-bold text-green-700">{selectedDistrict}</span></>}
                </div>
            )}
            {!searchQuery && (
                <>
                    {!selectedCity && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {Object.keys(locationData).map((city) => (<button key={city} onClick={() => setSelectedCity(city)} className="bg-slate-50 hover:bg-green-700 hover:text-white border border-slate-200 p-3 rounded-xl font-bold text-slate-700 transition-all shadow-sm text-center text-sm">{city}</button>))}
                    </div>
                    )}
                    {selectedCity && !selectedDistrict && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
                        {locationData[selectedCity] && Object.keys(locationData[selectedCity]).map((district) => (<button key={district} onClick={() => setSelectedDistrict(district)} className="bg-slate-50 hover:bg-green-700 hover:text-white border border-slate-200 p-4 rounded-xl font-bold text-slate-700 transition-all shadow-sm text-center">{district}</button>))}
                    </div>
                    )}
                    {selectedCity && selectedDistrict && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
                        {locationData[selectedCity][selectedDistrict] && locationData[selectedCity][selectedDistrict].map((town) => (
                        <Link href={`/health/qr-landing?town=${town}`} key={town} className="group bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-green-700 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                            <div className="flex items-center gap-3"><div className="bg-green-50 p-2 rounded-lg text-green-700 group-hover:bg-green-700 group-hover:text-white transition-colors"><Store className="w-4 h-4" /></div><span className="font-bold text-slate-800 text-sm">{town}</span></div><span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full group-hover:bg-green-700 group-hover:text-white">혜택 보기 →</span>
                        </Link>
                        ))}
                    </div>
                    )}
                </>
            )}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-slate-900 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">함께 성장할 파트너를 찾습니다</h2>
          <p className="text-slate-300 mb-10">약사님, 광고주님 망설이지 말고 문의 남겨주세요.<br/>PharmaD 담당자가 24시간 내로 연락드립니다.</p>
          <form 
            action="https://formspree.io/f/mlgdjvnd" 
            method="POST"
            className="max-w-lg mx-auto bg-slate-800 p-8 rounded-3xl shadow-2xl text-left space-y-4"
          >
            <div><label className="block text-sm font-bold text-slate-300 mb-1">성함 / 상호명</label><input name="name" type="text" required placeholder="예: 홍길동 / 대박식당" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 text-white placeholder-slate-400"/></div>
            <div><label className="block text-sm font-bold text-slate-300 mb-1">연락처</label><input name="phone" type="text" required placeholder="010-0000-0000" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 text-white placeholder-slate-400"/></div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">문의 유형</label>
              <select name="category" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 text-white">
                <option value="광고/제휴 문의">광고/제휴 문의 (광고주)</option>
                <option value="약국 입점 문의">약국 입점 문의 (약사)</option>
                <option value="기타 문의">기타 문의</option>
              </select>
            </div>
            <div><label className="block text-sm font-bold text-slate-300 mb-1">문의 내용</label><textarea name="message" rows={3} required placeholder="궁금하신 내용을 적어주세요." className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 text-white placeholder-slate-400"></textarea></div>
            <button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"><Send className="w-5 h-5" /> 문의 보내기</button>
          </form>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-400 py-12 text-center text-sm border-t border-slate-900">
        <p className="mb-2 font-bold text-lg text-white">PharmaD</p>
        <p>사업자등록번호: 000-00-00000 | 대표: 성상현</p>
        <p className="mt-8">Copyright © 2025 PharmaD. All rights reserved.</p>
      </footer>

    </div>
  );
}