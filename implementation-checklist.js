// ============================================================
// IT IMPLEMENTATION CHECKLIST & SUCCESS CRITERIA
// ============================================================

const ImplementationChecklist = {
  
  generateChecklist(responses, analyticsData) {
    return {
      overview: this.getOverview(),
      phases: this.getPhases(),
      categories: this.getCategories()
    };
  },
  
  getOverview() {
    return {
      title: "IT Implementation Checklist & Success Criteria",
      description: "Track progress of digital transformation implementation based on stakeholder feedback",
      totalItems: 0, // Will be calculated
      completedItems: 0, // Will be loaded from saved state
      lastUpdated: null
    };
  },
  
  getPhases() {
    return [
      {
        id: "phase1",
        name: "Phase 1: Foundation & Planning",
        duration: "Months 1-2",
        color: "#EF4444",
        categories: [
          {
            id: "governance",
            name: "Project Governance",
            items: [
              {
                id: "gov1",
                text: "Form steering committee with representatives from all 11 departments",
                successCriteria: "Committee meets weekly, all departments represented",
                completed: false
              },
              {
                id: "gov2",
                text: "Appoint dedicated project manager with full authority",
                successCriteria: "PM assigned, reporting structure established",
                completed: false
              },
              {
                id: "gov3",
                text: "Secure executive sponsorship and budget approval",
                successCriteria: "Budget approved, executive sponsor committed",
                completed: false
              },
              {
                id: "gov4",
                text: "Establish communication plan and reporting structure",
                successCriteria: "Weekly updates to stakeholders, monthly executive reviews",
                completed: false
              }
            ]
          },
          {
            id: "requirements",
            name: "Requirements Analysis",
            items: [
              {
                id: "req1",
                text: "Review all stakeholder survey responses in detail",
                successCriteria: "All responses analyzed, key themes documented",
                completed: false
              },
              {
                id: "req2",
                text: "Conduct follow-up workshops with each department",
                successCriteria: "11 workshops completed, detailed notes captured",
                completed: false
              },
              {
                id: "req3",
                text: "Document current processes (as-is) with flowcharts",
                successCriteria: "Process maps for all 11 departments completed",
                completed: false
              },
              {
                id: "req4",
                text: "Define future processes (to-be) aligned with best practices",
                successCriteria: "Future state processes documented and approved",
                completed: false
              },
              {
                id: "req5",
                text: "Create prioritized requirements list based on pain points",
                successCriteria: "Requirements ranked by business impact and urgency",
                completed: false
              }
            ]
          },
          {
            id: "vendor",
            name: "System Selection",
            items: [
              {
                id: "ven1",
                text: "Develop system selection criteria based on requirements",
                successCriteria: "Evaluation matrix with weighted criteria defined",
                completed: false
              },
              {
                id: "ven2",
                text: "Shortlist 3-4 manufacturing-focused ERP systems",
                successCriteria: "Systems evaluated against feed manufacturing needs",
                completed: false
              },
              {
                id: "ven3",
                text: "Conduct vendor demonstrations and reference checks",
                successCriteria: "All vendors demoed, 3+ references checked per vendor",
                completed: false
              },
              {
                id: "ven4",
                text: "Finalize vendor selection and negotiate contracts",
                successCriteria: "Contract signed, SLAs agreed, payment terms finalized",
                completed: false
              }
            ]
          }
        ]
      },
      {
        id: "phase2",
        name: "Phase 2: Infrastructure & Core Production",
        duration: "Months 3-6",
        color: "#F59E0B",
        categories: [
          {
            id: "infrastructure",
            name: "IT Infrastructure",
            items: [
              {
                id: "inf1",
                text: "Assess and upgrade IT infrastructure (servers, network, security)",
                successCriteria: "Infrastructure audit completed, upgrades implemented",
                completed: false
              },
              {
                id: "inf2",
                text: "Set up development, testing, and production environments",
                successCriteria: "All 3 environments operational and isolated",
                completed: false
              },
              {
                id: "inf3",
                text: "Implement backup and disaster recovery procedures",
                successCriteria: "Daily backups automated, DR plan tested",
                completed: false
              },
              {
                id: "inf4",
                text: "Configure network security and access controls",
                successCriteria: "Firewall rules set, user access policies enforced",
                completed: false
              }
            ]
          },
          {
            id: "data",
            name: "Data Preparation",
            items: [
              {
                id: "data1",
                text: "Clean and validate master data (products, customers, suppliers)",
                successCriteria: "Data quality >95%, duplicates removed",
                completed: false
              },
              {
                id: "data2",
                text: "Create all product BOMs (Bill of Materials) for feed formulations",
                successCriteria: "All feed recipes digitized with accurate ingredient ratios",
                completed: false
              },
              {
                id: "data3",
                text: "Establish data governance policies and ownership",
                successCriteria: "Data owners assigned per department, policies documented",
                completed: false
              },
              {
                id: "data4",
                text: "Conduct initial data migration to test environment",
                successCriteria: "Test migration successful, data integrity verified",
                completed: false
              }
            ]
          },
          {
            id: "production",
            name: "Production Module (CRITICAL - Biggest Gap)",
            items: [
              {
                id: "prod1",
                text: "Configure production module with feed formulations and recipes",
                successCriteria: "All feed types configured, recipes loaded and tested",
                completed: false
              },
              {
                id: "prod2",
                text: "Set up production routing and work centers",
                successCriteria: "Production flow mapped, work centers defined",
                completed: false
              },
              {
                id: "prod3",
                text: "Configure quality control checkpoints and testing procedures",
                successCriteria: "QC points automated, test results tracked digitally",
                completed: false
              },
              {
                id: "prod4",
                text: "Set up production costing and variance tracking",
                successCriteria: "Standard costs set, variance reports automated",
                completed: false
              },
              {
                id: "prod5",
                text: "Enable real-time production tracking and monitoring",
                successCriteria: "Live production dashboard showing batch status",
                completed: false
              },
              {
                id: "prod6",
                text: "Test production module with actual production runs",
                successCriteria: "5+ production batches successfully tracked end-to-end",
                completed: false
              }
            ]
          }
        ]
      },
      {
        id: "phase3",
        name: "Phase 3: Procurement & Inventory",
        duration: "Months 7-9",
        color: "#3B82F6",
        categories: [
          {
            id: "procurement_vet",
            name: "Procurement - Veterinary & Livestock",
            items: [
              {
                id: "pvet1",
                text: "Set up veterinary chemicals and livestock equipment procurement workflow",
                successCriteria: "Separate workflow for vet products with compliance tracking",
                completed: false
              },
              {
                id: "pvet2",
                text: "Configure supplier master data for veterinary suppliers",
                successCriteria: "All vet suppliers loaded with pricing agreements",
                completed: false
              },
              {
                id: "pvet3",
                text: "Set up expiry date tracking for veterinary products",
                successCriteria: "Auto-alerts 30 days before expiry, FEFO enforced",
                completed: false
              },
              {
                id: "pvet4",
                text: "Configure purchase requisition and approval workflows",
                successCriteria: "Multi-level approvals based on amount, auto-routing",
                completed: false
              }
            ]
          },
          {
            id: "procurement_maint",
            name: "Procurement - Plant Maintenance",
            items: [
              {
                id: "pmnt1",
                text: "Set up plant maintenance accessories and spares procurement workflow",
                successCriteria: "Separate workflow for maintenance items",
                completed: false
              },
              {
                id: "pmnt2",
                text: "Configure spare parts inventory with reorder points",
                successCriteria: "Critical spares identified, auto-reorder triggered",
                completed: false
              },
              {
                id: "pmnt3",
                text: "Link procurement to maintenance schedules",
                successCriteria: "Maintenance orders auto-generate procurement requests",
                completed: false
              },
              {
                id: "pmnt4",
                text: "Set up emergency procurement fast-track process",
                successCriteria: "Emergency POs approved within 2 hours",
                completed: false
              }
            ]
          },
          {
            id: "inventory",
            name: "Inventory Management",
            items: [
              {
                id: "inv1",
                text: "Configure inventory management for raw materials",
                successCriteria: "All raw material SKUs loaded, stock levels accurate",
                completed: false
              },
              {
                id: "inv2",
                text: "Set up reorder points and safety stock levels",
                successCriteria: "Auto-replenishment triggered at reorder points",
                completed: false
              },
              {
                id: "inv3",
                text: "Configure goods receipt and quality inspection processes",
                successCriteria: "QC inspection mandatory before stock acceptance",
                completed: false
              },
              {
                id: "inv4",
                text: "Integrate procurement with production (MRP functionality)",
                successCriteria: "Production orders auto-generate material requirements",
                completed: false
              }
            ]
          }
        ]
      },
      {
        id: "phase4",
        name: "Phase 4: Warehouse Management",
        duration: "Months 10-11",
        color: "#8B5CF6",
        categories: [
          {
            id: "warehouse_raw",
            name: "Raw Material Warehouse",
            items: [
              {
                id: "wraw1",
                text: "Set up warehouse locations and bin management",
                successCriteria: "All bins mapped, locations labeled with barcodes",
                completed: false
              },
              {
                id: "wraw2",
                text: "Implement barcode scanning for receipts and issues",
                successCriteria: "Handheld scanners deployed, staff trained",
                completed: false
              },
              {
                id: "wraw3",
                text: "Configure FIFO rules for inventory movement",
                successCriteria: "System enforces FIFO, oldest stock issued first",
                completed: false
              },
              {
                id: "wraw4",
                text: "Set up cycle counting and stock reconciliation",
                successCriteria: "Weekly cycle counts, variance <2%",
                completed: false
              },
              {
                id: "wraw5",
                text: "Enable real-time inventory accuracy tracking",
                successCriteria: "Live inventory dashboard, 98%+ accuracy",
                completed: false
              }
            ]
          },
          {
            id: "warehouse_fg",
            name: "Finished Goods Warehouse",
            items: [
              {
                id: "wfg1",
                text: "Configure finished goods storage locations",
                successCriteria: "FG warehouse mapped, capacity optimized",
                completed: false
              },
              {
                id: "wfg2",
                text: "Set up order fulfillment and picking processes",
                successCriteria: "Automated picking lists, pick-to-light system",
                completed: false
              },
              {
                id: "wfg3",
                text: "Integrate with sales orders for dispatch",
                successCriteria: "Sales orders auto-create picking tasks",
                completed: false
              },
              {
                id: "wfg4",
                text: "Configure delivery tracking and proof of delivery",
                successCriteria: "Digital POD with customer signatures",
                completed: false
              }
            ]
          }
        ]
      },
      {
        id: "phase5",
        name: "Phase 5: Integration & Extended Modules",
        duration: "Months 12-15",
        color: "#10B981",
        categories: [
          {
            id: "integration_pos",
            name: "POS System Integration",
            items: [
              {
                id: "pos1",
                text: "Analyze POS system data structure and APIs",
                successCriteria: "API documentation reviewed, integration plan created",
                completed: false
              },
              {
                id: "pos2",
                text: "Develop integration middleware for POS-ERP sync",
                successCriteria: "Real-time sync operational, <5 min latency",
                completed: false
              },
              {
                id: "pos3",
                text: "Set up customer and product data synchronization",
                successCriteria: "Master data synced bidirectionally",
                completed: false
              },
              {
                id: "pos4",
                text: "Configure sales order flow from POS to ERP",
                successCriteria: "POS sales auto-create ERP orders",
                completed: false
              },
              {
                id: "pos5",
                text: "Test integration with sample transactions",
                successCriteria: "100 test transactions processed successfully",
                completed: false
              }
            ]
          },
          {
            id: "integration_sage",
            name: "Sage Pastel Integration",
            items: [
              {
                id: "sage1",
                text: "Map ERP chart of accounts to Sage Pastel",
                successCriteria: "GL mapping complete, reconciliation rules set",
                completed: false
              },
              {
                id: "sage2",
                text: "Configure automatic journal entry generation",
                successCriteria: "Daily auto-posting to Sage, no manual entries",
                completed: false
              },
              {
                id: "sage3",
                text: "Set up customer and supplier balance synchronization",
                successCriteria: "AR/AP balances match between systems",
                completed: false
              },
              {
                id: "sage4",
                text: "Test financial data flow and accuracy",
                successCriteria: "Month-end reconciliation within 0.1% variance",
                completed: false
              }
            ]
          },
          {
            id: "logistics",
            name: "Logistics & Fleet Management",
            items: [
              {
                id: "log1",
                text: "Deploy GPS tracking for delivery vehicles",
                successCriteria: "All vehicles tracked in real-time",
                completed: false
              },
              {
                id: "log2",
                text: "Implement route optimization system",
                successCriteria: "Routes optimized daily, 15%+ fuel savings",
                completed: false
              },
              {
                id: "log3",
                text: "Set up digital proof of delivery",
                successCriteria: "100% paperless delivery confirmation",
                completed: false
              },
              {
                id: "log4",
                text: "Configure delivery scheduling and tracking",
                successCriteria: "Customers receive delivery ETAs via SMS",
                completed: false
              }
            ]
          },
          {
            id: "chicks",
            name: "Chicks Ordering & Distribution",
            items: [
              {
                id: "chk1",
                text: "Set up automated chicks ordering system",
                successCriteria: "Orders placed electronically with suppliers",
                completed: false
              },
              {
                id: "chk2",
                text: "Configure quality tracking for chick deliveries",
                successCriteria: "Quality scores recorded, supplier performance tracked",
                completed: false
              },
              {
                id: "chk3",
                text: "Implement payment reconciliation workflow",
                successCriteria: "Auto-matching of invoices to deliveries",
                completed: false
              }
            ]
          },
          {
            id: "analytics",
            name: "Business Intelligence & Reporting",
            items: [
              {
                id: "bi1",
                text: "Deploy executive dashboards for senior management",
                successCriteria: "Real-time KPI dashboards accessible on mobile",
                completed: false
              },
              {
                id: "bi2",
                text: "Set up automated reporting for all departments",
                successCriteria: "Daily/weekly/monthly reports auto-generated",
                completed: false
              },
              {
                id: "bi3",
                text: "Configure predictive analytics for demand forecasting",
                successCriteria: "Forecast accuracy >85%",
                completed: false
              },
              {
                id: "bi4",
                text: "Enable mobile access to key metrics",
                successCriteria: "Mobile app deployed, management using daily",
                completed: false
              }
            ]
          }
        ]
      },
      {
        id: "phase6",
        name: "Phase 6: Training & Go-Live",
        duration: "Ongoing",
        color: "#6366F1",
        categories: [
          {
            id: "training",
            name: "User Training & Change Management",
            items: [
              {
                id: "trn1",
                text: "Develop training materials (manuals, videos, quick guides)",
                successCriteria: "Complete training library for all modules",
                completed: false
              },
              {
                id: "trn2",
                text: "Conduct role-based training for all users",
                successCriteria: "100% of users trained, competency verified",
                completed: false
              },
              {
                id: "trn3",
                text: "Set up super-user network in each department",
                successCriteria: "2-3 super-users per department certified",
                completed: false
              },
              {
                id: "trn4",
                text: "Create sandbox environment for practice",
                successCriteria: "Users can practice without affecting live data",
                completed: false
              },
              {
                id: "trn5",
                text: "Conduct change management workshops",
                successCriteria: "All departments understand benefits and changes",
                completed: false
              }
            ]
          },
          {
            id: "uat",
            name: "User Acceptance Testing",
            items: [
              {
                id: "uat1",
                text: "Develop comprehensive test scenarios for all processes",
                successCriteria: "Test scripts cover 100% of business processes",
                completed: false
              },
              {
                id: "uat2",
                text: "Conduct end-to-end testing with actual users",
                successCriteria: "All departments complete UAT successfully",
                completed: false
              },
              {
                id: "uat3",
                text: "Test all integrations under realistic load",
                successCriteria: "System handles peak load without issues",
                completed: false
              },
              {
                id: "uat4",
                text: "Get formal sign-off from all department heads",
                successCriteria: "11 department heads approve go-live",
                completed: false
              }
            ]
          },
          {
            id: "golive",
            name: "Phased Go-Live",
            items: [
              {
                id: "live1",
                text: "Phase 1: Go live with production module (parallel run 2-4 weeks)",
                successCriteria: "Production tracked in both old and new systems",
                completed: false
              },
              {
                id: "live2",
                text: "Phase 2: Go live with procurement and inventory",
                successCriteria: "All procurement through new system",
                completed: false
              },
              {
                id: "live3",
                text: "Phase 3: Activate POS integration",
                successCriteria: "POS-ERP sync operational 24/7",
                completed: false
              },
              {
                id: "live4",
                text: "Phase 4: Activate Sage Pastel integration",
                successCriteria: "Financial data flowing automatically",
                completed: false
              },
              {
                id: "live5",
                text: "Monitor system performance and user adoption",
                successCriteria: "System uptime >99%, user satisfaction >80%",
                completed: false
              }
            ]
          },
          {
            id: "support",
            name: "Ongoing Support & Optimization",
            items: [
              {
                id: "sup1",
                text: "Set up internal IT support team for system maintenance",
                successCriteria: "Helpdesk operational, <4 hour response time",
                completed: false
              },
              {
                id: "sup2",
                text: "Establish vendor support agreements and SLAs",
                successCriteria: "SLAs signed, escalation procedures documented",
                completed: false
              },
              {
                id: "sup3",
                text: "Create system governance committee",
                successCriteria: "Monthly governance meetings, change control process",
                completed: false
              },
              {
                id: "sup4",
                text: "Implement regular system health checks and audits",
                successCriteria: "Quarterly audits, performance optimization ongoing",
                completed: false
              },
              {
                id: "sup5",
                text: "Monitor ROI and business benefits realization",
                successCriteria: "Monthly ROI tracking, benefits documented",
                completed: false
              }
            ]
          }
        ]
      }
    ];
  },
  
  getCategories() {
    // Flat list of all categories for quick reference
    return [
      "Project Governance",
      "Requirements Analysis",
      "System Selection",
      "IT Infrastructure",
      "Data Preparation",
      "Production Module",
      "Procurement - Veterinary & Livestock",
      "Procurement - Plant Maintenance",
      "Inventory Management",
      "Raw Material Warehouse",
      "Finished Goods Warehouse",
      "POS System Integration",
      "Sage Pastel Integration",
      "Logistics & Fleet Management",
      "Chicks Ordering & Distribution",
      "Business Intelligence & Reporting",
      "User Training & Change Management",
      "User Acceptance Testing",
      "Phased Go-Live",
      "Ongoing Support & Optimization"
    ];
  },
  
  calculateProgress(checklist) {
    let totalItems = 0;
    let completedItems = 0;
    
    checklist.phases.forEach(phase => {
      phase.categories.forEach(category => {
        category.items.forEach(item => {
          totalItems++;
          if (item.completed) {
            completedItems++;
          }
        });
      });
    });
    
    return {
      totalItems,
      completedItems,
      percentage: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
    };
  }
};
