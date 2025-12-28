/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRentModal } from "@/hooks/useRentModal";
import Modal from "./modal";
import { useMemo, useState } from "react";
import Heading from "../heading";
import { categoriesItems } from "../navbar/categories";
import CategoryInput from "../inputs/category-input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/country-select";
import dynamic from "next/dynamic";
import Counter from "../inputs/counter";
import ImageUpload from "../inputs/image-upload";
import Input from "../inputs/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

interface RentFormValues {
  category: string;
  location: unknown | null;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
}

const RentModal = () => {
  const modal = useRentModal();
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } =
    useForm<RentFormValues>({
      defaultValues: {
        category: "",
        location: null,
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: "",
        price: 1,
        title: "",
        description: "",
      },
    });


  const category = watch("category")
  const location = watch("location")
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(() =>
    dynamic(() => import("../map"), { ssr: false })
    , [location]);


  const setCustomValue = (id: keyof RentFormValues, value: string) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => setStep((value) => value - 1);
  const onNext = () => setStep((value) => value + 1);

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }
    setIsLoading(true)
    console.log(data)
    axios.post("/api/listings", data).then(() => {
      toast.success("Listing Created!")
      router.refresh();
      reset()
      setStep(STEPS.CATEGORY);
      rentModal.onClose();
    }).catch(() => {
      toast.error("Something went Wrong!")
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const actionLabel = useMemo(
    () => (step === STEPS.PRICE ? "Create" : "Next"),
    [step]
  );

  const secondaryActionLabel = useMemo(
    () => (step === STEPS.CATEGORY ? undefined : "Back"),
    [step]
  );

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categoriesItems.map((item) => (
          <div className="col-span-1" key={item.label}>
            <CategoryInput
              onClick={() => setCustomValue("category", item.label)}
              Selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Share some basics about your place"
          subtitle="what amenities do you have?" />
        <Counter
          title="Guests"
          subtitle="How many guests do you have?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
        <hr />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Add a photo of your place" subtitle="Show guests what your place looks like!" />
        <ImageUpload value={imageSrc} onChange={(value) => setCustomValue("imageSrc", value)} />
      </div>
    )
  }


  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input id="title" label="title" disabled={isLoading} register={register} errors={errors} required />
        <hr />
        <Input id="description" label="description" disabled={isLoading} register={register} errors={errors} required />

      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input id="price" label="price" type="number" disabled={isLoading}
          formatPrice={true} register={register} required errors={errors} />
      </div>
    )
  }
  return (
    <Modal
      title="Airbnb your home!"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      isOpen={modal.isOpen}
      body={bodyContent}
      onSubmit={handleSubmit(onSubmit)}
      onClose={modal.onClose}
    />
  );
};

export default RentModal;
