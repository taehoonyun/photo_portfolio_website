import axios from "axios";

export async function deleteImage(url: string) {
    try {
      const response = await axios.post('/api/deleteImgCloudinary', { url });
      
      if (response.status === 200) {
        console.log(response.data.message); // "Image deleted successfully"
      } else {
        console.error('Failed to delete image:', response.data.error);
      }
    } catch (error) {
      console.error('Error calling delete API:', error);
    }
  }