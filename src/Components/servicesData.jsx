import service1 from "../image/amarPic.png";

const servicesData = [
  {
    category: "Business Consulting",
    items: [
      {
        id: "strategic-planning",
        title: "Strategic Planning and Business Development",
        description:
          "Craft a roadmap for success with our strategic planning services. We analyze market trends, assess your competitive landscape, and define clear objectives to drive sustainable growth and expansion.",
        img: "https://www.training.com.au/wp-content/uploads/Full-Stack-Developer-1.jpeg?auto=format&fit=crop&w=800&q=80",
        imgClass: "w-full h-64 object-contain rounded-t-lg bg-white" 
      },
      {
        id: "market-research",
        title: "Market Research and Analysis",
        description:
          "Make informed decisions with our market research and analysis services. From customer segmentation to competitor analysis, we provide valuable insights to help you identify new opportunities and mitigate risks.",
        img: "https://www.training.com.au/wp-content/uploads/Full-Stack-Developer-1.jpeg?width=800&dpr=2",
        imgClass: "w-full h-64 object-contain rounded-t-lg bg-white" 
      },
      {
        id: "financial-management",
        title: "Financial Management and Advisory",
        description:
          "Optimize your financial performance with our expert advisory services. We help you manage cash flow, improve profitability, and implement sound financial practices.",
        img: service1,
        imgClass: "w-full h-64 object-contain rounded-t-lg bg-white" 
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
        imgClass: "w-full h-64 object-contain rounded-t-lg bg-white" 
      },
      {
        id: "it-consulting",
        title: "IT Consulting and Advisory",
        description:
          "Optimize IT infrastructure and operations with strategic guidance on IT governance, risk management, and compliance.",
        img: service1,
        imgClass: "w-full h-64 object-contain rounded-t-lg bg-white" 
      },
      {
        id: "data-analytics",
        title: "Data Analytics and Insights",
        description:
          "Unlock the full potential of your data with analytics solutions like modeling, visualization, and reporting.",
        img: service1,
        imgClass: "w-full h-64 object-contain rounded-t-lg bg-white" 
      },
    ],
  },
];

export default servicesData;
