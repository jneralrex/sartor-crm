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
import { useState } from "react";
import AssignTaskModal from "../components/modals/taskManager/AssignTaskModal";
import TaskDetailsModal from "../components/modals/taskManager/TaskDetailsModal";

const stats = [
  { label: "To-Do", count: 23 },
  { label: "Assigned", count: 123 },
  { label: "Received", count: 241 },
  { label: "Completed", count: 412 },
  { label: "Unconfirmed", count: 212 },
  { label: "Overdue", count: 12 },
];

const statusColor = {
  Assigned: " text-[#000068]",
  Overdue: " text-[#FFB400]",
  Unconfirmed: " text-[#FF6259]",
  Due: " text-[#FF6259]",
};

const categories = [
  {
    name: "All",
    posts: [
      {
        id: 1,
        client: "Liam Carter",
        task: "Follow up on this client: Tamsy Tech",
        description: "Lorem ipsum dolor sit amet consectetur. Eget nunc sed phasellus auctor.",
        date: "Jan 23 - Jan 24",
        tags: ["Assigned"],
      },
      {
        id: 2,
        client: "Liam Carter",
        task: "Follow up on this client: Tamsy Tech",
        description: "Lorem ipsum dolor sit amet consectetur. Eget nunc sed phasellus auctor.",
        date: "Jan 23 - Jan 24",
        tags: ["Assigned", "Due"],
      },
      {
        id: 3,
        client: "Medplus",
        task: "Overdue Invoice",
        description:
          "Payment due within two(3) weeks after the supply has been confirmed",
        date: "Jan 23",
        tags: ["Overdue", "Assigned"],
      },
    ],
  },
   {
    name: "To-Do",
    posts: [
      {
        id: 1,
        client: "Liam Carter todo",
        task: "Follow up on this client: Tamsy Tech",
        description: "Lorem ipsum dolor sit amet consectetur. Eget nunc sed phasellus auctor.",
        date: "Jan 23 - Jan 24",
        tags: ["Assigned"],
      },
      {
        id: 2,
        client: "Liam Carter",
        task: "Follow up on this client: Tamsy Tech",
        description: "Lorem ipsum dolor sit amet consectetur. Eget nunc sed phasellus auctor.",
        date: "Jan 23 - Jan 24",
        tags: ["Assigned", "Due"],
      },
      {
        id: 3,
        client: "Medplus",
        task: "Overdue Invoice",
        description:
          "Payment due within two(3) weeks after the supply has been confirmed",
        date: "Jan 23",
        tags: ["Overdue", "Assigned"],
      },
    ],
  },
   {
    name: "Assigned",
    posts: [
      {
        id: 1,
        client: "Liam Carter",
        task: "Follow up on this client: Tamsy Tech",
        description: "Lorem ipsum dolor sit amet consectetur. Eget nunc sed phasellus auctor.",
        date: "Jan 23 - Jan 24",
        tags: ["Assigned"],
      },
      {
        id: 2,
        client: "Liam Carter",
        task: "Follow up on this client: Tamsy Tech",
        description: "Lorem ipsum dolor sit amet consectetur. Eget nunc sed phasellus auctor.",
        date: "Jan 23 - Jan 24",
        tags: ["Assigned", "Due"],
      },
      {
        id: 3,
        client: "Medplus",
        task: "Overdue Invoice",
        description:
          "Payment due within two(3) weeks after the supply has been confirmed",
        date: "Jan 23",
        tags: ["Overdue", "Assigned"],
      },
    ],
  },
  {
    name: "Completed",
    posts: [
      {
        id: 1,
        client: "Liam Carter",
        task: "Follow up on this client: Tamsy Tech",
        description: "Lorem ipsum dolor sit amet consectetur. Eget nunc sed phasellus auctor.",
        date: "Jan 23 - Jan 24",
        tags: ["Assigned"],
      },
      {
        id: 2,
        client: "Liam Carter",
        task: "Follow up on this client: Tamsy Tech",
        description: "Lorem ipsum dolor sit amet consectetur. Eget nunc sed phasellus auctor.",
        date: "Jan 23 - Jan 24",
        tags: ["Assigned", "Due"],
      },
      {
        id: 3,
        client: "Medplus",
        task: "Overdue Invoice",
        description:
          "Payment due within two(3) weeks after the supply has been confirmed",
        date: "Jan 23",
        tags: ["Overdue", "Assigned"],
      },
    ],
  },
{
    name: "Unconfirmed",
    posts: [
      {
        id: 1,
        client: "Liam Carter",
        task: "Follow up on this client: Tamsy Tech",
        description: "Lorem ipsum dolor sit amet consectetur. Eget nunc sed phasellus auctor.",
        date: "Jan 23 - Jan 24",
        tags: ["Assigned"],
      },
      {
        id: 2,
        client: "Liam Carter",
        task: "Follow up on this client: Tamsy Tech",
        description: "Lorem ipsum dolor sit amet consectetur. Eget nunc sed phasellus auctor.",
        date: "Jan 23 - Jan 24",
        tags: ["Assigned", "Due"],
      },
      {
        id: 3,
        client: "Medplus",
        task: "Overdue Invoice",
        description:
          "Payment due within two(3) weeks after the supply has been confirmed",
        date: "Jan 23",
        tags: ["Overdue", "Assigned"],
      },
    ],
  },
  {
    name: "Overdue",
    posts: [
      {
        id: 1,
        client: "Liam Carter",
        task: "Follow up on this client: Tamsy Tech",
        description: "Lorem ipsum dolor sit amet consectetur. Eget nunc sed phasellus auctor.",
        date: "Jan 23 - Jan 24",
        tags: ["Assigned"],
      },
      {
        id: 2,
        client: "Liam Carter",
        task: "Follow up on this client: Tamsy Tech",
        description: "Lorem ipsum dolor sit amet consectetur. Eget nunc sed phasellus auctor.",
        date: "Jan 23 - Jan 24",
        tags: ["Assigned", "Due"],
      },
      {
        id: 3,
        client: "Medplus",
        task: "Overdue Invoice",
        description:
          "Payment due within two(3) weeks after the supply has been confirmed",
        date: "Jan 23",
        tags: ["Overdue", "Assigned"],
      },
    ],
  },
  // Add the other categories like To-Do, Confirmed, Completed, etc.
];

