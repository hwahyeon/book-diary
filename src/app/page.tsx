import { FeaturePost } from "@/components/Feature";
import { IntroPost } from "@/components/Intro";

const HomePage: React.FC = () => {
  return (
    <div className="bg-background pt-16 px-4 xl:px-16 lg:px-14 md:px-8 sm:px-4 max-w-screen-xl mx-auto">
      <IntroPost />
      <FeaturePost />
    </div>
  );
};

export default HomePage;
