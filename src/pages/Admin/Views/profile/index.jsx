import Banner from "./components/Banner";
import General from "./components/General";
import Upload from "./components/Upload";

const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-4 lg:!mb-0">
          <Banner />
        </div>

        {/* <div className="z-0 col-span-5 lg:!mb-0">
          <Upload />
        </div> */}
        <div className="col-span-6 lg:col-span-8 lg:mb-0">
          <General />
        </div>
      </div>
      {/* all project & ... */}
    </div>
  );
};

export default ProfileOverview;
