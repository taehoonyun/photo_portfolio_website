// hooks/useProfile.ts
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { fetchImagesFromFolder } from "@/components/getPicture/getPicture";

export const useProfile = (folderPath: string, limit: number = 10) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 이미지 목록을 로드하는 함수
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
        toast.error("이미지를 불러오는데 실패했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [folderPath, limit]);

  useEffect(() => {
    // 로그인 상태 확인
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("user"));
    }
    
    // 이미지 로드
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
