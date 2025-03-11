"use client";

import { useTheme } from "next-themes";

interface Contact {
  type: "email" | "github" | "linkedin" | "website";
  icon: string;
  url: string;
  display: string;
}

const contacts: Contact[] = [
  {
    type: "email",
    icon: "📧",
    url: "mailto:goldemshine@gmail.com",
    display: "goldemshine@gmail.com",
  },
  {
    type: "github",
    icon: "🔗",
    url: "https://github.com/leejss",
    display: "github.com/leejss",
  },
  {
    type: "linkedin",
    icon: "🔗",
    url: "https://www.linkedin.com/in/leejss/",
    display: "linkedin.com/in/leejss",
  },
  {
    type: "website",
    icon: "🔗",
    url: "https://yard-coral.vercel.app",
    display: "yard-coral.vercel.app",
  },
];

interface Project {
  name: string;
  company: string;
  techStack: string[];
  period: {
    start: string;
    end: string;
  };
  description: string;
}

const projects: Project[] = [
  {
    name: "트위터 Agent 봇 개발",
    company: "네오위즈",
    techStack: ["ElizaOS"],
    period: {
      start: "2025-01",
      end: "2025-01",
    },
    description: "ElizaOS를 이용한 트위터 봇 개발",
  },
  {
    name: "Alphastarter 서비스 개발",
    company: "네오위즈",
    techStack: ["Nextjs", "ReactQuery", "Wagmi", "WalletConnect", "Storybook"],
    period: {
      start: "2024-11",
      end: "2024-12",
    },
    description: "Project fundraising platform 서비스 개발 및 런칭",
  },
  {
    name: "IX Adventure 디앱 서비스 개발",
    company: "네오위즈",
    techStack: ["Nextjs", "ReactQuery", "wagmi", "MSW", "Storybook"],
    period: {
      start: "2024-06",
      end: "2024-08",
    },
    description: "커뮤니티 중심의 디앱 서비스 개발 및 런칭.",
  },
  {
    name: "NFT Marketplace 유지보수",
    company: "네오위즈",
    techStack: ["Nextjs", "StyledComponent", "ReactQuery"],
    period: {
      start: "2023-09",
      end: "2024-01",
    },
    description: "NFT 마켓플레이스 프로젝트를 넘겨 받아 유지 보수. 멀티 토큰 거래, 메타마스크 연결 등 기능 추가",
  },
  {
    name: "IX Wallet 기능 추가 및 유지보수",
    company: "네오위즈",
    techStack: ["Infura", "WalletConnect", "ReactNative"],
    period: {
      start: "2023-01",
      end: "2023-12",
    },
    description: "IX Wallet 기능 추가 및 유지보수. WalletConnect V2 migration 진행.",
  },
  {
    name: '아파드 단지 기반 이커머스 서비스 "잘스마켓" 런칭',
    company: "주식회사 살다",
    techStack: ["Nextjs", "AWS Amplify", "Emotion", "Storybook"],
    period: {
      start: "2022-06",
      end: "2022-07",
    },
    description: "아파트 단지 기반 신선식품 서비스 '잘스마켓' 프론트엔드 개발",
  },
];

export default function ResumePage() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Main container */}
      <div className="mx-auto flex h-screen max-w-7xl flex-col md:flex-row">
        {/* Left column - Personal info */}
        <div className="flex w-full flex-col justify-between p-8 md:w-1/3 md:border-r md:border-gray-200 md:dark:border-gray-700">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">이종서(leejss)</h1>
              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <title>Light Mode</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <title>Dark Mode</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <p className="mt-2 text-xl text-gray-600 dark:text-gray-400">
              Engineer who is enthusiastic about frontend technology
            </p>

            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Contact</h2>
              <div className="space-y-2">
                {contacts.map((contact) => (
                  <div key={contact.type} className="flex items-center">
                    <span className="mr-2">{contact.icon}</span>
                    <a
                      href={contact.url}
                      target={contact.type !== "email" ? "_blank" : undefined}
                      rel={contact.type !== "email" ? "noopener noreferrer" : undefined}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {contact.display}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Stack</h2>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind CSS", "React Query", "Framer Motion", "Web3", "AI"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Projects */}
        <div className="flex w-full flex-col p-8 md:w-2/3">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Projects</h2>

          {/* Scrollable projects container */}
          <div className="h-[calc(100vh-12rem)] overflow-y-auto pr-4">
            <div className="space-y-8 pr-4">
              {projects
                .sort((a, b) => b.period.start.localeCompare(a.period.start))
                .map((project) => (
                  <div
                    key={`project-${project.name}`}
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                  >
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
                    <p className="mb-3 text-gray-600 dark:text-gray-400">@ {project.company}</p>
                    <div className="mb-3">
                      {project.techStack.map((tech) => (
                        <span
                          key={`${project.name}-${tech}`}
                          className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="mb-3 font-mono text-sm text-gray-600 dark:text-gray-400">
                      {project.period.start} - {project.period.end}
                    </p>
                    <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{project.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
