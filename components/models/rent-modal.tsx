/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { useRentModal } from "@/hooks/useRentModal";
import Modal from "./modal";
import { useMemo, useState } from "react";
import Heading from "../heading";
import { categoriesItems } from "../navbar/categories";
import CategoryInput from "../inputs/category-input";
import { useForm } from "react-hook-form";
import CountrySelect from "../inputs/country-select";
import dynamic from "next/dynamic";
import Counter from "../inputs/counter";

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
  const [step, setStep] = useState(STEPS.CATEGORY);

  const { register, handleSubmit, setValue, watch } =
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


  return (
    <Modal
      title="Airbnb your home!"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      isOpen={modal.isOpen}
      body={bodyContent}
      onSubmit={onNext}
      onClose={modal.onClose}
    />
  );
};

export default RentModal;
