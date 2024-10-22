import { useRouter } from "next/router";
import { Button } from "@nextui-org/react"; // Ensure correct import from NextUI

const LogoutButton = () => {
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
        // If logout is successful, redirect to the login page
        router.push("/login");
        if (typeof window !== "undefined") {
          const token = localStorage.removeItem("user");
        }
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
      Logout
    </Button>
  );
};

export default LogoutButton; // Ensure the component is correctly exported