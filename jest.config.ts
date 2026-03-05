import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(png|jpg|jpeg|svg|gif)$": "<rootDir>/__mocks__/fileMock.ts",
    "^next/navigation$": "<rootDir>/__mocks__/next/navigation.ts",
    "^next/image$": "<rootDir>/__mocks__/next/image.tsx",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: { jsx: "react-jsx" },
      },
    ],
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  collectCoverageFrom: [
    "app/store/slices/**/*.{ts,tsx}",
    "app/shop/components/**/*.{ts,tsx}",
    "app/shop/cart/page.tsx",
    "app/shop/page.tsx",
    "!**/__tests__/**",
    "!**/node_modules/**",
  ],
  coverageReporters: ["text", "lcov"],
};

export default config;
