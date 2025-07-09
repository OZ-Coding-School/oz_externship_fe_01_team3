import { useState } from 'react'
import { User } from 'lucide-react'
import StudentRegisterContent from './StudentCourseRegister/RegiserContent'

export const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // 로그인 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false) // 수강생 등록 모달 열고 닫는 상태

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
      <div className="bg-black px-4 py-6 text-center text-[16px] text-white">
        🚨 선착순 모집! 국비지원 받고 4주 완성
      </div>

      {/* 메인 헤더 */}
      <div className="border-b border-gray-200 bg-white text-center">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex h-16 items-center justify-between">
            {/* 로고 및 메인 메뉴 */}
            <div className="flex items-center">
              {/* 로고 */}
              <div className="flex items-center">
                <h1>LOGO</h1>
              </div>

              {/* 메인 메뉴 */}
              <nav className="flex px-7">
                <a href="#" className="mr-7 text-gray-700">
                  커뮤니티
                </a>
                <a href="#" className="text-gray-700">
                  일일특가
                </a>
              </nav>
            </div>

            {/* 우측 메뉴 */}
            <div className="relative flex items-center">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-200 transition-colors hover:bg-purple-300"
                >
                  <User className="h-6 w-6 text-purple-600" />
                </button>
              )}

              {/* 로그인 모달 (로그인 후에만 표시) */}
              {showLoginModal && isLoggedIn && (
                <>
                  {/* 모달 오버레이 */}
                  <div className="fixed inset-0" onClick={toggleLoginModal} />
                  {/* 모달 콘텐츠 */}
                  <div className="absolute top-12 right-0 z-50 w-80 rounded-lg border border-gray-200 bg-white shadow-lg">
                    {/* 프로필 섹션 */}
                    <div className="p-4">
                      <h3 className="mb-2 text-left font-semibold text-gray-900">
                        오즈오즈
                      </h3>
                      <p className="mb-3 text-left text-sm text-gray-500">
                        ozschool1234@gmail.com
                      </p>

                      <div className="w-full font-medium text-gray-700">
                        <div
                          onClick={() => setIsModalOpen(true)}
                          className="cursor-pointer py-3.5 font-medium text-gray-700 hover:bg-[#EFE6FC] hover:text-purple-600"
                        >
                          수강생 등록
                          {/* 수강생 등록 모달 */}
                          {isModalOpen && (
                            <div
                              className="fixed inset-0 flex items-center justify-center"
                              style={{
                                backgroundColor: 'rgba(18, 18, 18, 0.6)',
                              }}
                            >
                              {/* 모달 내용 박스  */}
                              <div
                                className="w-[396px] rounded-[12px] bg-white"
                                style={{
                                  top: '280px',
                                  bottom: '278px',
                                  left: '762px',
                                  right: '762px',
                                }}
                              >
                                <div className="mt-[24px] mr-[24px] mb-[24px] ml-[24px] flex justify-end">
                                  <img
                                    src="src/assets/closeIcon.png"
                                    alt="close"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setIsModalOpen(false)
                                    }}
                                    className="h-[12px] w-[12px]"
                                  />
                                </div>
                                <StudentRegisterContent />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="cursor-pointer py-3.5 font-medium text-gray-700 hover:bg-[#EFE6FC] hover:text-purple-600">
                          마이페이지
                        </div>
                        <div
                          className="cursor-pointer py-3.5 font-medium text-gray-700 hover:bg-[#EFE6FC] hover:text-purple-600"
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
