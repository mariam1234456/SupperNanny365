
// import { useTranslation } from "react-i18next";
// import style from "./Importance.module.css";

// const Importance = ({ tasks, toggleFavorite }) => {
//     const importantTasks = tasks.filter(task => task.favorite);
//     const {t}=useTranslation();
  
//     return (
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" ,justifyContent:"center",alignItems:"center" }}>
//             {importantTasks.length === 0 ? (
//                 <p className="font-bold text-2xl text-black">{t(`import.text`)} ❌</p>
//             ) : (
//                 importantTasks.map(task => (
//                     <div 
//                         key={task.id} 
//                         className={`${style.importance}`}
//                     >
//                         <p>{task.text}</p>
//                         <button 
//                             onClick={() => toggleFavorite(task.id)}
//                             className={`${style.favorite}`}
//                         >
//                             ⭐
//                         </button>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
//   };
  
//   export default Importance;



// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import axios from "axios";
// import style from "./Importance.module.css";
// import { useGender } from "../../Context/GenderContext";

// const Importance = () => {
//   const { t } = useTranslation();
//   const [importantTasks, setImportantTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const babyId = localStorage.getItem("babyId");

//   useEffect(() => {
//     fetchImportantTasks();
//   }, []);
// const { gender } = useGender();

//   const getBackgroundColor = () => {
//     if (gender === "female") return "#F49AF6";
//     if (gender === "male") return "#9ACAF6";
//     return "#F49AF6";
//   };
//   const fetchImportantTasks = async () => {
//     try {
//       const res = await axios.get(
//         `https://marwabakry23.pythonanywhere.com/api/tasks/favorite/${babyId}/`
//       );
//       setImportantTasks(res.data);
//     } catch (err) {
//       console.error("فشل في جلب المهمات المهمة:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleFavorite = async (taskId) => {
//     try {
//       await axios.put(
//         `https://marwabakry23.pythonanywhere.com/api/tasks/${taskId}/`,
//         {
//           is_favorite: false, // نخليها مش مفضلة
//         }
//       );
//       // بعد التعديل، نحدث القائمة من جديد
//       fetchImportantTasks();
//     } catch (err) {
//       console.error("فشل في تغيير المفضلة:", err);
//     }
//   };

//   if (loading) return <p className="text-center">{t("import.loading")}...</p>;

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "10px",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {importantTasks.length === 0 ? (
//         <p className="font-bold text-2xl text-black">{t(`import.text`)} ❌</p>
//       ) : (
//         importantTasks.map((task) => (
//           <div
//          style={{ background: getBackgroundColor()}} 
//          key={task.id} className={style.importance}>
//             <p>{task.content}</p>
//             <button
//               onClick={() => toggleFavorite(task.id)}
//               className={style.favorite}
//               title="إزالة من المفضلة"
//             >
//               ⭐
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Importance;
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import style from "./Importance.module.css";
import { useGender } from "../../Context/GenderContext";

const Importance = () => {
  const { t } = useTranslation();
  const [importantTasks, setImportantTasks] = useState([]);
const { gender } = useGender();

  const getBackgroundColor = () => {
    if (gender === "female") return "#F49AF6";
    if (gender === "male") return "#9ACAF6";
    return "#F49AF6";
  };
  // دالة جلب المهام المفضلة
  const fetchImportantTasks = async () => {
    try {
      const babyId = localStorage.getItem("babyId");
      const res = await axios.get(
        `https://marwabakry23.pythonanywhere.com/api/tasks/favorite/${babyId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setImportantTasks(res.data);
    } catch (err) {
      console.error("فشل في جلب المهام المفضلة:", err.response?.data || err);
    }
  };

  // دالة إزالة المهمة من المفضلة
  const toggleFavorite = async (taskId) => {
    try {
      const taskToUpdate = importantTasks.find((task) => task.id === taskId);
      if (!taskToUpdate) return;

      await axios.put(
        `https://marwabakry23.pythonanywhere.com/api/tasks/${taskId}/`,
        {
          child: taskToUpdate.child,
          content: taskToUpdate.content,
          is_favorite: false,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      // تحديث القائمة محليًا بدون طلب جديد
      setImportantTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error("فشل في تعديل المفضلة:", err.response?.data || err);
    }
  };

  // تحميل البيانات أول ما تفتح الصفحة
  useEffect(() => {
    fetchImportantTasks();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", alignItems: "center" }}>
      {importantTasks.length === 0 ? (
        <p className="font-bold text-2xl text-black">{t(`import.text`)} ❌</p>
      ) : (
        importantTasks.map((task) => (
          <div key={task.id} className={`${style.importance}`}
                   style={{ background: getBackgroundColor()}} 
>
            <p>{task.content}</p>
            <button
              onClick={() => toggleFavorite(task.id)}
              className={`${style.favorite}`}
            >
              ⭐
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Importance;
