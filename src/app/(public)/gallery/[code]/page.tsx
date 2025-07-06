import { Button } from "@/components/ui/button";
import { getGalleryByCode } from "@/lib/gallery-service";
import { IconCircleChevronLeftFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
type Params = Promise<{
  code: string;
}>;

//docForThis https://nextjs.org/docs/app/guides/upgrading/version-15#asynchronous-page
type Photos = {
  public_id: string;
  url: string;
  caption: string;
  order: number;
  _id: string;
};
type Collection = {
  code: string;
  photos: Photos[];
  title: string;
  type: string;
  _id: string;
};
export default async function Page(props: { params: Params }) {
  const params = await props.params;

  const collection = (await getGalleryByCode(params.code)) as Collection;
  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto text-center lg:mb-10 mb-10">
        <h2 className="font-poppins scroll-m-20 border-b pb-2 text-4xl sm:text-5xl font-semibold tracking-tight transition-colors first:mt-0">
          {collection.title}
        </h2>

        <p className="mt-1 text-muted-foreground">{collection.type}</p>
      </div>
      <Link href="/gallery">
        <Button variant="link" className="hover:cursor-pointer mb-3 text-xl items-center">
          <IconCircleChevronLeftFilled className="size-7" /> Go back Gallery
        </Button>
      </Link>
      <div className="columns-1 sm:columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {collection.photos.map((image, index) => (
          <div key={image.public_id + index} className="break-inside-avoid overflow-hidden rounded shadow-md">
            <Image
              src={image.url}
              alt={image.caption}
              width={800}
              height={800}
              className="w-full sm:w-[200%] h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        <Link href="/gallery">
          <Button variant="link" className="hover:cursor-pointer mb-3 text-xl items-center">
            <IconCircleChevronLeftFilled className="size-7" /> Go back Gallery
          </Button>
        </Link>
      </div>
    </div>
  );
}
