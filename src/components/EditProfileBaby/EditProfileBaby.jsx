import style from "./EditProfileBaby.module.css";
import React, { useState } from "react";
import imog from "../../assets/emogi.png";
import Maracas from "../../assets/Maracas.png";
import Medium from "../../assets/MediumIcons.png";
import { useTranslation } from "react-i18next";
import { useGender } from "../../Context/GenderContext";
export default function EditProfileBaby() {
  const [showGallary, setShowGallary] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const {t}=useTranslation();

  const images = [
    { src: "image1.jpg", label: "Month 1" },
    { src: "image2.jpg", label: "Month 2" },
    { src: "image3.jpg", label: "Month 3" },
    { src: "image4.jpg", label: "Month 4" },
    { src: "image5.jpg", label: "Month 5" },
    { src: "image6.jpg", label: "Month 6" },
  ];

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
  const {gender}=useGender();

  return (
    <>
      <div className="flex w-full min-h-screen my-24">
        {/* بيانات الطفل */}
        <div className="w-1/3">
          <div className="relative w-28 h-28 text-center  m-auto">
            <img
              src={imog}
              alt="Avatar"
              className="w-full h-full rounded-full border-1 border-white shadow-md"
            />
            <button
              onClick={() => navigate("/todo/profile/edit")}
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md"
            >
              <i className="fa-solid fa-pen text-gray-600"></i>
            </button>
          </div>
          <div className="text-center">
            <h2 className="mt-3 text-lg font-semibold text-gray-800">
              Puerto Rico
            </h2>
            <p className="text-gray-600 text-sm">2 month</p>
            <p className="text-gray-600 text-sm">female</p>
            <p className="text-gray-600 text-sm">20june2025</p>
          </div>
        </div>

        <div className="w-2/3 flex gap-52 justify-center">
  {/* Activites */}
  <div className="flex flex-col items-center">
    <button
      className="w-32 h-32 bg-[#bce6c7] rounded-2xl flex flex-col items-center justify-center"
      onClick={() => setIsOpen(!isOpen)}
    >
      <h1 className="text-center text-2xl">{t(`editBaby.Activities`)}</h1>
      <img src={Maracas} alt="Maracas" className="max-w-full max-h-full" />
    </button>
  

            {isOpen && (
              <div className={`z-50 absolute mt-40 w-64  ${
        gender === "male"
          ? "bg-[#bdddf5]"
          : gender === "female"
          ? "bg-[#edc9ee]"
          : "bg-gray-300"
      } shadow-md p-4 rounded-lg`}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t(`editBaby.Activities`)}
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="border p-2 w-full rounded"
                  />
                  <button
                    onClick={addTask}
                    className="bg-gray-500 rounded-lg text-white px-4 "
                  >
                    +
                  </button>
                </div>
                <ul className="mt-3">
                  {tasks.map((t, index) => (
                    <li
                      key={index}
                      className="flex justify-between bg-gray-100 p-2 mt-2 rounded"
                    >
                      {t}
                      <button
                        onClick={() => removeTask(index)}
                        className="text-red-500"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Gallary */}

          <button
            className="w-32 h-32 bg-[#D2CBEF] rounded-2xl flex flex-col items-center justify-center"
            onClick={() => setShowGallary(!showGallary)}
          >
            <h1 className="text-center text-2xl">{t(`editBaby.Gallary`)}</h1>
            <img src={Medium} alt="" className="" />
          </button>
          {showGallary && (
            <div className="container mx-auto p-4 absolute z-50 w-64 mt-40">
              <div className="grid grid-cols-3 gap-4">
                {images.map((item, index) => (
                  <div key={index} className="text-center">
                    <p className="font-bold mt-2">{item.label}</p>

                    <img
                      src={item.src}
                      className="w-52 h-30 object-cover mx-auto rounded-md shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
