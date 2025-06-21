import { useState } from 'react'

const sideTabs = [
  { id: 'example', label: '쪽지시험' },
  { id: 'info', label: '내 정보' },
  { id: 'password', label: '비밀번호 변경' },
]
type SideTab = '쪽지시험' | '내 정보' | '비밀번호 변경'

export default function SideBar() {
  const [activeTab, setActiveTab] = useState<SideTab>('쪽지시험')
  return (
    <aside>
      <nav>
        <ul>
          {sideTabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id as SideTab)}
                className={`w-full text-left block py-2 relative text-lg focus:outline-none ${
                  activeTab === tab.id
                    ? 'text-purple-600 font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {activeTab === tab.id && (
                  <span className="absolute left-[-24px] top-1/2 -translate-y-1/2 h-6 w-1 bg-purple-600 rounded"></span>
                )}
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
