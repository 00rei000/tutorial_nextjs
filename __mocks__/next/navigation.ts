const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();

export const useRouter = jest.fn(() => ({
  push: mockPush,
  replace: mockReplace,
  back: mockBack,
}));

export const usePathname = jest.fn(() => "/shop");
export const useParams = jest.fn(() => ({ id: "1" }));
