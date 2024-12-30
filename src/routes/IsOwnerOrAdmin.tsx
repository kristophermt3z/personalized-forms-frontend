import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchFormById } from "../services/formsService";

const IsOwnerOrAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, currentUserId } = useAuth();
  const { formId } = useParams();

  const [isAllowed, setIsAllowed] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkOwnership = async () => {
      try {
        const { data } = await fetchFormById(formId!);
        setIsAllowed(isAdmin || data.authorId._id === currentUserId);
    } catch {
        setIsAllowed(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (formId) checkOwnership();
  }, [formId, isAdmin, currentUserId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAllowed) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default IsOwnerOrAdmin;
