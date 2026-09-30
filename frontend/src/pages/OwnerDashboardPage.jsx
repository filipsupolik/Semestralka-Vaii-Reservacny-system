import { useDashboard } from "../context";
import {
  mockProjects,
  mockAnnouncements,
  mockTrendingUsers,
} from "../data/mockData";

function OwnerDashboardPage() {
  const { selectedProject, toggleProject } = useDashboard();

  return (
    <main className="h-screen w-full overflow-hidden">
      <section className="h-full w-full">
        <div className="flex flex-col h-full w-full min-w-0">
          <div className="col-start-2 row-start-2 grid min-h-0 min-w-0 grid-cols-[minmax(0,70%)_minmax(0,1fr)] grid-rows-2 gap-[25px] overflow-hidden bg-[#e6e6e6] p-[25px]">
            <div className="row-span-2 min-w-0">
              <h3>Your projects</h3>
              <div className="grid grid-cols-2 auto-rows-fr gap-[15px]">
                {mockProjects.map((project) => (
                  <div
                    key={project.name}
                    className={`flex min-w-0 cursor-pointer flex-col rounded-[15px] border-l-[5px] border-[#ffa600] bg-white p-5 transition-transform ${selectedProject === project.name ? "-translate-y-1 border-2 border-[#00b7ff] shadow-lg" : "hover:-translate-y-1 hover:shadow-md"}`}
                    onClick={() => toggleProject(project.name)}
                    role="button"
                    tabIndex={0}
                  >
                    <h3>{project.name}</h3>
                    <p className="mb-[25px] text-[#615f5f]">
                      {project.description}
                    </p>
                    <div className="mt-auto mr-[5px] ml-auto">
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-eye"></i>
                      <i className="fa-solid fa-share-nodes"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex min-h-0 flex-col">
              <h3 className="shrink-0">Announcement</h3>
              <div className="min-h-0 flex-1 overflow-y-auto rounded-[10px] bg-white p-[25px]">
                {mockAnnouncements.map((announcement, index) => (
                  <div
                    key={index}
                    className={`border-b-2 border-[#b8b8b8] px-[5px] py-[15px] ${index === mockAnnouncements.length - 1 ? "last:border-b-0" : ""}`}
                  >
                    <h4>{announcement.title}</h4>
                    <p className="text-[#615f5f]">{announcement.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex min-h-0 flex-col">
              <h3 className="shrink-0">Trending</h3>
              <div className="min-h-0 flex-1 overflow-y-auto rounded-[10px] bg-white py-[5px]">
                {mockTrendingUsers.map((user, index) => (
                  <div key={index} className="m-[15px] flex items-center">
                    <img
                      className="m-[5px] mx-[15px] h-10 w-10 rounded-full"
                      src="./resource/computer-psyduck.webp"
                      alt="profile"
                    />
                    <div>
                      <p className="username">{user.username}</p>
                      <p>{user.project}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default OwnerDashboardPage;
