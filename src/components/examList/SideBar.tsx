const sideTabs = [
  { id: 'exam', label: '쪽지시험' },
  { id: 'info', label: '내 정보' },
  { id: 'password', label: '비밀번호 변경' },
]

type SideTab = 'exam' | 'info' | 'password'
interface SideBarProps {
  activeTab: SideTab
  setActiveTab: (tab: SideTab) => void
}

export default function SideBar({ activeTab, setActiveTab }: SideBarProps) {
  return (
    <div>
      <nav>
        <ul className="space-y-1">
          {sideTabs.map((tab) => (
            <li key={tab.id}>
              <button
                type="button"
                onClick={() => setActiveTab(tab.id as SideTab)}
                className={`relative block w-full px-4 py-3 text-left text-lg transition-colors duration-200 focus:outline-none ${
                  activeTab === tab.id
                    ? 'font-bold text-purple-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {activeTab === tab.id && (
                  <span className="absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r bg-purple-600"></span>
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
