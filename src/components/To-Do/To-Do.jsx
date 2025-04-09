import style from "../../components/To-Do/To-Do.module.css";
import React, { useEffect, useState } from "react";
import Todolist from "../Todolist/Todolist";
import {useLocation} from "react-router-dom";
import calendar from "../../assets/calendar.png";
import bell from "../../assets/bell.png";
import exchange from "../../assets/exchange.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Importance from "../Importance/Importance";
import MyProfile from "../MyProfile/MyProfile";
import EditProfile from "../EditProfile/EditProfile";
import EditProfileBaby from "../EditProfileBaby/EditProfileBaby";
import QuickTips from "../Quick-Tips/Quick-Tips";
import HowTo from "../How-To/How-To";
import { useTranslation } from "react-i18next";
export default function ToDo() {
  const {t}=useTranslation();
  const [isSidebaropen,setIssidebaropen]=useState(true);
  const [showCalender, setShowCalender] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : []; // نحولها لاراي
    } catch (error) {
      console.log(error);
      return [];
    }
  });
  useEffect(() => {
    console.log("update", tasks);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const newTask = { id: Date.now(), text: "", favorite: false };
    if (tasks.length < 6) {
      setTasks([...tasks, newTask]);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTaskText = (id, newText) => {
    console.log("b", tasks);
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
    console.log("a", tasks);
  };

  const toggleFavorite = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, favorite: !task.favorite } : task
      );
      console.log("Updated Tasks:", updatedTasks);
      return updatedTasks;
    });
  };
  const location = useLocation();

  return (
    <div className={`${style.todoContainer} bg-white h-screen`}>
      <>
        <div className={style.headerSection} style={{display:location.pathname==="/todo/profile"||location.pathname==="/todo/profile/edit"||location.pathname==="/todo/profile/baby"?"none":"block"}} >
          <p className={`${style.greeting} text-[#f6c5f7] text-2xl mx-60 px-24`}>
            <span className="font-bold text-5xl">{t(`todo.Hi`)}&nbsp;</span>{t(`todo.Mom`)}
          </p>
          {/* Icons */}
          <div className={`${style.iconsContainer} gap-4 flex justify-end mx-16`}>
            <img
              src={calendar}
              alt=""
              className="w-4 h-4"
              onClick={() => setShowCalender(!showCalender)}
            />
            <img
              src={bell}
              alt=""
              data-tooltip-target="tooltip-light"
              data-tooltip-style="light"
              className="w-4 h-4"
            />

            <div
              id="tooltip-light"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 tooltip"
            >
              {t(`todo.Notifacitions`)}
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            <img
              src={exchange}
              alt=""
              data-tooltip-target="tooltip-light2"
              data-tooltip-style="light"
              className="w-4 h-4"
            />
            <div
              id="tooltip-light2"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 tooltip"
            >
              {t(`todo.Replace`)}
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>

          {showCalender && (
            <div className={style.calendarPopup}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
              />
            </div>
          )}
          <div className="flex item-center justify-center">
            <p className={`${style.taskPrompt} text-lg bg-[#f6c5f7] text-center mt-4 text-white rounded-full my-10 p-2`}>
            {t(`todo.get`)}
            </p>
          </div>
        </div>
      </>

      {location.pathname === "/todo" && (
        <Todolist
          tasks={tasks}
          addTask={addTask}
          deleteTask={deleteTask}
          updateTaskText={updateTaskText}
          toggleFavorite={toggleFavorite}
        />
      )}

      {location.pathname === "/todo/import" && (
        <Importance tasks={tasks} toggleFavorite={toggleFavorite} />
      )}
      {location.pathname === "/todo/profile" && (
        <MyProfile isSidebaropen={isSidebaropen}/>
      )}
      {location.pathname === "/todo/profile/edit" && (
        <EditProfile/>
      )}
      {location.pathname === "/todo/profile/baby" && (
        <EditProfileBaby/>
      )}
      {location.pathname === "/todo/profile/baby" && (
        <EditProfileBaby/>
      )}
       
      
    </div>
  );
}
