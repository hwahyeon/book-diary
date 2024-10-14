import { useRouter } from "next/navigation";

export const useHomeNavigation = (): (() => void) => {
  const router = useRouter();
  return () => router.push("/");
};

export const useBackNavigation = (): (() => void) => {
  const router = useRouter();
  return () => router.back();
};

export const useNavigateTo = (path: string): (() => void) => {
  const router = useRouter();
  return () => router.push(path);
};
