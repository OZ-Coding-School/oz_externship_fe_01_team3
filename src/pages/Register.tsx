import { useRegisterForm } from '@/hooks/login/useRegisterForm'
import RegisterHeader from '@/components/register/RegisterHeader'
import PersonalInfoSection from '@/components/register/PersonalInfoSection'
import EmailVerificationSection from '@/components/register/EmailVerificationSection'
import PhoneVerificationSection from '@/components/register/PhoneVerificationSection'
import PasswordSection from '@/components/register/PasswordSection'
import SubmitButton from '@/components/register/SubmitButton'
// - TODO: 아마 제가 작명을 기억나는대로 해서, 뭔가 오류가 있을 수도 있어요. (선언을 잘못해서 오류가 생긴걸수도있어요.)
// - 그 부분은 지향님이 수정해주시면, 될 것 같아요

export default function Register() {
  const {
    register,
    handleSubmit,
    errors,
    nameValue,
    nicknameValue,
    birthValue,
    emailValue,
    emailCodeValue,
    isPasswordMatch,
    isAllFieldsFilled,
    isValidBirth,
    passwordValue,
    passwordConfirmValue,
    phoneValue,
    phoneCode,
    handleNumberInput,
    onSubmit,
  } = useRegisterForm()

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="mt-[88px] h-auto w-[528px] rounded-lg bg-white px-[24px] py-[40px] shadow-sm">
          <RegisterHeader />
          <div className="space-y-11">
            <PersonalInfoSection
              register={register}
              errors={errors}
              nameValue={nameValue}
              nicknameValue={nicknameValue}
              birthValue={birthValue}
              isValidBirth={isValidBirth}
              handleNumberInput={handleNumberInput}
            />
            <EmailVerificationSection
              register={register}
              errors={errors}
              emailValue={emailValue}
              emailCodeValue={emailCodeValue}
            />
            <PhoneVerificationSection
              register={register}
              errors={errors}
              phoneValue={phoneValue}
              phoneCode={phoneCode}
            />
            <PasswordSection
              register={register}
              errors={errors}
              passwordValue={passwordValue}
              passwordConfirmValue={passwordConfirmValue}
              isPasswordMatch={isPasswordMatch}
            />
            <SubmitButton
              isAllFieldsFilled={isAllFieldsFilled}
              emailValue={emailValue}
              passwordValue={passwordValue}
              passwordConfirmValue={passwordConfirmValue}
              nameValue={nameValue}
              nicknameValue={nicknameValue}
              phoneValue={phoneValue}
              birthValue={birthValue}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
