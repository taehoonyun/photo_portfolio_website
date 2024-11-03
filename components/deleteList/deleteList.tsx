"use client";
import React from "react";
import Image from "next/image";
import { deleteImage } from "../deletePicture/deleteImage"; // Ensure deleteImage is correctly implemented and imported

interface DeleteImageListProps {
  profilePic: string[]; // Type for profilePic as an array of strings
}

const DeleteImageList: React.FC<DeleteImageListProps> = ({ profilePic }) => {
  return (
    <div className="container w-44 bg-white p-4 z-10 absolute right-0 top-12 shadow-lg rounded">
      <h2 className="text-lg font-bold mb-4">Image List</h2>
      <ul className="space-y-1">
        {profilePic.map((image) => (
          <li key={image} className="flex items-center space-x-4">
            <Image
              src={image}
              alt="Image"
              width={80} // Adjusted to display a thumbnail
              height={80}
              className="rounded"
            />
            <button
              onClick={() => deleteImage(image)}
              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteImageList;
