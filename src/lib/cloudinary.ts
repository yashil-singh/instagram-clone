import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";
import { UploadApiResponse } from "cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params";

type UploadImageProps = {
  option?: "post" | "avatar";
  file: string;
};

export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

export const uploadImage = async ({
  file,
  option = "post",
}: UploadImageProps) => {
  let options: {
    upload_preset: string;
    unsigned: boolean;
  };

  if (option === "post") {
    options = {
      upload_preset: "default",
      unsigned: true,
    };
  } else if (option === "avatar") {
    options = {
      upload_preset: "default",
      unsigned: true,
    };
  } else {
    options = {
      upload_preset: "default",
      unsigned: true,
    };
  }

  return new Promise<UploadApiResponse>(async (resolve, reject) => {
    await upload(cld, {
      file,
      options: options,
      callback: (error, response) => {
        if (error) {
          reject(error);
        } else {
          if (response) resolve(response);
          else return null;
        }
      },
    });
  });
};
