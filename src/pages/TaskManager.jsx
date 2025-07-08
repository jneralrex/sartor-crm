import UserActionNav from "../components/UserActionNav";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import classNames from "classnames";
import task from "../assets/images/task.png";
import { useEffect, useState } from "react";
import AssignTaskModal from "../components/modals/taskManager/AssignTaskModal";
import TaskDetailsModal from "../components/modals/taskManager/TaskDetailsModal";
import { useAuth } from "../context/AuthContext";
import axios from "axios";




// {categorizedTasks.map(({ name }) => (
//   <Tab key={name}>...</Tab>
// ))}

// {categorizedTasks.map(({ name, posts }) => (
//   <TabPanel key={name}>...</TabPanel>
// ))}


const statusColor = {
  Assigned: " text-[#000068]",
  Overdue: " text-[#FFB400]",
  Unconfirmed: " text-[#FF6259]",
  Due: " text-[#FF6259]",
};


const TaskManager = () => {
  const { token } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusCounts, setStatusCounts] = useState({});
  const [allTasks, setAllTasks] = useState([]);
  const [categorizedTasks, setCategorizedTasks] = useState([]);

  const handleModalToggle = () => setIsModalOpen((prev) => !prev);
  const handleStatusModalToggle = () => setIsStatusModalOpen((prev) => !prev);
  const VITE_API_URL = import.meta.env.VITE_BASE_URL;

  const getTask = async () => {
    try {
      const res = await axios.get(`${VITE_API_URL}tasks`, {
        headers: { 's-token': token },
      });

      const { tasks, analytics } = res.data;

      setAllTasks(tasks);
      setStatusCounts(analytics?.statusCounts || {});

      const categoriesGenerated = Object.keys(analytics?.statusCounts || {}).map(status => ({
        name: status,
        posts: tasks.filter(task => task.status === status),
      }));

      categoriesGenerated.unshift({ name: "All", posts: tasks });

      setCategorizedTasks(categoriesGenerated);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, [token]);

  console.log("task", categorizedTasks)
  return (
    <>
      <nav className="outlet-frame">
        <h1 className="outlet-title">Task Manager</h1>
        <div className="z-10">
          <UserActionNav />
        </div>
      </nav>

      <div className="pt-24 px-6 md:px-12">
        <TabGroup>
          <div className="flex justify-between flex-col lg:flex-row items-center mb-5">
            <TabList className="flex gap-2 justify-between w-full lg:w-[80%] overflow-auto">
              {categorizedTasks.map(({ name }) => (
                <Tab
                  key={name}
                  className={({ selected }) =>
                    classNames(
                      "text-[10px] sm:text-[14px] md:text-[16px] font-normal py-1 outline-none",
                      selected
                        ? "border-b-2 border-primary_blue text-primary_blue"
                        : "text-[#484848]"
                    )
                  }
                >
                  {name}
                </Tab>
              ))}
            </TabList>
            <button
              className="bg-primary_blue text-white text-[12px] p-1 md:px-4 md:py-2 rounded-md md:text-sm"
              onClick={handleModalToggle}
            >
              Assign Task
            </button>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-2 md:grid-cols-6 mb-8 border-primary_grey p-4 bg-primary_white">
            {Object.entries(statusCounts).map(([label, count]) => (
              <div
                key={label}
                className="flex flex-col gap-2 items-center justify-center border border-l md:border-b-0 md:border-r md:first:border-l-0 md:last:border-r-0 md:border-t-0 h-[139px]"
              >
                <img src={task} alt="Task Icon" />
                <div className="text-center flex flex-col items-center">
                  <span className="md:text-[22px] font-semibold text-primary_blue">
                    {count}
                  </span>
                  <span className="text-sm md:text-[16px] text-[#767676]">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <TabPanels>
            {categorizedTasks.map(({ name, posts }) => (
              <TabPanel key={name} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.length === 0 ? (
                  <p className="text-gray-500">No tasks in this category.</p>
                ) : (
                  posts.map((post) => (
                    <div
                      key={post._id || post.id}
                      className="bg-primary_white p-5 rounded-md shadow-sm border border-primary_grey md:max-w-[359px] cursor-pointer"
                      onClick={handleStatusModalToggle}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold underline text-[#484848] text-[18px]">
                          {post.client}
                        </h3>
                        <span
                          className={`min-w-[58px] h-[17px] px-2 text-[12px] rounded-md font-semibold text-center bg-[#F8F8F8] ${statusColor[post.status]}`}
                        >
                          {post.status}
                        </span>
                      </div>
                      <p className="font-medium mt-1 text-[16px] text-[#484848]">{post.task}</p>
                      <p className="text-sm text-[#767676] mt-1 font-medium">{post.description}</p>
                      <p className="text-sm text-[#767676] font-semibold mt-2">{post.date}</p>
                    </div>
                  ))
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>

      {/* Modals */}
      {isModalOpen && <AssignTaskModal onClose={handleModalToggle} />}
      {isStatusModalOpen && <TaskDetailsModal onClose={handleStatusModalToggle} />}
    </>
  );
};

export default TaskManager;


