import SocialButton from "@/components/common/SocialButton";
import { useForm } from "react-hook-form";


export default function Login() {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const onSubmit = (data: any) => {
    console.log('제출된 데이터:', data) // 여기에 서버로 보내는 로직을 추가
  }

  const emailValue = watch('email')
  const passwordValue = watch('password')

  const isAllFieldsFilled =
    emailValue?.trim() &&
    passwordValue?.trim() 


    return(
            <div className="flex flex-col items-center pt-20">
                <img src="src/assets/logo_black.png" alt="오즈코딩스쿨 로고" className="w-[180px] mb-[27px]"/>
                <div className="flex gap-3 text-[16px]">
                    <p className="text-[#4D4D4D]"> 아직 회원이 아니신가요?</p>
                    <p className="text-[#6201E0]"> 회원가입 하기</p>
                </div>
                <br/>
                <br/>
    
                {/* 카카오로 회원가입 버튼  */}
                <SocialButton
                    bgColor="#FEE500"
                    txtColor="#391C1A"
                    iconSrc="src/assets/kakao_brown.svg"
                    iconAlt="카카오"
                    marginBottom="16px"
                    onClick={() => alert("카카오 로그인 클릭됨")}>
                        카카오 간편 로그인 / 가입
                </SocialButton>
    
                {/* 네이버로 회원가입 버튼  */}
                <SocialButton
                    bgColor="#03C75A"
                    txtColor="#FFFFFF"
                    iconSrc="src/assets/naver_white.svg"
                    iconAlt="네이버"
                    marginBottom="25px"
                    onClick={() => alert("네이버 로그인 클릭됨")}>
                        네이버 간편 로그인 / 가입
                </SocialButton>




                {/*아이디*/}
        <form onSubmit={handleSubmit(onSubmit)}>

                    <input
                {...register("email", {
                    required: "이메일을 입력해주세요.",
                    pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "유효한 이메일 주소를 입력해주세요.",
                    },
                })}
                className={`
                    w-[356px] h-[48px] rounded-[4px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] mb-[16px]
                    placeholder-[#BDBDBD] text-[#333] border-[1px]
                    focus:outline-none focus:border-[#6201E0]
                    border-[#BDBDBD]
                `}
                placeholder="아이디 (example@gmail.com)"
                />

                {/*비밀번호 칸*/}
                <input
                type="password"
                {...register('password', {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                    value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-])[A-Za-z\d!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-]{6,15}$/,
                    message: '6~15자, 영문/숫자/특수문자를 모두 포함해야 합니다.',
                },
                })}
                className="mb-[16px] h-[48px] w-[480px] rounded-[4px] border-[1px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none"
                
                placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자 포함)"
            />
                    <div className="flex text-sm">
                        <p className="text-[#4D4D4D] underline"> 아이디 찾기</p>
                        <p className="text-[#4D4D4D] underline">|</p>
                        <p className="text-[#4D4D4D] underline"> 비밀번호 찾기</p>
                    </div>

                    {/* 일반회원 로그인 버튼 */}
            <button
                type="submit"
                className={`mt-[52px] h-[52px] w-[480px] gap-2 rounded-[4px] ${isAllFieldsFilled ? 'bg-[#6201E0] text-white' : 'bg-[#ECECEC] text-[#BDBDBD]'} `}
            >
                일반회원 로그인
            </button>
        </form>

            </div>
    
        )
}