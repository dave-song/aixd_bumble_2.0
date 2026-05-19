"use client";

import type { RefObject } from "react";
import {
  type BeelineIconState,
  ProfileSectionLocation,
  ProfileSectionTags,
  ProfileSectionText,
} from "@/components/profile";
import { BeelineFollowupCard } from "@/components/beeline/BeelineFollowupCard";
import { ProfileHero } from "@/components/discover/ProfileHero";
import type { BeelineSectionId } from "@/lib/beelineSectionQuestions";
import type { DiscoverProfile } from "@/lib/profileData";

const PHOTO_PATH = "/icons/user_profile_assets";

interface ProfileCardContentProps {
  profile: DiscoverProfile;
  /** When provided, renders this instead of <ProfileHero hero={profile.hero} /> (e.g. pass state with blur + X). */
  customHero?: React.ReactNode;
  /** When true, hero (or customHero) is rendered inside the scroll container as first child, matching discover page layout. */
  heroInsideScroll?: boolean;
  /** Rendered at the top of the scroll area so it scrolls with the rest of the content (e.g. Beeline popover card). */
  prependToScroll?: React.ReactNode;
  /** When true, renders content without an internal scroll wrapper — the parent owns scrolling. */
  disableInternalScroll?: boolean;
  scrollRef?: RefObject<HTMLDivElement | null>;
  dogAndLocationRef?: RefObject<HTMLDivElement | null>;
  profileBottomRef?: RefObject<HTMLDivElement | null>;
  onBeelineClick?: (sectionId: BeelineSectionId) => void;
  getBeelineIconState?: (sectionId: BeelineSectionId) => BeelineIconState;
  renderSectionFollowupCard?: (sectionId: BeelineSectionId) => React.ReactNode;
  heroLayout?: "default" | "people";
  onSuperLike?: () => void;
}

