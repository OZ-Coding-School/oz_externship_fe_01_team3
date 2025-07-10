import SideBar from '@/components/examList/SideBar'
import MyPage from './MyPage'
import { useState } from 'react'
import MyPageEdit from './MyPageEdit'

type SideTab = 'exam' | 'info' | 'password'

export default function MyPageContainer() {
  const [myPage, setMyPage] = useState(true)
  const [activeTab, setActiveTab] = useState<SideTab>('exam')

  const handleMyPageEdit = () => {
    setMyPage(false)
  }

  return (
    <div className="mt-[108px] min-h-screen">
      <div className="container mx-auto min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full border-gray-200 lg:min-h-screen lg:w-64">
            <div className="px-6 py-8">
              <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>

          <div className="flex-1 lg:min-h-screen">
            <div className="px-4 py-6 sm:px-6 lg:px-8">
              <header className="h12 mb-5 flex w-186 justify-between">
                <h1 className="text-[32px] font-bold text-[#121212]">
                  내 정보
                </h1>
                {myPage ? (
                  <button
                    className="bg-purple-primary h-12 w-32 cursor-pointer rounded-sm text-[#ffffff] hover:bg-[#4E01B3] active:bg-[#3B0186]"
                    onClick={handleMyPageEdit}
                  >
                    수정하기
                  </button>
                ) : (
                  <button
                    className="bg-purple-primary h-12 w-32 cursor-pointer rounded-sm text-[#ffffff] hover:bg-[#4E01B3] active:bg-[#3B0186]"
                    onClick={() => {
                      console.log('저장하기')
                    }}
                  >
                    저장하기
                  </button>
                )}
              </header>
              {myPage ? <MyPage /> : <MyPageEdit />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
