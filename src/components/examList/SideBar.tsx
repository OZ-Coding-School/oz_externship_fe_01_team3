import { useState } from 'react'

const sideTabs = [
  { id: 'exam', label: '쪽지시험' },
  { id: 'info', label: '내 정보' },
  { id: 'password', label: '비밀번호 변경' },
]

type SideTab = 'exam' | 'info' | 'password'

export default function SideBar() {
  const [activeTab, setActiveTab] = useState<SideTab>('exam')

  return (
    <div>
      <nav>
        <ul className="space-y-1">
          {sideTabs.map((tab) => (
            <li key={tab.id}>
              <button
                type="button"
                onClick={() => setActiveTab(tab.id as SideTab)}
                className={`w-full text-left block py-3 px-4 relative text-lg focus:outline-none transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-purple-600 font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {activeTab === tab.id && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-purple-600 rounded-r"></span>
                )}
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
