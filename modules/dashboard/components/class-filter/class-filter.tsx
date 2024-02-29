type Props = {
  items: string[];
  item: string[];
  setItem: (value: string[]) => void;
};

const ClassFilter = ({ items, item, setItem }: Props) => {
  function handleClick(selectedItem: string) {
    const exist = isSelected(selectedItem);

    if (!exist) {
      setItem([...item, selectedItem]);
    }

    if (exist) {
      let newArr: string[] = [...item];
      newArr = newArr.filter((i) => i !== selectedItem);

      setItem(newArr);
    }
  }

  function isSelected(value: string): string | undefined {
    if (item.length > 0) {
      return item.find((i) => i === value);
    }

    return;
  }

  return (
    <>
      <div className="w-full">
        <div className="flex flex-wrap gap-4">
          {items.map((item, idx) => (
            <button
              className={`${
                isSelected(item) ? "bg-black text-white" : "border-black border"
              } transform transition-all duration-[0.5s] flex items-center gap-2 font-bold rounded-[25px] text-[12px] w-fit relative cursor-pointer px-[13px] py-[4px] shadow-sm focus:outline-none`}
              key={idx}
              onClick={() => handleClick(item)}
            >
              <span
                className={`rounded-full p-1 ${
                  isSelected(item) ? "bg-white" : "bg-black"
                }`}
              ></span>
              <p className="text-center">{item}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClassFilter;
