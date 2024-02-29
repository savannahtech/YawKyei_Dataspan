import FilterSidebar from "../components/filter-sidebar";
import Main from "../components/main";

const MainTemplate = () => {
  return (
    <section className="min-h-screen overflow-hidden">
      <div className="grid grid-cols-5 gap-10 h-screen border px-5">
        <div className="col-span-1 py-5">
          <FilterSidebar />
        </div>
        <div className="col-span-4 py-5">
          <Main />
        </div>
      </div>
    </section>
  );
};

export default MainTemplate;
