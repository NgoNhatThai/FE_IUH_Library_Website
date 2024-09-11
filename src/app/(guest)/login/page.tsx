'use client';
import React, { useState } from 'react';
import backgroundImage from '@/assets/images/background.png';
import { userService } from '@/services/userService';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/redux/slices/user-slice';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const login = async () => {
    try {
      const result = await userService.login(studentId);
      if (result) {
        dispatch(setUserInfo(result.data));
        localStorage.setItem('userInfo', JSON.stringify(result.data));
        localStorage.setItem('@access_token', result.data.access_token);
        localStorage.setItem('@refresh_token', result.data.refresh_token);

        toast.success('Đăng nhập thành công');
        router.push('/');
      }
    } catch (error) {
      console.error(error);
      toast.error('Đăng nhập thất bại');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login();
  };

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundColor: '#e0e0e0',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-80 rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Đăng nhập
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-gray-700" htmlFor="studentId">
              Mã sinh viên
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Nhập mã sinh viên"
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-700 focus:outline-none"
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
