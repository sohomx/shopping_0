import { PageResult } from "@/typings";
import Link from "next/link";

type Props = {
  results: PageResult[];
  term: string;
};
function ResultsList({ results, term }: Props) {
  return (
    <div className="flex md:px-5">
      {/* sidebar  */}
      <div className="w-36 md:w-64">
        {/* each page  */}
        {results.map((pageResult) => (
          <div key={pageResult.job_id} className="space-y-2">
            {pageResult.content.results.filters?.map((filter, i) => (
              <div key={i} className="border rounded-r-lg md:rounded-lg p-5">
                <p className="font-bold">{filter.name}</p>
                <div className="flex flex-col">
                  {filter.values.map((value) => (
                    <Link
                      prefetch={false}
                      href={`https://www.google.com${value.url}`}
                    >
                      {value.value}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* main body */}
      <div className="px-5 md:p-10 md:pt-0 space-y-5 flex-1">
        {results.map((pageResult, i) => (
          <div
            key={pageResult.job_id}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 "
          >
            {i !== 0 && <hr className="w-full col-span-full" />}

            <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 py-5">
              <div className="flex space-x-2 items-center divide-x-2">
                <h1>shop on google</h1>
                <h2 className="text-xl font-semibold pl-2">
                  Search Results for Page {i + 1}
                </h2>
              </div>
              <h3 className="font-extralight">
                Showing Results for "{decodeURIComponent(term)}"
              </h3>
            </div>

            {pageResult?.content?.results?.organic?.map((item) => (
              <Link
                href={
                  item.url.includes("url?url=")
                    ? // send to external URL
                      item.url.split("url?url=")?.[1]
                    : // remove any query params and send to Google Shopping Page
                      item.url.split("?")?.[0]
                }
                key={item.pos}
                prefetch={false}
                className={`border rounded-2xl flex flex-col hover:shadow-lg transition duration-200 ease-in-out ${
                  item.url.includes("url?url=") && "italic"
                }`}
              >
                <div className="border-b p-5 flex-1">
                  <p className="text-[#1B66D2]">{item.title}</p>
                </div>

                <div className="px-5 py-2 not-italic">
                  <p className="font-light">
                    {item.price_str} {item.currency}
                  </p>
                  <p className="text-[#1B66D2] font-semibold">
                    {item.merchant.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsList;
