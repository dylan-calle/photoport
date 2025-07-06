"use client";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { DialogCloseButton } from "./new-collection";
import ScreenSpinner from "@/components/screen-spiner";
import { AlertDialogGallery } from "./alert-dialog";

type GalleryPhotos = {
  type: string;
  title: string;
  code_title: string;
  main_photo: string;
  s_photo: string;
  t_photo: string;
  orientation: string;
};
type GalleryTypes = {
  type: string;
  type_show: string;
};

export default function Page() {
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhotos[]>([]);
  const [galleryTypes, setGalleryTypes] = useState<GalleryTypes[]>([]);
  const [needFetchData, setNeedFetchData] = useState<boolean>(false);
  const [isSpinnerOpen, setIsSpinnerOpen] = useState<boolean>(false);

  const [codeToDelete, setCodeToDelete] = useState<string>("");
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const fetchData = async () => {
    setIsSpinnerOpen(true);
    try {
      const [galleryPhotosRes, galleryTypesRes] = await Promise.all([
        axios.get("/api/gallery-photos"),
        axios.get("/api/gallery-photos/types"),
      ]);
      setGalleryPhotos(galleryPhotosRes.data);
      setGalleryTypes(galleryTypesRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSpinnerOpen(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [needFetchData]);

  return (
    <>
      <ScreenSpinner isOpen={isSpinnerOpen} />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6 flex gap-x-5 items-center">
              <h2 className="font-poppins text-2xl">Manage Collections</h2>
              <DialogCloseButton fetchImages={setNeedFetchData} />
              <AlertDialogGallery
                fetchImages={setNeedFetchData}
                isOn={openDelete}
                setIsOn={setOpenDelete}
                code_title={codeToDelete}
              />
            </div>
            <section className="w-full px-4 sm:px-6">
              {galleryTypes.map((item, index) => (
                <div key={item.type + index}>
                  <h3 className="text-xl sm:text-3xl font-poppins mb-4" key={index}>
                    {item.type_show}
                  </h3>

                  <div className="columns-1 sm:columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-10 sm:space-y-15 space-y-6">
                    {galleryPhotos.map(
                      (image, index) =>
                        item.type === image.type && (
                          <div key={index} className="break-inside-avoid mb-6">
                            <div className="relative  w-full h-[10rem] md:h-[10rem] lg:h-[10rem] 2xl:h-[15rem] rounded shadow-md">
                              <div className="flex hover:opacity-100 opacity-0 justify-center items-center gap-x-5 absolute top-0 left-0 w-full h-full object-cover rounded bg-black/70 shadow-lg z-40 hover:scale-105 transition duration-150">
                                <Link href={`/admin/gallery/edit/${image.code_title}`}>
                                  <IconPencil className="hover:cursor-pointer hover:bg-white/30 p-1 rounded-sm size-8" />
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setCodeToDelete(image.code_title);
                                    setOpenDelete(true);
                                  }}
                                >
                                  <IconTrash className="hover:cursor-pointer hover:bg-white/30 p-1 hover:text-red-400 rounded-sm size-8" />
                                </button>
                              </div>
                              <button type="button" className="hover:cursor-pointer">
                                <Image
                                  src={image.main_photo}
                                  alt={image.title}
                                  width={800}
                                  height={800}
                                  className="absolute top-0 left-0 w-full h-full object-cover rounded shadow-black shadow-lg z-30 hover:scale-105 transition duration-150"
                                />
                              </button>
                              <button type="button" className="hover:cursor-pointer">
                                {!!image.s_photo && (
                                  <Image
                                    src={image.s_photo}
                                    alt={image.title + " 2"}
                                    width={800}
                                    height={800}
                                    className="absolute sm:top-2 top-4 sm:left-2 w-full h-full object-cover rounded shadow-black shadow-md z-20 hover:scale-105 transition duration-150"
                                  />
                                )}
                              </button>
                              <button type="button" className="hover:cursor-pointer">
                                {!!image.t_photo && (
                                  <Image
                                    src={image.t_photo}
                                    alt={image.title + " 3"}
                                    width={800}
                                    height={800}
                                    className="absolute sm:top-4 top-8 sm:left-4 w-full h-full object-cover rounded shadow-lg z-10 hover:scale-105 transition duration-150"
                                  />
                                )}
                              </button>
                            </div>
                            <span className="mt-8 block text-center font-inter">{image.title}</span>
                          </div>
                        )
                    )}
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
