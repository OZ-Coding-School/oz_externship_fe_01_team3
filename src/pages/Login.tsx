import SocialButton from "@/components/common/SocialButton";
import { useState } from "react";
import { useForm } from "react-hook-form";

function CommonButton({onClick, text}) {

    return(
        <button onClick={onClick} className="bg-[#6201E0] h-[52px] w-[348px] rounded-[4px] text-[#EFE6FC] mb-[24px]">
            {text}
        </button>
    )
}

function FindIdContent({onClick, text}){
    const { register, handleSubmit, formState: { errors }, watch, setValue,} = useForm()
    const nameValue = watch('name')
    const phoneValue = watch('phone')
    const phoneCodeValue = watch('phoneCode')

    const [errorMessage, setErrorMessage] = useState('');
    const [successFindId, setSuccessFindId] = useState(false) //성공시 모달 보여줄 용
    const [foundId, setFoundId] = useState('') //백엔드 연결 전 가짜 아이디 저장용

    //백엔드 전 임시 (오류메세지 설정용)
    const findId = (data: any) => {
        console.log('제출된 데이터:', data);
      
        if (data.name === '홍길동') {
          setErrorMessage('');
          setSuccessFindId(true)
          setFoundId('hong123@ozcoding.com')
          // 성공 시 처리
        } else {
          setErrorMessage('입력한 이름과 휴대폰 번호로 등록된\n 이메일이 존재하지 않습니다. ');
          setSuccessFindId(false)
        }
      };
      


    return(
        <div>
            <div className="flex justify-center mt-[10px] flex-col items-center ">
                <img src="src/assets/FindIdicon.png" alt="find" className="w-[28px] h-[28px] mb-[16px] " />
                <p className="text-[#121212]  text-[20px] font-bold mb-[16px] leading-none ">아이디 찾기</p>
                {foundId && (
                <p className="text-center text-sm  whitespace-pre-line 4 leading-none mb-[32px]">입력하신 정보와 일치하는 아이디입니다.</p>
                )}
                {errorMessage && (
                <p className="text-center text-sm text-[#EC0037] whitespace-pre-line">{errorMessage}</p>
                )}
            </div>
            {successFindId? (
                <div className="flex justify-center items-center flex-col ">
                    <div className="bg-[#ECECEC] border border-[#BDBDBD] w-[348px] h-[93px] flex justify-center items-center rounded-[4px] mb-[24px] px-4 py-10">
                        <p className="text-[#121212] text-[18px] font-semibold">{foundId}</p>
                    </div>
                    <div className="flex mb-[24px]">
                        <button className="w-[168px] h-[48px] border border-[#6201E0] text-[16px] text-[#6201E0] font-semibold rounded-[4px] mr-[12px]">로그인</button>
                        <button className="w-[168px] h-[48px] bg-[#6201E0] text-[#FAFAFA] text-[16px] font-semibold rounded-[4px]">비밀번호 찾기</button>

                    </div>
              </div>
                




            ):(




                <div className="flex justify-center flex-col mr-[24px] ml-[24px]">
    
                        <div className="flex items-center">
                        <label
                        htmlFor="name"
                        className="mr-[16px] mb-[20px] text-[#121212] text-[16px]"
                        >
                        이름<span className="text-[#EC0037]">*</span>
                        </label>
                    </div>
                    <div>
                        <input
                        {...register('name', { required: '이름은 필수입니다.' })}
                        className={`mb-[32px] h-[48px] w-[348px] rounded-[4px] border-[1px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] ${errors.name ? 'border-[#EC0037]' : nameValue ? 'border-[#14C786]' : 'border-[#BDBDBD]'} focus:border-[#6201E0] focus:outline-none`}
                        placeholder="이름을 입력해주세요"
                        />
                        {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
    
    
                        {/*휴대전화*/}
    
              <div className="flex items-center">
                <label
                  htmlFor="phone"
                  className="mr-[16px] mb-[20px] text-[#121212] text-[16px]" 
                >
                  휴대전화<span className="text-[#EC0037]">*</span>
                </label>
              </div>
              <div className="flex">
                <div className="mb-[16px] flex items-center">
                  <input
                    {...register('phone', {
                      required: '번호를 입력해주세요.',
                      pattern: {
                        value: /^[0-9]{11}$/,
                        message: '11자리 숫자를 입력해주세요.',
                      },
                    })}
                    maxLength={11}
                    inputMode="numeric"
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                    }
                    className=" h-[48px] w-[228px] rounded border border-[#BDBDBD] placeholder-[#BDBDBD] pt-[10px] pr-[16px] pb-[10px] pl-[16px] placeholder:text-[14px]"
                    placeholder="숫자만 입력해주세요"
                  />
                  
                </div>
                <button
                  className={`ml-[8px] h-[48px] w-[112px] rounded-[4px] border ${phoneCodeValue ? 'border-[#6201E0] bg-[#EFE6FC] text-[#6201E0]' : 'border-[#BDBDBD] bg-[#ECECEC] text-[#888]'} `}
                >
                  인증번호전송
                </button>
              </div>
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
    
              {/*휴대전화 인증 번호*/}
    
              <div className="flex">
                <input
                  {...register('phoneCode', {
                    required: '인증코드를 입력해주세요.',
                  })}
                  className={`mb-[40px] h-[48px] w-[228px] rounded-[4px] border-[1px] border-[#BDBDBD] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none`}
                  placeholder="인증번호 6자리를 입력해주세요"
                />
                <button
                  className={`ml-[8px] h-[48px] w-[112px] rounded-[4px] border ${phoneCodeValue ? 'border-[#6201E0] bg-[#EFE6FC] text-[#6201E0]' : 'border-[#BDBDBD] bg-[#ECECEC] text-[#888]'} `}
                >
                  인증번호확인
                </button>
              </div>
              {errors.phoneCode && (
                <p className="text-sm text-red-500">{errors.phoneCode.message}</p>
              )}
                    </div>
                    <CommonButton onClick={handleSubmit(findId)} text="아이디 찾기" />
    
                </div>
            )}
            

        </div>
    )
}

