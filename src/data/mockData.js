// ============================================================
// TELEVISTA × BISON OPERATIONAL CRM DASHBOARD
// Comprehensive Mock Data for Demo Mode
// ============================================================

// === User Roles ===
export const USER_ROLES = {
  BISON_OWNER: {
    id: 'bison_owner',
    label: 'Bison Owner',
    level: 1,
    permissions: ['Full Access', 'Manage Users', 'View Reports', 'Edit Settings', 'Approve Leads'],
  },
  BISON_MANAGER: {
    id: 'bison_manager',
    label: 'Bison Manager',
    level: 2,
    permissions: ['View Dashboard', 'Manage Leads', 'View Reports', 'Edit Settings'],
  },
  TELEVISTA_MANAGEMENT: {
    id: 'televista_management',
    label: 'Televista Management',
    level: 2,
    permissions: ['View Dashboard', 'Manage Callers', 'View Reports', 'Send Messages'],
  },
  CALLER: {
    id: 'caller',
    label: 'Caller',
    level: 3,
    permissions: ['Make Calls', 'Create Leads', 'View Own Stats', 'Send Messages'],
  },
};

export const CURRENT_USER = {
  id: 1,
  name: 'Ariel Hernandez',
  email: 'ariel@bisonroofing.com',
  role: USER_ROLES.BISON_OWNER,
  avatar: 'AH',
  company: 'Bison Solar & Roofing',
};

// === Callers (Televista Agents) ===
export const CALLERS = [
  {
    id: 1,
    name: "Youssef Shawky",
    status: "Active",
    avatar: "YS",
    photo: null,
    email: "youssef@televista.com",
    phone: "(555) 234-5678",
    callsToday: 67,
    callsWeek: 312,
    callsMonth: 1245,
    leadsGenerated: 8,
    leadsWeek: 34,
    leadsMonth: 142,
    appointmentsSet: 4,
    avgCallDuration: "2m 15s",
    conversionRate: "11.9%",
    qualityScore: 94,
    lastActive: "2 mins ago",
    slaCompliant: true,
    streak: 5,
    rank: 1,
  },
  {
    id: 2,
    name: "Ibrahim Rashad",
    status: "Active",
    avatar: "IR",
    photo: null,
    email: "ibrahim@televista.com",
    phone: "(555) 345-6789",
    callsToday: 52,
    callsWeek: 278,
    callsMonth: 1089,
    leadsGenerated: 5,
    leadsWeek: 28,
    leadsMonth: 118,
    appointmentsSet: 3,
    avgCallDuration: "3m 45s",
    conversionRate: "9.6%",
    qualityScore: 91,
    lastActive: "Just now",
    slaCompliant: true,
    streak: 3,
    rank: 2,
  },
  {
    id: 3,
    name: "Micheal Wassim",
    status: "Break",
    avatar: "MW",
    photo: null,
    email: "micheal@televista.com",
    phone: "(555) 456-7890",
    callsToday: 45,
    callsWeek: 245,
    callsMonth: 978,
    leadsGenerated: 4,
    leadsWeek: 22,
    leadsMonth: 95,
    appointmentsSet: 2,
    avgCallDuration: "2m 30s",
    conversionRate: "8.9%",
    qualityScore: 88,
    lastActive: "15 mins ago",
    slaCompliant: true,
    streak: 2,
    rank: 3,
  },
];

