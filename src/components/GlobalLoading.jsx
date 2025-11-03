import { useLoading } from "../context/LoadingContext";
import { ClipLoader } from "react-spinners";

export default function GlobalLoading() {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <ClipLoader color="#d74136ff" size={60} />
    </div>
  );
}
