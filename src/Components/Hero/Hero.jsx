import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const lineData = [
  { date: "Mar 12", value: 3000 },
  { date: "Mar 13", value: 1800 },
  { date: "Mar 14", value: 3560 },
  { date: "Mar 15", value: 2200 },
  { date: "Mar 16", value: 4100 },
  { date: "Mar 17", value: 2800 },
  { date: "Mar 18", value: 5100 },
];

const pieData = [
  { name: "Clothing", value: 3020 },
  { name: "Lingerie & Nightwear", value: 2280 },
  { name: "Body Fit", value: 2280 },
  { name: "Sportswear", value: 2820 },
  { name: "Accessories", value: 1224 },
];

const colors = ["#007bff", "#ff6b6b", "#ffa502", "#2ed573", "#3742fa"];

const stats = [
  { title: "TODAY REVENUE", amount: "$2579", change: "+12%", graph: "up" },
  { title: "TODAY VISITORS", amount: "$312", change: "+4%", graph: "up" },
  {
    title: "TODAY TRANSACTIONS",
    amount: "$525",
    change: "-0.89%",
    graph: "down",
  },
  { title: "TOTAL PRODUCTS", amount: "$168", change: "+2%", graph: "up" },
];

const waveDataUp = [
  { value: 10 },
  { value: 25 },
  { value: 45 },
  { value: 60 },
  { value: 50 },
];

const waveDataDown = [
  { value: 60 },
  { value: 50 },
  { value: 35 },
  { value: 20 },
  { value: 10 },
];

const Hero = () => {
  const [chartSize, setChartSize] = useState({
    outerRadius: 80,
    innerRadius: 50,
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const updateChartSize = () => {
      if (window.innerWidth < 768) {
        setChartSize({ outerRadius: 100, innerRadius: 60 });
      } else {
        setChartSize({ outerRadius: 100, innerRadius: 70 });
      }
    };

    updateChartSize();
    window.addEventListener("resize", updateChartSize);
    return () => window.removeEventListener("resize", updateChartSize);
  }, []);

  return ( 
    <div className=" lg:p-2 p-3 space-y-8  lg:-mt-9   lg:ml-[18rem]">
      {/* Top Stats */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 w-full  lg:w-[71.5rem] gap-3 lg:gap-6"
        data-aos="fade-up"
      >
        {stats.map((stat, idx) => {
          const isUp = stat.graph === "up";
          const graphColor = isUp ? "#38c172" : "#e3342f";
          const areaData = isUp ? waveDataUp : waveDataDown;

          return (
            <div
              key={idx}
              className="bg-white lg:p-6 pl-3 pr-3 pt-4 pb-4  rounded-xl shadow-sm space-y-3"
            >
              <h3 className="lg:text-lg text-xs text-gray-600 font-bold">
                {stat.title}
              </h3>
              <div className="lg:text-2xl text-lg font-bold">{stat.amount}</div>
              <div
                className={`text-sm ${
                  stat.change.includes("-") ? "text-red-500" : "text-green-500"
                }`}
              >
                {stat.change} vc yesterday
              </div>
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient
                      id={`color-${idx}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={graphColor}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor={graphColor}
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={graphColor}
                    fillOpacity={1}
                    fill={`url(#color-${idx})`}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>

      {/* Analytics and Pie Chart */}
     <div
      className="grid grid-cols-1 md:grid-cols-2 w-full md:w-[71.5rem] gap-6"
      data-aos="fade-up"
    >
      {/* Line Chart */}
      <div className="bg-white lg:p-4 pl-1 pr-6 pt-3 pb-3 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Sales Analytics</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ff7f50"
              strokeWidth={3}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <ResponsiveContainer width={210} height={200} className="ml-4">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={chartSize.outerRadius}
                innerRadius={chartSize.innerRadius}
                fill="#8884d8"
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Legend with only colored dots */}
          <div className="space-y-2 mt-4 md:mt-0 md:ml-4 text-left mr-8">
            {[
              {
                name: "Clothing",
                percent: 25,
                amount: "$3,020",
                count: 1348,
              },
              {
                name: "Lingerie & Nightwear",
                percent: 35,
                amount: "$2,280",
                count: 3459,
              },
              {
                name: "Body Fit",
                percent: 35,
                amount: "$2,280",
                count: 3459,
              },
              {
                name: "Sportswear",
                percent: 23,
                amount: "$2,820",
                count: 879,
              },
              {
                name: "Accessories",
                percent: 18,
                amount: "$1,224",
                count: 348,
              },
            ].map((item, idx) => (
              <div key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                {/* Colored Dot Only */}
                <span
                  className="w-2.5 h-2.5 mt-1 rounded-full inline-block"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                ></span>

                {/* Category Text */}
                <div>
                  <span className="font-medium text-black">{item.name}</span>{" "}
                  ({item.percent}%)
                  <div className="text-xs text-gray-500">
                    {item.count} CATEGORY PRODUCTS —{" "}
                    <span className="text-black">{item.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Hero;
