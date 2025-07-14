import { api } from '@/api/axiosInstance'
import { useNavigate } from 'react-router'

interface SubmitButtonProps {
  isAllFieldsFilled: boolean
  emailValue: string
  passwordValue: string
  passwordConfirmValue: string
  nameValue: string
  nicknameValue: string
  phoneValue: string
  birthValue: string
}

export default function SubmitButton({
  isAllFieldsFilled,
  emailValue,
  passwordValue,
  passwordConfirmValue,
  nameValue,
  nicknameValue,
  phoneValue,
  birthValue,
}: SubmitButtonProps) {
  const navigate = useNavigate()
  const handleSignUp = async () => {
    try {
      const res = await api.post('/api/v1/auth/signup', {
        email: emailValue,
        password: passwordValue,
        password_confirm: passwordConfirmValue,
        name: nameValue,
        nickname: nicknameValue,
        gender: 'MALE',
        phone_number: phoneValue,
        birthday: birthValue,
        self_introduction: '안녕하세요',
        profile_image_url: 'string',
      })

      console.log(res.data)
      alert(res.data.message) // 예: "인증 코드가 이메일로 전송되었습니다."
      navigate('/login')
    } catch (error) {
      console.error(error)

      // 서버 에러 메시지 보여주기
      if (error.response?.data?.message) {
        alert(error.response.data.message)
      } else {
        alert('휴대폰 인증을 완료해주세요!')
      }
    }
  }
  return (
    <button
      type="submit"
      className={`mt-[52px] h-[52px] w-[480px] gap-2 rounded-[4px] transition-colors ${
        isAllFieldsFilled
          ? 'bg-[#6201E0] text-white hover:bg-[#5001c0]'
          : 'cursor-not-allowed bg-[#ECECEC] text-[#BDBDBD]'
      }`}
      disabled={!isAllFieldsFilled}
      onClick={handleSignUp}
    >
      가입하기
    </button>
  )
}