function FindModal({onClose, children}) {
    return(
        
        <div className="fixed inset-0 flex justify-center items-center"
             style={{ backgroundColor: 'rgba(18, 18, 18, 0.6)' }}>

            {/* 모달 내용 박스  */}
            <div className="bg-white w-[396px] rounded-[12px]"
                style={{
                    top: "280px",
                    bottom: "278px",
                    left: "762px",
                    right: "762px",
                }} >
                    <div className="flex justify-end mt-[24px] mr-[24px] ml-[24px] mb-[24px]">
                        <img src="src/assets/closeIcon.png" alt="close" onClick={onClose} className="w-[12px] h-[12px]" />
                    </div>
                    {children}

            </div>
        </div>
    )
}


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

    //모달 관련 상태
    const [isModalOpen, setIsModalOpen] = useState(false);


    return(
            < div className="flex flex-col items-center pt-20">
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
            <form onSubmit={handleSubmit(onSubmit)} className="flex  items-center flex-col">

                    {/* 이메일 인풋 */}
                <div className="mb-[16px] ">
                    <input
                    {...register("email", {
                        required: "이메일을 입력해주세요.",
                        pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "유효한 이메일 주소를 입력해주세요.",
                        },
                    })}
                    className="w-[348px] h-[48px] rounded-[4px] px-[16px] py-[10px] placeholder-[#BDBDBD] text-[#333] text-sm border-[1px] focus:outline-none focus:border-[#6201E0] border-[#BDBDBD]"
                    placeholder="아이디 (example@gmail.com)"
                    />
                </div>

                {/* 비밀번호 인풋 */}
                <div className="mb-[16px]">
                    <input
                        type="password"
                        {...register("password", {
                        required: "비밀번호를 입력해주세요.",
                        pattern: {
                            value:
                            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-])[A-Za-z\d!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-]{6,15}$/,
                            message: "6~15자, 영문/숫자/특수문자를 모두 포함해야 합니다.",
                        },
                        })}
                        className="w-[348px] h-[48px] rounded-[4px] pl-[16px] pr-[34px] py-[12px] text-sm leading-[20px] placeholder:text-sm placeholder-[#BDBDBD] text-[#333] border-[1px] focus:outline-none focus:border-[#6201E0] border-[#BDBDBD]"
                        placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자)"
                    />
                    </div>
                        <div className="flex justify-start  w-full text-sm text-[#4D4D4D]">
                            <button onClick={()=>setIsModalOpen(true)} className="mr-[8px]">아이디 찾기</button>
                            {isModalOpen && <FindModal onClose={()=>setIsModalOpen(false)}>{<FindIdContent/>}</FindModal>}

                            <p className="mr-[8px]">|</p>

                            <button>비밀번호 찾기</button>

                        </div>


                    {/* 일반회원 로그인 버튼 */}
                    <button
                        type="submit"
                        className={`mt-[52px] h-[52px] w-[348px] gap-2 rounded-[4px] ${isAllFieldsFilled ? 'bg-[#6201E0] text-white' : 'bg-[#ECECEC] text-[#BDBDBD]'} `}
                    >
                        일반회원 로그인
                    </button>
        </form>

            </div>
    
        )
}