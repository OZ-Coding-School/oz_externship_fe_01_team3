//아이디 / 비밀번호 찾기에서 사용되는 공통 함수, 상태, 유효성 검사

import type { RegisterFormData } from '@/types/login/register'
import { useForm } from 'react-hook-form'

export const useFindForm = (
  setModalContentType: (
    value: 'findIdType' | 'findPwType' | 'deactivatedInfo'
  ) => void
) => {
  // 이메일 도메인 마스킹 처리하는 함수
  const maskEmailDomain = (email: string) => {
    const [localPart, domain] = email.split('@')

    // domain 예: example.com
    // domain을 '.' 기준으로 나눠서 앞부분과 뒷부분 분리
    const [domainName, domainExt] = domain.split('.')

    // domainName은 앞 3글자만 남기고 나머지는 *로 마스킹
    const maskedDomainName =
      domainName.slice(0, 3) + '*'.repeat(domainName.length - 3)

    return `${localPart}@${maskedDomainName}.${domainExt}`
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({ mode: 'onChange' })

  const inputValue = {
    nameValue: watch('name'),
    phoneValue: watch('phone'),
    phoneCodeValue: watch('phoneCode'),
  }

  const handleClickFindPw = () => {
    setModalContentType('findPwType')
  }

  // const [errorMessage, setErrorMessage] = useState('')
  // const [successFindId, setSuccessFindId] = useState(false) //성공시 모달 보여줄 용
  // const [foundId, setFoundId] = useState('') //백엔드 연결 전 가짜 아이디 저장용

  // //백엔드 전 임시 (오류메세지 설정용)
  // const findId = (data: any) => {
  //   console.log('제출된 데이터:', data)

  //   if (data.name === '홍길동') {
  //     setErrorMessage('')
  //     setSuccessFindId(true)
  //     setFoundId('hong123@ozcoding.com')
  //     // 성공 시 처리
  //   } else {
  //     setErrorMessage(
  //       '입력한 이름과 휴대폰 번호로 등록된\n 이메일이 존재하지 않습니다. '
  //     )
  //     setSuccessFindId(false)
  //   }
  // }
  return {
    maskEmailDomain,
    register,
    handleSubmit,
    errors,
    ...inputValue,
    handleClickFindPw,
    // errorMessage,
    // successFindId,
    // setSuccessFindId,
    // foundId,
    // findId,
  }
}