// === KPI Data (Real-time Dashboard Metrics) ===
export const KPI_DATA = {
  totalCalls: { 
    value: 164, 
    change: "+18%", 
    period: "vs yesterday",
    today: 164,
    week: 835,
    month: 3312,
  },
  totalLeads: { 
    value: 17, 
    change: "+5", 
    period: "vs yesterday",
    today: 17,
    week: 84,
    month: 355,
  },
  appointments: { 
    value: 9, 
    change: "+3", 
    period: "vs yesterday",
    today: 9,
    week: 42,
    month: 178,
  },
  avgDuration: { 
    value: "2m 50s", 
    change: "+15s", 
    period: "vs yesterday" 
  },
  conversionRate: { 
    value: "10.4%", 
    change: "+1.2%", 
    period: "vs last week" 
  },
  costPerLead: {
    value: "$12.50",
    change: "-$1.80",
    period: "vs last month",
  },
  activeCallers: {
    value: 2,
    total: 3,
    status: "2 Online",
  },
  appointmentRate: {
    value: "52.9%",
    change: "+4.2%",
    period: "leads → appts",
  },
};

// === Recent Leads ===
export const RECENT_LEADS = [
  {
    id: 101,
    name: "Robert Fox",
    phone: "(555) 123-4567",
    address: "123 Brickell Avenue",
    city: "Miami",
    state: "FL",
    zip: "33131",
    isHomeowner: true,
    roofType: "Shingle",
    roofAge: "18 years",
    status: "Pending",
    interest: "Hot",
    caller: "Youssef Shawky",
    callerId: 1,
    timestamp: "2026-01-03T10:30:00",
    notes: "Homeowner interested in solar + roof replacement. Mentioned recent hail damage. Available for consult tomorrow morning.",
    sentToCRM: false,
    crmStatus: null,
    pendingSince: "45 mins",
    followUpRequested: false,
    flagged: false,
    callDuration: "4m 32s",
    callRecordingUrl: "#",
  },
  {
    id: 102,
    name: "Eleanor Pena",
    phone: "(555) 987-6543",
    address: "456 Las Olas Boulevard",
    city: "Fort Lauderdale",
    state: "FL",
    zip: "33301",
    isHomeowner: true,
    roofType: "Tile",
    roofAge: "15 years",
    status: "Accepted",
    interest: "Warm",
    caller: "Ibrahim Rashad",
    callerId: 3,
    timestamp: "2026-01-03T09:45:00",
    notes: "Just wants a quote for now. Roof is 15 years old. Mentioned neighbor recently got solar installed.",
    sentToCRM: true,
    crmStatus: "delivered",
    pendingSince: null,
    followUpRequested: false,
    flagged: false,
    callDuration: "3m 18s",
    callRecordingUrl: "#",
  },
  {
    id: 103,
    name: "Jerome Bell",
    phone: "(555) 456-7890",
    address: "789 Bayshore Boulevard",
    city: "Tampa",
    state: "FL",
    zip: "33606",
    isHomeowner: true,
    roofType: "Flat",
    roofAge: "8 years",
    status: "Pending",
    interest: "Hot",
    caller: "Micheal Wassim",
    callerId: 2,
    timestamp: "2026-01-03T09:15:00",
    notes: "URGENT: Active leak in master bedroom. Needs immediate inspection. Very motivated buyer.",
    sentToCRM: false,
    crmStatus: null,
    pendingSince: "1h 15m",
    followUpRequested: true,
    flagged: true,
    callDuration: "6m 45s",
    callRecordingUrl: "#",
  },
  {
    id: 104,
    name: "Cameron Williamson",
    phone: "(555) 234-5678",
    address: "321 International Drive",
    city: "Orlando",
    state: "FL",
    zip: "32819",
    isHomeowner: true,
    roofType: "Shingle",
    roofAge: "12 years",
    status: "Accepted",
    interest: "Warm",
    caller: "Youssef Shawky",
    callerId: 1,
    timestamp: "2026-01-03T08:30:00",
    notes: "Interested in both solar and roofing. Has HOA approval for solar panels.",
    sentToCRM: true,
    crmStatus: "delivered",
    pendingSince: null,
    followUpRequested: false,
    flagged: false,
    callDuration: "5m 12s",
    callRecordingUrl: "#",
  },
  {
    id: 105,
    name: "Kristin Watson",
    phone: "(555) 876-5432",
    address: "654 Riverside Avenue",
    city: "Jacksonville",
    state: "FL",
    zip: "32204",
    isHomeowner: true,
    roofType: "Metal",
    roofAge: "5 years",
    status: "Pending",
    interest: "Cold",
    caller: "Micheal Wassim",
    callerId: 2,
    timestamp: "2026-01-03T08:00:00",
    notes: "Only interested in solar quote. Metal roof in good condition. Comparison shopping.",
    sentToCRM: false,
    crmStatus: null,
    pendingSince: "2h 30m",
    followUpRequested: false,
    flagged: false,
    callDuration: "2m 45s",
    callRecordingUrl: "#",
  },
  {
    id: 106,
    name: "Wade Warren",
    phone: "(555) 345-6780",
    address: "987 Beach Drive",
    city: "St. Petersburg",
    state: "FL",
    zip: "33701",
    isHomeowner: true,
    roofType: "Tile",
    roofAge: "20 years",
    status: "Sent to CRM",
    interest: "Hot",
    caller: "Ibrahim Rashad",
    callerId: 3,
    timestamp: "2026-01-02T16:45:00",
    notes: "Roof needs complete replacement. Very interested in solar package deal. Budget-conscious but motivated.",
    sentToCRM: true,
    crmStatus: "pending",
    pendingSince: null,
    followUpRequested: false,
    flagged: false,
    callDuration: "7m 23s",
    callRecordingUrl: "#",
  },
];

