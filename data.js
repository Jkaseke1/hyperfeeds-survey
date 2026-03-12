// ============================================================
// SURVEY QUESTIONS PER DEPARTMENT
// ============================================================
const DEPARTMENTS = [
  {
    id: "procurement_veterinary",
    name: "Procurement - Veterinary & Livestock",
    icon: "�",
    color: "#3B82F6",
    description: "Veterinary chemicals and livestock equipment procurement",
    questions: [
      { id: "q1", type: "scale", label: "How satisfied are you with the current procurement process for veterinary chemicals and livestock equipment?" },
      { id: "q2", type: "textarea", label: "How are purchase orders for veterinary chemicals and livestock equipment currently created and approved?" },
      { id: "q3", type: "textarea", label: "What are the biggest challenges in sourcing and managing veterinary supplies?" },
      { id: "q4", type: "select", label: "How do you track supplier pricing and contract terms?", options: ["Spreadsheets", "Paper-based", "Sage Pastel", "Email/WhatsApp", "Other"] },
      { id: "q5", type: "textarea", label: "What is the typical lead time for veterinary chemicals and livestock equipment?" },
      { id: "q6", type: "multiselect", label: "Which procurement functions need the most improvement?", options: ["Supplier Management", "Price Tracking", "Order Approval", "Delivery Tracking", "Quality Control", "Inventory Visibility"] },
      { id: "q7", type: "textarea", label: "How do you currently track quality, expiry dates, and compliance for veterinary products?" },
      { id: "q8", type: "scale", label: "How often do you experience stock-outs or delays in veterinary supplies?" },
      { id: "q9", type: "textarea", label: "What information or reports would help you make better procurement decisions?" },
      { id: "q10", type: "textarea", label: "Describe your ideal procurement process for veterinary and livestock supplies in the new system." },
      { id: "q11", type: "textarea", label: "Is there anything else — any process, challenge, risk, or opportunity — that we haven't asked about but that you feel is critical to the success of this digital transformation?" }
    ]
  },
  {
    id: "procurement_maintenance",
    name: "Procurement - Plant Maintenance",
    icon: "🔧",
    color: "#8B5CF6",
    description: "Plant maintenance accessories, tools, machinery spares",
    questions: [
      { id: "q1", type: "scale", label: "How satisfied are you with the current procurement process for plant maintenance items and spares?" },
      { id: "q2", type: "textarea", label: "How are purchase orders for tools, accessories, and machinery spares currently created and approved?" },
      { id: "q3", type: "textarea", label: "What are the biggest challenges in managing maintenance procurement and inventory?" },
      { id: "q4", type: "select", label: "How do you track spare parts inventory and reorder levels?", options: ["Spreadsheets", "Paper-based", "Sage Pastel", "Manual counts", "No tracking", "Other"] },
      { id: "q5", type: "textarea", label: "What is the typical lead time for critical machinery spares?" },
      { id: "q6", type: "multiselect", label: "Which procurement functions need the most improvement?", options: ["Spare Parts Inventory", "Supplier Management", "Emergency Orders", "Price Tracking", "Maintenance Scheduling", "Equipment History"] },
      { id: "q7", type: "textarea", label: "How do you currently link procurement to maintenance schedules and equipment breakdowns?" },
      { id: "q8", type: "scale", label: "How often do equipment breakdowns occur due to unavailable spare parts?" },
      { id: "q9", type: "textarea", label: "What information or reports would help optimize maintenance procurement?" },
      { id: "q10", type: "textarea", label: "Describe your ideal procurement process for plant maintenance in the new system." },
      { id: "q11", type: "textarea", label: "Is there anything else — any process, challenge, risk, or opportunity — that we haven't asked about but that you feel is critical to the success of this digital transformation?" }
    ]
  },
  {
    id: "production",
    name: "Production",
    icon: "🏭",
    color: "#10B981",
    description: "Feed manufacturing, batching and formulation",
    questions: [
      { id: "q1", type: "text", label: "How are daily/weekly production targets currently set and communicated?" },
      { id: "q2", type: "select", label: "Where are feed formulas (recipes/BOM) currently stored?", options: ["Paper documents", "Spreadsheets", "Employee memory", "System/software", "Other"] },
      { id: "q3", type: "textarea", label: "Describe the steps from starting a production batch to completing it." },
      { id: "q4", type: "select", label: "How is actual raw material consumption per batch tracked?", options: ["Not tracked", "Manual paper", "Spreadsheet", "System", "Other"] },
      { id: "q5", type: "scale", label: "How often does actual production deviate from the planned formula? (1=Never, 5=Very often)" },
      { id: "q6", type: "textarea", label: "What causes the most production delays or stoppages?" },
      { id: "q7", type: "text", label: "How many production batches are typically run per day/week?" },
      { id: "q8", type: "multicheck", label: "Which production records are currently kept? (select all that apply)", options: ["Batch numbers", "Start/end times", "Machine downtime", "Waste/losses", "Quality checks", "Operator names", "None"] },
      { id: "q9", type: "textarea", label: "What production information do you wish you had access to in real time?" },
      { id: "q10", type: "textarea", label: "What would make production planning easier and more accurate?" },
      { id: "q11", type: "textarea", label: "Is there anything else about the production process, equipment, or team workflows that we haven't asked but that the new system should know about?" }
    ]
  },
  {
    id: "warehouse_rm",
    name: "Raw Material Warehouse",
    icon: "📦",
    color: "#F59E0B",
    description: "Receiving, storing and issuing raw materials",
    questions: [
      { id: "q1", type: "select", label: "How is incoming raw material stock currently recorded?", options: ["Paper GRN", "Spreadsheet", "Sage 200", "No formal record", "Other"] },
      { id: "q2", type: "textarea", label: "Describe the process for issuing raw materials to the production floor." },
      { id: "q3", type: "select", label: "How frequently are physical stock counts done?", options: ["Daily", "Weekly", "Monthly", "Quarterly", "Rarely/Never"] },
      { id: "q4", type: "scale", label: "How accurate is your current stock count vs. physical stock? (1=Very inaccurate, 5=Always accurate)" },
      { id: "q5", type: "multicheck", label: "Which details are recorded when stock is received? (select all that apply)", options: ["Supplier name", "Delivery date", "Batch/lot number", "Quantity", "Weight", "Quality/condition", "Nothing formal"] },
      { id: "q6", type: "textarea", label: "How are discrepancies between ordered and received quantities handled?" },
      { id: "q7", type: "text", label: "How many different raw materials do you typically hold in the warehouse?" },
      { id: "q8", type: "textarea", label: "What are the biggest pain points in managing raw material inventory?" },
      { id: "q9", type: "select", label: "Can you tell at any time what stock is available without a physical count?", options: ["Yes, always", "Sometimes", "Rarely", "No"] },
      { id: "q10", type: "textarea", label: "What features in a warehouse management system would help you the most?" },
      { id: "q11", type: "textarea", label: "Is there anything else about raw material storage, handling, or traceability that we haven't covered but that is important for the new system?" }
    ]
  },
  {
    id: "warehouse_fg",
    name: "Finished Goods Warehouse",
    icon: "🏪",
    color: "#8B5CF6",
    description: "Storage and dispatch of finished feed products",
    questions: [
      { id: "q1", type: "textarea", label: "How is a completed production batch recorded into finished goods stock?" },
      { id: "q2", type: "select", label: "How are finished goods currently tracked by product/SKU?", options: ["Paper", "Spreadsheet", "Sage 200", "Not tracked formally", "Other"] },
      { id: "q3", type: "multicheck", label: "What information is recorded per finished goods batch? (select all that apply)", options: ["Product name", "Batch number", "Date of manufacture", "Quantity (bags/tonnes)", "Expiry/best-before", "Production costs", "Nothing formal"] },
      { id: "q4", type: "scale", label: "How confident are you in current finished goods stock accuracy? (1=Not at all, 5=Very confident)" },
      { id: "q5", type: "textarea", label: "Describe the dispatch process when sending stock to a branch." },
      { id: "q6", type: "select", label: "How are delivery notes/dispatch documents currently created?", options: ["Hand-written", "Word/Excel template", "Sage 200", "No formal document", "Other"] },
      { id: "q7", type: "textarea", label: "How do you confirm that a branch has received the correct quantity?" },
      { id: "q8", type: "text", label: "How many dispatch runs are made to branches per week on average?" },
      { id: "q9", type: "textarea", label: "What are the most common errors in the dispatch process?" },
      { id: "q10", type: "textarea", label: "What would improve the dispatch and finished goods management process?" },
      { id: "q11", type: "textarea", label: "Is there anything else about finished goods, dispatch, or delivery to branches that we haven't asked but that is critical for the new system to handle?" }
    ]
  },
  {
    id: "sales_branches",
    name: "Branch Sales",
    icon: "🏬",
    color: "#EF4444",
    description: "Retail sales across the 18 branches",
    questions: [
      { id: "q1", type: "text", label: "Which branch do you represent?" },
      { id: "q2", type: "select", label: "How does your branch currently request stock replenishment from Head Office?", options: ["Phone call", "WhatsApp", "Email", "Formal order form", "Automatic system", "Other"] },
      { id: "q3", type: "scale", label: "How often do you experience stock-outs at branch level? (1=Never, 5=Very frequently)" },
      { id: "q4", type: "textarea", label: "What is the typical turnaround time from placing a stock order to receiving it?" },
      { id: "q5", type: "multicheck", label: "What sales information do you currently report back to Head Office? (select all that apply)", options: ["Daily sales totals", "Per-product quantities sold", "Stock on hand", "Customer returns", "Nothing formal", "Other"] },
      { id: "q6", type: "select", label: "How is your current Smart IBS POS data shared with Head Office?", options: ["Not shared", "Manual export", "Automatic sync", "Periodic email report", "Other"] },
      { id: "q7", type: "textarea", label: "What challenges do you face in managing branch inventory?" },
      { id: "q8", type: "scale", label: "How well does current stock allocation from HO match your actual branch demand? (1=Very poorly, 5=Very well)" },
      { id: "q9", type: "textarea", label: "What customer feedback do you commonly receive about product availability or quality?" },
      { id: "q10", type: "textarea", label: "What tools or information would most help you run your branch more effectively?" },
      { id: "q11", type: "textarea", label: "Is there anything else about branch operations, customer needs, or stock management at branch level that we haven't asked but that the new system must address?" }
    ]
  },
  {
    id: "finance",
    name: "Finance & Accounting",
    icon: "💰",
    color: "#06B6D4",
    description: "Financial management via Sage 200",
    questions: [
      { id: "q1", type: "multicheck", label: "Which Sage 200 modules are currently in use? (select all that apply)", options: ["Accounts Payable", "Accounts Receivable", "General Ledger", "Inventory", "Fixed Assets", "Payroll", "Other"] },
      { id: "q2", type: "textarea", label: "How is production cost currently calculated and captured in Sage?" },
      { id: "q3", type: "select", label: "How are inter-branch transfers or invoices to branches recorded?", options: ["Sage 200 inter-branch", "Manual journal entries", "Not recorded formally", "Spreadsheet", "Other"] },
      { id: "q4", type: "textarea", label: "What financial reports do you currently produce related to production and inventory?" },
      { id: "q5", type: "scale", label: "How confident are you in the accuracy of production cost data in Sage? (1=Not confident, 5=Very confident)" },
      { id: "q6", type: "textarea", label: "What are the biggest accounting challenges caused by manual production processes?" },
      { id: "q7", type: "multicheck", label: "What financial data is difficult to obtain currently? (select all that apply)", options: ["Actual production cost per batch", "Raw material usage/cost", "Finished goods valuation", "Branch profitability", "Supplier payment terms", "None — data is available"] },
      { id: "q8", type: "textarea", label: "What integrations between a future manufacturing system and Sage 200 are most important to you?" },
      { id: "q9", type: "text", label: "How long does it typically take to close monthly management accounts?" },
      { id: "q10", type: "textarea", label: "What financial visibility would most improve decision-making at Head Office?" },
      { id: "q11", type: "textarea", label: "Is there anything else about financial management, Sage 200 usage, or reporting that we haven't covered but that is essential for the new system integration?" }
    ]
  },
  {
    id: "management",
    name: "Senior Management",
    icon: "👔",
    color: "#6366F1",
    description: "Strategic oversight and decision-making",
    questions: [
      { id: "q1", type: "textarea", label: "What are the top 3 operational challenges you believe the new system must solve?" },
      { id: "q2", type: "scale", label: "How would you rate current visibility into production performance? (1=No visibility, 5=Full real-time visibility)" },
      { id: "q3", type: "scale", label: "How would you rate current visibility into inventory across the business? (1=No visibility, 5=Full visibility)" },
      { id: "q4", type: "multicheck", label: "Which reports/dashboards are most critical to you? (select all that apply)", options: ["Production output vs. plan", "Raw material stock levels", "Finished goods inventory", "Branch sales performance", "Cost per tonne produced", "Supplier performance", "Financial P&L"] },
      { id: "q5", type: "textarea", label: "What does success look like for this digital transformation in 12 months?" },
      { id: "q6", type: "select", label: "What is your preferred approach to implementation?", options: ["Big bang (all at once)", "Phased rollout (module by module)", "Pilot branch first then expand", "No preference"] },
      { id: "q7", type: "textarea", label: "Are there any concerns or risks you want to flag about this project?" },
      { id: "q8", type: "scale", label: "How committed is the business to investing in this transformation? (1=Minimal, 5=Full commitment)" },
      { id: "q9", type: "text", label: "Who are the key internal champions or stakeholders who should be closely involved?" },
      { id: "q10", type: "textarea", label: "Any additional comments or expectations for the Digital Lead and this project?" },
      { id: "q11", type: "textarea", label: "Is there anything else — any process, challenge, risk, or opportunity — that we haven't asked about but that you feel is critical to the success of this digital transformation?" }
    ]
  },

  // ---- RETAIL OPERATIONS ----
  {
    id: "retail_operations",
    name: "Retail Operations",
    icon: "🏪",
    color: "#EC4899",
    description: "Retail store operations and customer service",
    questions: [
      { id: "q1", type: "scale", label: "How satisfied are you with the current retail POS and inventory systems?" },
      { id: "q2", type: "textarea", label: "What are the biggest operational challenges in managing retail stores?" },
      { id: "q3", type: "textarea", label: "How do you currently track stock levels and product availability across stores?" },
      { id: "q4", type: "scale", label: "How effective is the current system for managing customer orders and deliveries?" },
      { id: "q5", type: "textarea", label: "What manual processes slow down retail operations the most?" },
      { id: "q6", type: "multiselect", label: "Which retail functions need the most improvement?", options: ["Point of Sale", "Inventory Management", "Customer Orders", "Delivery Tracking", "Reporting", "Staff Management"] },
      { id: "q7", type: "textarea", label: "How do you currently handle customer complaints and returns?" },
      { id: "q8", type: "scale", label: "How well do retail systems integrate with warehouse and finance systems?" },
      { id: "q9", type: "textarea", label: "What data or reports do you need but currently don't have access to?" },
      { id: "q10", type: "textarea", label: "What would make retail operations more efficient and improve customer experience?" },
      { id: "q11", type: "textarea", label: "Is there anything else — any process, challenge, risk, or opportunity — that we haven't asked about but that you feel is critical to the success of this digital transformation?" }
    ]
  },

  // ---- LOGISTICS ----
  {
    id: "logistics",
    name: "Logistics",
    icon: "🚚",
    color: "#8B5CF6",
    description: "Transportation, distribution, and delivery management",
    questions: [
      { id: "q1", type: "scale", label: "How satisfied are you with the current logistics and delivery tracking systems?" },
      { id: "q2", type: "textarea", label: "What are the main challenges in managing deliveries and transportation?" },
      { id: "q3", type: "textarea", label: "How do you currently plan routes and schedule deliveries?" },
      { id: "q4", type: "scale", label: "How effective is communication between logistics, warehouses, and branches?" },
      { id: "q5", type: "textarea", label: "What manual processes create bottlenecks in logistics operations?" },
      { id: "q6", type: "multiselect", label: "Which logistics functions need the most improvement?", options: ["Route Planning", "Vehicle Tracking", "Delivery Scheduling", "Driver Management", "Fuel Management", "Maintenance Tracking"] },
      { id: "q7", type: "textarea", label: "How do you currently track vehicle maintenance and fleet management?" },
      { id: "q8", type: "scale", label: "How well can you track delivery status and provide updates to customers?" },
      { id: "q9", type: "textarea", label: "What data or reports would help optimize logistics operations?" },
      { id: "q10", type: "textarea", label: "What improvements would reduce costs and improve delivery efficiency?" },
      { id: "q11", type: "textarea", label: "Is there anything else — any process, challenge, risk, or opportunity — that we haven't asked about but that you feel is critical to the success of this digital transformation?" }
    ]
  },

  // ---- CHICKS ORDERING ----
  {
    id: "chicks_ordering",
    name: "Chicks Ordering",
    icon: "🐣",
    color: "#F59E0B",
    description: "Day-old chick procurement and distribution",
    questions: [
      { id: "q1", type: "scale", label: "How satisfied are you with the current chick ordering and tracking system?" },
      { id: "q2", type: "textarea", label: "What are the biggest challenges in managing chick orders and deliveries?" },
      { id: "q3", type: "textarea", label: "How do you currently forecast demand and place orders with suppliers?" },
      { id: "q4", type: "scale", label: "How effective is coordination between ordering, logistics, and customer delivery?" },
      { id: "q5", type: "textarea", label: "What manual processes cause delays or errors in chick ordering?" },
      { id: "q6", type: "multiselect", label: "Which chick ordering functions need the most improvement?", options: ["Order Placement", "Supplier Management", "Delivery Scheduling", "Quality Tracking", "Customer Allocation", "Payment Processing"] },
      { id: "q7", type: "textarea", label: "How do you track chick quality, mortality rates, and customer feedback?" },
      { id: "q8", type: "scale", label: "How well can you match supply with customer demand?" },
      { id: "q9", type: "textarea", label: "What data or reports would help improve chick ordering and distribution?" },
      { id: "q10", type: "textarea", label: "What improvements would reduce waste and improve customer satisfaction?" },
      { id: "q11", type: "textarea", label: "Is there anything else — any process, challenge, risk, or opportunity — that we haven't asked about but that you feel is critical to the success of this digital transformation?" }
    ]
  }
];
