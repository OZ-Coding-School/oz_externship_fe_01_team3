import MyPage from './MyPage'
import { useState } from 'react'
import MyPageEdit from './MyPageEdit'
import { mockMyPageData } from '@/mock/myPageData'

export default function MyPageContainer() {
  const [myPage, setMyPage] = useState(true)

  const USER = mockMyPageData
  const [nickname, setNickname] = useState(USER.nickname ?? '')
  const [phone, setPhone] = useState(USER.phone_number ?? '')
  const [profileImage, setProfileImage] = useState<File | null>(null)

  const handleMyPageEdit = () => setMyPage(false)

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <main className="mx-auto max-w-3xl space-y-6">
          <header className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#121212]">내 정보</h1>
            {myPage ? (
              <button
                className="bg-purple-primary h-12 w-32 rounded-sm text-white hover:bg-[#4E01B3] active:bg-[#3B0186]"
                onClick={handleMyPageEdit}
              >
                수정하기
              </button>
            ) : (
              <button className="bg-purple-primary h-12 w-32 rounded-sm text-white hover:bg-[#4E01B3] active:bg-[#3B0186]">
                저장하기
              </button>
            )}
          </header>

          {myPage ? (
            <MyPage />
          ) : (
            <MyPageEdit
              nickname={nickname}
              setNickname={setNickname}
              phone={phone}
              setPhone={setPhone}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              USER={USER}
            />
          )}
        </main>
      </div>
    </div>
  )
}