const TaskManager = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    
      const handleModalToggle = () => {
        setIsModalOpen((prev) => !prev);
      };
    
      const handleStatusModalToggle = () => {
        setIsStatusModalOpen((prev) => !prev);
      };

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
              {categories.map(({ name }) => (
                <Tab
                  key={name}
                  className={({ selected }) =>
                    classNames(
                      " text-[10px] sm:text-[14px] md:text-[16px] font-normal py-1 outline-none",
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
            <button className="bg-primary_blue text-white text-[12px] p-1 md:px-4 md:py-2 rounded-md md:text-sm" onClick={(e) => {
          e.preventDefault();
          handleModalToggle();
        }} >
              Assign Task
            </button>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-2 md:grid-cols-6 mb-8 border-primary_grey p-4 bg-primary_white">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-2 items-center justify-center border md:border-b-0 border-l  md:border-r md:first:border-l-0 md:border-t-0 md:last:border-r-0 h-[139px]"
              >
                <img src={task} alt="" srcset="" />
                <div className="text-center flex flex-col items-center">
                    <span className="md:text-[22px] font-semibold text-primary_blue">
                  {stat.count}
                </span>
                <span className="text-sm md:text-[16px] text-[#767676]">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          <TabPanels>
            {categories.map(({ name, posts }) => (
              <TabPanel key={name} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-primary_white p-5 rounded-md shadow-sm border border-primary_grey md:max-w-[359px] cursor-pointer"
                    onClick={handleStatusModalToggle}
                  >
                      <div className="flex items-center ">
                       <h3 className="font-semibold underline text-[#484848] text-[18px]">
                      {post.client}
                    </h3>
                    <div className="flex justify-between items-center gap-1 w-[0%] m-auto">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`ma-w-[58px] h-[17px] px-2  text-[12px] rounded-md font-semibold text-center bg-[#F8F8F8] ${statusColor[tag]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    </div>
                   
                   
                    <p className="font-medium mt-1 text-[16px] text-[#484848]">{post.task}</p>
                    <p className="text-sm text-[#767676] mt-1 font-medium">{post.description}</p>
                    
                    <p className="text-sm text-[#767676] font-semibold mt-2">{post.date}</p>
                  </div>
                ))}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
      {/* Modals */}
      {isModalOpen && <AssignTaskModal onClose={handleModalToggle}/>}
    {isStatusModalOpen && <TaskDetailsModal onClose={handleStatusModalToggle}/>}    
    </>
  );
};

export default TaskManager;
