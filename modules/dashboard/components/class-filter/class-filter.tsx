import { Filter } from "@/lib/types";

type Props = {
  items: Filter[];
  item: Filter[];
  setItem: (value: Filter[]) => void;
};

const ClassFilter = ({ items, item, setItem }: Props) => {
  function handleClick(selectedItem: Filter) {
    const exist = isSelected(selectedItem);

    if (!exist) {
      setItem([...item, selectedItem]);
    }

    if (exist) {
      let newArr: Filter[] = [...item];
      newArr = newArr.filter((i) => i !== selectedItem);

      setItem(newArr);
    }
  }

  function isSelected(value: Filter) {
    if (item.length > 0) {
      return item.find((i) => i.label === value.label);
    }

    return;
  }

  return (
    <>
      <div className="w-full">
        <div className="flex flex-wrap gap-4">
          {items.map((item, idx) => (
            <button
              style={{
                background: isSelected(item) ? item.bgColor : "",
              }}
              className={`${isSelected(item) ? `` : "border-black border"} ${
                item.borderColor
              } border transform transition-all duration-[0.5s] flex items-center gap-2 font-bold rounded-[25px] text-[12px] w-fit relative cursor-pointer px-[13px] py-[4px] focus:outline-none`}
              key={idx}
              onClick={() => handleClick(item)}
            >
              <span
                style={{
                  background: item.color,
                }}
                className={`rounded-full p-1 ${
                  isSelected(item) ? "bg-white" : "bg-black"
                }`}
              ></span>
              <p className="text-center">{item.label}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClassFilter;
