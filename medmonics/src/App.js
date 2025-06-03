import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import FlashcardQuiz from './components/FlashcardQuiz';
import EditMnemonic from './components/EditMnemonic';
import { mockAuth, mockMnemonics } from './utils/mockData';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [mnemonics, setMnemonics] = useState(mockMnemonics);
  const [editingMnemonic, setEditingMnemonic] = useState(null);
  const [isNewMnemonic, setIsNewMnemonic] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    if (mockAuth.currentUser) {
      setUser(mockAuth.currentUser);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const result = await mockAuth.signInWithEmailAndPassword(email, password);
      setUser(result.user);
      setCurrentPage('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleSignup = async (email, password) => {
    try {
      const result = await mockAuth.createUserWithEmailAndPassword(email, password);
      setUser(result.user);
      setCurrentPage('dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await mockAuth.signOut();
      setUser(null);
      setCurrentPage('login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleEditMnemonic = (mnemonic) => {
    setEditingMnemonic(mnemonic);
    setIsNewMnemonic(false);
    setCurrentPage('edit');
  };

  const handleAddMnemonic = () => {
    setEditingMnemonic(null);
    setIsNewMnemonic(true);
    setCurrentPage('edit');
  };

  const handleSaveMnemonic = async (mnemonicData) => {
    try {
      if (isNewMnemonic) {
        // Add new mnemonic
        const newMnemonic = {
          id: Date.now().toString(),
          ...mnemonicData
        };
        setMnemonics(prev => [...prev, newMnemonic]);
      } else {
        // Update existing mnemonic
        setMnemonics(prev => 
          prev.map(m => m.id === editingMnemonic.id ? { ...m, ...mnemonicData } : m)
        );
      }
      setCurrentPage('dashboard');
      setEditingMnemonic(null);
      setIsNewMnemonic(false);
    } catch (error) {
      console.error('Save failed:', error);
      throw error;
    }
  };

  const handleStartQuiz = () => {
    if (mnemonics.length > 0) {
      setCurrentPage('quiz');
    }
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setEditingMnemonic(null);
    setIsNewMnemonic(false);
  };

  // Render current page
  switch (currentPage) {
    case 'login':
      return (
        <LoginPage 
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      );

    case 'dashboard':
      return (
        <div className="relative">
          <Dashboard
            mnemonics={mnemonics}
            onEdit={handleEditMnemonic}
            onStartQuiz={handleStartQuiz}
            user={user}
            onLogout={handleLogout}
          />
          <button
            onClick={handleAddMnemonic}
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            title="Add new mnemonic"
          >
            <Plus className="h-6 w-6 mx-auto" />
          </button>
        </div>
      );

    case 'quiz':
      return (
        <FlashcardQuiz
          mnemonics={mnemonics}
          onBack={handleBackToDashboard}
        />
      );

    case 'edit':
      return (
        <EditMnemonic
          mnemonic={editingMnemonic}
          onSave={handleSaveMnemonic}
          onCancel={handleBackToDashboard}
          isNew={isNewMnemonic}
        />
      );

    default:
      return null;
  }
};

export default App;