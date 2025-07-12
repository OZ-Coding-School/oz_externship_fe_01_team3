import htmlIcon from '@/assets/examList/html.png'
import cssIcon from '@/assets/examList/css.png'
import javascriptIcon from '@/assets/examList/javascript.png'
import reactIcon from '@/assets/examList/Frame.png'
import typescriptIcon from '@/assets/examList/typescript.png'
import nodejsIcon from '@/assets/examList/nodejs.png'
import pythonIcon from '@/assets/examList/python.png'
import awsIcon from '@/assets/examList/aws.png'
import githubIcon from '@/assets/examList/github.png'
import djangoIcon from '@/assets/examList/django.png'
import fastapiIcon from '@/assets/examList/fastapi.png'
import flaskIcon from '@/assets/examList/flask.png'
import databaseIcon from '@/assets/examList/amazon-database.png'

interface TechIconProps {
  title: string
  thumbnailUrl?: string
  className?: string
}

export const getExamIcon = (title: string) => {
  const titleLower = title.toLowerCase()
  if (titleLower.includes('html')) return htmlIcon
  if (titleLower.includes('css')) return cssIcon
  if (titleLower.includes('javascript') || titleLower.includes('js'))
    return javascriptIcon
  if (titleLower.includes('react')) return reactIcon
  if (titleLower.includes('typescript')) return typescriptIcon
  if (titleLower.includes('node')) return nodejsIcon
  if (titleLower.includes('python')) return pythonIcon
  if (titleLower.includes('aws')) return awsIcon
  if (titleLower.includes('github')) return githubIcon
  if (titleLower.includes('django')) return djangoIcon
  if (titleLower.includes('fastapi')) return fastapiIcon
  if (titleLower.includes('flask')) return flaskIcon
  if (titleLower.includes('database')) return databaseIcon
  return null
}

export const TechIcon = ({
  title,
  thumbnailUrl,
  className = '',
}: TechIconProps) => {
  const iconImage = getExamIcon(title)

  return (
    <div
      className={`flex h-[48px] w-[48px] items-center justify-center rounded-lg bg-[#EFE6FC] ${className}`}
    >
      {iconImage ? (
        <img src={iconImage} alt={title} className="h-[28px] object-contain" />
      ) : thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-[28px] object-contain"
        />
      ) : (
        <span className="text-xs text-gray-500">N/A</span>
      )}
    </div>
  )
}
