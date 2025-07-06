import { getGalleryPhotos } from "@/lib/galleryPhotos-service";
import { getGalleryTypes } from "@/lib/galleryTypes-service";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Photographer | Dylan's Portfolio",
  description: "Discover my best photographs — portraits, landscapes and more.",
};
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

export default async function Page() {
  const galleryPhotos = (await getGalleryPhotos("")) as GalleryPhotos[];
  const galleryTypes = (await getGalleryTypes()) as GalleryTypes[];
  return (
    <>
      <div className="w-full space-y-20 px-1.5 sm:px-10 mt-5 sm:mt-5">
        <div className="max-w-2xl mx-auto text-center lg:mb-14 mb-10">
          <h2 className="font-poppins scroll-m-20 border-b pb-2 text-4xl sm:text-5xl font-semibold tracking-tight transition-colors first:mt-0">
            Gallery
          </h2>

          <p className="mt-1 text-muted-foreground">See my previous work.</p>
        </div>
        <section className="w-full">
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
                        <div className="relative w-full h-[10rem] md:h-[10rem] lg:h-[10rem] 2xl:h-[15rem] rounded shadow-md">
                          <Link href={`/gallery/${image.code_title}`} className="hover:cursor-pointer">
                            <Image
                              src={image.main_photo}
                              alt={image.title}
                              width={800}
                              height={800}
                              className="absolute top-0 left-0 w-full h-full object-cover rounded shadow-black shadow-lg z-30 hover:scale-105 transition duration-150"
                            />
                          </Link>
                          <Link href={`/gallery/${image.code_title}`} className="hover:cursor-pointer">
                            {!!image.s_photo && (
                              <Image
                                src={image.s_photo}
                                alt={image.title + " 2"}
                                width={800}
                                height={800}
                                className="absolute sm:top-3 top-4 sm:left-3 w-full h-full object-cover rounded shadow-black shadow-md z-20 hover:scale-105 transition duration-150"
                              />
                            )}
                          </Link>
                          <Link href={`/gallery/${image.code_title}`} className="hover:cursor-pointer">
                            {!!image.t_photo && (
                              <Image
                                src={image.t_photo}
                                alt={image.title + " 3"}
                                width={800}
                                height={800}
                                className="absolute sm:top-6 top-8 sm:left-6 w-full h-full object-cover rounded shadow-lg z-10 hover:scale-105 transition duration-150"
                              />
                            )}
                          </Link>
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
    </>
  );
}
