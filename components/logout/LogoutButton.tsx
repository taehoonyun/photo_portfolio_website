import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

interface LogoutButtonProps {
  title: string;
}

const LogoutButton = ({ title }: LogoutButtonProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear local storage and redirect to the login page if logout is successful
        if (typeof window !== "undefined") {
          localStorage.clear();
        }
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <Button
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      onClick={handleLogout}
    >
      {title}
    </Button>
  );
};

export default LogoutButton;
