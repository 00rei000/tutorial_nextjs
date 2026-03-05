"use client";

import Image from "next/image";
import { useState } from "react";

interface Profile {
  name: string;
  email: string;
  dob: string;
  sex: string;
  addressCompany: string;
  addressHome: string;
}

const initialProfile: Profile = {
  name: "MR. USER",
  email: "user@gmail.com",
  dob: "01/01/2018",
  sex: "Male",
  addressCompany: "15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi",
  addressHome: "15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState<Profile>(initialProfile);

  const handleEdit = () => {
    setTemp(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(temp);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTemp(profile);
    setIsEditing(false);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="border-b-2 border-gray-200 pb-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
      </div>

      {/* Avatar + Tên + Email */}
      <div className="flex items-center gap-8 mb-8">
        {/* Avatar to hơn */}
        <Image
          src="/avatar.png"
          alt="Avatar"
          width={120}
          height={120}
          style={{ width: 120, height: 120 }}
          className="rounded-full border-2 border-gray-200 object-cover"
        />
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold text-gray-800 tracking-wide">
            {profile.name}
          </p>
          <p className="text-gray-500 text-sm">Email: {profile.email}</p>
        </div>
      </div>

      {/* Form thông tin */}
      <div className="flex flex-col gap-6 max-w-lg ml-4">
        {/* Date of birth */}
        <div className="flex items-center gap-4">
          <span className="w-40 text-gray-600 text-sm shrink-0">
            Date of birth:
          </span>
          {isEditing ? (
            <input
              type="text"
              value={temp.dob}
              onChange={(e) => setTemp({ ...temp, dob: e.target.value })}
              className="flex-1 border-b border-gray-400 outline-none text-sm text-gray-800 bg-transparent pb-1"
            />
          ) : (
            <div className="flex items-center gap-2 border-b border-gray-300 pb-1 flex-1">
              <span className="text-gray-800 text-sm">{profile.dob}</span>
              <span className="text-gray-500">📅</span>
            </div>
          )}
        </div>

        {/* Sex */}
        <div className="flex items-center gap-4">
          <span className="w-40 text-gray-600 text-sm shrink-0">Sex:</span>
          {isEditing ? (
            <select
              value={temp.sex}
              onChange={(e) => setTemp({ ...temp, sex: e.target.value })}
              className="flex-1 border-b border-gray-400 outline-none text-sm text-gray-800 bg-transparent pb-1"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <div className="flex items-center gap-2 border-b border-gray-300 pb-1 flex-1">
              <span className="text-gray-800 text-sm">{profile.sex}</span>
              <span className="text-gray-500 text-xs">▼</span>
            </div>
          )}
        </div>

        {/* Address Company */}
        <div className="flex items-center gap-4">
          <span className="w-40 text-gray-600 text-sm shrink-0">
            Address Company:
          </span>
          {isEditing ? (
            <input
              type="text"
              value={temp.addressCompany}
              onChange={(e) =>
                setTemp({ ...temp, addressCompany: e.target.value })
              }
              className="flex-1 border-b border-gray-400 outline-none text-sm text-gray-800 bg-transparent pb-1"
            />
          ) : (
            <span className="flex-1 border-b border-gray-300 pb-1 text-sm text-gray-800">
              {profile.addressCompany}
            </span>
          )}
        </div>

        {/* Address Home */}
        <div className="flex items-center gap-4">
          <span className="w-40 text-gray-600 text-sm shrink-0">
            Address Home:
          </span>
          {isEditing ? (
            <input
              type="text"
              value={temp.addressHome}
              onChange={(e) =>
                setTemp({ ...temp, addressHome: e.target.value })
              }
              className="flex-1 border-b border-gray-400 outline-none text-sm text-gray-800 bg-transparent pb-1"
            />
          ) : (
            <span className="flex-1 border-b border-gray-300 pb-1 text-sm text-gray-800">
              {profile.addressHome}
            </span>
          )}
        </div>

        {/* Nút Edit/Save/Cancel */}
        <div className="flex gap-3 mt-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-8 py-2 bg-cyan-400 text-white font-bold rounded-lg hover:bg-cyan-500 transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-8 py-2 bg-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="px-8 py-2 bg-cyan-400 text-white font-bold rounded-lg hover:bg-cyan-500 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
