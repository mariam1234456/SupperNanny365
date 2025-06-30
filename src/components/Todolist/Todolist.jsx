// import React, { useEffect, useState } from "react";
// import styles from "../Todolist/Todolist.module.css";
// import { useGender } from "../../Context/GenderContext";
// import axios from "axios";
// import i18n from "../../i18n";
// import { data } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// export default function Todolist() {
//   const { t } = useTranslation();

//   const [tasks, setTasks] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [newTaskContent, setNewTaskContent] = useState("");
//   const [taskId, settaskId] = useState("");
//   const [editTask, setEditTask] = useState(null);
//   const [editContent, setEditContent] = useState("");

//   const { gender } = useGender();

//   const getBackgroundColor = () => {
//     if (gender === "female") return "#F49AF6";
//     if (gender === "male") return "#9ACAF6";
//     return "#F49AF6";
//   };

//   const babyId = localStorage.getItem("babyId");
//   console.log(babyId);

//   //add التاسك
//   const handleAddTask = async () => {
//     if (!newTaskContent.trim()) return;
//     try {
//       const res = await axios.post(
//         "https://marwabakry23.pythonanywhere.com/api/task/",
//         {
//           child: babyId,
//           content: newTaskContent,
//         }
//       );
//       console.log("تمت إضافة المهمة بنجاح:", res.data);
//       console.log(res.data.id);
//       settaskId(res.data.id);
//       localStorage.setItem("taskId", res.data.id);
//       setTasks((prev) => [...prev, res.data]);
//       setShowModal(false);
//       setNewTaskContent("");
//     } catch (err) {
//       console.error("فشل في إضافة المهمة:", err);
//       console.log("تفاصيل الخطأ:", err.response?.data); // <-- هتعرض السبب الحقيقي
//     }
//   };
//   // get التاسك
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const res = await axios.get(
//           `https://marwabakry23.pythonanywhere.com/api/task/${babyId}/`
//         );
//         console.log("المهام اللي جت:", res.data);
//         setTasks(res.data); // ده مصفوفة مش كائن واحد
//       } catch (err) {
//         console.error("فشل في جلب المهام:", err);
//       }
//     };

//     if (babyId) {
//       fetchTasks();
//     }
//   }, [babyId]);
//   //update التاسك
//   const handleUpdateTask = async (id, updatedContent) => {
//     try {
//       const res = await axios.put(
//         `https://marwabakry23.pythonanywhere.com/api/tasks/${id}/`,
//         {
//           child: babyId,
//           content: updatedContent,
//         }
//       );
//       console.log("تم التحديث بنجاح:", res.data);

//       // تحديث المهمة في الحالة
//       setTasks((prevTasks) =>
//         prevTasks.map((task) =>
//           task.id === id ? { ...task, content: updatedContent } : task
//         )
//       );
//     } catch (err) {
//       console.error("فشل في تحديث المهمة:", err);
//       console.log("تفاصيل الخطأ:", err.response?.data);
//     }
//   };

//   const toggleFavorite = (id) => {
//     setTasks((prev) =>
//       prev.map((task) =>
//         task.id === id ? { ...task, favorite: !task.favorite } : task
//       )
//     );
//   };
//   const deleteTask = async (id) => {
//     try {
//       await axios.delete(
//         `https://marwabakry23.pythonanywhere.com/api/tasks/${id}/`
//       );
//       setTasks((prev) => prev.filter((task) => task.id !== id));
//     } catch (err) {
//       console.error("فشل في حذف المهمة:", err);
//     }
//   };

//   return (
//     <div className={styles.todoContainer}>
//       <button
//         onClick={() => setShowModal(true)}
//         style={{
//           position: "absolute",
//           width: "112px",
//           height: "112px",
//           backgroundColor: getBackgroundColor(),
//           borderRadius: "50%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           color: "white",
//           fontSize: "2.25rem",
//           fontWeight: "bold",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         +
//       </button>

//       {/* Display Tasks */}
//       {tasks.map((task, index) => {
//         const angle = (index * 360) / tasks.length;
//         return (
//           <div
//             key={task.id}
//             className={styles.taskCircle}
//             style={{
//               "--angle": `${angle}deg`,
//               borderColor: getBackgroundColor(),
//             }}
//           >
//             <span
//               className={styles.taskNumber}
//               style={{ backgroundColor: getBackgroundColor() }}
//             >
//               {index + 1}
//             </span>
//             <textarea
//               value={task.content}
//               readOnly
//               className={styles.taskInput}
//               onClick={() => {
//                 setEditTask(task); // نحدد المهمة اللي هنعدلها
//                 setEditContent(task.content); // نحط محتواها الحالي
//                 setShowModal(true); // نفتح المودال
//               }}
//             />
//             <div className={styles.taskActions}>
//                <button
//                 onClick={() => toggleFavorite(task.id)}
//                 className={styles.favoriteButton}
//               >
//                 {task.favorite ? "⭐" : "☆"}
//               </button>
//               <button
//                 onClick={() => deleteTask(task.id)}
//                 className={styles.deleteButton}
//               >
//                 <i className="fas fa-trash"></i>
//               </button>
//             </div>
//             <div className={styles.taskActions}>
//               <button
//                 onClick={() => deleteTask(task.id)}
//                 className={styles.deleteButton}
//               >
//                 <i className="fas fa-trash"></i>
//               </button>
//             </div>
//           </div>
//         );
//       })}

//       {/* Modal */}
//       {/* نافذة إدخال المهمة */}
//       {showModal && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             backgroundColor: "rgba(0, 0, 0, 0.4)",
//             backdropFilter: "blur(4px)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 1000,
//             padding: "1rem",
//           }}
//         >
//           <div
//             style={{
//               width: "100%",
//               maxWidth: "420px",
//               backgroundColor: "#ffffff",
//               borderRadius: "16px",
//               padding: "24px",
//               boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
//               display: "flex",
//               flexDirection: "column",
//               gap: "16px",
//               position: "relative",
//             }}
//           >
//             {/* عنوان */}
//             <h2
//               style={{
//                 fontSize: "20px",
//                 fontWeight: "600",
//                 textAlign: "center",
//                 color: "#222",
//                 marginBottom: "12px",
//               }}
//             >
//               {editTask ? t("translation.EditTask") : t("translation.AddTask")}
//             </h2>

//             {/* خانة النص */}
//             <textarea
//               autoFocus
//               placeholder={t("translation.content")}
//               value={editTask ? editContent : newTaskContent}
//               onChange={(e) =>
//                 editTask
//                   ? setEditContent(e.target.value)
//                   : setNewTaskContent(e.target.value)
//               }
//               style={{
//                 width: "100%",
//                 minHeight: "90px",
//                 borderRadius: "12px",
//                 border: "1px solid #ddd",
//                 padding: "12px",
//                 fontSize: "16px",
//                 lineHeight: "1.5",
//                 color: "#333",
//                 outline: "none",
//                 resize: "vertical",
//                 transition: "border 0.2s ease",
//               }}
//               onFocus={(e) => (e.target.style.border = "1px solid #aaa")}
//               onBlur={(e) => (e.target.style.border = "1px solid #ddd")}
//             />

//             {/* الأزرار */}
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 gap: "10px",
//                 marginTop: "8px",
//               }}
//             >
//               <button
//                 onClick={() => {
//                   if (editTask) {
//                     handleUpdateTask(editTask.id, editContent);
//                     setEditTask(null);
//                     setEditContent("");
//                   } else {
//                     handleAddTask();
//                   }
//                   setShowModal(false);
//                 }}
//                 style={{
//                   background: "#4F46E5",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "10px",
//                   padding: "10px 16px",
//                   fontWeight: "500",
//                   fontSize: "14px",
//                   cursor: "pointer",
//                   transition: "background 0.2s",
//                 }}
//                 onMouseOver={(e) => (e.target.style.background = "#4338ca")}
//                 onMouseOut={(e) => (e.target.style.background = "#4F46E5")}
//               >
//                 {editTask ? t("translation.EditTask") : t("translation.Add")}
//               </button>

//               <button
//                 onClick={() => {
//                   setShowModal(false);
//                   setEditTask(null);
//                   setEditContent("");
//                 }}
//                 style={{
//                   background: "#f3f4f6",
//                   color: "#333",
//                   border: "none",
//                   borderRadius: "10px",
//                   padding: "10px 16px",
//                   fontWeight: "500",
//                   fontSize: "14px",
//                   cursor: "pointer",
//                   transition: "background 0.2s",
//                 }}
//                 onMouseOver={(e) => (e.target.style.background = "#e5e7eb")}
//                 onMouseOut={(e) => (e.target.style.background = "#f3f4f6")}
//               >
//                 {t("translation.Cancel")}{" "}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import styles from "../Todolist/Todolist.module.css";
import { useGender } from "../../Context/GenderContext";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Todolist() {
  const { t } = useTranslation();

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editContent, setEditContent] = useState("");

  const { gender } = useGender();

  const getBackgroundColor = () => {
    if (gender === "female") return "#F49AF6";
    if (gender === "male") return "#9ACAF6";
    return "#F49AF6";
  };

  const babyId = localStorage.getItem("babyId");
// ✅ Add task (with is_favorite = false)
  const handleAddTask = async () => {
    if (!newTaskContent.trim()) return;
    try {
      const res = await axios.post(
        "https://marwabakry23.pythonanywhere.com/api/task/",
        {
          child: babyId,
          content: newTaskContent,
          is_favorite: false,
        }
      );
      setTasks((prev) => [...prev, res.data]);
      setShowModal(false);
      setNewTaskContent("");
    } catch (err) {
  console.error("فشل في إضافة المهمة:", err);
  console.log("الرسالة من السيرفر:", err.response?.data);
}
  };
  // ✅ Get tasks on load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `https://marwabakry23.pythonanywhere.com/api/task/${babyId}/`
        );
        setTasks(res.data);
      } catch (err) {
        console.error("فشل في جلب المهام:", err);
      }
    };

    if (babyId) {
      fetchTasks();
    }
  }, [babyId]);

  

  // // ✅ Update task content
  const handleUpdateTask = async (id, updatedContent) => {
    try {
      const res = await axios.put(
        `https://marwabakry23.pythonanywhere.com/api/tasks/${id}/`,
        {
          child: babyId,
          content: updatedContent,
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, content: updatedContent } : task
        )
      );
    } catch (err) {
      console.error("فشل في تحديث المهمة:", err.response?.data);
    }
  };

  // // ✅ Toggle favorite and update in backend
  const toggleFavorite = async (id, currentValue) => {
    try {
      const res = await axios.put(
        `https://marwabakry23.pythonanywhere.com/api/tasks/${id}/`,
        {
          child: babyId,
          is_favorite: !currentValue,
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, is_favorite: res.data.is_favorite } : task
        )
      );
    } catch (err) {
      console.error("فشل في تعديل المفضلة:", err.response?.data);
    }
  };

  // // ✅ Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://marwabakry23.pythonanywhere.com/api/tasks/${id}/`
      );
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("فشل في حذف المهمة:", err);
    }
  };

  return (
    <div className={styles.todoContainer}>
      {/* زر إضافة مهمة */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: "absolute",
          width: "112px",
          height: "112px",
          backgroundColor: getBackgroundColor(),
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "2.25rem",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
        }}
      >
        +
      </button>

      {/* المهام */}
      {tasks.map((task, index) => {
        const angle = (index * 360) / tasks.length;
        return (
          <div
            key={task.id}
            className={styles.taskCircle}
            style={{
              "--angle": `${angle}deg`,
              borderColor: getBackgroundColor(),
            }}
          >
            <span
              className={styles.taskNumber}
              style={{ backgroundColor: getBackgroundColor() }}
            >
              {index + 1}
            </span>

            <textarea
              value={task.content}
              readOnly
              className={styles.taskInput}
              onClick={() => {
                setEditTask(task);
                setEditContent(task.content);
                setShowModal(true);
              }}
            />

            {/* ✅ أزرار النجمة والحذف */}
            <div className={styles.taskActions}>
              <button
                onClick={() => toggleFavorite(task.id, task.is_favorite)}
                className={styles.favoriteButton}
              >
                {task.is_favorite ? "⭐" : "☆"}
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                className={styles.deleteButton}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        );
      })}

      {/* ✅ نافذة الإضافة / التعديل */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              position: "relative",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: "600", textAlign: "center", color: "#222" }}>
              {editTask ? t("translation.EditTask") : t("translation.AddTask")}
            </h2>

            <textarea
              autoFocus
              placeholder={t("translation.content")}
              value={editTask ? editContent : newTaskContent}
              onChange={(e) =>
                editTask ? setEditContent(e.target.value) : setNewTaskContent(e.target.value)
              }
              style={{
                width: "100%",
                minHeight: "90px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                padding: "12px",
                fontSize: "16px",
                lineHeight: "1.5",
                color: "#333",
                outline: "none",
                resize: "vertical",
              }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={() => {
                  if (editTask) {
                    handleUpdateTask(editTask.id, editContent);
                    setEditTask(null);
                    setEditContent("");
                  } else {
                    handleAddTask();
                  }
                  setShowModal(false);
                }}
                style={{
                  background: "#4F46E5",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 16px",
                  fontWeight: "500",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {editTask ? t("translation.EditTask") : t("translation.Add")}
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  setEditTask(null);
                  setEditContent("");
                }}
                style={{
                  background: "#f3f4f6",
                  color: "#333",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 16px",
                  fontWeight: "500",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {t("translation.Cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
