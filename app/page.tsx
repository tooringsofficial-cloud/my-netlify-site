import Image from "next/image"; // Image 컴포넌트는 사용하지 않을 것이므로 남겨두거나 지워도 됩니다.

export default function Home() {
  return (
    // Tailwind CSS 클래스를 사용하여 배경을 밝게, 텍스트를 검게 설정했습니다.
    <main className="bg-white p-8 min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-extrabold text-blue-700">PharmaD! 첫 웹사이트!</h1>
      <p className="mt-4 text-xl text-gray-600">
        Tailwind CSS와 Netlify로 성공적으로 배포 완료했습니다.
      </p>
      <div className="mt-8">
        <a 
          href="https://pharmad.netlify.app" 
          target="_blank" 
          className="text-lg font-bold text-green-600 hover:text-green-800 transition duration-300"
        >
          현재 사이트 확인하기 (클릭!)
        </a>
      </div>
    </main>
  );
}