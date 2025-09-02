import { useState, useEffect } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import classNames from "classnames";
import instance from "../utils/axiosInstance";
import UserActionNav from "../components/UserActionNav";
import AssignTaskModal from "../components/modals/taskManager/AssignTaskModal";
import TaskDetailsModal from "../components/modals/taskManager/TaskDetailsModal";
import task from "../assets/images/task.png";
import EditTaskModal from "../components/modals/taskManager/EditTask";
import ConfirmModal from "../components/ConfirmationPopUp";
import { useToken } from "../store/authStore";

const categories = [
  "All",
  "To-Do",
  "Assigned",
  "Confirmed",
  "Completed",
  "Unconfirmed",
  "Overdue",
];

const categoryMap = {
  pending: "To-Do",
  assigned: "Assigned",
  confirmed: "Confirmed",
  completed: "Completed",
  unconfirmed: "Unconfirmed",
  overdue: "Overdue",
};

const statusColor = {
  Assigned: " text-[#000068]",
  Overdue: " text-[#FFB400]",
  Unconfirmed: " text-[#FF6259]",
  Due: " text-[#FF6259]",
};

const TaskManager = () => {
    const  token  = useToken();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusCounts, setStatusCounts] = useState({});
  const [categorizedTasks, setCategorizedTasks] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleModalToggle = () => setIsModalOpen((prev) => !prev);

  const handleStatusModalToggle = (taskId) => {
    setSelectedTaskId(taskId);
    setIsStatusModalOpen(true);
  };

  const handleEditClick = (taskId) => {
    const allTasks = categorizedTasks.flatMap((cat) => cat.posts);
    const taskToEdit = allTasks.find((t) => t._id === taskId);
    setSelectedTask(taskToEdit);
    setIsEditModalOpen(true);
  };

  const getTask = async () => {
    try {
      const res = await instance.get("tasks?limit=1000");
      const { tasks, analytics } = res.data.data;

      setStatusCounts(analytics?.statusCounts || {});

      const categorized = categories.map((status) => {
        let posts;

        if (status === "All") {
          posts = tasks;
        } else {
          posts = tasks.filter((task) => {
            const normalized = categoryMap[task.status?.toLowerCase()] || task.status;
            return normalized === status;
          });
        }

        return { name: status, posts };
      });

      setCategorizedTasks(categorized);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      const res = await instance.delete(`task/delete`, {
        data: { id: taskToDelete },
      });

      setIsConfirmOpen(false);
      setTaskToDelete(null);
      getTask(); 
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  useEffect(() => {
    getTask();
  }, [token]);

  useEffect(() => {
    const currentCategory = categories[selectedIndex];
    const currentTasks = categorizedTasks.find((t) => t.name === currentCategory)?.posts || [];
    console.log(`Clicked category: ${currentCategory}`, currentTasks);
  }, [selectedIndex]);

  console.log(taskToDelete)

  return (
    <>
      <nav className="outlet-frame">
        <h1 className="outlet-title">Task Manager</h1>
        <div className="z-10">
          <UserActionNav />
        </div>
      </nav>

      <div className="pt-24 px-6 md:px-12">
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <div className="flex justify-between flex-col lg:flex-row items-center mb-5">
            <TabList className="flex gap-2 justify-between w-full lg:w-[80%] overflow-auto">
              {categories.map((name) => (
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

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-6 mb-8 border-primary_grey p-4 bg-primary_white">
            {categories.slice(1).map((label) => (
              <div
                key={label}
                className="flex flex-col gap-2 items-center justify-center border border-l md:border-b-0 md:border-r md:first:border-l-0 md:last:border-r-0 md:border-t-0 h-[139px]"
              >
                <img src={task} alt="Task Icon" />
                <div className="text-center flex flex-col items-center">
                  <span className="md:text-[22px] font-semibold text-primary_blue">
                    {statusCounts[label] || 0}
                  </span>
                  <span className="text-sm md:text-[16px] text-[#767676]">{label}</span>
                </div>
              </div>
            ))}
          </div>

          <TabPanels>
            {categories.map((name) => {
              const match = categorizedTasks.find((t) => t.name === name);
              const posts = match?.posts || [];

              return (
                <TabPanel key={name} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <div
                        key={post._id}
                        className="bg-primary_white p-5 rounded-md shadow-sm border border-primary_grey md:max-w-[359px] cursor-pointer"
                        onClick={() => {
                          handleStatusModalToggle(post._id);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold underline text-[#484848] text-[18px]">
                            {post.title || post.taskName || "-"}
                          </h3>
                          <span
                            className={`min-w-[58px] h-[17px] px-2 text-[12px] rounded-md font-semibold text-center bg-[#F8F8F8] ${statusColor[post.status]}`}
                          >
                            {post.status}
                          </span>

                        </div>
                        <p className="font-medium mt-1 text-[16px] text-[#484848]">
                          {post.task || post.description || "-"}
                        </p>
                        <p className="text-sm text-[#767676] mt-1 font-medium">
                          {post.description || ""}
                        </p>
                        <p className="text-sm text-[#767676] font-semibold mt-2">
                          {post.dueDate || post.creationDateTime
                            ? new Date(post.creationDateTime).toLocaleDateString()
                            : ""}
                        </p>
                        <div className="flex justify-between">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // prevent triggering onClick for status modal
                              handleEditClick(post._id);
                            }}
                            className="mt-3 text-primary_blue text-sm underline"
                          >
                            Edit
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setTaskToDelete(post._id);
                              setIsConfirmOpen(true);

                            }}
                            className="mt-3 text-red-500 text-sm underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No tasks in this category.</p>
                  )}
                </TabPanel>
              );
            })}
          </TabPanels>
        </TabGroup>
      </div>

    {isModalOpen && (
  <AssignTaskModal
    onClose={handleModalToggle}
    onSuccess={() => {
      getTask();
      setIsModalOpen(false);
    }}
  />
)}


      {isStatusModalOpen && (
        <TaskDetailsModal
          taskId={selectedTaskId}
          onClose={() => {
            setIsStatusModalOpen(false);
            setSelectedTaskId(null);
          }}
        />
      )}

      {isEditModalOpen && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={(updatedTask) => {
            setCategorizedTasks(prevTasks =>
              prevTasks.map(category => ({
                ...category,
                posts: category.posts.map(task =>
                  task._id === updatedTask._id ? updatedTask : task
                ),
              }))
            );
            setIsEditModalOpen(false);
          }}

        />
      )}

      
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action is irreversible."
      />

    </>
  );
};

export default TaskManager;
