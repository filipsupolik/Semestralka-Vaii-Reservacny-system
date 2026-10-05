import { useState } from "react";
import { useDashboard } from "../context";
import { mockAnnouncements } from "../data/mockData";
import { useRestaurants } from "../hooks/useRestaurants";
import AddMenuItemDialog from "../components/AddMenuItemDialog";

function OwnerDashboardPage() {
  const { selectedProject, toggleProject } = useDashboard();
  const { restaurants } = useRestaurants();
  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);

  return (
    <main className="h-screen w-full overflow-hidden">
      <section className="h-full w-full">
        <div className="flex flex-col h-full w-full min-w-0">
          <div className="col-start-2 row-start-2 grid min-h-0 min-w-0 grid-cols-[minmax(0,70%)_minmax(0,1fr)] grid-rows-2 gap-[25px] overflow-hidden bg-[#e6e6e6] p-[25px]">
            <div className="row-span-2 min-w-0">
              <h3>Your restaurants</h3>
              <div className="grid grid-cols-2 auto-rows-fr gap-[15px]">
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.restaurantId}
                    className={`flex min-w-0 cursor-pointer flex-col rounded-[15px] border-l-[5px] border-[#ffa600] bg-white p-5 transition-transform ${selectedProject === restaurant.restaurantId ? "-translate-y-1 border-2 border-[#00b7ff] shadow-lg" : "hover:-translate-y-1 hover:shadow-md"}`}
                    onClick={() => toggleProject(restaurant.restaurantId)}
                    role="button"
                    tabIndex={0}
                  >
                    <h3>{restaurant.name}</h3>
                    <p className="mb-[25px] text-[#615f5f]">
                      {restaurant.description}
                    </p>
                    <img
                      src={
                        restaurant.imageUrl
                          ? `http://localhost:3000${restaurant.imageUrl}`
                          : ""
                      }
                      alt={restaurant.name}
                      className="w-full h-40 object-cover rounded"
                    />
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
              <h3 className="shrink-0">Menu</h3>
              <div className="min-h-0 flex-1 rounded-[10px] bg-white p-[25px] flex items-center justify-center">
                {selectedProject !== null && (
                  <button
                    onClick={() => setIsMenuDialogOpen(true)}
                    className="cursor-pointer rounded-[25px] border-0 bg-[#00b7ff] px-[20px] py-[10px] text-base font-extrabold text-white hover:bg-[#0099dd]"
                  >
                    Add Menu Item
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <AddMenuItemDialog
        open={isMenuDialogOpen}
        onClose={() => setIsMenuDialogOpen(false)}
        restaurantId={selectedProject}
      />
    </main>
  );
}

export default OwnerDashboardPage;
