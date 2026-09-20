import VaultGateLoader from "./VaultGateLoader";

interface LoaderProps {
  onComplete?: () => void;
  pageTitle?: string;
}

export default function Loader({ onComplete }: LoaderProps) {
  return <VaultGateLoader onComplete={onComplete} />;
}
