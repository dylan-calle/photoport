import { getPhotoHome } from "@/lib/photoHome-service"; // fetch logo from MongoDB
import { getHomeTypes } from "@/lib/homeTypes-service";
import Image from "next/image";
export const metadata = {
  title: "Photographer | Dylan’s Portfolio",
  description: "Discover my best photographs — portraits, landscapes and more.",
};
type PhotoHome = {
  public_id: string;
  url: string;
  type: string;
  createdAt: string;
};
type PhotoTypes = {
  type: string;
  type_show: string;
  createdAt: string;
};

export default async function HomePage() {
  const homeImage = (await getPhotoHome("main")) as PhotoHome[] | null;
  const homeImages = (await getPhotoHome("")) as PhotoHome[] | null;
  const homeTypes = (await getHomeTypes()) as PhotoTypes[] | null;
  return (
    <>
      <div className="absolute w-full sm:h-32 h-10 bg-gradient-to-b sm:from-black/100 from-black/100 to-transparent z-10" />
      {homeImage && homeImage[0].url && (
        <Image
          src={homeImage[0].url}
          alt="Main photo"
          width={1000}
          height={1000}
          className="w-full object-contain sm:opacity-70"
        />
      )}
      <div className="sm:-translate-y-30 -translate-y-5 absolute w-full sm:h-32 h-5 bg-gradient-to-b to-black/100 from-transparent z-10" />
      <div className="h-[27rem] sm:h-auto sm:absolute sm:top-[25rem] sm:w-full z-15">
        <p className="bg-gradient-to-t sm:from-black/25 sm:to-transparent mt-10 sm:px-6 sm:py-2 sm:text-center sm:w-full sm:font-medium sm:absolute font-inter font-light text-center sm:text-7xl text-4xl text-accent sm:block sticky top-[30vh]">
          More than images, <br />
          <span className="font-bold">memories</span> you can touch ✨
        </p>
      </div>
      <div className="w-full space-y-20 px-4 sm:px-10 mt-60 sm:mt-5">
        {homeTypes?.map((type) => {
          const imagesForType = homeImages?.filter((img) => img.type === type.type) || [];

          return (
            <section key={type.type} className="w-full">
              <h2 className="text-3xl sm:text-4xl font-poppins font-semibold text-accent mb-6">{type.type_show}</h2>

              <div className="columns-1 sm:columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {imagesForType.map((image, index) => (
                  <div key={image.public_id + index} className="break-inside-avoid overflow-hidden rounded shadow-md">
                    <Image
                      src={image.url}
                      alt={image.public_id}
                      width={800}
                      height={800}
                      className="w-full sm:w-[200%] h-auto object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
