// ✅ كود رسم مخطط النمو (Growth Chart) بنفس شكل الصورة باستخدام Recharts (BarChart)

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { t } from "i18next";

export default function GrowthChart({ refresh }) {
  const [growthData, setGrowthData] = useState([]);

  useEffect(() => {
    async function fetchGrowthData() {
      try {
        const token = localStorage.getItem("accessToken");
        const babyId = localStorage.getItem("babyId");
        const language = localStorage.getItem("language") || "en";

        const response = await axios.get(
          `https://marwabakry23.pythonanywhere.com/api/child/${babyId}/growth/view/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Accept-Language": language,
            },
          }
        );

        // ترتيب البيانات حسب التاريخ من الأقدم إلى الأحدث (اختياري)
        const sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));

        setGrowthData(sortedData);
      } catch (err) {
        console.error("Error fetching growth data:", err);
      }
    }

    fetchGrowthData();
  }, [refresh]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 className="text-center text-lg font-bold mb-4">{t("childtracker.ActivityGrowth")}</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={growthData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="height" fill="#f47c7c" name="Height" barSize={20} />
          <Bar dataKey="weight" fill="#6cc6cb" name="Weight" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
