import Footer from '@/components/common/Footer'
import { Header } from '@/components/common/Header'
import { useState } from 'react'
import paperImg from '@/assets/paper.svg'
import qnaImg from '@/assets/qna.svg'
import communityImg from '@/assets/community.svg'
import mainBanner from '@/assets/main-banner.svg'

type ToggleType = 'paper' | 'qna' | 'community'

interface ToggleItem {
  key: ToggleType
  label: string
}

const TOGGLE: ToggleItem[] = [
  { key: 'paper', label: '쪽지시험' },
  { key: 'qna', label: '질의응답' },
  { key: 'community', label: '커뮤니티' },
]

const TOGGLETEXT = {
  paper: '쪽지시험으로\n 실력을 차곡차곡 쌓아보세요',
  qna: '질문하고 배우고,\n 동료 수강생과 함께 성장해요',
  community: '정보 공유부터 팀원 모집까지\n 커뮤니티에서 함께해요',
}

const TOGGLEIMG = {
  paper: paperImg,
  qna: qnaImg,
  community: communityImg,
}

export default function LandingPage() {
  const [toggle, setToggle] = useState<ToggleType>('paper')

  return (
    <>
      <Header />
      <div className="h-287 max-w-screen flex-col bg-[#fafafb]">
        <div className="relative top-27 flex flex-col items-center">
          <div className="mb-14 text-center text-5xl leading-[1.5] font-bold whitespace-pre-line text-[#121212]">
            {TOGGLETEXT[toggle]}
          </div>
          <div className="mb-[34px] flex h-[78px] w-[469px] items-center justify-center gap-[10px] rounded-[99px] border border-[#ececec] bg-[#ffffff]">
            {TOGGLE.map((toggles) => (
              <button
                type="button"
                key={toggles.key}
                onClick={() => setToggle(toggles.key)}
                className={`text-5 h-[54px] w-[143px] cursor-pointer rounded-[40px] leading-[1.4] font-bold tracking-[-0.03em] ${
                  toggle === toggles.key
                    ? 'bg-[#6201E0] text-[#f7f2ff]'
                    : 'text-[#bdbdbd]'
                }`}
              >
                {toggles.label}
              </button>
            ))}
          </div>
          <img src={TOGGLEIMG[toggle]} alt={TOGGLETEXT[toggle]} />
        </div>
      </div>
      <div className="flex h-[556px] items-center justify-center">
        <img src={mainBanner} alt={`${TOGGLETEXT[toggle]} 이미지`} />
      </div>
      <Footer />
    </>
  )
}
