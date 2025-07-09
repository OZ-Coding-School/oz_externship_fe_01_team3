import { useState } from 'react'
import ExamList from '@/components/examList/ExamList'
import SideBar from '@/components/examList/SideBar'
import ExamListModal from '@/components/examList/ExamListModal'
import ChangePasswordContainer from '../ChangePassword/ChangePasswordContainer'

type SideTab = 'exam' | 'info' | 'password'

export default function ExampleListContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<SideTab>('exam')

  return (
    <div className="mt-[108px] min-h-screen">
      <div className="container mx-auto min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full border-gray-200 lg:min-h-screen lg:w-64 lg:border-r">
            <div className="px-6 py-8">
              <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>

          <div className="flex-1 lg:min-h-screen">
            <div className="px-4 py-6 sm:px-6 lg:px-8">
              {activeTab === 'exam' && (
                <ExamList setIsModalOpen={setIsModalOpen} />
              )}
              {activeTab === 'info' && <div>My page!</div>}
              {activeTab === 'password' && <ChangePasswordContainer />}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <ExamListModal setIsModalClose={setIsModalOpen} />}
    </div>
  )
}
