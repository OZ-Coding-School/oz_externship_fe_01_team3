import type { MyPage } from '@/types/mypage/myPage'
import ProfileEditForm from './userInfoUi/ProfileEditForm'
import PersonalInfoEditForm from './userInfoUi/PersonalInfoEditForm'

interface MyPageEditProps {
  USER: MyPage
  nickname: string
  setNickname: React.Dispatch<React.SetStateAction<string>>
  phone: string
  setPhone: React.Dispatch<React.SetStateAction<string>>
  profileImage: File | null
  setProfileImage: React.Dispatch<React.SetStateAction<File | null>>
}

export default function MyPageEdit({
  nickname,
  setNickname,
  phone,
  setPhone,
  profileImage,
  setProfileImage,
  USER,
}: MyPageEditProps) {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-[700px] rounded-xl border border-[#d1d1d1] bg-white px-13 py-11">
        <ProfileEditForm
          USER={USER}
          nickname={nickname}
          setNickname={setNickname}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
        <PersonalInfoEditForm USER={USER} phone={phone} setPhone={setPhone} />
      </div>
    </div>
  )
}
