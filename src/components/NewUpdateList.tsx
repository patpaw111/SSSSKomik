import SeriesCard from "@/components/utils/card/card";

export default function NewUpdateList() {
  return (
    <section className="py-8 px-4 sm:py-12 sm:px-6 md:py-16 md:px-12 lg:py-24 lg:px-24">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col">
        <h2 className="font-semibold text-base-white text-lg leading-6 sm:text-xl sm:leading-7 md:text-2xl md:leading-7 lg:text-24 lg:leading-28 mb-4 sm:mb-6 md:mb-8">Update</h2>
        <div>        
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8">
            <SeriesCard
              seriesId="the-heavenly-demon"
              title="The Heavenly Demon Can't Live A Normal Life"
              imageUrl={encodeURI("/dummy/sampul_komik/tessampul.webp")}
              chapters={[
                { id: "175", number: 175, timeAgo: "14 jam" },
                { id: "174", number: 174, timeAgo: "7 hari" },
              ]}
            />

            <SeriesCard
              seriesId="demo-02"
              title="Demo Series Two"
              imageUrl={encodeURI("/dummy/sampul_komik/tessampul.webp")}
              chapters={[
                { id: "20", number: 20, timeAgo: "1 hari" },
                { id: "19", number: 19, timeAgo: "3 hari" },
              ]}
            />

            <SeriesCard
              seriesId="the-heavenly-demon-2"
              title="The Heavenly Demon Can't Live A Normal Life"
              imageUrl={encodeURI("/dummy/sampul_komik/tessampul.webp")}
              chapters={[
                { id: "175-2", number: 175, timeAgo: "14 jam" },
                { id: "174-2", number: 174, timeAgo: "7 hari" },
              ]}
            />

            <SeriesCard
              seriesId="demo-03"
              title="Demo Series Three"
              imageUrl={encodeURI("/dummy/sampul_komik/tessampul.webp")}
              chapters={[
                { id: "20-3", number: 20, timeAgo: "1 hari" },
                { id: "19-3", number: 19, timeAgo: "3 hari" },
              ]}
            />
          </div>
        </div>
        </div>
          
      </div>
    </section>
  );
}
