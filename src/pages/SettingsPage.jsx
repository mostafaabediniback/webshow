import { useState } from 'react'
import ChannelSettings from '../components/SettingsPages/ChannelSettings'
import ProfileSettings from '../components/SettingsPages/ProfileSettings'
import DashboardLayout from '../layouts/DashboardLayout'
import SocialSettings from '../components/SettingsPages/SocialSettings'

const TABS = [
  { key: 'channel', label: 'تنظیمات کانال' },
  { key: 'profile', label: 'تنظیمات پروفایل' },
  { key: 'social', label: 'تنظیمات شبکه‌های اجتماعی' },
]

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('channel')

  return (
    <DashboardLayout>


      <div className="flex flex-col p-3 sm:p-6">

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
            flex-shrink-0
            px-3 sm:px-4
            py-1.5 sm:py-2
            text-xs sm:text-sm
            rounded-lg
            transition-all
            border
            ${activeTab === tab.key
                    ? 'bg-orange-500 text-white border-orange-500 shadow'
                    : 'text-gray-600 border-gray-200 hover:bg-gray-100'
                  }
          `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'channel' && <ChannelSettings />}
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'social' && <SocialSettings />}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default SettingsPage