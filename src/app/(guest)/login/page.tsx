import React from 'react';
import backgroundImage from '@/assets/images/background.png';

const LoginPage = () => {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '150px 0px 0px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
        minHeight: '88vh',
        backgroundImage: `${backgroundImage}`,
        backgroundColor: '#e0e0e0',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="flex h-screen items-center justify-center"
    >
      <div className="w-80 rounded p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
        <form>
          <div className="mb-4">
            <label className="mb-2 block text-gray-700" htmlFor="studentId">
              Mã sinh viên
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              className="w-full rounded border border-gray-300 p-2"
              placeholder="Nhập mã sinh viên"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-gray-700" htmlFor="password">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded border border-gray-300 p-2"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
