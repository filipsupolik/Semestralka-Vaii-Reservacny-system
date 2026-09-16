import { useOutletContext } from "react-router-dom";

function OwnerDashboardPage() {
  const { selectedProject, setSelectedProject } = useOutletContext();

  const toggleProject = (projectName) => {
    setSelectedProject((currentProject) =>
      currentProject === projectName ? null : projectName,
    );
  };

  return (
    <main className="h-screen w-full overflow-hidden">
      <section className="h-full w-full">
        <div className="flex flex-col h-full w-full min-w-0">
          <div className="col-start-2 row-start-2 grid min-h-0 min-w-0 grid-cols-[minmax(0,70%)_minmax(0,1fr)] grid-rows-2 gap-[25px] overflow-hidden bg-[#e6e6e6] p-[25px]">
            <div className="row-span-2 min-w-0">
              <h3>Your projects</h3>
              <div className="grid grid-cols-2 auto-rows-fr gap-[15px]">
                <div
                  className={`flex min-w-0 cursor-pointer flex-col rounded-[15px] border-l-[5px] border-[#ffa600] bg-white p-5 transition-transform ${selectedProject === "Super Cool Project" ? "-translate-y-1 border-2 border-[#00b7ff] shadow-lg" : "hover:-translate-y-1 hover:shadow-md"}`}
                  onClick={() => toggleProject("Super Cool Project")}
                  role="button"
                  tabIndex={0}
                >
                  <h3>Super Cool Project</h3>
                  <p className="mb-[25px] text-[#615f5f]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus eget tellus laoreet, pharetra diam in, maximus
                    mauris.
                  </p>
                  <div className="mt-auto mr-[5px] ml-auto">
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-eye"></i>
                    <i className="fa-solid fa-share-nodes"></i>
                  </div>
                </div>
                <div
                  className={`flex min-w-0 cursor-pointer flex-col rounded-[15px] border-l-[5px] border-[#ffa600] bg-white p-5 transition-transform ${selectedProject === "Less Cool Project" ? "-translate-y-1 border-2 border-[#00b7ff] shadow-lg" : "hover:-translate-y-1 hover:shadow-md"}`}
                  onClick={() => toggleProject("Less Cool Project")}
                  role="button"
                  tabIndex={0}
                >
                  <h3>Less Cool Project</h3>
                  <p className="mb-[25px] text-[#615f5f]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus eget tellus laoreet, pharetra diam in, maximus
                    mauris.
                  </p>
                  <div className="mt-auto mr-[5px] ml-auto">
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-eye"></i>
                    <i className="fa-solid fa-share-nodes"></i>
                  </div>
                </div>
                <div
                  className={`flex min-w-0 cursor-pointer flex-col rounded-[15px] border-l-[5px] border-[#ffa600] bg-white p-5 transition-transform ${selectedProject === "Impossible App" ? "-translate-y-1 border-2 border-[#00b7ff] shadow-lg" : "hover:-translate-y-1 hover:shadow-md"}`}
                  onClick={() => toggleProject("Impossible App")}
                  role="button"
                  tabIndex={0}
                >
                  <h3>Impossible App</h3>
                  <p className="mb-[25px] text-[#615f5f]">
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit
                  </p>
                  <div className="mt-auto mr-[5px] ml-auto">
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-eye"></i>
                    <i className="fa-solid fa-share-nodes"></i>
                  </div>
                </div>
                <div
                  className={`flex min-w-0 cursor-pointer flex-col rounded-[15px] border-l-[5px] border-[#ffa600] bg-white p-5 transition-transform ${selectedProject === "Easy Peasy App" ? "-translate-y-1 border-2 border-[#00b7ff] shadow-lg" : "hover:-translate-y-1 hover:shadow-md"}`}
                  onClick={() => toggleProject("Easy Peasy App")}
                  role="button"
                  tabIndex={0}
                >
                  <h3>Easy Peasy App</h3>
                  <p className="mb-[25px] text-[#615f5f]">
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit
                  </p>
                  <div className="mt-auto mr-[5px] ml-auto">
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-eye"></i>
                    <i className="fa-solid fa-share-nodes"></i>
                  </div>
                </div>
                <div
                  className={`flex min-w-0 cursor-pointer flex-col rounded-[15px] border-l-[5px] border-[#ffa600] bg-white p-5 transition-transform ${selectedProject === "Ad Blocker" ? "-translate-y-1 border-2 border-[#00b7ff] shadow-lg" : "hover:-translate-y-1 hover:shadow-md"}`}
                  onClick={() => toggleProject("Ad Blocker")}
                  role="button"
                  tabIndex={0}
                >
                  <h3>Ad Blocker</h3>
                  <p className="mb-[25px] text-[#615f5f]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus eget tellus laoreet, pharetra diam in, maximus
                    mauris.
                  </p>
                  <div className="mt-auto mr-[5px] ml-auto">
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-eye"></i>
                    <i className="fa-solid fa-share-nodes"></i>
                  </div>
                </div>
                <div
                  className={`flex min-w-0 cursor-pointer flex-col rounded-[15px] border-l-[5px] border-[#ffa600] bg-white p-5 transition-transform ${selectedProject === "Money Maker" ? "-translate-y-1 border-2 border-[#00b7ff] shadow-lg" : "hover:-translate-y-1 hover:shadow-md"}`}
                  onClick={() => toggleProject("Money Maker")}
                  role="button"
                  tabIndex={0}
                >
                  <h3>Money Maker</h3>
                  <p className="mb-[25px] text-[#615f5f]">
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit
                  </p>
                  <div className="mt-auto mr-[5px] ml-auto">
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-eye"></i>
                    <i className="fa-solid fa-share-nodes"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex min-h-0 flex-col">
              <h3 className="shrink-0">Announcement</h3>
              <div className="min-h-0 flex-1 overflow-y-auto rounded-[10px] bg-white p-[25px]">
                <div className="border-b-2 border-[#b8b8b8] px-[5px] py-[15px] last:border-b-0">
                  <h4>Site Maintenance</h4>
                  <p className="text-[#615f5f]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing.
                  </p>
                </div>
                <div className="border-b-2 border-[#b8b8b8] px-[5px] py-[15px] last:border-b-0">
                  <h4>Community Share Day</h4>
                  <p className="text-[#615f5f]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing.
                  </p>
                </div>
                <div className="border-b-0 px-[5px] py-[15px]">
                  <h4>Updated Privacy Policy</h4>
                  <p className="text-[#615f5f]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex min-h-0 flex-col">
              <h3 className="shrink-0">Trending</h3>
              <div className="min-h-0 flex-1 overflow-y-auto rounded-[10px] bg-white py-[5px]">
                <div className="m-[15px] flex items-center">
                  <img
                    className="m-[5px] mx-[15px] h-10 w-10 rounded-full"
                    src="./resource/computer-psyduck.webp"
                    alt="profile"
                  />
                  <div>
                    <p className="username">@tegan</p>
                    <p>World Peace Builder</p>
                  </div>
                </div>
                <div className="m-[15px] flex items-center">
                  <img
                    className="m-[5px] mx-[15px] h-10 w-10 rounded-full"
                    src="./resource/computer-psyduck.webp"
                    alt="profile"
                  />
                  <div>
                    <p className="username">@morgan</p>
                    <p>Super Cool Project</p>
                  </div>
                </div>
                <div className="m-[15px] flex items-center">
                  <img
                    className="m-[5px] mx-[15px] h-10 w-10 rounded-full"
                    src="./resource/computer-psyduck.webp"
                    alt="profile"
                  />
                  <div>
                    <p className="username">@kendall</p>
                    <p>Life Changing App</p>
                  </div>
                </div>
                <div className="m-[15px] flex items-center">
                  <img
                    className="m-[5px] mx-[15px] h-10 w-10 rounded-full"
                    src="./resource/computer-psyduck.webp"
                    alt="profile"
                  />
                  <div>
                    <p className="username">@alex</p>
                    <p>No Traffic Maker</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default OwnerDashboardPage;
