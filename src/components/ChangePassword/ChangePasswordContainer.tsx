import { useChangePassword } from '@/hooks/mypage/useChangePassword'
import { useUser } from '@/hooks/mypage/useMyProfile'
import { useAuthStore } from '@/stores/useLoginStore'
import { useForm } from 'react-hook-form'

interface ChangePasswordContainerProps {
  password: string
  passwordConfirm: string
}

export default function ChangePasswordContainer() {
  const { isLoggedIn } = useAuthStore()
  const { data: USER, isLoading, isError } = useUser(isLoggedIn)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChangePasswordContainerProps>({ mode: 'onChange' })

  const { mutate: changePassword } = useChangePassword()

  const handleChangePassword = () => {
    if (!USER?.email) return

    changePassword(
      {
        email: USER.email,
        new_password: passwordValue,
        new_password_confirm: passwordConfirmValue,
      },
      {
        onSuccess: () => {
          alert('비밀번호가 성공적으로 변경되었습니다.')
        },
        onError: () => {
          alert('비밀번호 변경에 실패했습니다.')
        },
      }
    )
  }

  const passwordValue = watch('password')
  const passwordConfirmValue = watch('passwordConfirm')

  const isPasswordMatch = passwordValue === passwordConfirmValue
  const isPasswordValid =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-])[A-Za-z\d!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-]{6,15}$/.test(
      passwordValue
    )

  if (isLoading) return <div>로딩중...</div>
  if (isError || !USER) return <div>유저 정보를 불러올 수 없습니다.</div>

  return (
    <div>
      <p className="mb-[20px] text-[32px] font-semibold">비밀번호 변경</p>
      <div className="h-[308px] w-[744px] rounded-[8px] border border-[#D1D1D1]">
        <div className="my-[52px] mr-[40px] ml-[44px] flex flex-col justify-center">
          {/* 비밀번호 입력 */}
          <div className="flex items-center">
            <p className="mr-[50px]">새 비밀번호 </p>
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
              className={`h-[48px] w-[533px] rounded-[4px] border-[1px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none ${
                errors.password ? 'border-[#EC0037]' : 'border-[#BDBDBD]'
              }`}
              placeholder="새 비밀번호를 입력해주세요."
            />
          </div>
          {errors.password && (
            <p className="mt-[5px] ml-[125px] text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

          {/* 비밀번호 확인 */}
          <div className="mt-[16px] flex items-center">
            <p className="mr-[19px]">새 비밀번호 확인 </p>
            <input
              type="password"
              {...register('passwordConfirm', {
                required: '비밀번호 확인을 입력해주세요.',
                validate: (value) =>
                  value === passwordValue || '비밀번호가 일치하지 않습니다.',
              })}
              className={`h-[48px] w-[533px] rounded-[4px] border-[1px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none ${
                errors.passwordConfirm ? 'border-[#EC0037]' : 'border-[#BDBDBD]'
              }`}
              placeholder="새 비밀번호를 한 번 더 입력해주세요."
            />
          </div>
          {errors.passwordConfirm && (
            <p className="mt-[5px] ml-[125px] text-sm text-red-500">
              {errors.passwordConfirm.message}
            </p>
          )}

          <div className="mt-[40px] flex justify-end">
            <button
              className="h-[48px] w-[126px] rounded-[4px] bg-[#6201E0] text-[#FFFFFF] hover:bg-[#4E01B3]"
              onClick={handleSubmit(handleChangePassword)}
              disabled={
                !(
                  !!passwordValue &&
                  !!passwordConfirmValue &&
                  isPasswordValid &&
                  isPasswordMatch
                )
              }
            >
              변경하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
