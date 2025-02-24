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

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <div className="flex gap-4">
          <a
            href="https://github.com/leejss"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            GitHub ↗
          </a>
          <a
            href="https://yard-coral.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            Blog ↗
          </a>
        </div>
      </div>
      <div className="space-y-12">
        {projects
          .sort((a, b) => b.period.start.localeCompare(a.period.start))
          .map((project, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">{project.name}</h2>
              <p className="mb-4 text-gray-600">@ {project.company}</p>
              <div className="mb-4">
                {project.techStack.map((tech, techIdx) => (
                  <span key={techIdx} className="mr-4 font-mono text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="mb-3 font-mono text-gray-600">
                {project.period.start} - {project.period.end}
              </p>
              <p className="whitespace-pre-line text-gray-700">{project.description}</p>
              {idx !== projects.length - 1 && <hr className="mt-8 border-gray-300" />}
            </div>
          ))}
      </div>
    </div>
  );
}
