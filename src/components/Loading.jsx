import LoadingItem from "./UI/LoadingItem";

export default function Loading() {
    return (
  <div className="container px-6 py-10 animate-pulse">
    <div className="flex flex-row flex-wrap justify-evenly gap-8 mt-8 xl:mt-12 xl:gap-12">
        <LoadingItem />
        <LoadingItem />
        <LoadingItem />
        <LoadingItem />
        <LoadingItem />
        <LoadingItem />
    </div>
  </div>

    )
}