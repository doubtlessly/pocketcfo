import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// State interfaces
export interface Scenario {
  id: string;
  name: string;
  description: string;
  isBaseline: boolean;
  parameters: {
    headcount?: { role: string; salary: number; startMonth: number; onCost: number }[];
    pricing?: { plan: string; currentPrice: number; newPrice: number; change: number }[];
    seasonality?: { month: string; baseMultiplier: number; adjustedMultiplier: number }[];
    fx?: { nzdAudShare: number; audPriceIncrease: number; hedging: boolean };
    marketing?: { monthlySpend: number; seasonalBoost: number; channels: string[] };
    costs?: { category: string; monthlyAmount: number; change: number }[];
  };
  results: {
    runwayChange: number;
    breakEvenMonth: number;
    peakSeasonRevenue: number;
    cashflowImpact: number;
    riskFactors: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  kpiDeltas?: { name: string; from: number; to: number; unit: string }[];
  chartData?: any;
  actions?: string[];
  context?: {
    scenario?: string;
    timeframe?: string;
    assumptions?: string[];
  };
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messages: ChatMessage[];
  category?: 'runway' | 'seasonality' | 'pricing' | 'collections' | 'gst' | 'general';
}

export interface CollectionTask {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  daysOverdue: number;
  priority: 'low' | 'medium' | 'high';
  nextAction: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'escalated';
  notes: string[];
}

// Zustand store
interface AppState {
  // Scenarios
  scenarios: Scenario[];
  activeScenarioId: string | null;
  
  // Chat & Conversations
  conversations: Conversation[];
  activeConversationId: string | null;
  
  // Collections
  collectionTasks: CollectionTask[];
  
  // UI State
  currentPage: string;
  sidebarCollapsed: boolean;
  
