import FilterSidebar from "../components/filter-sidebar";
import Main from "../components/main";

const MainTemplate = () => {
  return (
    <section className="min-h-screen overflow-hidden">
      <div className="grid grid-cols-4 gap-10 h-screen border">
        <div className="col-span-1 py-4">
          <FilterSidebar />
        </div>
        <div className="col-span-3 py-4">
          <Main />
        </div>
      </div>
    </section>
  );
};

export default MainTemplate;
