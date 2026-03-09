import profileReducer, { updateProfile } from "../profileSlice";
import type { Profile } from "../profileSlice";

const initialProfile: Profile = {
  name: "MR. USER",
  email: "user@gmail.com",
  dob: "01/01/2018",
  sex: "Male",
  addressCompany: "15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi",
  addressHome: "15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi",
};

const updatedProfile: Profile = {
  name: "JOHN DOE",
  email: "johndoe@gmail.com",
  dob: "15/08/1995",
  sex: "Female",
  addressCompany: "100, Tran Duy Hung, Cau Giay, Ha Noi",
  addressHome: "200, Le Van Luong, Thanh Xuan, Ha Noi",
};

describe("profileSlice", () => {
  it("state ban đầu phải khớp với initialProfile", () => {
    const state = profileReducer(undefined, { type: "" });
    expect(state.data).toEqual(initialProfile);
  });

  it("updateProfile: cập nhật toàn bộ thông tin profile", () => {
    const state = profileReducer(undefined, updateProfile(updatedProfile));
    expect(state.data).toEqual(updatedProfile);
  });

  it("updateProfile: cập nhật chỉ tên mới", () => {
    const newProfile: Profile = { ...initialProfile, name: "JANE DOE" };
    const state = profileReducer(undefined, updateProfile(newProfile));
    expect(state.data.name).toBe("JANE DOE");
    // Các trường khác không thay đổi
    expect(state.data.email).toBe(initialProfile.email);
    expect(state.data.dob).toBe(initialProfile.dob);
  });

  it("updateProfile: cập nhật chỉ email mới", () => {
    const newProfile: Profile = {
      ...initialProfile,
      email: "newemail@gmail.com",
    };
    const state = profileReducer(undefined, updateProfile(newProfile));
    expect(state.data.email).toBe("newemail@gmail.com");
  });

  it("updateProfile: cập nhật giới tính từ Male sang Female", () => {
    const newProfile: Profile = { ...initialProfile, sex: "Female" };
    const state = profileReducer(undefined, updateProfile(newProfile));
    expect(state.data.sex).toBe("Female");
  });

  it("updateProfile: cập nhật địa chỉ công ty", () => {
    const newProfile: Profile = {
      ...initialProfile,
      addressCompany: "999, Hoang Dieu, Ba Dinh, Ha Noi",
    };
    const state = profileReducer(undefined, updateProfile(newProfile));
    expect(state.data.addressCompany).toBe("999, Hoang Dieu, Ba Dinh, Ha Noi");
  });

  it("updateProfile: cập nhật địa chỉ nhà", () => {
    const newProfile: Profile = {
      ...initialProfile,
      addressHome: "888, Kim Ma, Ba Dinh, Ha Noi",
    };
    const state = profileReducer(undefined, updateProfile(newProfile));
    expect(state.data.addressHome).toBe("888, Kim Ma, Ba Dinh, Ha Noi");
  });

  it("updateProfile: sau khi cập nhật 2 lần, state phản ánh lần cuối", () => {
    let state = profileReducer(undefined, updateProfile(updatedProfile));
    state = profileReducer(state, updateProfile(initialProfile));
    expect(state.data).toEqual(initialProfile);
  });
});