  // Actions
  addScenario: (scenario: Omit<Scenario, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateScenario: (id: string, updates: Partial<Scenario>) => void;
  deleteScenario: (id: string) => void;
  setActiveScenario: (id: string | null) => void;
  
  addConversation: (conversation: Omit<Conversation, 'id' | 'timestamp'>) => void;
  updateConversation: (id: string, updates: Partial<Conversation>) => void;
  addMessageToConversation: (conversationId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setActiveConversation: (id: string | null) => void;
  
  addCollectionTask: (task: Omit<CollectionTask, 'id'>) => void;
  updateCollectionTask: (id: string, updates: Partial<CollectionTask>) => void;
  
  setCurrentPage: (page: string) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      scenarios: [
        {
          id: 'baseline',
          name: 'Base Case',
          description: 'Current trajectory with planned summer marketing',
          isBaseline: true,
          parameters: {
            headcount: [
              { role: 'Customer Success Agent', salary: 55000, startMonth: 2, onCost: 4.45 },
            ],
            pricing: [
              { plan: 'Starter', currentPrice: 49, newPrice: 49, change: 0 },
              { plan: 'Growth', currentPrice: 149, newPrice: 149, change: 0 },
              { plan: 'Pro', currentPrice: 299, newPrice: 299, change: 0 },
            ],
            marketing: { monthlySpend: 12000, seasonalBoost: 25, channels: ['Google Ads', 'Facebook', 'Content'] },
          },
          results: {
            runwayChange: 0,
            breakEvenMonth: 18,
            peakSeasonRevenue: 94000,
            cashflowImpact: 0,
            riskFactors: ['Seasonal dependency', 'FX exposure'],
          },
          createdAt: '2024-12-01T00:00:00Z',
          updatedAt: '2024-12-29T00:00:00Z',
        },
        {
          id: 'peak-push',
          name: 'Peak Marketing Push',
          description: 'Aggressive marketing for summer season',
          isBaseline: false,
          parameters: {
            marketing: { monthlySpend: 15000, seasonalBoost: 50, channels: ['Google Ads', 'Facebook', 'Content', 'Influencer'] },
            costs: [{ category: 'Marketing', monthlyAmount: 15000, change: 25 }],
          },
          results: {
            runwayChange: +0.7,
            breakEvenMonth: 16,
            peakSeasonRevenue: 118000,
            cashflowImpact: +8500,
            riskFactors: ['Higher burn in off-season', 'Marketing ROI dependency'],
          },
          createdAt: '2024-12-15T00:00:00Z',
          updatedAt: '2024-12-29T00:00:00Z',
        },
      ],
      activeScenarioId: 'baseline',
      
      conversations: [
        {
          id: 'initial',
          title: 'Runway with summer marketing boost',
          lastMessage: 'Front-loading marketing spend could extend runway by 0.7 months...',
          timestamp: '2024-12-29T14:30:00Z',
          category: 'seasonality',
          messages: [
            {
              id: '1',
              role: 'user',
              content: 'Should I increase marketing spend before peak season?',
              timestamp: '2024-12-29T14:28:00Z',
            },
            {
              id: '2',
              role: 'assistant',
              content: 'Great timing question! With NZ peak season starting in 6 weeks, front-loading marketing could significantly boost your summer bookings.\n\n**Analysis for +25% marketing spend (Dec-Feb):**\n- Additional monthly cost: +NZD 3,000\n- Expected booking increase: +15-20%\n- Net runway impact: +0.7 months\n- Break-even acceleration: 18 → 16 months\n\n**Seasonality advantage:**\nYour booking fee revenue typically jumps 45% in Dec-Jan. Capturing more of this peak window has outsized impact vs off-season spend.\n\n**Recommendation:** Increase spend now, then scale back in April when demand naturally drops.',
              timestamp: '2024-12-29T14:30:00Z',
              kpiDeltas: [
                { name: 'Runway', from: 6.8, to: 7.5, unit: 'months' },
                { name: 'Peak Revenue', from: 94000, to: 118000, unit: 'NZD' },
                { name: 'Marketing Spend', from: 12000, to: 15000, unit: 'NZD/month' },
              ],
              actions: ['Create Peak Marketing Scenario', 'Simulate ROI Impact', 'Export Summer Strategy'],
              context: {
                scenario: 'peak-push',
                timeframe: 'Dec 2024 - Mar 2025',
                assumptions: ['15% booking increase', '22% AU customer mix', 'Current churn rates maintained'],
              },
            },
          ],
        },
      ],
      activeConversationId: 'initial',
      
      collectionTasks: [],
      
      currentPage: '/',
      sidebarCollapsed: false,
      
      // Actions
      addScenario: (scenarioData) => {
        const newScenario: Scenario = {
          ...scenarioData,
          id: `scenario-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          scenarios: [...state.scenarios, newScenario],
        }));
      },
      
      updateScenario: (id, updates) => {
        set((state) => ({
          scenarios: state.scenarios.map((scenario) =>
            scenario.id === id
              ? { ...scenario, ...updates, updatedAt: new Date().toISOString() }
              : scenario
          ),
        }));
      },
      
      deleteScenario: (id) => {
        set((state) => ({
          scenarios: state.scenarios.filter((scenario) => scenario.id !== id),
          activeScenarioId: state.activeScenarioId === id ? null : state.activeScenarioId,
        }));
      },
      
      setActiveScenario: (id) => {
        set({ activeScenarioId: id });
      },
      
      addConversation: (conversationData) => {
        const newConversation: Conversation = {
          ...conversationData,
          id: `conv-${Date.now()}`,
          timestamp: new Date().toISOString(),
        };
        set((state) => ({
          conversations: [newConversation, ...state.conversations],
        }));
      },
      
      updateConversation: (id, updates) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === id ? { ...conv, ...updates, timestamp: new Date().toISOString() } : conv
          ),
        }));
      },
      
      addMessageToConversation: (conversationId, messageData) => {
        const newMessage: ChatMessage = {
          ...messageData,
          id: `msg-${Date.now()}`,
          timestamp: new Date().toISOString(),
        };
        
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, newMessage],
                  lastMessage: messageData.content.slice(0, 80) + '...',
                  timestamp: new Date().toISOString(),
                }
              : conv
          ),
        }));
      },
      
      setActiveConversation: (id) => {
        set({ activeConversationId: id });
      },
      
      addCollectionTask: (taskData) => {
        const newTask: CollectionTask = {
          ...taskData,
          id: `task-${Date.now()}`,
        };
        set((state) => ({
          collectionTasks: [...state.collectionTasks, newTask],
        }));
      },
      
      updateCollectionTask: (id, updates) => {
        set((state) => ({
          collectionTasks: state.collectionTasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        }));
      },
      
      setCurrentPage: (page) => {
        set({ currentPage: page });
      },
      
      toggleSidebar: () => {
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
      },
    }),
    {
      name: 'myob-pocket-cfo-store',
      // Only persist scenarios and conversations, not UI state
      partialize: (state) => ({
        scenarios: state.scenarios,
        conversations: state.conversations,
        collectionTasks: state.collectionTasks,
      }),
    }
  )
);
