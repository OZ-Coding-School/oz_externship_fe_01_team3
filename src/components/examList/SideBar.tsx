import { useState } from 'react'
import type { SideTabId, SideTab, SideBarProps } from '@/types/examList'

const SIDE_TABS: SideTab[] = [
  { id: 'exam', label: '쪽지시험' },
  { id: 'info', label: '내 정보' },
  { id: 'password', label: '비밀번호 변경' },
]

export default function SideBar({
  activeTab = 'exam',
  onTabChange,
}: SideBarProps) {
  const [currentTab, setCurrentTab] = useState<SideTabId>(activeTab)

  const handleTabClick = (tabId: SideTabId): void => {
    setCurrentTab(tabId)
    onTabChange?.(tabId)
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <nav>
        <ul className="space-y-2">
          {SIDE_TABS.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => handleTabClick(tab.id)}
                className={`w-full text-left block py-3 px-4 relative text-lg focus:outline-none rounded-lg transition-colors duration-200 ${
                  currentTab === tab.id
                    ? 'text-purple-600 font-bold bg-purple-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {currentTab === tab.id && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-purple-600 rounded-r"></span>
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
