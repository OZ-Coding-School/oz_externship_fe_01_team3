import { useForm } from 'react-hook-form'

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm()
  const onSubmit = (data: any) => {
    console.log('제출된 데이터:', data) // 여기에 서버로 보내는 로직을 추가하면 돼
  }

  const nameValue = watch('name')
  const nicknameValue = watch('nickname')
  const birthValue = watch('birth')
  const emailValue = watch('email')
  const emailCodeValue = watch('emailCode')
  const passwordValue = watch('password')
  const passwordConfirmValue = watch('passwordConfirm')
  const phoneValue = watch('phone1', 'phone2')
  const phoneCodeValue = watch('phoneCode')

  const isAllFieldsFilled =
    nameValue?.trim() &&
    nicknameValue?.trim() &&
    birthValue?.trim() &&
    emailValue?.trim() &&
    emailCodeValue?.trim() &&
    passwordValue?.trim() &&
    passwordConfirmValue?.trim() &&
    phoneValue?.trim() &&
    phoneCodeValue?.trim()

  // 비밀번호 유효성 검사 통과 여부
  const isPasswordValid =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-])[A-Za-z\d!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-]{6,15}$/.test(
      passwordValue
    )

  // 비밀번호와 비밀번호 확인 일치 여부
  const isPasswordMatch = passwordValue === passwordConfirmValue

  // 숫자 외 입력 막기
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/\D/g, '') // 숫자 외 제거
    if (onlyNums.length <= 8) {
      setValue('birth', onlyNums)
    }
  }

  const isValidBirth = /^\d{8}$/.test(birthValue)

  return (
    <div className="flex items-center justify-center bg-[#FAFAFA]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="mt-[88px] h-auto w-[528px] bg-white px-[24px] py-[40px]">
          {/* 헤더 */}
          <div className="mb-[27px] flex flex-col flex-wrap items-center gap-2">
            <p>마법같이 빠르게 성장시켜줄</p>
            <img
              src="src/assets/logo_black.png"
              alt="오즈코딩스쿨 로고"
              className="mb-[27px] h-[24px] w-[180px]"
            />
          </div>
          <p className="mb-[20px]">회원가입</p>

          {/* 이름 */}
          <div className="flex items-center">
            <label
              htmlFor="name"
              className="mr-[16px] mb-[20px] text-[#121212]"
            >
              이름<span className="text-[#EC0037]">*</span>
            </label>
          </div>
          <div>
            <input
              {...register('name', { required: '이름은 필수입니다.' })}
              className={`mb-[44px] h-[48px] w-[480px] rounded-[4px] border-[1px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] ${errors.name ? 'border-[#EC0037]' : nameValue ? 'border-[#14C786]' : 'border-[#BDBDBD]'} focus:border-[#6201E0] focus:outline-none`}
              placeholder="이름을 입력해주세요"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* 닉네임 */}
          <div className="flex items-center">
            <label
              htmlFor="nickname"
              className="mr-[16px] mb-[20px] text-[#121212]"
            >
              닉네임<span className="text-[#EC0037]">*</span>
            </label>
          </div>
          <div className="flex">
            <input
              {...register('nickname', {
                required: '닉네임을 입력해주세요.',
                pattern: {
                  value: /^[가-힣a-zA-Z0-9]{2,10}$/,
                  message: '2~10자 이내, 한글/영문/숫자만 입력해주세요.',
                },
              })}
              className={`mb-[44px] h-[48px] w-[356px] rounded-[4px] border-[1px] border-[#BDBDBD] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none`}
              placeholder="닉네임을 입력해주세요"
            />
            <button
              className={`ml-[12px] h-[48px] w-[112px] rounded-[4px] border ${nicknameValue ? 'border-[#6201E0] bg-[#EFE6FC] text-[#6201E0]' : 'border-[#BDBDBD] bg-[#ECECEC] text-[#888]'} `}
            >
              중복확인
            </button>
          </div>
          {errors.nickname && (
            <p className="text-sm text-red-500">{errors.nickname.message}</p>
          )}

          {/* 생년월일 */}
          <div className="flex items-center">
            <label
              htmlFor="birth"
              className="mr-[16px] mb-[20px] text-[#121212]"
            >
              생년월일<span className="text-[#EC0037]">*</span>
            </label>
          </div>
          <input
            {...register('birth', {
              required: '생년월일은 필수입니다.',
              pattern: {
                value: /^\d{8}$/,
                message: '8자리 숫자로 입력해주세요 (예: 20001004)',
              },
            })}
            maxLength={8}
            inputMode="numeric"
            onChange={handleNumberInput}
            value={birthValue || ''}
            className={`mb-[44px] h-[48px] w-[480px] rounded-[4px] border-[1px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] ${errors.birth ? 'border-[#EC0037]' : isValidBirth ? 'border-[#14C786]' : 'border-[#BDBDBD]'} focus:border-[#6201E0] focus:outline-none`}
            placeholder="8자리 입력해주세요 (ex.20001004)"
          />
          {errors.birth && (
            <p className="text-sm text-red-500">{errors.birth.message}</p>
          )}

          {/* 이메일 */}
          <div className="flex items-center">
            <label
              htmlFor="email"
              className="mr-[16px] mb-[20px] text-[#121212]"
            >
              이메일<span className="text-[#EC0037]">*</span>
            </label>
            <p className="mb-[20px] text-[14px] font-semibold text-[#6201E0]">
              로그인 시 아이디로 사용합니다.
            </p>
          </div>
          <div className="flex">
            <input
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '유효한 이메일 주소를 입력해주세요.',
                },
              })}
              className={`mb-[16px] h-[48px] w-[356px] rounded-[4px] border-[1px] border-[#BDBDBD] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none`}
              placeholder="이메일을 입력해주세요"
            />
            <button
              className={`ml-[12px] h-[48px] w-[112px] rounded-[4px] border ${emailValue ? 'border-[#6201E0] bg-[#EFE6FC] text-[#6201E0]' : 'border-[#BDBDBD] bg-[#ECECEC] text-[#888]'} `}
            >
              인증코드전송
            </button>
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          {/* 이메일 인증코드 */}
          <div className="flex">
            <input
              {...register('emailCode', {
                required: '인증코드를 입력해주세요.',
              })}
              className={`mb-[44px] h-[48px] w-[356px] rounded-[4px] border-[1px] border-[#BDBDBD] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none`}
              placeholder="전송된 코드를 입력해주세요."
            />
            <button
              className={`ml-[12px] h-[48px] w-[112px] rounded-[4px] border ${emailCodeValue ? 'border-[#6201E0] bg-[#EFE6FC] text-[#6201E0]' : 'border-[#BDBDBD] bg-[#ECECEC] text-[#888]'} `}
            >
              인증번호확인
            </button>
          </div>
          {errors.emailCode && (
            <p className="text-sm text-red-500">{errors.emailCode.message}</p>
          )}

          {/*휴대전화*/}

          <div className="flex items-center">
            <label
              htmlFor="phone"
              className="mr-[16px] mb-[20px] text-[#121212]"
            >
              휴대전화<span className="text-[#EC0037]">*</span>
            </label>
          </div>
          <div className="flex">
            <div className="mb-[16px] flex items-center">
              {/* 고정 010 */}
              <input
                value="010"
                readOnly
                className="mr-[4px] h-[48px] w-[108px] rounded border border-[#BDBDBD] p-1 pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#BDBDBD]"
              />
              {/* 하이픈 */}
              <span className="text-[17px] text-[#BDBDBD]">-</span>
              {/* 중간 4자리 */}
              <input
                {...register('phone1', {
                  required: '중간 번호를 입력해주세요.',
                  pattern: {
                    value: /^[0-9]{4}$/,
                    message: '4자리 숫자를 입력해주세요.',
                  },
                })}
                maxLength={4}
                inputMode="numeric"
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                }
                className="mr-[4px] ml-[4px] h-[48px] w-[108px] rounded border border-[#BDBDBD] p-2 text-center"
              />
              {/* 하이픈 */}
              <span className="text-[#BDBDBD]">-</span>

              {/* 마지막 4자리 */}
              <input
                {...register('phone2', {
                  required: '마지막 번호를 입력해주세요.',
                  pattern: {
                    value: /^[0-9]{4}$/,
                    message: '4자리 숫자를 입력해주세요.',
                  },
                })}
                maxLength={4}
                inputMode="numeric"
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                }
                className="ml-[4px] h-[48px] w-[108px] rounded border border-[#BDBDBD] p-2 text-center"
              />
            </div>
            <button
              className={`ml-[12px] h-[48px] w-[112px] rounded-[4px] border ${phoneValue ? 'border-[#6201E0] bg-[#EFE6FC] text-[#6201E0]' : 'border-[#BDBDBD] bg-[#ECECEC] text-[#888]'} `}
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
              className={`mb-[44px] h-[48px] w-[355px] rounded-[4px] border-[1px] border-[#BDBDBD] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none`}
              placeholder="인증번호 6자리를 입력해주세요"
            />
            <button
              className={`ml-[12px] h-[48px] w-[112px] rounded-[4px] border ${phoneCodeValue ? 'border-[#6201E0] bg-[#EFE6FC] text-[#6201E0]' : 'border-[#BDBDBD] bg-[#ECECEC] text-[#888]'} `}
            >
              인증번호확인
            </button>
          </div>
          {errors.phoneCode && (
            <p className="text-sm text-red-500">{errors.phoneCode.message}</p>
          )}

          {/* 비밀번호 */}
          <div className="flex items-center">
            <label
              htmlFor="password"
              className="mr-[16px] mb-[20px] text-[#121212]"
            >
              비밀번호<span className="text-[#EC0037]">*</span>
            </label>
            <p className="mb-[20px] text-[14px] font-semibold text-[#6201E0]">
              8~15자의 영문 대소문자, 숫자, 특수문자 포함
            </p>
          </div>
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
            className={`mb-[16px] h-[48px] w-[480px] rounded-[4px] border-[1px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none ${
              errors.password ||
              (passwordValue &&
                passwordConfirmValue &&
                passwordValue !== passwordConfirmValue)
                ? 'border-[#EC0037]' // 형식 틀리거나 확인 칸이랑 다르면 빨간색
                : passwordValue &&
                    passwordConfirmValue &&
                    isPasswordValid &&
                    isPasswordMatch
                  ? 'border-[#14C786]' // 둘 다 맞으면 초록색
                  : 'border-[#BDBDBD]' // 그 외엔 기본 회색
            } `}
            placeholder="비밀번호를 입력해주세요"
          />

          <input
            type="password"
            {...register('passwordConfirm', {
              required: '비밀번호 확인을 입력해주세요.',
              validate: (value) =>
                value === passwordValue || '비밀번호가 일치하지 않습니다.',
            })}
            className={`mb-[16px] h-[48px] w-[480px] rounded-[4px] border-[1px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none ${
              errors.passwordConfirm ||
              (passwordValue &&
                passwordConfirmValue &&
                passwordValue !== passwordConfirmValue)
                ? 'border-[#EC0037]'
                : passwordValue &&
                    passwordConfirmValue &&
                    isPasswordValid &&
                    isPasswordMatch
                  ? 'border-[#14C786]'
                  : 'border-[#BDBDBD]'
            } `}
            placeholder="비밀번호를 다시 입력해주세요"
          />

          {/* 가입하기 버튼 */}
          <button
            type="submit"
            className={`mt-[52px] h-[52px] w-[480px] gap-2 rounded-[4px] ${isAllFieldsFilled ? 'bg-[#6201E0] text-white' : 'bg-[#ECECEC] text-[#BDBDBD]'} `}
          >
            가입하기
          </button>
        </div>
      </form>
    </div>
  )
}