// === Activity Log ===
export const ACTIVITY_LOG = [
  { 
    id: 1, 
    type: "lead_generated", 
    message: "Hot lead generated by Youssef Shawky", 
    details: "Robert Fox - Miami, FL",
    time: "10 mins ago",
    timestamp: "2026-01-03T10:30:00",
  },
  { 
    id: 2, 
    type: "appointment_set", 
    message: "Appointment confirmed for Eleanor Pena", 
    details: "Tomorrow at 10:00 AM",
    time: "25 mins ago",
    timestamp: "2026-01-03T10:15:00",
  },
  { 
    id: 3, 
    type: "lead_accepted", 
    message: "Lead accepted by Bison team", 
    details: "Cameron Williamson",
    time: "45 mins ago",
    timestamp: "2026-01-03T09:55:00",
  },
  { 
    id: 4, 
    type: "call_completed", 
    message: "Call completed by Ibrahim Rashad", 
    details: "Duration: 5m 23s",
    time: "1 hour ago",
    timestamp: "2026-01-03T09:40:00",
  },
  { 
    id: 5, 
    type: "caller_status", 
    message: "Ibrahim Rashad went on break", 
    details: null,
    time: "1h 15m ago",
    timestamp: "2026-01-03T09:25:00",
  },
  { 
    id: 6, 
    type: "system", 
    message: "Daily performance report generated", 
    details: "View report",
    time: "2 hours ago",
    timestamp: "2026-01-03T08:40:00",
  },
  { 
    id: 7, 
    type: "crm_sync", 
    message: "CRM sync completed successfully", 
    details: "4 leads pushed",
    time: "3 hours ago",
    timestamp: "2026-01-03T07:40:00",
  },
];

