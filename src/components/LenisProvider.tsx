"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

interface LenisProviderProps {
  children: React.ReactNode;
}
const LenisProvider = ({ children }: LenisProviderProps) => {
  return <ReactLenis root>{children}</ReactLenis>;
};

export default LenisProvider;
