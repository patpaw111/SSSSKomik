import SeriesCard from "@/components/utils/card/card";

export default function NewUpdateList() {
  return (
    <section className="md:py-24 py-12 px-12 md:px-24">
      <div className="container mx-auto">
        <div className="flex flex-col">
        <h2 className="font-semibold md:text-24 md:leading-28 text-base-white text-20 leading-24">Update</h2>
        <div>        
            <div className="gap-x-16 gap-y-24 grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2">
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