// === Messages (Internal Messaging System) ===
export const MESSAGES = [
  {
    id: 1,
    from: {
      id: 1,
      name: "Youssef Shawky",
      role: USER_ROLES.CALLER,
      avatar: "SJ",
    },
    to: {
      id: 10,
      name: "Televista Ops",
      role: USER_ROLES.TELEVISTA_MANAGEMENT,
      avatar: "TO",
    },
    subject: "Quality check on lead #103",
    message: "Hi, the homeowner Jerome Bell seems very motivated. He has an active leak and mentioned wanting someone out ASAP. Can we flag this as priority?",
    leadId: 103,
    priority: "urgent",
    read: true,
    readAt: "2026-01-03T09:20:00",
    timestamp: "2026-01-03T09:15:00",
    thread: [],
  },
  {
    id: 2,
    from: {
      id: 10,
      name: "Televista Ops",
      role: USER_ROLES.TELEVISTA_MANAGEMENT,
      avatar: "TO",
    },
    to: {
      id: 1,
      name: "John Mitchell",
      role: USER_ROLES.BISON_OWNER,
      avatar: "JM",
    },
    subject: "Weekly Performance Summary",
    message: "Great week! We've exceeded the lead target by 12%. Youssef is performing exceptionally well with an 11.9% conversion rate. Recommend considering adding a 4th caller to handle increased volume.",
    leadId: null,
    priority: "normal",
    read: false,
    readAt: null,
    timestamp: "2026-01-03T08:00:00",
    thread: [],
  },
  {
    id: 3,
    from: {
      id: 1,
      name: "John Mitchell",
      role: USER_ROLES.BISON_OWNER,
      avatar: "JM",
    },
    to: {
      id: 10,
      name: "Televista Ops",
      role: USER_ROLES.TELEVISTA_MANAGEMENT,
      avatar: "TO",
    },
    subject: "Re: Lead quality feedback",
    message: "The last batch of leads from Tampa area have been converting really well. Please focus more efforts on that zip code range.",
    leadId: null,
    priority: "normal",
    read: true,
    readAt: "2026-01-02T16:45:00",
    timestamp: "2026-01-02T16:30:00",
    thread: [],
  },
];

// === CRM Integration Log ===
export const CRM_DELIVERY_LOG = [
  {
    id: 1,
    leadId: 102,
    leadName: "Eleanor Pena",
    status: "delivered",
    sentAt: "2026-01-03T09:46:00",
    deliveredAt: "2026-01-03T09:46:02",
    retryCount: 0,
    webhookResponse: { status: 200, message: "Success" },
  },
  {
    id: 2,
    leadId: 104,
    leadName: "Cameron Williamson",
    status: "delivered",
    sentAt: "2026-01-03T08:31:00",
    deliveredAt: "2026-01-03T08:31:01",
    retryCount: 0,
    webhookResponse: { status: 200, message: "Success" },
  },
  {
    id: 3,
    leadId: 106,
    leadName: "Wade Warren",
    status: "pending",
    sentAt: "2026-01-02T16:46:00",
    deliveredAt: null,
    retryCount: 2,
    webhookResponse: { status: 503, message: "Service temporarily unavailable" },
  },
];

// === Geo Data (Leads by Location) ===
export const GEO_DATA = {
  byCity: [
    { city: "Miami", state: "FL", leads: 42, appointments: 18, conversion: "42.8%" },
    { city: "Fort Lauderdale", state: "FL", leads: 28, appointments: 14, conversion: "50.0%" },
    { city: "Tampa", state: "FL", leads: 35, appointments: 12, conversion: "34.3%" },
    { city: "Orlando", state: "FL", leads: 22, appointments: 10, conversion: "45.5%" },
    { city: "Jacksonville", state: "FL", leads: 18, appointments: 6, conversion: "33.3%" },
    { city: "St. Petersburg", state: "FL", leads: 24, appointments: 11, conversion: "45.8%" },
    { city: "Hialeah", state: "FL", leads: 15, appointments: 5, conversion: "33.3%" },
    { city: "Tallahassee", state: "FL", leads: 12, appointments: 4, conversion: "33.3%" },
  ],
  byZip: [
    { zip: "33131", city: "Miami", leads: 12, heatLevel: "hot" },
    { zip: "33301", city: "Fort Lauderdale", leads: 15, heatLevel: "hot" },
    { zip: "33606", city: "Tampa", leads: 18, heatLevel: "hot" },
    { zip: "32819", city: "Orlando", leads: 10, heatLevel: "warm" },
    { zip: "32204", city: "Jacksonville", leads: 8, heatLevel: "warm" },
    { zip: "33701", city: "St. Petersburg", leads: 11, heatLevel: "warm" },
    { zip: "33012", city: "Hialeah", leads: 6, heatLevel: "cold" },
    { zip: "32301", city: "Tallahassee", leads: 5, heatLevel: "cold" },
  ],
};

