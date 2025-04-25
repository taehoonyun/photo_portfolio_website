// hooks/useProfile.ts
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { fetchImagesFromFolder } from "@/components/getPicture/getPicture";
import Cookies from 'js-cookie';

export const useProfile = (folderPath: string, limit: number = 10) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to load image list
  const loadProfilePicture = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedImages = await fetchImagesFromFolder(folderPath, limit);
      if (fetchedImages.pictures?.length > 0) {
        setProfilePic(fetchedImages.pictures);
      } else {
        setProfilePic([]);
      }
    } catch (error) {
      console.error("Error loading profile picture:", error);
      if (typeof window !== "undefined") {
        toast.error("Failed to load images");
      }
    } finally {
      setIsLoading(false);
    }
  }, [folderPath, limit]);

  useEffect(() => {
    // Check cookies instead of localStorage
    if (typeof window !== "undefined") {
      // Check both token types (regular and anonymous)
      const hasToken = Cookies.get('token') !== undefined;
      const hasAnonToken = Cookies.get('token_anony') !== undefined;
      
      setIsLoggedIn(hasToken || hasAnonToken);
      
      // Debug console logs
      console.log("Auth check - Token:", hasToken, "Anonymous:", hasAnonToken);
    }
    
    loadProfilePicture();
  }, [loadProfilePicture]);

  // 업로드 성공 핸들러
  const handleUploadSuccess = useCallback((newImageUrl: string) => {
    setProfilePic((prev) => [newImageUrl, ...prev]);
    if (typeof window !== "undefined") {
      toast.success("이미지가 성공적으로 업로드되었습니다!");
    }
  }, []);

  // 새로고침 함수
  const refreshImages = useCallback(() => {
    loadProfilePicture();
  }, [loadProfilePicture]);

  return { 
    isLoggedIn, 
    profilePic, 
    isLoading,
    handleUploadSuccess,
    refreshImages 
  };
};
