const Footer = () => {
  return (
    <footer className="bg-[#222222] text-white px-6 py-10 w-full text-xs leading-relaxed">
      <div className="max-w-4xl mx-auto flex flex-col gap-8 min-h-[300px] justify-center">
        <div className="flex justify-between items-start w-full">
          <div className="max-w-xs">
            <img
              src="src/assets/logo.png"
              alt="오즈코딩스쿨 로고"
              className="w-36 mb-4"
            />
            <p className="text-zinc-400">초격차캠프</p>
            <p className="text-zinc-400">사업자개발캠프</p>
            <p className="text-zinc-400">프로덕트 디자이너 캠프</p>
          </div>
        </div>

        <hr className="border-[#9D9D9D]" />

        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex flex-wrap gap-6">
            <a href="#" className="font-semibold underline text-[#FFFFFF]">
              개인정보처리방침
            </a>
            <a href="#" className="underline">
              이용약관
            </a>
            <a href="#" className="underline">
              멘토링&강사지원
            </a>
          </div>

          <div className="flex gap-4">
            <img
              src="/src/assets/kakao.svg"
              alt="카카오채널"
              className="w-6 h-6"
            />
            <img src="/src/assets/blog.svg" alt="블로그" className="w-6 h-6" />
            <img
              src="/src/assets/youtube.svg"
              alt="유튜브"
              className="w-6 h-6"
            />
            <img
              src="/src/assets/instagram.svg"
              alt="인스타그램"
              className="w-6 h-6"
            />
          </div>
        </div>

        <div className="text-zinc-400 mb-4 space-y-1 text-left">
          <p>
            대표자: 이한별 | 사업자 등록번호: 540-86-00384 | 통신판매업
            신고번호: 2020-경기김포-3725호
          </p>
          <p>
            주소: 경기도 김포시 사우중로 87 201호 | 이메일:{' '}
            <a href="mailto:kdigital@nextrunners.co.kr">
              kdigital@nextrunners.co.kr
            </a>{' '}
            | 전화: 070-4099-8219
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
