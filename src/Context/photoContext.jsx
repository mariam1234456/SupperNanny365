
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [babyId, setBabyId] = useState(localStorage.getItem("babyId"));
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

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
      if (imagePath) {
        setPhotoUrl(`https://marwabakry23.pythonanywhere.com${imagePath}`);
      } else {
        setPhotoUrl("");
      }
    } catch (err) {
      console.error("فشل في جلب الصورة:", err);
      setPhotoUrl("");
    }
  };


const uploadPhoto = async (file) => {
  if (!babyId || !token) {
    console.warn("🚫 مفيش babyId أو token");
    return;
  }

  const formData = new FormData();
  formData.append("photo", file);

  try {
    const check = await axios.get(
      `https://marwabakry23.pythonanywhere.com/api/child/${babyId}/photo/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (check?.data?.photo) {
      console.log("📸 صورة موجودة، هيتم التحديث");
      await updatePhoto(file);
    } else {
      console.log("📤 مفيش صورة، هيتم الرفع لأول مرة");
      await doPhotoPost();
    }
  } catch (error) {
    if (error?.response?.status === 404) {
      // مفيش صورة فعلًا، نعمل POST
      console.log("🔍 مفيش صورة في السيرفر - هيتم POST");
      await doPhotoPost();
    } else if (error?.response?.status === 401) {
      console.error("🚫 التوكن غير صالح أو مفقود");
    } else {
      console.warn("⚠️ حصل خطأ غير متوقع أثناء الفحص، هنحاول نعمل update مباشرة");
      await updatePhoto(file); // fallback: نحاول نحدث بدل ما نرفع
    }
  }

  async function doPhotoPost() {
    try {
      const res = await axios.post(
        `https://marwabakry23.pythonanywhere.com/api/api/child/${babyId}/upload-photo/`, // رابط الباك اللي إنتي أكدتيه
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

  const updatePhoto = async (file) => {
    if (!babyId || !token) {
      console.warn("🚫 مفيش babyId أو token");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await axios.put(
        `https://marwabakry23.pythonanywhere.com/api/child/${babyId}/photo/update/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("✅ تم تحديث الصورة بنجاح:", res.data);
      await fetchPhoto();
    } catch (error) {
      console.error("❌ فشل في تحديث الصورة:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchPhoto();
  }, [babyId, token]);

  return (
    <PhotoContext.Provider value={{ photoUrl, uploadPhoto, updatePhoto }}>
      {children}
    </PhotoContext.Provider>
  );
};
