import { PageResult } from "@/typings";
import Link from "next/link";

type Props = {
  results: PageResult[];
  term: String;
};
function ResultsList({ results, term }: Props) {
  return (
    <div>
      {/* sidebar  */}
      <div>
        {/* each page  */}
        {results.map((pageResult) => (
          <div key={pageResult.job_id} className="space-y-2">
            {pageResult.content.results.filters?.map((filter) => (
              <div>
                <p>{filter.name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* main body */}
    </div>
  );
}

export default ResultsList;
