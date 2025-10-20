import Spinner from "@/components/layout/Spinner";
import { getUser } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function ProtectRoutes({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const {
    data: isAuthenticated,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: false,
  });

  if (isLoading) return <Spinner />;

  if (!isAuthenticated || isError) {
    navigate("/login");
  }

  if (isAuthenticated && isSuccess) {
    return children;
  }

  return null;
}

export default ProtectRoutes;
