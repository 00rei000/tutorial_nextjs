"use client";

import Image from "next/image";
import { useState, type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateProfile } from "../../store/slices/profileSlice";
import type { Profile } from "../../store/slices/profileSlice";
import { Button, Input, Select, message } from "antd";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile.data);
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState<Profile>(profile);

  const handleEdit = () => {
    setTemp(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateProfile(temp));
    setIsEditing(false);
    message.success("Đã lưu thông tin profile");
  };

  const handleCancel = () => {
    setTemp(profile);
    setIsEditing(false);
    message.info("Đã hủy chỉnh sửa");
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="border-b-2 border-gray-200 pb-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
      </div>

      {/* Avatar + Tên + Email */}
      <div className="flex items-center gap-8 mb-8">
        {/* Avatar */}
        <Image
          src="/avatar.png"
          alt="Avatar"
          width={120}
          height={120}
          style={{ width: 120, height: 120 }}
          className="rounded-full border-2 border-gray-200 object-cover"
        />
        <div className="flex flex-col gap-3">
          {/* Name */}
          {isEditing ? (
            <Input
              value={temp.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTemp({ ...temp, name: e.target.value })
              }
              className="text-2xl font-bold text-gray-800 tracking-wide"
            />
          ) : (
            <p className="text-2xl font-bold text-gray-800 tracking-wide">
              {profile.name}
            </p>
          )}
          {/* Email */}
          {isEditing ? (
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">Email:</span>
              <Input
                value={temp.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTemp({ ...temp, email: e.target.value })
                }
                size="small"
                className="flex-1"
              />
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Email: {profile.email}</p>
          )}
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
            <Input
              value={temp.dob}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTemp({ ...temp, dob: e.target.value })
              }
              size="small"
              className="flex-1"
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
            <Select
              value={temp.sex}
              onChange={(value) => setTemp({ ...temp, sex: value })}
              size="small"
              className="flex-1"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
            />
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
            <Input
              value={temp.addressCompany}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTemp({ ...temp, addressCompany: e.target.value })
              }
              size="small"
              className="flex-1"
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
            <Input
              value={temp.addressHome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTemp({ ...temp, addressHome: e.target.value })
              }
              size="small"
              className="flex-1"
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
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </>
          ) : (
            <Button type="primary" onClick={handleEdit}>
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
