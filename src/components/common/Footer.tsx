const Footer = () => {
  return (
    <footer className="w-full bg-[#222222] px-6 py-10 text-xs leading-relaxed text-white">
      <div className="mx-auto flex min-h-[300px] max-w-4xl flex-col justify-center gap-8">
        <div className="flex w-full items-start justify-between">
          <div className="max-w-xs">
            <img
              src="src/assets/logo.png"
              alt="오즈코딩스쿨 로고"
              className="mb-4 w-36"
            />
            <p className="text-zinc-400">초격차캠프</p>
            <p className="text-zinc-400">사업자개발캠프</p>
            <p className="text-zinc-400">프로덕트 디자이너 캠프</p>
          </div>
        </div>

        <hr className="border-[#9D9D9D]" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6">
            <a href="#" className="font-semibold text-[#FFFFFF] underline">
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
              className="h-6 w-6"
            />
            <img src="/src/assets/blog.svg" alt="블로그" className="h-6 w-6" />
            <img
              src="/src/assets/youtube.svg"
              alt="유튜브"
              className="h-6 w-6"
            />
            <img
              src="/src/assets/instagram.svg"
              alt="인스타그램"
              className="h-6 w-6"
            />
          </div>
        </div>

        <div className="mb-4 space-y-1 text-left text-zinc-400">
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
