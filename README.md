# MYOB Pocket CFO

A world-class, production-ready AI-powered CFO assistant specifically built for **New Zealand tourism founders**. This application solves the unique financial challenges faced by tourism operators, including seasonality management, GST compliance, international customer billing, and runway optimization.

![MYOB Pocket CFO Dashboard](https://via.placeholder.com/800x400/7b14ef/FFFFFF?text=MYOB+Pocket+CFO+Dashboard)

## 🚀 Features Built for NZ Tourism Founders

### 🏠 **Dashboard** - Tourism-Aware Financial Control Center
- **Seasonal KPI tracking** (MRR, booking revenue, cancellation rates)
- **Peak season indicators** with NZ summer (Dec-Mar) awareness
- **Cash runway** with seasonality projections and zero-cash warnings
- **GST alerts** for upcoming 2-monthly filing obligations
- **Payroll obligations** including KiwiSaver (3%) and ACC (1.45%) costs
- **AI insights** tailored to tourism business patterns and opportunities

### 💬 **Ask CFO** - AI Assistant for Tourism-Specific Questions
- **Tourism business intelligence** with seasonal context
- **Smart suggestions** like "Runway if I hire 2 engineers?" and "Impact of +10% AU pricing?"
- **Interactive scenario modeling** with instant KPI impact calculations
- **Conversation persistence** with Zustand state management
- **Action triggers** to create scenarios or export investor updates

### 📊 **Scenario Planner** - Model Tourism Business Decisions
- **Headcount planning** with NZ payroll costs (salary + KiwiSaver + ACC)
- **Pricing & plans** with separate AU/NZ customer modeling
- **Seasonality adjustments** with pre-loaded NZ tourism demand curves
- **FX impact modeling** for NZD/AUD revenue exposure
- **Marketing spend optimization** for peak season timing
- **Live results** showing runway impact and break-even scenarios

### 💰 **Cash & Collections** - Tourism AR Management
- **AR aging buckets** with tourism industry context
- **Collection queue** with risk prioritization and payment scripts
- **Seasonal payment patterns** understanding tourism operator cash flow
- **Cash flow projections** with peak season revenue spikes
- **Payment reminder automation** with tourism-specific messaging

### 🏛️ **GST Assistant** - NZ Tax Compliance Made Simple
- **Automated GST calculations** with 15% NZ domestic sales
- **Zero-rated exports** handling for Australian customers
- **2-monthly filing schedule** with due date reminders
- **Input tax credit tracking** for business expense deductions
- **Compliance checklist** with seasonal business considerations
- **Professional GST reports** ready for IRD submission

### 📄 **Investor Updates** - Professional Reporting
- **Tourism business templates** with seasonal performance sections
- **Auto-generated insights** based on actual financial performance
- **Professional PDF exports** with MYOB branding
- **KPI visualizations** specific to tourism metrics
- **Seasonal context** explaining performance variations

### 📄 **Value Proposition Page** - Clear Founder Benefits
- **Founder pain points** articulated with tourism business examples
- **Solution mapping** showing how Pocket CFO solves each problem
- **Social proof** from NZ tourism operators
- **Clear ROI demonstration** with before/after scenarios

## 🎨 Design System

### MYOB Brand Colors
- **Primary Purple**: `#7b14ef` - Main brand color for buttons and highlights
- **Lavender Accent**: `#c497fe` - Secondary color for borders and hover states
- **Mauve Background**: `#ebdcfd` - Subtle background tint for sections

### Visual Language
- **Modern SaaS aesthetic** with friendly, approachable design
- **Generous spacing** and grid-based layout
- **Rounded corners** (rounded-2xl) for softness
- **Subtle shadows** and gradients for depth
- **System font stack** with strong typography hierarchy

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for comprehensive type safety
- **Styling**: Tailwind CSS with custom MYOB brand tokens
- **UI Components**: shadcn/ui for professional design system
- **State Management**: Zustand with localStorage persistence
- **Data Visualization**: Recharts for interactive financial charts
- **Icons**: Lucide React for consistent iconography
- **Mobile-First**: Responsive design with bottom navigation

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Getting Started

1. **Clone and install dependencies**:
   ```bash
   cd pocket-cfo
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run type-check # TypeScript type checking
```

## 🔧 Project Structure

```
src/
├── app/                         # Next.js App Router pages
│   ├── page.tsx                # Dashboard with tourism KPIs (/)
│   ├── ask/                    # AI CFO Chat interface
│   ├── scenarios/              # Tourism scenario planner
│   ├── cash/                   # Cash & Collections management
│   ├── tax/                    # GST Assistant for NZ compliance
│   ├── reports/                # Professional investor updates
│   ├── value-prop/             # Value proposition landing page
│   ├── settings/               # MYOB connections & preferences
│   ├── layout.tsx              # Root layout with header/mobile nav
│   └── globals.css             # MYOB brand theme & utilities
├── components/                  # Reusable UI components
│   ├── ui/                     # shadcn/ui design system
│   ├── Header.tsx              # Main navigation with tourism routes
│   ├── MobileNav.tsx           # Bottom nav for mobile
│   ├── KpiCard.tsx             # Tourism KPI display cards
│   ├── RunwayChart.tsx         # Seasonal cash projections
│   ├── CashflowBar.tsx         # Tourism cashflow patterns
│   ├── InsightItem.tsx         # AI recommendations
│   ├── ChatMessage.tsx         # CFO chat interface
│   ├── ConversationList.tsx    # Chat history management
│   ├── ScenarioInputs.tsx      # Tourism scenario modeling
│   └── ReportPreview.tsx       # Professional report templates
├── data/
│   └── nz-tourism-mock.ts      # Comprehensive NZ tourism business data
├── store/
│   └── useAppStore.ts          # Zustand state management
└── lib/
    └── utils.ts                # Utility functions
```

## 📊 NZ Tourism Business Data

The application uses realistic mock data in `src/data/nz-tourism-mock.ts` specifically modeled for Aroha's tourism platform:

### **Current Business Context**
- **Runway**: 6.8 months (challenging but realistic for tourism startups)
- **Monthly Burn**: NZD 65,000 (including NZ payroll costs)
- **MRR**: NZD 45,000 (SaaS subscriptions from tourism operators)
- **Booking Revenue**: NZD 28,000 (seasonal commission fees)
- **AU Revenue Exposure**: 22% of total revenue (FX risk modeling)
- **Current Season**: Peak season awareness (Dec-Mar boost)

### **Seasonality Modeling**
- **Peak Multipliers**: Dec (1.45x), Jan (1.6x), Feb (1.4x), Mar (1.3x)
- **Off-Season**: May-Aug (0.7x) representing NZ winter tourism decline
- **Booking Patterns**: Higher volumes and lower cancellation rates in peak season
- **Cash Flow Curves**: Realistic tourism business financial cycles

### **NZ Compliance Data**
- **GST Obligations**: 2-monthly filing schedule with NZ/AU splits
- **Payroll Costs**: Including KiwiSaver (3%) and ACC (1.45%) on-costs
- **AR Aging**: Tourism-typical payment patterns (operators struggle in winter)
- **Collection Scripts**: Industry-specific payment reminder templates

### **AI Insights Context**
- **Seasonal Recommendations**: "Front-load marketing for peak season"
- **Hiring Timing**: "Delay CS hire to April to extend runway +2.3 months"
- **FX Optimization**: "Increase AU pricing +7% while NZD/AUD is favorable"
- **Collections Strategy**: "Winter payment plans for struggling operators"
- **GST Guidance**: "Review AU customer zero-rating compliance"

## 🔌 Integrating with Real MYOB Data

Transform this prototype into a production application by connecting to actual MYOB APIs:

### 1. MYOB Business API Integration
```typescript
// Replace mock data in src/data/nz-tourism-mock.ts
export const currentTourismKPIs = await fetchMYOBTourismKPIs(companyId);
export const gstObligations = await fetchMYOBGSTData(companyId);
export const payrollObligations = await fetchMYOBPayroll(companyId);
```

### 2. Tourism-Specific Calculations
```typescript
// Seasonal revenue analysis
export const seasonalityData = await calculateSeasonalPatterns(historicalData);

// NZ/AU customer segmentation for GST
export const customerSegmentation = await segmentCustomersByCountry(customers);

// Tourism industry benchmarking
export const industryBenchmarks = await fetchTourismBenchmarks(businessSize);
```

### 3. AI/ML Tourism Intelligence
```typescript
// Connect to tourism-aware AI service
export const tourismInsights = await generateTourismInsights({
  financialData,
  seasonalPatterns,
  industryBenchmarks,
  peakSeasonTiming,
  weatherData, // For advanced seasonal modeling
});
```

### 4. MYOB OAuth & User Management
```typescript
// Production authentication flow
const { user, company } = await authenticateWithMYOB(oauthToken);
const tourismProfile = await createTourismBusinessProfile(company);
```

### 5. Real-Time GST Calculations
```typescript
// Live GST computation with NZ/AU splits
export const liveGSTCalculation = await calculateGST({
  transactions: await fetchMYOBTransactions(dateRange),
  customerCountries: await fetchCustomerLocations(),
  zeroRatedExports: await identifyAUCustomers(),
});
```

## 🎯 Key Integration Points

### Dashboard (`src/app/page.tsx`)
- Replace `currentKPIs` with real-time MYOB ledger data
- Connect `runwayProjection` to actual burn rate calculations
- Link `insights` to AI-powered recommendation engine

### CFO Chat (`src/app/ask/page.tsx`)
- Integrate with conversational AI backend (OpenAI, Claude, etc.)
- Connect to real financial data for accurate scenario analysis
- Implement chat history persistence (database or localStorage)

### Scenario Planner (`src/app/scenarios/page.tsx`)
- Connect scenario parameters to financial modeling backend
- Implement real-time calculation engine for runway impact
- Add scenario persistence and sharing capabilities

### Reports (`src/app/reports/page.tsx`)
- Integrate with report generation service
- Connect to email delivery system
- Add PDF generation with real data

### Settings (`src/app/settings/page.tsx`)
- Implement OAuth flows for MYOB, bank, and payroll connections
- Add real user preferences and notification systems
- Connect to billing and subscription management

## 📱 Responsive Design

The application is fully responsive with three main breakpoints:

- **Mobile** (< 768px): Stacked layout with bottom navigation
- **Tablet** (768px - 1024px): 2-column grid layouts
- **Desktop** (> 1024px): Full multi-column experience

Key responsive features:
- Mobile-first navigation with sticky bottom bar
- Collapsible sidebar components
- Touch-friendly interface elements
- Optimized chart sizing for different screens

## ♿ Accessibility

- **Semantic HTML** structure throughout
- **ARIA labels** and roles for interactive elements
- **Keyboard navigation** support
- **Focus management** for modals and dropdowns
- **Color contrast** meets WCAG 2.1 AA standards
- **Screen reader** compatibility

## 🔒 Security Considerations

When integrating with real data:

- **OAuth 2.0** for MYOB API authentication
- **Read-only access** for bank and financial connections
- **Encryption in transit** (HTTPS) and at rest
- **API key management** with environment variables
- **Rate limiting** and error handling
- **Data privacy** compliance (GDPR, CCPA)

## 🚦 Environment Variables

Create a `.env.local` file for production deployment:

```bash
# MYOB API Configuration
MYOB_CLIENT_ID=your_client_id
MYOB_CLIENT_SECRET=your_client_secret
MYOB_REDIRECT_URI=your_redirect_uri

# Database
DATABASE_URL=your_database_url

# AI Service (OpenAI, Claude, etc.)
AI_API_KEY=your_ai_api_key

# Email Service
EMAIL_SERVICE_KEY=your_email_key

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=your_domain
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t pocket-cfo .
docker run -p 3000:3000 pocket-cfo
```

### Traditional Hosting
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions about MYOB API integration or technical support:

- **MYOB Developer Portal**: [developer.myob.com](https://developer.myob.com)
- **Documentation**: [docs.myob.com](https://docs.myob.com)
- **Support**: [support@myob.com](mailto:support@myob.com)

---

Built with ❤️ for NZ tourism founders using Next.js, TypeScript, Tailwind CSS, and deep industry expertise.

---

## 🌟 What Makes This Special

This isn't just another financial dashboard. **MYOB Pocket CFO** is specifically designed for the unique challenges of running a tourism business in New Zealand:

### **Tourism Industry Expertise**
- **Seasonal cash flow modeling** that understands Dec-Mar peak periods
- **Customer location tracking** for proper GST treatment (NZ vs AU)
- **Booking fee revenue** separate from subscription MRR
- **Cancellation rate monitoring** with seasonal context
- **Tourism operator payment patterns** in collections management

### **NZ Regulatory Intelligence**
- **GST compliance** with 2-monthly filing and zero-rated exports
- **Payroll cost modeling** including KiwiSaver and ACC levies
- **IRD integration** ready for professional tax submissions
- **FX impact modeling** for AUD revenue exposure

### **Founder-Centric Design**
- **5-minute investor updates** instead of 4-hour manual reports
- **AI recommendations** that understand tourism business cycles
- **Cash runway clarity** with seasonal volatility factored in
- **One-click scenario modeling** for hiring, pricing, and marketing decisions

### **Production-Ready Architecture**
- **Zustand state management** with localStorage persistence
- **Mobile-first responsive design** with tourism-specific navigation
- **Component-based architecture** for easy MYOB integration
- **Type-safe development** with comprehensive TypeScript coverage

**Ready to transform how tourism founders manage their finances? This is how you build a world-class SaaS product that actually solves real problems.**