// hooks/useProfile.ts
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchImagesFromFolder } from "@/components/getPicture/getPicture";

export const useProfile = (folderPath: string, limit: number = 10) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState<string[]>([]); // No `null`

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("user"));
    }
    
    const loadProfilePicture = async () => {
      try {
        const fetchedImages = await fetchImagesFromFolder(folderPath, limit);
        if (fetchedImages.pictures?.length > 0) {
          setProfilePic(fetchedImages.pictures);
        }
      } catch (error) {
        console.error("Error loading profile picture:", error);
        toast.error("Failed to load profile picture.");
      }
    };

    loadProfilePicture();
  }, [folderPath, limit]);

  const handleUploadSuccess = (newImageUrl: string) => {
    setProfilePic((prev: string[]) => [newImageUrl, ...prev]); // Type prev as `string[]`
    toast.success("Profile picture updated successfully!");
  };

  return { isLoggedIn, profilePic, handleUploadSuccess };
};
