import type { MyPage } from '@/types/mypage/myPage'
import Camera from '@/assets/camera.svg'
import { useState } from 'react'
import LabeledInput from './LabelInput'
import { useCheckNickname } from '@/hooks/mypage/useCheckNickname'

interface ProfileEditFormProps {
  USER: MyPage
  nickname: string
  setNickname: React.Dispatch<React.SetStateAction<string>>
  profileImage: File | null
  setProfileImage: React.Dispatch<React.SetStateAction<File | null>>
}

export default function ProfileEditForm({
  USER,
  nickname,
  setNickname,
  profileImage,
  setProfileImage,
}: ProfileEditFormProps) {
  const { mutate, data, error } = useCheckNickname()
  const [hasChecked, setHasChecked] = useState(false)
  const [nicknameError, setNicknameError] = useState('')

  const handleCheck = () => {
    if (!nickname.trim()) {
      setNicknameError('닉네임을 입력하세요.')
      return
    }

    const nicknameRegex =
      /^([가-힣]{1,8}|(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{1,10})$/
    if (!nicknameRegex.test(nickname)) {
      setNicknameError(
        '닉네임은 한글 1~8자 또는 영문/숫자 혼용 1~10자여야 합니다.'
      )
      return
    }

    setNicknameError('')
    mutate(nickname, {
      onSuccess: () => setHasChecked(true),
      onError: () => setHasChecked(false),
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setProfileImage(file)
  }

  return (
    <>
      <p className="border-b border-[#bdbdbd] pb-4 text-xl font-bold text-[#721ae3]">
        프로필 수정
      </p>

      {/* 프로필 이미지 */}
      <div className="mt-8 flex justify-center">
        <div className="relative">
          <img
            src={
              profileImage
                ? URL.createObjectURL(profileImage)
                : USER.profile_image_url
            }
            alt="프로필 사진"
            className="h-46 w-46 rounded-full bg-purple-300 object-cover"
          />
          <div className="absolute right-0 bottom-0 flex h-13 w-13 cursor-pointer items-center justify-center rounded-full border-[4px] border-white bg-[#bdbdbd]">
            <label htmlFor="profile-upload" className="cursor-pointer">
              <img src={Camera} alt="이미지 변경 아이콘" />
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      </div>

      {/* 닉네임 */}
      <div className="mt-10 flex flex-col gap-2">
        <label htmlFor="nickname" className="text-base font-semibold">
          닉네임
        </label>
        <div className="flex gap-4">
          <input
            type="text"
            id="nickname"
            className="h-12 w-[500px] rounded-sm border border-[#bdbdbd] px-4"
            placeholder={USER.nickname}
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value)
              setHasChecked(false)
              setNicknameError('')
            }}
          />
          <button
            onClick={handleCheck}
            className="h-12 w-28 cursor-pointer rounded-sm border border-[#cecece] bg-[#ececec] text-base font-semibold text-[#4d4d4d]"
          >
            중복확인
          </button>
        </div>

        {nicknameError && (
          <p className="mt-1 text-sm font-medium text-red-600">
            {nicknameError}
          </p>
        )}
        {data && hasChecked && (
          <p className="mt-1 text-sm font-medium text-green-600">
            {data.message}
          </p>
        )}
        {error && (
          <p className="mt-1 text-sm font-medium text-red-600">
            중복된 닉네임 입니다.
          </p>
        )}

        <span className="text-sm font-normal text-[#9d9d9d]">
          *한글 8자, 영문 및 숫자 10자까지 혼용할 수 있어요.
        </span>
      </div>

      <div className="mt-10 flex flex-col gap-2">
        <LabeledInput
          label="이메일 (아이디)"
          id="email"
          placeholder={USER.email}
          disabled
        />
      </div>
    </>
  )
}
