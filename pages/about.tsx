import Tag from "components/ui/Tag";
import type { TagType } from "interfaces/post";
import type { NextPage } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { MdArrowBackIos } from "react-icons/md";

const skills: TagType[] = [
  "javascript",
  "react",
  "typescript",
  "css",
  "nextjs",
];

const AboutPage = () => {
  return (
    <>
      <main className="container px-12 py-20 mx-auto md:px-36 lg:px-72">
        <h1 className="text-4xl font-bold md:text-6xl">이종서</h1>
        <p className="my-4 text-sm italic text-gray-400 md:text-md">
          다양한 개발 경험을 좋아합니다.
        </p>
        <div className="flex flex-col gap-5">
          <section id="profile">
            <MainTitle hash="#profile">Profile</MainTitle>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center justify-between">
                <strong>Email</strong>
                <a
                  className="hover:underline"
                  href="mailto:goldemshine@gmail.com"
                >
                  goldemshine@gmail.com
                </a>
              </li>
              <li className="flex items-center justify-between">
                <strong>Github</strong>
                <a
                  className="hover:underline"
                  href="https://github.com/leejss"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://github.com/leejss
                </a>
              </li>
              <li className="flex items-center justify-between">
                <strong>Phone</strong>
                <span>010-4193-7137</span>
              </li>
              <li className="flex items-center justify-between">
                <strong>Website</strong>
                <a
                  className="hover:underline"
                  href="https://tinyyard.dev"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://tinyyard.dev
                </a>
              </li>
            </ul>
          </section>
          <div className="h-[0.5px] bg-slate-700" />
          <section id="experience">
            <MainTitle hash="#experience">Experiences</MainTitle>
            <ul>
              <li>
                <div className="mb-4">
                  <h3 className="flex justify-between">
                    <a
                      href="https://www.jalsalda.com/"
                      className="text-xl font-bold md:text-2xl hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      살다
                    </a>
                    <time>2021-09-01 ~</time>
                  </h3>
                  <p className="italic">
                    국내 7,000단지를 보유한 아파트 생활 편의 서비스
                  </p>
                </div>
                <SubTitleList>
                  <li>
                    <SubTitle time="2022-06 ~ 2022-07">
                      Ecommerce 플랫폼 {'"잘스마켓"'} 개발
                    </SubTitle>
                    <DiskList>
                      <li>
                        웹뷰와 브릿지 통신을 활용하여 하이브리드 형식으로 개발
                      </li>
                      <li>Nextjs, swr, mobx 등을 활용</li>
                      <li>AWS amplify 서비스를 통해 배포</li>
                      <li>
                        <strong className="font-bold">
                          3주간 개발 후, 국내 평균 전환율 대비 470% 높은
                          전환율을 도출
                        </strong>
                      </li>
                    </DiskList>
                  </li>
                  <li>
                    <SubTitle time="2022-04 ~ 2022-06">
                      중고거래 플랫폼 {'"나눔장터"'} 유지 보수
                    </SubTitle>
                    <DiskList>
                      <li>주문 페이지 제작</li>
                      <li>webpack 설정 개선</li>
                    </DiskList>
                  </li>
                  <li>
                    <SubTitle time="2021-11 ~ 2021-12">
                      입주민 공지 달력 제작
                    </SubTitle>
                  </li>
                </SubTitleList>
              </li>
            </ul>
          </section>
          <section id="projects">
            <MainTitle hash="#projects">Personal Projects</MainTitle>
            <SubTitleList>
              <li>
                <SubTitle>개인 블로그 제작</SubTitle>
                <DiskList>
                  <li>nextjs, storyblok, tailwindcss 활용</li>
                </DiskList>
              </li>
            </SubTitleList>
          </section>
          <section id="skills">
            <MainTitle hash="#skills">Skills</MainTitle>
            <ul className="flex gap-2">
              {skills.map((sk) => (
                <Tag key={sk}>{sk}</Tag>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <BackToHome />
    </>
  );
};

export default AboutPage;

AboutPage.getLayout = (page: NextPage) => page;

const SubTitle = ({
  children,
  time,
}: {
  children: ReactNode;
  time?: string;
}) => {
  return (
    <h4 className="flex justify-between gap-2 pl-4 mb-4 border-l-4">
      <span className="basis-[80%] text-base md:text-lg">{children}</span>
      {time && <time className="text-sm">{time}</time>}
    </h4>
  );
};

const MainTitle = ({
  children,
  hash,
}: {
  children: ReactNode;
  hash: string;
}) => {
  return (
    <h2 className="mb-3 text-2xl font-bold md:text-3xl">
      <a href={hash}>{children}</a>
    </h2>
  );
};

const DiskList = ({ children }: { children: ReactNode }) => {
  return <ul className="pl-8 list-disc">{children}</ul>;
};

const SubTitleList = ({ children }: { children: ReactNode }) => {
  return <ul className="flex flex-col gap-4 pl-1 md:pl-6">{children}</ul>;
};

const BackToHome = () => {
  return (
    <div className="fixed text-base md:text-3xl flex items-center gap-4 bottom-4 left-4 bg-[#fffdb] dark:bg-[#1b1616db] rounded-2xl p-2">
      <MdArrowBackIos />
      <Link href="/">Home</Link>
    </div>
  );
};
