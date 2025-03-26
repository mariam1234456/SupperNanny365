// const Importance = ({ tasks, toggleFavorite }) => {
//   const importantTasks = tasks.filter(task => task.favorite);

//   return (
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" ,justifyContent:"center",alignItems:"center" }}>
//           {importantTasks.length === 0 ? (
//               <p className="font-bold text-2xl text-black">There is no Favorite Task ❌</p>
//           ) : (
//               importantTasks.map(task => (
//                   <div 
//                       key={task.id} 
//                       style={{
//                           width: "115px",
//                           height: "115px",
//                           borderRadius: "50%",
//                           backgroundColor: "#F49AF6",
//                           color: "white",
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           flexDirection: "column",
//                           fontSize: "20px",
//                           textAlign: "center",
//                           position: "relative",
//                           marginTop:"60px",
                          
//                       }}
//                   >
//                       <p>{task.text}</p>
//                       <button 
//                           onClick={() => toggleFavorite(task.id)}
//                           style={{
//                               position: "absolute",
//                               bottom: "5px",
//                               right: "5px",
//                               background: "none",
//                               border: "none",
//                               color: "white",
//                               fontSize: "18px",
//                               cursor: "pointer"
//                           }}
//                       >
//                           ⭐
//                       </button>
//                   </div>
//               ))
//           )}
//       </div>
//   );
// };

// export default Importance;

import { useTranslation } from "react-i18next";
import style from "./Importance.module.css";

const Importance = ({ tasks, toggleFavorite }) => {
    const importantTasks = tasks.filter(task => task.favorite);
    const {t}=useTranslation();
  
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" ,justifyContent:"center",alignItems:"center" }}>
            {importantTasks.length === 0 ? (
                <p className="font-bold text-2xl text-black">{t(`import.text`)} ❌</p>
            ) : (
                importantTasks.map(task => (
                    <div 
                        key={task.id} 
                        className={`${style.importance}`}
                    >
                        <p>{task.text}</p>
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