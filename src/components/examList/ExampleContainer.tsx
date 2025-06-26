import { useState } from 'react'
import ExamListModal from '@/components/examListModal/ExamListModal'
import ExamList from '@/components/examList/ExamList'
import SideBar from '@/components/examList/SideBar'

export default function ExampleListContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen mt-[108px]">
      <div className="container mx-auto max-w-7xl min-h-screen  px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-64 w-full lg:min-h-screen lg:border-r border-gray-200">
            <div className="px-6 py-8">
              <SideBar />
            </div>
          </div>

          <div className="flex-1 lg:min-h-screen">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              <ExamList />
            </div>
          </div>
        </div>
      </div>

      {!isModalOpen && <ExamListModal setIsModalClose={setIsModalOpen} />}
    </div>
  )
}