// === SLA Configuration & Tracking ===
export const SLA_CONFIG = {
  minCallsPerDay: 50,
  minLeadsPerDay: 3,
  maxPendingLeadTime: 2, // hours
  targetConversionRate: 8, // percent
  targetAppointmentRate: 40, // percent
  escalationThreshold: 3, // misses before alert
  complianceTarget: "95%", // target compliance percentage
};

export const SLA_TRACKING = {
  today: {
    callsTarget: 150,
    callsActual: 164,
    callsCompliance: true,
    leadsTarget: 12,
    leadsActual: 17,
    leadsCompliance: true,
    pendingLeadsOverdue: 1,
    avgResponseTime: "42 mins",
    targetResponseTime: "60 mins",
    responseCompliance: true,
  },
  callerCompliance: [
    { callerId: 1, name: "Youssef Shawky", compliant: true, callsMet: true, leadsMet: true },
    { callerId: 2, name: "Micheal Wassim", compliant: true, callsMet: true, leadsMet: true },
    { callerId: 3, name: "Ibrahim Rashad", compliant: false, callsMet: false, leadsMet: true, reason: "5 calls below target" },
  ],
};

// === Weekly Performance Data (for charts) ===
export const WEEKLY_CALLS = [
  { day: "Mon", date: "Dec 28", calls: 142, leads: 14, appointments: 6 },
  { day: "Tue", date: "Dec 29", calls: 156, leads: 18, appointments: 8 },
  { day: "Wed", date: "Dec 30", calls: 148, leads: 16, appointments: 7 },
  { day: "Thu", date: "Dec 31", calls: 98, leads: 10, appointments: 5 },
  { day: "Fri", date: "Jan 1", calls: 45, leads: 4, appointments: 2 },
  { day: "Sat", date: "Jan 2", calls: 82, leads: 8, appointments: 4 },
  { day: "Sun", date: "Jan 3", calls: 164, leads: 17, appointments: 9 },
];

export const MONTHLY_TREND = [
  { month: "Aug", calls: 2890, leads: 298, appointments: 124 },
  { month: "Sep", calls: 3120, leads: 324, appointments: 142 },
  { month: "Oct", calls: 3456, leads: 356, appointments: 158 },
  { month: "Nov", calls: 3210, leads: 342, appointments: 152 },
  { month: "Dec", calls: 3580, leads: 378, appointments: 168 },
  { month: "Jan", calls: 835, leads: 84, appointments: 42 },
];

// === Conversion Funnel Data ===
export const FUNNEL_DATA = {
  weekly: {
    totalCalls: 835,
    contactsMade: 418,
    contactRate: "50.1%",
    leadsGenerated: 84,
    leadRate: "20.1%",
    appointmentsSet: 42,
    appointmentRate: "50.0%",
    dealsWon: 18,
  },
  monthly: {
    totalCalls: 3240,
    contactsMade: 1620,
    contactRate: "50.0%",
    leadsGenerated: 324,
    leadRate: "20.0%",
    appointmentsSet: 162,
    appointmentRate: "50.0%",
    dealsWon: 72,
  },
  // Visual funnel stages for charts
  stages: [
    { stage: "Total Calls", value: 835, color: "#3b82f6" },
    { stage: "Contacts Made", value: 418, color: "#8b5cf6" },
    { stage: "Leads Generated", value: 84, color: "#3b82f6" },
    { stage: "Appointments Set", value: 42, color: "#10b981" },
    { stage: "Deals Won", value: 18, color: "#059669" },
  ],
};

