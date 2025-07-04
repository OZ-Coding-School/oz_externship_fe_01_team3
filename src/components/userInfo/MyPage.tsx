import { mockMyPageData } from '@/mock/myPageData'
import { useState } from 'react'
import AccountDeleteModal from './AccountDeleteModal'

export default function MyPage() {
  const USER = mockMyPageData
  const [modalOpen, setModalOpen] = useState(false)

  const handleModal = () => {
    setModalOpen(true)
    console.log('123')
  }

  return (
    <main className="flex h-336 w-186 flex-col gap-5">
      <section className="flex flex-col gap-5">
        <section className="h-198 w-186 rounded-sm border border-[#d1d1d1]">
          <div className="mx-13 my-11 h-172 w-165">
            <div className="flex flex-col gap-13">
              <div className="border-b border-[#bdbdbd] text-xl font-bold text-[#721ae3]">
                프로필
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={USER.profile_image_url}
                  alt="프로필 사진"
                  className="h-46 w-46 rounded-full border"
                />
              </div>
              <div className="flex flex-col gap-9">
                <span>닉네임: {USER.nickname}</span>
                <span>이메일: {USER.email}</span>
              </div>

              <div className="flex flex-col gap-13">
                <div className="border-b border-[#bdbdbd] text-xl font-bold text-[#721ae3]">
                  개인정보
                </div>
                <div className="flex flex-col gap-10">
                  <span>이름: {USER.name}</span>
                  <span>휴대전화: {USER.phone_number}</span>
                  <span>생년월일: {USER.birthday}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="h-[276px] w-[744px] rounded-sm border border-[#d1d1d1] px-13 py-11">
          <div className="flex h-full flex-col">
            <h1 className="border-b border-[#bdbdbd] pb-4 text-xl font-bold text-[#721ae3]">
              수강 중인 과정
            </h1>

            <div className="mt-10 flex items-center justify-between gap-8">
              <div className="flex flex-col gap-5">
                <p className="text-sm font-medium text-[#bdbdbd]">
                  오즈코딩스쿨
                </p>
                <p className="text-base font-normal text-[#121212]">
                  {USER.course_name} &lt;{USER.generation}기&gt;
                </p>
              </div>

              <div className="flex h-[120px] w-[120px] items-center justify-center rounded bg-gray-200">
                이미지
              </div>
            </div>
          </div>
        </section>

        <footer className="flex h-34 w-186 justify-between rounded-lg px-8 py-6">
          <div className="flex flex-col gap-8">
            <p className="text-xl text-[#9d9d9d]">회원탈퇴</p>
            <p className="h-8 w-91 text-sm text-[#bdbdbd]">
              탈퇴 처리 시, 수강 기간 / 포인트 / 쿠폰은 소멸되며 환불되지
              않습니다. 필요한 경우, 반드시 탈퇴 전에 문의 바랍니다.
            </p>
          </div>
          <div className="flex items-end">
            <button
              className="h-12 w-35 cursor-pointer rounded-sm border border-[#cecece] bg-[#ececec] text-base font-semibold text-[#4d4d4d]"
              onClick={handleModal}
            >
              회원 탈퇴하기
            </button>
            {modalOpen && (
              <AccountDeleteModal onClose={() => setModalOpen(false)} />
            )}
          </div>
        </footer>
      </section>
    </main>
  )
}
