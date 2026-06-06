import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import useAuthStore from '../store/useAuthStore';
import { Personalcard, Sms, User, FolderAdd } from 'iconsax-react';
import { Button, Modal } from '../ui';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const name = useAuthStore((state) => state.name);
  const userId = useAuthStore((state) => state.userId);
  const navigate = useNavigate();

  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCreateChannelClick = () => {
    setIsTermsModalOpen(true);
  };

  const handleContinue = () => {
    if (isAgreed) {
      navigate('/user-dashboard/create-channel');
    }
  };

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

        {/* CTA Section for Channel Creation */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 sm:p-10 shadow-lg text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-right">
              <h2 className="text-2xl sm:text-3xl font-bold">ایجاد کانال اختصاصی</h2>
              <p className="text-orange-100 max-w-md">
                با ایجاد کانال می‌توانید ویدیوهای خود را آپلود کرده و با دیگران به اشتراک بگذارید.
              </p>
            </div>
            <Button
              onClick={handleCreateChannelClick}
              className="bg-white !text-black hover:bg-orange-50 px-8 py-4 text-lg font-bold shadow-xl border-none"
              icon={<FolderAdd size={24} variant="Bold" color="currentColor" />}
            >
              ایجاد کانال و آپلود ویدیو
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Personalcard size={24} color="currentColor" />
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
                <Sms size={24} color="currentColor" />
              </div>
              <div>
                <p className="text-sm text-gray-500">وضعیت حساب</p>
                <p className="text-lg font-bold text-gray-900">فعال</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        title="قوانین و شرایط ایجاد کانال"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setIsTermsModalOpen(false)}>انصراف</Button>
            <Button disabled={!isAgreed} onClick={handleContinue}>تایید و ادامه</Button>
          </div>
        }
      >
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>برای ایجاد کانال در اربعین تی وی، لطفاً موارد زیر را مطالعه کرده و بپذیرید:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>محتوای ویدیویی باید مطابق با قوانین جمهوری اسلامی ایران باشد.</li>
            <li>رعایت حقوق کپی‌رایت و مالکیت معنوی آثار الزامی است.</li>
            <li>عدم انتشار محتوای توهین‌آمیز، تفرقه‌افکن و نامناسب.</li>
            <li>مسئولیت تمامی محتواهای منتشر شده بر عهده صاحب کانال است.</li>
          </ul>
          <div className="pt-4 border-t border-gray-100">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-sm font-medium group-hover:text-gray-900 transition-colors">
                قوانین و شرایط را مطالعه کرده‌ام و می‌پذیرم
              </span>
            </label>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default UserDashboard;
