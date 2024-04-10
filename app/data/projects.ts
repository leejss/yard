export type ProjectType = {
  date: string;
  title: string;
  summary: string;
};

export const projects: ProjectType[] = [
  {
    date: "2024/04",
    title: "Intella X Adventure Crew system",
    summary: "프론트엔드 개발. 블록체인 기반 길드 커뮤니티 서비스.",
  },
  {
    date: "2023/10",
    title: "Intella X NFT Marketplace",
    summary: "프론트엔드 유지 보수. NFT 거래소 서비스.",
  },
  {
    date: "2023/05",
    title: "IXWallet WalletConnect V2",
    summary:
      "IXWallet에서 사용하는 WalletConnect 모듈 v1에서 v2로 마이그레이션 담당",
  },
  {
    date: "2022/08",
    title: "(주)살다 잘살다마켓",
    summary: "프론트엔드 개발. 신선식품 배송 서비스.",
  },
];