export function ProfileCardContent({
  profile,
  customHero,
  heroInsideScroll = false,
  prependToScroll,
  disableInternalScroll = false,
  scrollRef,
  dogAndLocationRef,
  profileBottomRef,
  onBeelineClick,
  getBeelineIconState = () => "default",
  renderSectionFollowupCard = () => null,
  heroLayout = "default",
  onSuperLike,
}: ProfileCardContentProps) {
  const s = profile.sections;
  const photo = (name: string) => `${PHOTO_PATH}/${name}`;
  const skipBioSection =
    heroLayout === "people" && profile.hero.type === "composite";
  const heroNode = customHero ?? (
    <ProfileHero
      hero={profile.hero}
      alt={profile.id}
      layout={heroLayout}
      onSuperLike={onSuperLike}
    />
  );

  const sectionsBlock = (
    <div className="flex flex-col gap-4 px-[10px]">
      {!skipBioSection && (
        <>
          <ProfileSectionText
            title={s.bio.title}
            body={s.bio.body}
            onBeelineClick={
              onBeelineClick ? () => onBeelineClick("my-bio") : undefined
            }
            beelineIconState={getBeelineIconState("my-bio")}
          />
          {renderSectionFollowupCard("my-bio")}
        </>
      )}
      <ProfileSectionTags
        title={s.aboutMe.title}
        tags={s.aboutMe.tags}
        onBeelineClick={
          onBeelineClick ? () => onBeelineClick("about-me") : undefined
        }
        beelineIconState={getBeelineIconState("about-me")}
      />
      {renderSectionFollowupCard("about-me")}
      <PhotoBlock
        imageSrc={photo(s.photoSlots[0] ?? "p1.png")}
        onBeelineClick={
          onBeelineClick ? () => onBeelineClick("picture1") : undefined
        }
        renderCard={renderSectionFollowupCard("picture1")}
      />
      <ProfileSectionTags
        title={s.imLookingFor.title}
        tags={s.imLookingFor.tags}
        onBeelineClick={
          onBeelineClick ? () => onBeelineClick("im-looking-for") : undefined
        }
        beelineIconState={getBeelineIconState("im-looking-for")}
      />
      {renderSectionFollowupCard("im-looking-for")}
      <ProfileSectionTags
        title={s.myInterests.title}
        tags={s.myInterests.tags}
        onBeelineClick={
          onBeelineClick ? () => onBeelineClick("my-interests") : undefined
        }
        beelineIconState={getBeelineIconState("my-interests")}
      />
      {renderSectionFollowupCard("my-interests")}
      <PhotoBlock
        imageSrc={photo(s.photoSlots[1] ?? "p2.png")}
        onBeelineClick={
          onBeelineClick ? () => onBeelineClick("picture2") : undefined
        }
        renderCard={renderSectionFollowupCard("picture2")}
      />
      <ProfileSectionText
        title={s.whenIUnplug.title}
        body={s.whenIUnplug.body}
        onBeelineClick={
          onBeelineClick ? () => onBeelineClick("when-i-unplug") : undefined
        }
        beelineIconState={getBeelineIconState("when-i-unplug")}
      />
      {renderSectionFollowupCard("when-i-unplug")}
      <PhotoBlock
        imageSrc={photo(s.photoSlots[2] ?? "p3.png")}
        onBeelineClick={
          onBeelineClick ? () => onBeelineClick("picture3") : undefined
        }
        renderCard={renderSectionFollowupCard("picture3")}
      />
      <ProfileSectionTags
        title={s.myCauses.title}
        tags={s.myCauses.tags}
        onBeelineClick={
          onBeelineClick ? () => onBeelineClick("my-causes") : undefined
        }
        beelineIconState={getBeelineIconState("my-causes")}
      />
      {renderSectionFollowupCard("my-causes")}
      <ProfileSectionText
        title={s.myFavoriteQuality.title}
        body={s.myFavoriteQuality.body}
        onBeelineClick={
          onBeelineClick
            ? () => onBeelineClick("my-favorite-quality")
            : undefined
        }
        beelineIconState={getBeelineIconState("my-favorite-quality")}
      />
      {renderSectionFollowupCard("my-favorite-quality")}
      <div
        ref={dogAndLocationRef as RefObject<HTMLDivElement>}
        className="flex flex-col gap-4"
      >
        <PhotoBlock
          imageSrc={photo(s.photoSlots[3] ?? "p4.png")}
          onBeelineClick={
            onBeelineClick ? () => onBeelineClick("picture4") : undefined
          }
          renderCard={renderSectionFollowupCard("picture4")}
        />
        <ProfileSectionLocation
          location={s.location}
          onBeelineClick={
            onBeelineClick ? () => onBeelineClick("my-location") : undefined
          }
          beelineIconState={getBeelineIconState("my-location")}
        />
        {renderSectionFollowupCard("my-location")}
      </div>
      <div
        ref={profileBottomRef as RefObject<HTMLDivElement>}
        className="flex w-full max-w-[24.4375rem] flex-col items-center justify-center gap-2 py-6"
      >
        <img
          src="/icons/user_profile_assets/bottom decision bar section.svg"
          alt="Pass, Super like, Like"
          className="h-auto w-full object-contain object-center"
        />
        <div className="flex flex-col items-center gap-0.5 text-center">
          <button
            type="button"
            className="my-6 text-[14px] font-medium text-bumble-black"
          >
            Block
          </button>
          <button
            type="button"
            className="text-[14px] font-medium text-red-600"
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );

  const scrollContent = heroInsideScroll ? (
    <div className="flex flex-col gap-4">
      {heroNode}
      {sectionsBlock}
    </div>
  ) : (
    sectionsBlock
  );

  if (disableInternalScroll) {
    return (
      <div className="flex flex-col overflow-x-hidden bg-white pb-10">
        {prependToScroll}
        {scrollContent}
      </div>
    );
  }

  const scrollDiv = (
    <div
      ref={scrollRef as RefObject<HTMLDivElement>}
      className="profile-scroll flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden bg-[#FFFFFF] pb-10 pt-0"
    >
      {prependToScroll}
      {scrollContent}
    </div>
  );

  if (heroInsideScroll) {
    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {scrollDiv}
      </div>
    );
  }

  return (
    <>
      {heroNode}
      {scrollDiv}
    </>
  );
}

function PhotoBlock({
  imageSrc,
  onBeelineClick,
  renderCard,
}: {
  imageSrc: string;
  onBeelineClick?: () => void;
  renderCard: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-3">
      {/* Image + overlay only: overlay is positioned relative to the image so it stays at bottom of picture when Beeline card expands below */}
      <div className="relative w-full">
        <img
          src={imageSrc}
          alt=""
          className="w-full rounded-2xl object-cover"
        />
        <div
          className="absolute bottom-4 left-0 right-0 flex items-center justify-between"
          style={{ paddingLeft: 16, paddingRight: 16 }}
        >
          <img
            src="/icons/compliment section.svg"
            alt=""
            width={200}
            height={52}
            className="shrink-0 object-contain"
            style={{ width: 200, height: 52, marginLeft: -34 }}
          />
          {onBeelineClick ? (
            <button
              type="button"
              onClick={onBeelineClick}
              className="h-[34px] w-auto shrink-0 cursor-pointer border-0 bg-transparent p-0"
              aria-label="Beeline"
            >
              <img
                src="/icons/bumble_image_button.svg"
                alt=""
                className="h-[34px] w-auto object-contain"
              />
            </button>
          ) : (
            <img
              src="/icons/bumble_image_button.svg"
              alt=""
              className="h-[34px] w-auto shrink-0 object-contain"
            />
          )}
        </div>
      </div>
      {renderCard}
    </div>
  );
}
