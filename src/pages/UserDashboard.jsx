import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import useAuthStore from '../store/useAuthStore';
import { Personalcard, Sms, User } from 'iconsax-react';

function UserDashboard() {
  const name = useAuthStore((state) => state.name);
  const userId = useAuthStore((state) => state.userId);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <User size={48} variant="Bold" />
            </div>
            <div className="text-center sm:text-right space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">{name || 'کاربر مهمان'}</h1>
              <p className="text-gray-500 text-sm">خوش آمدید به پنل کاربری اربعین تی وی</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Personalcard size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">شناسه کاربری</p>
                <p className="text-lg font-bold text-gray-900">{userId || '---'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                <Sms size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">وضعیت حساب</p>
                <p className="text-lg font-bold text-gray-900">فعال</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default UserDashboard;
