// src/types/auth.ts
export interface NicknameCheckRequest {
  nickname: string
}

export interface NicknameCheckResponse {
  message: string
  available: boolean
}

export interface EmailSendCodeRequest {
  email: string
  purpose: 'signup' | 'reset'
}

export interface EmailSendCodeResponse {
  message: string
  email: string
  expires_in: number
}

export interface EmailVerifyCodeRequest {
  email: string
  verification_code: string
  purpose: 'signup' | 'reset'
}

export interface EmailVerifyCodeResponse {
  message: string
  verified: boolean
  token: string
}

export interface PhoneSendCodeRequest {
  phone: string
}

export interface PhoneSendCodeResponse {
  message: string
  phone: string
  expires_in: number
}

export interface PhoneVerifyCodeRequest {
  phone: string
  code: string
}

export interface PhoneVerifyCodeResponse {
  message: string
  verified: boolean
  token: string
}

export interface SignupRequest {
  email: string
  password: string
  password_confirm: string
  name: string
  nickname: string
  gender: 'MALE' | 'FEMALE'
  phone_number: string
  birthday: string
  self_introduction: string
  profile_image_url: string
}

export interface User {
  id: number
  email: string
  name: string
  nickname: string
  gender: 'MALE' | 'FEMALE'
  phone_number: string
  birthday: string
  self_introduction: string
  profile_image_url: string
  created_at: string
  is_active: boolean
}

export interface SignupResponse {
  message: string
  user: User
  tokens: {
    access_token: string
    refresh_token: string
  }
}

export interface ErrorResponse {
  error?: string
  code?: string
  detail?: string
}
