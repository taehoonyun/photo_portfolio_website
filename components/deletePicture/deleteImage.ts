import axios from "axios";

export async function deleteImage(url: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await axios.post('/api/deleteImgCloudinary', { url });
    
    if (response.status === 200) {
      console.log(response.data.message); // "Image deleted successfully"
      return { success: true, message: response.data.message };
    } else {
      console.error('Failed to delete image:', response.data.error);
      return { success: false, message: response.data.error || '이미지 삭제 실패' };
    }
  } catch (error) {
    console.error('Error calling delete API:', error);
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
    return { success: false, message: `이미지 삭제 중 오류: ${errorMessage}` };
  }
}