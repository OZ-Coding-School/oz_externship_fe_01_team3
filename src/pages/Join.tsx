import SocialButton from '@/components/common/SocialButton'
import React from 'react'

function Join() {
  return (
    <div className="flex flex-col items-center pt-20">
      <img
        src="src/assets/logo_black.png"
        alt="오즈코딩스쿨 로고"
        className="mb-[27px] w-[180px]"
      />
      <div className="flex gap-3 text-[16px]">
        <p className="text-[#4D4D4D]"> 회원 이신가요?</p>
        <p className="text-[#6201E0]"> 로그인 하기</p>
      </div>
      <br />
      <br />

            {/* 카카오로 회원 가입 버튼  */}
            <SocialButton
                bgColor="#FEE500"
                txtColor="#391C1A"
                iconSrc="src/assets/kakao_brown.svg"
                iconAlt="카카오"
                marginBottom="16px"
                onClick={() => alert("카카오 로그인 클릭됨")}>
                    카카오로 3초만에 가입하기
            </SocialButton>

            {/* 네이버로 회원 가입 버튼  */}
            <SocialButton
                bgColor="#03C75A"
                txtColor="#FFFFFF"
                iconSrc="src/assets/naver_white.svg"
                iconAlt="네이버"
                marginBottom="25px"
                onClick={() => alert("네이버 로그인 클릭됨")}>
                    네이버로 가입하기
            </SocialButton>


      <p className="text-[#4D4D4D] underline"> 일반회원 가입</p>
    </div>
  )
}

export default Join
