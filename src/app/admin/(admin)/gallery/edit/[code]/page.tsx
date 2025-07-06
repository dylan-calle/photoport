"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, use, useState, ChangeEvent } from "react";
import { Combobox } from "./combox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IconTrash, IconPlus } from "@tabler/icons-react";
import ScreenSpinner from "@/components/screen-spiner";
import SucessDialog from "@/components/sucess-dialog";
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
type TitleAndType = {
  title: string;
  type: string;
};
const blanckTitleAndType = {
  title: "",
  type: "",
};

export default function Page(props: { params: Params }) {
  const params = use(props.params);

  //   const collection = (await getGalleryByCode(params.code)) as Collection;
  const [collection, setCollection] = useState<Collection | null>(null);
  const fetchGalleryByCode = async () => {
    try {
      const res = await axios.get(`/api/gallery/${params.code}`);
      setCollection(res.data);
      setData({ title: res.data.title, type: res.data.type });
    } catch (err) {
      console.error(err);
    }
  };

  const [data, setData] = useState<TitleAndType>(blanckTitleAndType);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);
  const [messageDialog, setMessageDialog] = useState<string>("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSaveTitle = async () => {
    setIsLoading(true);
    try {
      await axios.patch(`/api/gallery/${params.code}`, { title: data.title, type: data.type });
      setMessageDialog("Changes updated sucessfully");
      setIsMessageOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryByCode();
  }, []);

  return (
    <div className="p-4">
      <ScreenSpinner isOpen={isLoading} />
      <SucessDialog message={messageDialog} state={isMessageOpen} setState={setIsMessageOpen} />

      <div className="w-full lg:mb-10 mb-10">
        <input
          value={data.title}
          name="title"
          onChange={handleOnChange}
          className="font-poppins w-full border-muted-foreground border rounded-md px-3 text-4xl py-1 sm:text-5xl font-semibold tracking-tight transition-colors mb-5 first:mt-0"
        />
        <div className="flex items-end justify-between flex-row-reverse">
          <Button className="hover:cursor-pointer" onClick={handleSaveTitle}>
            Save changes
          </Button>
          {collection?.type && (
            <div>
              <Label className="mb-1.5 font-inter text-md">Edit type</Label>
              <Combobox setDataFunction={setData} placeHolder={collection?.type ? collection.type : ""} />
            </div>
          )}
        </div>
      </div>
      <div className="border-b sm:border-b-2  mb-5 border-white/60 mx-8"></div>
      <div className="flex justify-between flex-row-reverse items-end mb-4">
        <Button className="hover:cursor-pointer">
          <IconPlus />
          Add Photos
        </Button>
        <span className="font-poppins text-2xl font-semibold">Photos ({collection?.photos.length})</span>
      </div>

      <div className="columns-1 sm:columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {collection?.photos.map((image, index) => (
          <div key={image.public_id + index} className="relative break-inside-avoid overflow-hidden rounded shadow-md">
            <div className="flex hover:opacity-100 opacity-0 justify-center items-center gap-x-5 absolute top-0 left-0 w-full h-full object-cover rounded bg-black/70 shadow-lg z-40 hover:scale-105 transition duration-150">
              <button type="button" onClick={() => {}}>
                <IconTrash className="hover:cursor-pointer hover:bg-white/30 p-1 hover:text-red-400 rounded-sm size-8" />
              </button>
            </div>
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
    </div>
  );
}