// === Call Quality Tags ===
export const CALL_QUALITY_TAGS = [
  { id: 1, label: "Great Objection Handling", color: "emerald" },
  { id: 2, label: "Excellent Rapport", color: "blue" },
  { id: 3, label: "Needs Improvement", color: "amber" },
  { id: 4, label: "Script Deviation", color: "rose" },
  { id: 5, label: "Strong Close", color: "violet" },
];

// === System Status ===
export const SYSTEM_STATUS = {
  crmConnection: {
    status: "connected",
    lastSync: "2026-01-03T10:35:00",
    pendingDeliveries: 1,
    failedDeliveries: 0,
  },
  dialerStatus: {
    status: "active",
    activeLines: 2,
    totalLines: 3,
  },
  webhookHealth: {
    status: "healthy",
    uptime: "99.9%",
    lastError: null,
  },
};

// === Quick Stats for Header ===
export const QUICK_STATS = {
  currentTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  timezone: 'MST',
  unreadMessages: 1,
  pendingLeads: 3,
  activeAlerts: 1,
};

// === Report Templates ===
export const REPORT_TEMPLATES = [
  { id: 1, name: "Daily Summary", type: "daily", lastGenerated: "Today, 8:00 AM" },
  { id: 2, name: "Weekly Performance", type: "weekly", lastGenerated: "Dec 29, 2025" },
  { id: 3, name: "Monthly Executive", type: "monthly", lastGenerated: "Dec 1, 2025" },
  { id: 4, name: "Caller Metrics", type: "custom", lastGenerated: "Dec 28, 2025" },
  { id: 5, name: "Lead Quality Analysis", type: "custom", lastGenerated: "Dec 27, 2025" },
];

// === Leaderboard Data ===
export const LEADERBOARD = {
  today: [
    { rank: 1, callerId: 1, name: "Youssef Shawky", leads: 8, calls: 67, badge: "🔥" },
    { rank: 2, callerId: 2, name: "Micheal Wassim", leads: 5, calls: 52, badge: null },
    { rank: 3, callerId: 3, name: "Ibrahim Rashad", leads: 4, calls: 45, badge: null },
  ],
  week: [
    { rank: 1, callerId: 1, name: "Youssef Shawky", leads: 34, calls: 312, badge: "👑" },
    { rank: 2, callerId: 2, name: "Micheal Wassim", leads: 28, calls: 278, badge: "🌟" },
    { rank: 3, callerId: 3, name: "Ibrahim Rashad", leads: 22, calls: 245, badge: null },
  ],
  month: [
    { rank: 1, callerId: 1, name: "Youssef Shawky", leads: 142, calls: 1245, badge: "🏆" },
    { rank: 2, callerId: 2, name: "Micheal Wassim", leads: 118, calls: 1089, badge: null },
    { rank: 3, callerId: 3, name: "Ibrahim Rashad", leads: 95, calls: 978, badge: null },
  ],
};

// === Settings Configuration ===
export const SETTINGS = {
  notifications: {
    newLead: true,
    leadAccepted: true,
    slaWarning: true,
    dailyReport: true,
    weeklyReport: true,
  },
  emailNotifications: {
    newLeadAlert: true,
    leadAccepted: true,
    dailySummary: true,
    weeklySummary: true,
    slaWarnings: true,
    systemAlerts: false,
  },
  pushNotifications: {
    newLeadAlert: true,
    leadAccepted: true,
    callerStatusChange: true,
    urgentMessages: true,
    slaWarnings: true,
  },
  sla: {
    minCallsPerDay: 50,
    minLeadsPerDay: 3,
    maxPendingHours: 2,
    workingHours: { start: "8:00 AM", end: "6:00 PM" },
  },
  crm: {
    webhookUrl: "https://bison-crm.example.com/api/leads",
    apiKey: "••••••••••••••••",
    autoRetry: true,
    maxRetries: 3,
  },
  display: {
    theme: "light",
    compactMode: false,
    showCostPerLead: true,
  },
};
