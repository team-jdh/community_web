import _ from "lodash";

interface Props {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onClick: (page: number) => void;
}

const PAGE_GROUP_COUNT = 5;

export const Pagination = ({
  totalCount,
  currentPage,
  pageSize,
  onClick,
}: Props) => {
  const totalPageCount = Math.ceil(totalCount / pageSize);
  const pageGroups = getPageGroups(totalPageCount, PAGE_GROUP_COUNT);
  const groupIdx = Math.ceil(currentPage / PAGE_GROUP_COUNT) - 1;
  const currentGroup = pageGroups[groupIdx];

  const handleClickPrev = () => {
    const isFirstOne = currentGroup[0] === currentPage;

    if (isFirstOne) {
      const prevGroup = pageGroups[groupIdx - 1];
      if (_.isUndefined(prevGroup)) {
        alert("가장 처음입니다.");
        return;
      }

      onClick(prevGroup[prevGroup.length - 1]);
    } else {
      onClick(currentPage - 1);
    }
  };

  const handleClickNext = () => {
    const isLastOne = currentGroup[currentGroup.length - 1] === currentPage;

    if (isLastOne) {
      const nextGroup = pageGroups[groupIdx + 1];
      if (_.isUndefined(nextGroup)) {
        alert("마지막 입니다.");
        return;
      }

      onClick(nextGroup[0]);
    } else {
      onClick(currentPage + 1);
    }
  };

  const goToFirstPage = () => {
    const firstPageGroup = pageGroups[0];
    onClick(firstPageGroup[0]);
  };

  const goToLastPage = () => {
    const lastPageGroup = pageGroups[pageGroups.length - 1];
    onClick(lastPageGroup[lastPageGroup.length - 1]);
  };

  return (
    <div className="flex flex-row items-center">
      <div className="border-2 p-1 cursor-pointer" onClick={goToFirstPage}>
        first
      </div>
      <div className="border-2 p-1 cursor-pointer" onClick={handleClickPrev}>
        prev
      </div>
      {currentGroup.map((number) => {
        const isBold = number === currentPage;

        return (
          <div
            key={number}
            className={`p-3 ${
              isBold ? "font-bold" : "font-light"
            } cursor-pointer`}
            onClick={() => onClick(number)}
          >
            {number}
          </div>
        );
      })}
      <div className="border-2 p-1 cursor-pointer" onClick={handleClickNext}>
        next
      </div>{" "}
      <div className="border-2 p-1 cursor-pointer" onClick={goToLastPage}>
        last
      </div>
    </div>
  );
};

const getPageGroups = (totalPageCount: number, groupCount: number) => {
  const initValue: number[][] = [[]];

  return _.range(1, totalPageCount + 1).reduce((acc, cur) => {
    const lastGroup = acc[acc.length - 1];
    const hasRoom = lastGroup.length < groupCount;

    if (hasRoom) {
      lastGroup.push(cur);
    } else {
      acc.push([cur]);
    }

    return acc;
  }, initValue);
};
