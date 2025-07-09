// export interface RegisterFormData {
//   name: string
//   nickname: string
//   birth: string
//   email: string
//   emailCode: string
//   password: string
//   passwordConfirm: string
//   phone1: string
//   phone2: string
//   phoneCode: string
// }

// export interface LoginForm {
//   email: string
//   password: string
// }
// // 타입을 별도로 하나씩 빼볼까?
// // 타입을 하나로 통합해서 옵셔널 체이닝으로 걸어서 사용해볼까?
// // 뭐가 더 효율적이고 좋을까? 고민해보면 좋을 거 같아요!
// // - 뭉탱이로 안쓰고 쪼개서 쓰는 이유가 있기는 해요 (명시적으로 얘는 로그인 폼이구나~ 얘는 리셋 폼이구나~)
// // - 뭉탱이로 쓰게되면, 얘가 무슨 폼인지 유추가 안된다..? 어처피 얘는 옵셔널이니깐.. 음 얘 뭐지..?
// // - 귀찮아도 타입을 일일 명시하는 게 좋을 것 같기도하고, 타입 추론도 잘된다. (쪼개서 하면)

export interface RegisterFormData {
  name: string
  nickname: string
  birth: string
  email: string
  emailCode: string
  password: string
  passwordConfirm: string
  phone: string
  phone1: string
  phone2: string
  phoneCode: string
}
