// ============================================================
// SYSTEM RECOMMENDATIONS ENGINE
// ============================================================

const SystemRecommendations = {
  
  generateSystemGuidance(responses, analyticsData) {
    const currentSystems = {
      pos: "POS System (Retail/Branches)",
      sagePasstel: "Sage Pastel (Finance/Accounting)",
      production: "No System (Manual processes)",
      manufacturing: "Partially Manual"
    };
    
    const recommendations = {
      overview: this.generateOverview(responses, analyticsData, currentSystems),
      coreRequirements: this.identifyCoreRequirements(responses, analyticsData),
      systemArchitecture: this.recommendArchitecture(responses, analyticsData),
      integrationStrategy: this.planIntegration(currentSystems),
      implementationRoadmap: this.createRoadmap(responses, analyticsData),
      criticalSuccessFactors: this.identifySuccessFactors(responses, analyticsData),
      riskMitigation: this.identifyRisks(responses, analyticsData)
    };
    
    return recommendations;
  },
  
  generateOverview(responses, data, currentSystems) {
    const totalResponses = responses.length;
    const sentiment = data.sentiment.overall;
    const topPainPoints = data.painPoints.slice(0, 5);
    
    return {
      title: "Digital Transformation Strategy Overview",
      currentState: {
        description: "Hyperfeeds currently operates with a fragmented system landscape:",
        systems: [
          { name: "POS System", coverage: "Retail branches and customer-facing operations", status: "Operational" },
          { name: "Sage Pastel", coverage: "Finance and accounting functions", status: "Operational" },
          { name: "Production & Manufacturing", coverage: "Feed production, batching, formulation", status: "No System - Manual/Paper-based" },
          { name: "Procurement", coverage: "Veterinary supplies and plant maintenance", status: "Partially Manual" },
          { name: "Warehousing", coverage: "Raw materials and finished goods", status: "Partially Manual" },
          { name: "Logistics", coverage: "Distribution and delivery", status: "Partially Manual" }
        ],
        keyGaps: [
          "No integrated production management system",
          "Limited real-time visibility across operations",
          "Manual data entry and reconciliation",
          "Disconnected systems leading to data silos",
          "No end-to-end traceability from procurement to delivery"
        ]
      },
      stakeholderInsights: {
        totalResponses: totalResponses,
        overallSentiment: sentiment,
        readinessForChange: sentiment === 'Positive' ? 'High' : sentiment === 'Neutral' ? 'Moderate' : 'Requires Change Management',
        topConcerns: topPainPoints.map(p => p.text)
      },
      strategicDirection: {
        recommendation: "Implement an integrated ERP system with strong manufacturing/production capabilities",
        rationale: [
          "Production and manufacturing are the core gaps with no current system",
          "Need for end-to-end integration from procurement through production to sales",
          "Current systems (POS, Sage Pastel) should be integrated, not replaced",
          "Real-time data visibility is critical for decision-making"
        ]
      }
    };
  },
  
  identifyCoreRequirements(responses, data) {
    return {
      title: "Core System Requirements",
      modules: [
        {
          priority: "CRITICAL",
          module: "Production Management",
          rationale: "No current system - highest gap",
          features: [
            "Feed formulation and recipe management",
            "Batch production planning and scheduling",
            "Real-time production tracking and monitoring",
            "Quality control and testing integration",
            "Equipment and machinery management",
            "Production costing and variance analysis"
          ]
        },
        {
          priority: "CRITICAL",
          module: "Procurement & Inventory Management",
          rationale: "Split between veterinary/livestock and plant maintenance - needs unified approach",
          features: [
            "Dual procurement workflows (veterinary chemicals + plant maintenance)",
            "Supplier management and performance tracking",
            "Purchase order automation and approval workflows",
            "Real-time inventory visibility (raw materials + spares)",
            "Automated reorder points and stock alerts",
            "Expiry date tracking for veterinary products",
            "Integration with production for material requirements planning (MRP)"
          ]
        },
        {
          priority: "HIGH",
          module: "Warehouse Management",
          rationale: "Currently manual - critical for inventory accuracy",
          features: [
            "Separate management for raw materials and finished goods",
            "Barcode/RFID scanning for goods receipt and dispatch",
            "Bin location management and stock movements",
            "FIFO/FEFO enforcement for expiry-sensitive items",
            "Cycle counting and stock reconciliation",
            "Integration with production and sales"
          ]
        },
        {
          priority: "HIGH",
          module: "Sales & Distribution",
          rationale: "Integrate with existing POS system",
          features: [
            "Integration with current POS system (avoid replacement)",
            "Order management from branches and retail",
            "Delivery scheduling and route optimization",
            "Customer management and credit control",
            "Pricing and promotions management",
            "Sales analytics and forecasting"
          ]
        },
        {
          priority: "MEDIUM",
          module: "Finance Integration",
          rationale: "Integrate with Sage Pastel - avoid duplication",
          features: [
            "Seamless integration with Sage Pastel",
            "Automated journal entries from operations",
            "Cost center and project accounting",
            "Budget vs actual tracking",
            "Financial reporting and consolidation"
          ]
        },
        {
          priority: "MEDIUM",
          module: "Logistics & Fleet Management",
          rationale: "Currently manual - optimize delivery operations",
          features: [
            "Route planning and optimization",
            "Vehicle tracking and maintenance scheduling",
            "Driver management and performance tracking",
            "Delivery confirmation and proof of delivery",
            "Fuel management and cost tracking"
          ]
        },
        {
          priority: "MEDIUM",
          module: "Chicks Ordering & Distribution",
          rationale: "Specialized process requiring dedicated workflow",
          features: [
            "Demand forecasting and order placement",
            "Supplier coordination and delivery scheduling",
            "Quality tracking and mortality management",
            "Customer allocation and delivery management",
            "Payment processing and reconciliation"
          ]
        }
      ]
    };
  },
  
  recommendArchitecture(responses, data) {
    return {
      title: "Recommended System Architecture",
      approach: "Integrated ERP with Best-of-Breed Extensions",
      coreERP: {
        recommendation: "Manufacturing-focused ERP system",
        options: [
          {
            name: "Odoo ERP (Open Source)",
            pros: ["Strong manufacturing module", "Highly customizable", "Lower licensing costs", "Active community", "Modular approach"],
            cons: ["Requires technical expertise", "May need customization for feed industry"],
            fit: "EXCELLENT - Best for manufacturing focus with budget flexibility"
          },
          {
            name: "SAP Business One",
            pros: ["Comprehensive functionality", "Strong in manufacturing", "Good support", "Scalable"],
            cons: ["Higher cost", "Complex implementation", "May be overkill for current size"],
            fit: "GOOD - If budget allows and long-term scalability is priority"
          },
          {
            name: "Microsoft Dynamics 365 Business Central",
            pros: ["Strong manufacturing", "Good integration capabilities", "Microsoft ecosystem", "Cloud-based"],
            cons: ["Subscription costs", "Customization can be expensive"],
            fit: "GOOD - If Microsoft ecosystem is preferred"
          },
          {
            name: "ERPNext (Open Source)",
            pros: ["Free and open source", "Manufacturing module", "Modern interface", "Cloud or on-premise"],
            cons: ["Smaller community than Odoo", "May require customization"],
            fit: "GOOD - Cost-effective alternative to Odoo"
          }
        ],
        recommendation: "**Odoo ERP** is recommended as the best fit for Hyperfeeds due to its strong manufacturing capabilities, modular approach, and cost-effectiveness."
      },
      integrationLayer: {
        description: "Middleware to connect existing systems with new ERP",
        approach: "API-based integration using REST/SOAP",
        keyIntegrations: [
          { system: "POS System", method: "Real-time API sync", data: "Sales orders, customer data, inventory updates" },
          { system: "Sage Pastel", method: "Scheduled batch sync", data: "Financial transactions, GL postings, customer/supplier balances" },
          { system: "New ERP", method: "Native modules", data: "Production, procurement, inventory, logistics" }
        ]
      },
      dataStrategy: {
        masterDataManagement: "Centralize in ERP, sync to POS and Sage Pastel",
        singleSourceOfTruth: "ERP for operational data, Sage Pastel for financial reporting",
        dataFlow: [
          "Production → ERP → Sage Pastel (cost accounting)",
          "Sales → POS → ERP → Sage Pastel (revenue recognition)",
          "Procurement → ERP → Sage Pastel (payables)",
          "Inventory → ERP → POS (stock availability)"
        ]
      }
    };
  },
  
  planIntegration(currentSystems) {
    return {
      title: "Integration Strategy with Current Systems",
      approach: "Phased integration to minimize disruption",
      phases: [
        {
          phase: 1,
          name: "Foundation & Core ERP",
          duration: "3-4 months",
          activities: [
            "Implement core ERP modules (Production, Procurement, Inventory)",
            "Migrate master data (products, suppliers, customers, BOMs)",
            "Configure production workflows and formulations",
            "Train core users (production, procurement, warehouse)",
            "Run parallel with existing processes"
          ],
          systems: ["New ERP standalone"]
        },
        {
          phase: 2,
          name: "POS Integration",
          duration: "2-3 months",
          activities: [
            "Develop API integration between POS and ERP",
            "Sync customer master data",
            "Real-time inventory updates from ERP to POS",
            "Sales order flow from POS to ERP",
            "Test and validate data accuracy"
          ],
          systems: ["ERP ↔ POS"]
        },
        {
          phase: 3,
          name: "Sage Pastel Integration",
          duration: "2 months",
          activities: [
            "Configure GL mapping and chart of accounts sync",
            "Automate journal entries from ERP to Sage Pastel",
            "Sync customer/supplier balances",
            "Reconciliation processes",
            "Financial reporting validation"
          ],
          systems: ["ERP ↔ Sage Pastel"]
        },
        {
          phase: 4,
          name: "Extended Modules",
          duration: "3-4 months",
          activities: [
            "Implement logistics and fleet management",
            "Deploy chicks ordering module",
            "Add advanced analytics and reporting",
            "Mobile apps for field operations",
            "Full end-to-end testing"
          ],
          systems: ["Full ecosystem"]
        }
      ],
      criticalConsiderations: [
        "Keep POS and Sage Pastel operational throughout - do not replace",
        "Ensure data integrity during integration",
        "Plan for cutover weekends to minimize business disruption",
        "Have rollback plans for each integration phase",
        "Maintain dual-entry during parallel run periods"
      ]
    };
  },
  
  createRoadmap(responses, data) {
    return {
      title: "Implementation Roadmap",
      totalDuration: "12-15 months",
      phases: [
        {
          month: "1-2",
          phase: "Discovery & Planning",
          activities: [
            "Finalize system selection and vendor",
            "Detailed requirements gathering",
            "Process mapping and gap analysis",
            "Project team formation and training",
            "Infrastructure planning (servers, network, etc.)"
          ],
          deliverables: ["Detailed requirements document", "Project plan", "Budget approval", "Vendor contract"]
        },
        {
          month: "3-6",
          phase: "Phase 1 - Core ERP Implementation",
          activities: [
            "ERP installation and configuration",
            "Production module setup (formulations, BOMs, routing)",
            "Procurement module configuration",
            "Inventory and warehouse management setup",
            "Master data migration",
            "User training (production, procurement, warehouse)",
            "Parallel run with existing processes"
          ],
          deliverables: ["Configured ERP system", "Trained users", "Migrated data", "Go-live for production"]
        },
        {
          month: "7-9",
          phase: "Phase 2 - POS & Sage Integration",
          activities: [
            "POS integration development and testing",
            "Sage Pastel integration development",
            "Data synchronization testing",
            "User acceptance testing",
            "Cutover planning"
          ],
          deliverables: ["Integrated POS", "Integrated Sage Pastel", "End-to-end data flow"]
        },
        {
          month: "10-12",
          phase: "Phase 3 - Extended Modules",
          activities: [
            "Logistics and fleet management implementation",
            "Chicks ordering module deployment",
            "Advanced reporting and analytics",
            "Mobile apps for field operations",
            "System optimization and fine-tuning"
          ],
          deliverables: ["Full system operational", "All modules live", "Mobile apps deployed"]
        },
        {
          month: "13-15",
          phase: "Stabilization & Optimization",
          activities: [
            "Post-implementation support",
            "Performance optimization",
            "User feedback and enhancements",
            "Advanced training for power users",
            "Documentation and knowledge transfer"
          ],
          deliverables: ["Stable system", "Optimized processes", "Comprehensive documentation"]
        }
      ]
    };
  },
  
  identifySuccessFactors(responses, data) {
    return {
      title: "Critical Success Factors",
      factors: [
        {
          factor: "Executive Sponsorship",
          importance: "CRITICAL",
          description: "Strong leadership commitment from senior management",
          actions: [
            "Appoint executive sponsor with decision-making authority",
            "Regular steering committee meetings",
            "Visible support and communication from leadership",
            "Budget and resource allocation authority"
          ]
        },
        {
          factor: "Change Management",
          importance: "CRITICAL",
          description: "User adoption is key to success",
          actions: [
            "Comprehensive training program for all user levels",
            "Early involvement of key users in design",
            "Clear communication of benefits and changes",
            "Support structure for post-go-live",
            "Celebrate quick wins and milestones"
          ]
        },
        {
          factor: "Data Quality",
          importance: "HIGH",
          description: "Clean, accurate master data is foundation",
          actions: [
            "Data cleansing before migration",
            "Establish data governance policies",
            "Assign data ownership and accountability",
            "Regular data quality audits"
          ]
        },
        {
          factor: "Process Standardization",
          importance: "HIGH",
          description: "Standardize processes before automation",
          actions: [
            "Document current processes",
            "Identify and eliminate inefficiencies",
            "Define standard operating procedures",
            "Align processes across departments"
          ]
        },
        {
          factor: "Vendor Partnership",
          importance: "MEDIUM",
          description: "Strong relationship with ERP vendor/implementer",
          actions: [
            "Select vendor with manufacturing industry experience",
            "Clear SLAs and support agreements",
            "Regular vendor review meetings",
            "Knowledge transfer from vendor to internal team"
          ]
        }
      ]
    };
  },
  
  identifyRisks(responses, data) {
    return {
      title: "Risk Mitigation Strategy",
      risks: [
        {
          risk: "Production Disruption",
          likelihood: "MEDIUM",
          impact: "HIGH",
          mitigation: [
            "Implement during low-production periods",
            "Maintain manual backup processes during transition",
            "Extensive testing before go-live",
            "Parallel run for critical production processes",
            "24/7 support during initial weeks"
          ]
        },
        {
          risk: "User Resistance",
          likelihood: "MEDIUM",
          impact: "HIGH",
          mitigation: [
            "Early user involvement in design",
            "Comprehensive training program",
            "Super-user network for peer support",
            "Clear communication of benefits",
            "Address concerns proactively"
          ]
        },
        {
          risk: "Data Migration Issues",
          likelihood: "HIGH",
          impact: "MEDIUM",
          mitigation: [
            "Thorough data cleansing before migration",
            "Multiple test migrations",
            "Data validation and reconciliation",
            "Rollback plan if issues arise",
            "Dedicated data migration team"
          ]
        },
        {
          risk: "Integration Failures",
          likelihood: "MEDIUM",
          impact: "HIGH",
          mitigation: [
            "Extensive integration testing",
            "Phased integration approach",
            "Fallback to manual processes if needed",
            "API monitoring and alerts",
            "Vendor support for integration issues"
          ]
        },
        {
          risk: "Budget Overruns",
          likelihood: "MEDIUM",
          impact: "MEDIUM",
          mitigation: [
            "Detailed budget with contingency (20-30%)",
            "Phased approach allows cost control",
            "Regular budget reviews",
            "Clear scope management",
            "Prioritize must-have vs nice-to-have features"
          ]
        },
        {
          risk: "Timeline Delays",
          likelihood: "MEDIUM",
          impact: "MEDIUM",
          mitigation: [
            "Realistic timeline with buffers",
            "Clear project milestones and tracking",
            "Regular status reviews",
            "Escalation process for blockers",
            "Flexible resource allocation"
          ]
        }
      ]
    };
  }
};
