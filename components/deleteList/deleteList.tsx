"use client";
import React, { useState } from "react";
import Image from "next/image";
import { deleteImage } from "../deletePicture/deleteImage";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { XMarkIcon,TrashIcon } from "@heroicons/react/24/outline";


interface DeleteImageListProps {
  profilePic: string[];
  onClose?: () => void;
  onRefresh?: () => void;
}

const DeleteImageList: React.FC<DeleteImageListProps> = ({ 
  profilePic, 
  onClose,
  onRefresh 
}) => {
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [deletingImage, setDeletingImage] = useState<string | null>(null);
  const [localImages, setLocalImages] = useState<string[]>(profilePic);
  
  const handleDeleteImage = async (image: string) => {
    setDeletingImage(image);
    try {
      const result = await deleteImage(image);
      
      if (result.success) {
        setLocalImages(prev => prev.filter(img => img !== image));
        
        toast.success("Image deleted successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        
        setPendingDelete(null);
        
        if (onRefresh) {
          setTimeout(() => {
            onRefresh();
          }, 500);
        }
      } else {
        toast.error(result.message || "Failed to delete image");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the image");
    } finally {
      setDeletingImage(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="absolute right-0 top-12 w-72 rounded-lg bg-white shadow-xl border border-gray-100 overflow-hidden z-50"
    >
      <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-white p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-700">Image Management</h2>
        {onClose && (
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {localImages.length === 0 ? (
        <div className="p-6 text-center text-gray-500">No images available</div>
      ) : (
        <ul className="max-h-96 overflow-y-auto p-4 space-y-3">
          <AnimatePresence>
            {localImages.map((image) => (
              <motion.li 
                key={image}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="group flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={image}
                    alt="Image thumbnail"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <span className="flex-1 text-sm text-gray-700 truncate">
                  {image.split('/').pop()?.substring(0, 15)}
                </span>
                
                {pendingDelete === image ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDeleteImage(image)}
                      className="p-1.5 rounded-md bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                      disabled={deletingImage === image}
                      aria-label="Confirm delete"
                    >
                      {deletingImage === image ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                      ) : (
                        <TrashIcon className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => setPendingDelete(null)}
                      className="p-1.5 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      disabled={deletingImage === image}
                      aria-label="Cancel"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setPendingDelete(image)}
                    className="p-1.5 rounded-full bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 transition-all"
                    aria-label="Delete image"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </motion.div>
  );
};

export default DeleteImageList;
