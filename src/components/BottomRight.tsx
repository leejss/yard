import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

const TopRight = () => {
  return (
    <div className="fixed right-4 top-4">
      <div className="flex gap-4">
        <a href="https://www.linkedin.com/in/leejss/" target="_blank">
          <LinkedInLogoIcon className="hover:brightness-125 transition-all w-[24px] h-[24px]  md:w-[40px] md:h-[40px]" color="rgb(0 119 181)" />
        </a>
        <a href="https://github.com/leejss" target="_blank">
          <GitHubLogoIcon className="hover:brightness-125 transition-all w-[24px] h-[24px]  md:w-[40px] md:h-[40px]" color="rgb(16 185 129)" />
        </a>
      </div>
    </div>
  );
};

export default TopRight;
