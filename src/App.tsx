import React, { useState } from 'react';
import { F2Provider, useF2 } from './context/F2Context';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/doctor/WelcomeScreen';
import { DoctorSignupScreen } from './components/doctor/DoctorSignupScreen';
import { VerificationScreen } from './components/doctor/VerificationScreen';
import { VerificationResultScreen } from './components/doctor/VerificationResultScreen';
import { WalletHomeScreen } from './components/doctor/WalletHomeScreen';
import { DoctorFoodOrderingScreen } from './components/doctor/DoctorFoodOrderingScreen';
import { PaymentScreen } from './components/doctor/PaymentScreen';
import { WalletHistoryScreen } from './components/doctor/WalletHistoryScreen';
import { Phase2Screen } from './components/doctor/Phase2Screen';
import { MerchantPOSView } from './components/merchant/MerchantPOSView';
import { AdminConsoleView } from './components/admin/AdminConsoleView';
import { Phase2CRMView } from './components/crm/Phase2CRMView';
import { StrategyDocumentModal } from './components/strategy/StrategyDocumentModal';
import { DoctorIDCardModal } from './components/common/DoctorIDCardModal';
import { DoctorMobileShell } from './components/doctor/DoctorMobileShell';
import { AnimatePresence, motion } from 'motion/react';

const MainAppContent: React.FC = () => {
  const { activeView, doctorStep } = useF2();
  const [isStrategyOpen, setIsStrategyOpen] = useState(false);
  const [isIDCardOpen, setIsIDCardOpen] = useState(false);

  // Render Doctor Experience wireframe step 0-7 + Food ordering
  const renderDoctorStep = () => {
    switch (doctorStep) {
      case 'SCREEN_0_SIGNUP':
        return <DoctorSignupScreen />;
      case 'SCREEN_1_WELCOME':
        return <WelcomeScreen />;
      case 'SCREEN_2_VERIFICATION':
        return <VerificationScreen />;
      case 'SCREEN_3_RESULT':
        return <VerificationResultScreen />;
      case 'SCREEN_4_WALLET_HOME':
        return <WalletHomeScreen />;
      case 'SCREEN_FOOD_ORDERING':
        return <DoctorFoodOrderingScreen />;
      case 'SCREEN_5_PAYMENT':
        return <PaymentScreen />;
      case 'SCREEN_6_HISTORY':
        return <WalletHistoryScreen />;
      case 'SCREEN_7_PHASE2_CTA':
        return <Phase2Screen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] flex flex-col font-sans selection:bg-teal-600 selection:text-white">
      
      {/* Top Universal App Navigation Bar */}
      <Header 
        onOpenStrategy={() => setIsStrategyOpen(true)}
        onOpenDocCard={() => setIsIDCardOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView === 'DOCTOR_JOURNEY' ? `doctor-${doctorStep}` : activeView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeView === 'DOCTOR_JOURNEY' && (
              <DoctorMobileShell
                onOpenDocCard={() => setIsIDCardOpen(true)}
                onOpenStrategy={() => setIsStrategyOpen(true)}
              >
                {renderDoctorStep()}
              </DoctorMobileShell>
            )}
            {activeView === 'MERCHANT_POS' && <MerchantPOSView />}
            {activeView === 'ADMIN_CONSOLE' && <AdminConsoleView />}
            {activeView === 'PHASE2_CRM' && <Phase2CRMView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/80 py-6 text-center text-xs text-slate-500 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif-title font-bold text-teal-700">F2 FINTECH</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">White Coat Club Ecosystem</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <button onClick={() => setIsStrategyOpen(true)} className="hover:text-teal-700 font-medium transition-colors">
              PRD & Strategy
            </button>
            <span className="text-slate-300">•</span>
            <span>NMC / State Council Verification Protocol</span>
            <span className="text-slate-300">•</span>
            <span>RBI / Anti-Bribery Compliant</span>
          </div>
        </div>
      </footer>

      {/* Strategy PRD Modal */}
      <StrategyDocumentModal 
        isOpen={isStrategyOpen} 
        onClose={() => setIsStrategyOpen(false)} 
      />

      {/* Doctor ID Card Modal */}
      <DoctorIDCardModal 
        isOpen={isIDCardOpen} 
        onClose={() => setIsIDCardOpen(false)} 
      />

    </div>
  );
};

export default function App() {
  return (
    <F2Provider>
      <MainAppContent />
    </F2Provider>
  );
}
