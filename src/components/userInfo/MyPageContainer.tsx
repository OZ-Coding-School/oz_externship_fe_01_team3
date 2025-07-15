import MyPage from './MyPage'
import { useState } from 'react'
import MyPageEdit from './MyPageEdit'
import { useQueryClient } from '@tanstack/react-query'
import { useUser } from '@/hooks/mypage/useMyProfile'
import { useUpdateProfile } from '@/hooks/mypage/useMyProfileUpdate'
import { useAuthStore } from '@/stores/useLoginStore'

export default function MyPageContainer() {
  const [myPage, setMyPage] = useState(true)
  const { user, login, isLoggedIn } = useAuthStore()
  const { data: USER, isLoading, isError } = useUser(isLoggedIn)

  const [nickname, setNickname] = useState('')
  const [phone, setPhone] = useState('')
  const [profileImage, setProfileImage] = useState<File | null>(null)

  const { mutate: updateProfile } = useUpdateProfile()

  const queryClient = useQueryClient()

  const handleMyPageEdit = () => {
    setNickname(USER?.nickname ?? '')
    setPhone(USER?.phone_number as string)
    setProfileImage(null)
    setMyPage(false)
  }

  const handleSaveProfile = () => {
    const payload: {
      profile_image_file: File | null
      nickname: string
      phone_number?: string
    } = {
      profile_image_file: profileImage,
      nickname: nickname,
    }

    if (phone !== USER?.phone_number) {
      payload.phone_number = phone
    }

    updateProfile(payload, {
      onSuccess: () => {
        setProfileImage(null)
        queryClient.invalidateQueries({ queryKey: ['profile'] })

        // useAuthStore의 유저 정보도 함께 업데이트
        if (user) {
          const updatedUser = {
            ...user,
            nickname: nickname,
            // 프로필 이미지가 있으면 임시 URL 사용 (서버 응답 후 실제 URL로 교체됨)
            profile_image_url: profileImage
              ? URL.createObjectURL(profileImage)
              : user.profile_image_url,
          }
          login(updatedUser)
        }

        alert('프로필이 성공적으로 수정되었습니다.')
        setMyPage(true)
      },
      onError: () => {
        alert('프로필 수정에 실패했습니다. 휴대폰 인증을 받아주세요')
      },
    })
  }

  if (isLoading) return <div>로딩중...</div>
  if (isError || !USER) return <div>유저 정보를 불러올 수 없습니다.</div>

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
              <button
                className="bg-purple-primary h-12 w-32 rounded-sm text-white hover:bg-[#4E01B3] active:bg-[#3B0186]"
                onClick={handleSaveProfile}
              >
                저장하기
              </button>
            )}
          </header>

          {myPage ? (
            <MyPage USER={USER} />
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
