import TriangleGateLoader from "./TriangleGateLoader";

interface PageTransitionLoaderProps {
  title: string;
  isActive: boolean;
  onComplete: () => void;
}

export default function PageTransitionLoader({
  title,
  isActive,
  onComplete,
}: PageTransitionLoaderProps) {
  return (
    <TriangleGateLoader
      title={title}
      isActive={isActive}
      onComplete={onComplete}
      isInitial={false}
    />
  );
}
