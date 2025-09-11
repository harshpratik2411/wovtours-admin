import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import DateFormatter from "../../Services/DateFormatter";
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
import HeroServices from "./HeroServices";

const colors = ["#007bff", "#ff6b6b", "#ffa502", "#2ed573", "#3742fa"];

// const stats = [
//   { title: "TODAY REVENUE", today_total_price: "$2579", change_percentage: "+12%", graph: "up" },
//   { title: "TODAY VISITORS", today_total_price: "$312", change_percentage: "+4%", graph: "up" },
//   {
//     title: "TODAY ENQUIRIES",
//     today_total_price: "$525",
//     change_percentage: "-0.89%",
//     graph: "down",
//   },
//   { title: "TOTAL PRODUCTS", today_total_price: "$168", change_percentage: "+2%", graph: "up" },
// ];

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
  const [todayBookings, setTodayBookings] = useState([]);
  const [stats, setStats] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [destinationBookings, setDestinationBookings] = useState([]);
  const [chartSize, setChartSize] = useState({
    outerRadius: 80,
    innerRadius: 50,
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const getDashboardServices = async () => {
      HeroServices.getDashboardServices().then((data) => {
        console.log("Dashboard Data:", data);
        setLineData(data.sales_analysis || []);
        setDestinationBookings(data.destination_bookings || []);
        setTodayBookings(data.today_bookings || {});
        setStats(data.stats || []);
      }
      );
    }
    getDashboardServices();

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
    <div className=" lg:p-2 p-3 space-y-8  lg:-mt-9   lg:ml-[17rem]">
      {/* Top Stats */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 w-full  lg:w-[73rem] gap-3 lg:gap-6"
      // data-aos="fade-up"
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
              <div className="lg:text-2xl text-lg font-bold">{stat.today_total_price}</div>
              <div
                className={`text-sm ${stat.change_percentage < 0 ? "text-red-500" : "text-green-500"
                  }`}
              >
                {stat.change_percentage}% vc yesterday
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
        className="grid grid-cols-1 md:grid-cols-2 w-full md:w-[73rem] gap-6"
        data-aos="fade-up"
      >
        {/* Line Chart */}
        <div className="bg-white lg:p-4 pl-1 pr-6 pt-3 pb-3 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Sales Analytics</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total_price"
                stroke="#ff7f50"
                strokeWidth={3}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Sales by Destination</h2>
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <ResponsiveContainer width={210} height={200} className="ml-4">
              <PieChart>
                <Pie
                  data={destinationBookings}
                  dataKey="total_revenue"
                  cx="50%"
                  cy="50%"
                  outerRadius={chartSize.outerRadius}
                  innerRadius={chartSize.innerRadius}
                  fill="#8884d8"
                >
                  {destinationBookings.map((_, index) => (
                    <Cell key={index} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Legend with only colored dots */}
            <div className="space-y-2 mt-4 md:mt-0 md:ml-4 text-left mr-16">
              {destinationBookings.map((item, idx) => (
                <div key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                  {/* Colored Dot Only */}
                  <span
                    className="w-2.5 h-2.5 mt-1 rounded-full inline-block"
                    style={{ backgroundColor: colors[idx % colors.length] }}
                  ></span>

                  {/* Category Text */}
                  <div>
                    <span className="font-medium text-black">{item.title}</span>{" "}
                    {/* ({item.percent}%) */}
                    <div className="text-xs text-gray-500">
                      {item.total_bookings} Booking(s) —{" "}
                      <span className="text-black">{DateFormatter.formatCurrency(item.total_revenue)}</span>
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
