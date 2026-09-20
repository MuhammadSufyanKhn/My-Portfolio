import TriangleGateLoader from "./TriangleGateLoader";

interface LoaderProps {
  onComplete: () => void;
  pageTitle?: string;
}

export default function Loader({ onComplete, pageTitle = "Portfolio" }: LoaderProps) {
  return (
    <TriangleGateLoader
      title={pageTitle}
      isActive={true}
      onComplete={onComplete}
      isInitial={true}
    />
  );
}
