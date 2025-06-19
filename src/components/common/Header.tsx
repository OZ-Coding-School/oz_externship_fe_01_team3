import { useState } from 'react'
import { User } from 'lucide-react'

export const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // 로그인 상태 관리

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal)
  }

  // TODO: 로그인 처리 함수
  const handleLogin = () => {
    setIsLoggedIn(true)
    setShowLoginModal(false)
  }

  //  TODO: 로그아웃 처리 함수 (예시)
  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowLoginModal(false)
  }

  return (
    <header>
      {/* 상단 알림 바 */}
      <div className="bg-black py-6 text-white text-center px-4 text-[16px]">
        🚨 선착순 모집! 국비지원 받고 4주 완성
      </div>

      {/* 메인 헤더 */}
      <div className="bg-white text-center border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* 로고 및 메인 메뉴 */}
            <div className="flex items-center">
              {/* 로고 */}
              <div className="flex items-center">
                <h1>LOGO</h1>
              </div>

              {/* 메인 메뉴 */}
              <nav className="flex px-7">
                <a href="#" className="text-gray-700 mr-7">
                  커뮤니티
                </a>
                <a href="#" className="text-gray-700">
                  일일특가
                </a>
              </nav>
            </div>

            {/* 우측 메뉴 */}
            <div className="flex items-center relative">
              {/* 로그인 전 - 텍스트 메뉴 */}
              {!isLoggedIn && (
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <button onClick={handleLogin}>로그인</button>
                  <span className="text-gray-300">|</span>
                  <a href="#">회원가입</a>
                </div>
              )}

              {/* 로그인 후 - 유저 아이콘 */}
              {isLoggedIn && (
                <button
                  onClick={toggleLoginModal}
                  className="flex items-center justify-center w-10 h-10 bg-purple-200 rounded-full hover:bg-purple-300 transition-colors"
                >
                  <User className="w-6 h-6 text-purple-600" />
                </button>
              )}

              {/* 로그인 모달 (로그인 후에만 표시) */}
              {showLoginModal && isLoggedIn && (
                <>
                  {/* 모달 오버레이 */}
                  <div className="fixed inset-0" onClick={toggleLoginModal} />
                  {/* 모달 콘텐츠 */}
                  <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 w-80 z-50">
                    {/* 프로필 섹션 */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 text-left">
                        오즈오즈
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 text-left">
                        ozschool1234@gmail.com
                      </p>

                      <div className="w-full text-gray-700 font-medium">
                        <div className="text-gray-700 py-3.5 font-medium cursor-pointer hover:text-purple-600">
                          수강생 등록
                        </div>
                        <div className="text-gray-700 py-3.5 font-medium cursor-pointer hover:text-purple-600">
                          마이페이지
                        </div>
                        <div
                          className="text-gray-700 py-3.5 font-medium cursor-pointer hover:text-purple-600"
                          onClick={handleLogout}
                        >
                          로그아웃
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
