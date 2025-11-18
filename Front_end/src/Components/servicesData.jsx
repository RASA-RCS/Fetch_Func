import service1 from "../image/amarPic.png";
import section1 from "../image/section1.jpg";
import section2 from "../image/section2.jpg";
import section3 from "../image/section3.jpg";

const servicesData = [
  {
    category: "Business Consulting",
    items: [
      {
        id: "strategic-planning",
        title: "Strategic Planning and Business Development",
        description:
          "Craft a roadmap for success with our strategic planning services. We analyze market trends, assess your competitive landscape, and define clear objectives to drive sustainable growth and expansion.",
       img:section1,
          // img: "https://www.training.com.au/wp-content/uploads/Full-Stack-Developer-1.jpeg?auto=format&fit=crop&w=800&q=80",
        imgClass: "w-full h-64 object-contain rounded-t-lg bg-white",
      },
      {
        id: "market-research",
        title: "Market Research and Analysis",
        description:
          "Make informed decisions with our market research and analysis services. From customer segmentation to competitor analysis, we provide valuable insights to help you identify new opportunities and mitigate risks.",
       img:section2,
          // img: "https://www.training.com.au/wp-content/uploads/Full-Stack-Developer-1.jpeg?width=800&dpr=2",
        imgClass: "w-full h-64 object-contain rounded-t-lg bg-white",
      },
      {
        id: "financial-management",
        title: "Financial Management and Advisory",
        description:
          "Optimize your financial performance with our expert advisory services. We help you manage cash flow, improve profitability, and implement sound financial practices.",
        img: section3,
        imgClass: "w-full h-64 object-contain rounded-t-lg bg-white",
      },
    ],
  },

  {
    category: "Technology Consulting",
    items: [
      {
        id: "digital-strategy",
        title: "Digital Strategy and Transformation",
        description:
          "Craft a roadmap for digital success—from assessing digital maturity to defining execution plans for transformation.",
        img: service1,
        imgClass: "w-full h-64 object-contain rounded-t-lg bg-white",
      },
      {
        id: "it-consulting",
        title: "IT Consulting and Advisory",
        description:
          "Optimize IT infrastructure and operations with strategic guidance on IT governance, risk management, and compliance.",
        img: service1,
        imgClass: "w-full h-64 object-contain rounded-t-lg bg-white",
      },
      {
        id: "data-analytics",
        title: "Data Analytics and Insights",
        description:
          "Unlock the full potential of your data with analytics solutions like modeling, visualization, and reporting.",
        img: service1,
        imgClass: "w-full h-64 object-contain rounded-t-lg bg-white",
      },
    ],
  },

  // ⭐ NEW CATEGORY ADDED HERE ⭐
  {
    category: "Software Development Services",
    items: [
      {
        id: "web-development",
        title: "Web Development",
        description:
          "High-quality professional service tailored for business growth. We build responsive, modern, and scalable websites.",
        img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
        imgClass: "w-full h-64 object-cover rounded-t-lg bg-white",
      },
      {
        id: "mobile-app-development",
        title: "Mobile App Development",
        description:
          "We create mobile apps with excellent performance, stunning UI, and smooth user experience.",
        img: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
        imgClass: "w-full h-64 object-cover rounded-t-lg bg-white",
      },
      {
        id: "cloud-solutions",
        title: "Cloud Solutions",
        description:
          "Cloud-powered infrastructure and deployment solutions for modern businesses.",
        img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        imgClass: "w-full h-64 object-cover rounded-t-lg bg-white",
      },
    ],
  },
];

export default servicesData;
