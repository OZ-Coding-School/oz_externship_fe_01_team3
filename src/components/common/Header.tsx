import { useState } from 'react'
import { User } from 'lucide-react'
import Button from './Button'

export const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    setShowLoginModal(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowLoginModal(false)
  }

  return (
    <header>
      {/* 상단 알림 바 */}
      <div className="bg-[#222222] p-[10px] max-w-[1920px] mx-auto h-[48px] text-center text-[16px] text-[#ffffff]">
        🚨 선착순 모집! 국비지원 받고 4주 완성
      </div>

      {/* 메인 헤더 */}
      <div className="max-w-[1920px] mx-auto h-[64px] bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between">
          {/* 좌측 - 로고 및 메뉴 */}
          <div className="flex items-center gap-[60px]">
            <h1 className="font-bold text-lg text-blue-700">LOGO</h1>
            <nav className="flex gap-[60px]">
              <a href="#" className="text-gray-700">
                커뮤니티
              </a>
              <a href="#" className="text-gray-700">
                일일특강
              </a>
            </nav>
          </div>

          {/* 우측 메뉴 */}
          <div className="flex items-center relative h-full">
            {!isLoggedIn ? (
              <div className="flex items-center space-x-4 text-sm text-gray-600 h-10">
                <Button
                  type="button"
                  onClick={handleLogin}
                  className="h-10 flex items-center justify-center"
                >
                  로그인
                </Button>
                <span className="text-gray-300">|</span>
                <a href="#" className="h-10 flex items-center justify-center">
                  회원가입
                </a>
              </div>
            ) : (
              <Button
                type="button"
                onClick={toggleLoginModal}
                className="flex items-center justify-center w-10 h-10 bg-purple-200 rounded-full hover:bg-purple-300 transition-colors"
              >
                <User className="w-6 h-6 text-purple-600" />
              </Button>
            )}

            {/* 로그인 모달 */}
            {showLoginModal && isLoggedIn && (
              <>
                {/* 오버레이 */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={toggleLoginModal}
                />

                {/* 모달 */}
                <div className="absolute top-20 right-[-160px] z-50 w-[204px] rounded-[12px] bg-white border border-gray-200 shadow-[0px_0px_16px_rgba(160,160,160,0.25)] px-[16px] pt-[24px] pb-[24px] flex flex-col gap-[10px]">
                  {/* 유저 정보 */}
                  <div className="w-full">
                    <h3 className="font-semibold text-[16px] text-[#000000] text-left mb-[4px] leading-[1.4] tracking-[-0.03em]">
                      오즈오즈
                    </h3>
                    <p className="text-[14px] text-gray-400 text-left leading-[1.4] tracking-[-0.03em]">
                      ozschool1234@gmail.com
                    </p>
                    <div className="mt-4 border-b border-[#ECECEC]" />
                  </div>

                  {/* 메뉴 */}
                  <div className="flex flex-col text-sm text-gray-700 font-medium">
                    <div className="py-[8px] px-[10px] bg-[#F3E8FF] text-[#6201E0] font-bold cursor-pointer leading-[1.4] tracking-[-0.03em]">
                      수강생 등록
                    </div>
                    <div className="py-[8px] px-[10px] hover:bg-gray-100 cursor-pointer leading-[1.4] tracking-[-0.03em]">
                      마이페이지
                    </div>
                    <div
                      className="py-[8px] px-[10px] hover:bg-gray-100 cursor-pointer leading-[1.4] tracking-[-0.03em]"
                      onClick={handleLogout}
                    >
                      로그아웃
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
