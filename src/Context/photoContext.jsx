// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const PhotoContext = createContext();

// export const PhotoProvider = ({ children }) => {
//   const [photoUrl, setPhotoUrl] = useState("");
//   const token = localStorage.getItem("accessToken");
//   const babyId = localStorage.getItem("babyId");

//   const fetchPhoto = async () => {
//     try {
//       const res = await axios.get(
//         `https://marwabakry23.pythonanywhere.com/api/child/${babyId}/photo/`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const imagePath = res.data.photo;
//       if (imagePath) {
//         setPhotoUrl(`https://marwabakry23.pythonanywhere.com${imagePath}`);
//       }
//     } catch (err) {
//       console.error("❌ فشل في جلب الصورة:", err);
//     }
//   };

//   const uploadPhoto = async (file) => {
//     const formData = new FormData();
//     formData.append("photo", file);

//     try {
//       await axios.post(
//         `https://marwabakry23.pythonanywhere.com/api/api/child/${babyId}/upload-photo/`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       await fetchPhoto();
//     } catch (error) {
//       console.error("❌ فشل في رفع الصورة:", error);
//     }
//   };

//   useEffect(() => {
//   if (babyId && token) {
//     fetchPhoto();
//   }
// }, [babyId, token]);


//   return (
//     <PhotoContext.Provider value={{ photoUrl, uploadPhoto }}>
//       {children}
//     </PhotoContext.Provider>
//   );
// };



import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [babyId, setBabyId] = useState(localStorage.getItem("babyId"));
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  // تحديث babyId و token عند تغير localStorage (مثلاً عند تغيير الطفل)
  useEffect(() => {
    function handleStorageChange() {
      setBabyId(localStorage.getItem("babyId"));
      setToken(localStorage.getItem("accessToken"));
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const fetchPhoto = async () => {
    if (!babyId || !token) return;
    try {
      const res = await axios.get(
        `https://marwabakry23.pythonanywhere.com/api/child/${babyId}/photo/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const imagePath = res.data.photo;
      console.log("📸 مسار الصورة من الباك:", imagePath);

      if (imagePath) {
        setPhotoUrl(`https://marwabakry23.pythonanywhere.com${imagePath}`);
      } else {
        setPhotoUrl("");
      }
    } catch (err) {
      console.error("❌ فشل في جلب الصورة:", err);
      setPhotoUrl("");
    }
  };

//   const uploadPhoto = async (file) => {
//   if (!babyId || !token) {
//     console.warn("🚫 مفيش babyId أو token");
//     return;
//   }

//   console.log("✅ babyId:", babyId);
//   console.log("✅ token:", token);
//   console.log("✅ الملف اللي هترفعه:", file);

//   const formData = new FormData();
//   formData.append("photo", file);

//   try {
//     const res = await axios.post(
//       `https://marwabakry23.pythonanywhere.com/api/api/child/${babyId}/upload-photo/`,
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // "Content-Type": "multipart/form-data", ← ممكن تشيلي السطر ده لو الشك مستمر
//         },
//       }
//     );
//     console.log("✅ تم رفع الصورة بنجاح", res.data);
//     await fetchPhoto();
//   } catch (error) {
//     console.error("❌ فشل في رفع الصورة:", error.response?.data || error);
//   }
// };
const uploadPhoto = async (file) => {
  if (!babyId || !token) {
    console.warn("🚫 مفيش babyId أو token");
    return;
  }

  const formData = new FormData();
  formData.append("photo", file);

  try {
    // 🔍 نحاول نجيب الصورة أولاً
    const check = await axios.get(
      `https://marwabakry23.pythonanywhere.com/api/child/${babyId}/photo/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (check?.data?.photo) {
      // ✅ لو في صورة بالفعل → نعمل update
      console.log("🔄 صورة موجودة، بنعمل تحديث");
      await updatePhoto(file);
    } else {
      // ⛔ دي حالة نادرة بس لو حبينا نحط fallback
      console.log("📭 مفيش صورة، بنعمل رفع");
      await doPhotoPost();
    }
  } catch (error) {
    if (error?.response?.status === 404) {
      // ✅ لو مفيش صورة → نرفعها
      console.log("📭 مفيش صورة، بنعمل رفع");
      await doPhotoPost();
    } else {
      console.error("❌ خطأ أثناء فحص وجود الصورة:", error.response?.data || error);
    }
  }

  async function doPhotoPost() {
    try {
      const res = await axios.post(
        `https://marwabakry23.pythonanywhere.com/api/api/child/${babyId}/upload-photo/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("✅ تم رفع الصورة بنجاح:", res.data);
      await fetchPhoto();
    } catch (err) {
      console.error("❌ فشل في رفع الصورة:", err.response?.data || err);
    }
  }
};
  useEffect(() => {
    fetchPhoto();
  }, [babyId, token]);
 const updatePhoto = async (file) => {
  if (!babyId || !token) {
    console.warn("🚫 مفيش babyId أو token");
    return;
  }

  console.log("✏️ بحدث الصورة للطفل:", babyId);

  const formData = new FormData();
  formData.append("photo", file);

  try {
    const res = await axios.put(
      `https://marwabakry23.pythonanywhere.com/api/child/${babyId}/photo/update/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data", ← غالبًا مش ضروري
        },
      }
    );
    console.log("✅ تم تحديث الصورة بنجاح:", res.data);
    await fetchPhoto();
  } catch (error) {
    console.error("❌ فشل في تحديث الصورة:", error.response?.data || error);
  }
};

  return (
    <PhotoContext.Provider value={{ photoUrl, uploadPhoto,updatePhoto }}>
      {children}
    </PhotoContext.Provider>
  );
};
