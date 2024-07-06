import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import HeaderFilter from "./HeaderFilter";
import StayCard from "./StayCard";
import StayCard2 from "./StayCard2";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
                                                                       stayListings = DEMO_DATA,
                                                                       gridClass = "",
                                                                       heading = "Nuestros campers",
                                                                       subHeading = "Disfruta de nuestros campers",
                                                                       headingIsCenter,
                                                                       tabs = ["Gran Canaria"],
                                                                       cardType = "card2",
                                                                     }) => {
  const renderCard = (stay: StayDataType) => {
    let CardName = StayCard;
    switch (cardType) {
      case "card1":
        CardName = StayCard;
        break;
      case "card2":
        CardName = StayCard2;
        break;

      default:
        CardName = StayCard;
    }

    return <CardName key={stay.id} data={stay} />;
  };

  return (
      <div className="nc-SectionGridFeaturePlaces relative py-20">
        <HeaderFilter
            tabActive={"Gran Canaria"}
            subHeading={subHeading}
            tabs={tabs}
            heading={heading}
        />
        <div
            className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ${gridClass}`}
        >
          {stayListings.map((stay) => renderCard(stay))}
        </div>
      </div>
  );
};

export default SectionGridFeaturePlaces;
