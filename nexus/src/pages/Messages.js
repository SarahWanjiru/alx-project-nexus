import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RecruiterSidebar from '../components/RecruiterSidebar';

const Messages = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isRecruiter = user?.role === 'recruiter' || user?.role === 'admin';
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'HR Manager at Tech Solutions',
      avatar: '/api/placeholder/40/40',
      lastMessage: "I'll review your resume shortly...",
      time: '14:30',
      unread: 0,
      online: true,
    },
    {
      id: 2,
      name: 'Tech Solutions Inc.',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Are you available for an interview?',
      time: 'Yesterday',
      unread: 2,
      online: false,
    },
    {
      id: 3,
      name: 'Mark Stevens',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'The feedback was very positive!',
      time: 'Monday',
      unread: 0,
      online: false,
    },
    {
      id: 4,
      name: 'Global Dynamics',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Your application was submitted...',
      time: 'Oct 12',
      unread: 0,
      online: false,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'Sarah Jenkins',
      text: 'Hello Alex! Thank you for applying to the Senior Product Designer role. We were very impressed by your portfolio.',
      time: '14:20',
      isOwn: false,
    },
    {
      id: 2,
      sender: 'You',
      text: "Hi Sarah! Thank you so much for reaching out. I'm very excited about the opportunity at Tech Solutions. I've been following your company's growth for a while.",
      time: '14:25',
      isOwn: true,
    },
    {
      id: 3,
      sender: 'Sarah Jenkins',
      text: "That's great to hear. I'll review your resume shortly with the team. Do you have any updated case studies or your most recent portfolio link?",
      time: '14:30',
      isOwn: false,
    },
    {
      id: 4,
      sender: 'You',
      text: 'Absolutely! Here is my updated portfolio link and the PDF version of my latest case study for the Fintech app.',
      time: '14:35',
      isOwn: true,
      attachment: {
        name: 'Alex_Fintech_CS.pdf',
        size: '2.4 MB',
        type: 'PDF',
      },
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {isRecruiter ? (
        <RecruiterSidebar />
      ) : (
        <aside className="w-64 bg-teal-900 text-white flex flex-col">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <img
                src="/Nexus Connect.png"
                alt="Nexus Connect"
                className="w-10 h-10 rounded-xl shadow-lg object-cover"
              />
              <div>
                <h1 className="font-bold">Nexus Connect</h1>
                <p className="text-xs text-teal-300">JOB SEEKER</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-800 rounded-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Dashboard
              </button>
              <button
                onClick={() => navigate('/find-jobs')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-800 rounded-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                Find Jobs
              </button>
              <button
                onClick={() => navigate('/applications')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-800 rounded-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Applications
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-teal-800 rounded-lg relative">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Messages
                <span className="absolute right-4 w-2 h-2 bg-blue-400 rounded-full"></span>
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-800 rounded-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                Profile
              </button>
            </nav>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Conversations List */}
        <aside className="w-96 bg-white border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-teal-900">Messages</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold">
                All
              </button>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-semibold">
                Unread
              </button>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-semibold">
                Archived
              </button>
            </div>
          </div>

          <div className="overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedConversation?.id === conv.id ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                    </div>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-900 truncate">
                        {conv.name}
                      </h3>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        {selectedConversation ? (
          <main className="flex-1 flex flex-col">
            {/* Chat Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                    </div>
                    {selectedConversation.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {selectedConversation.name}
                    </h3>
                    <p className="text-sm text-green-600">
                      {selectedConversation.online ? 'Online' : 'Offline'}{' '}
                      {selectedConversation.role &&
                        `• ${selectedConversation.role}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <div className="text-center mb-6">
                <span className="px-4 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-semibold">
                  MONDAY, OCT 14
                </span>
              </div>

              <div className="space-y-4 max-w-4xl mx-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    {!msg.isOwn && (
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3 flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                      </div>
                    )}
                    <div
                      className={`max-w-xl ${msg.isOwn ? 'bg-blue-500 text-white' : 'bg-white text-gray-900'} rounded-2xl px-6 py-4`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      {msg.attachment && (
                        <div className="mt-3 bg-white rounded-lg p-3 flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-red-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">
                              {msg.attachment.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {msg.attachment.size} • {msg.attachment.type}
                            </p>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                      <p
                        className={`text-xs mt-2 ${msg.isOwn ? 'text-blue-100' : 'text-gray-500'}`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded font-bold text-gray-600">
                  B
                </button>
                <button className="p-2 hover:bg-gray-100 rounded italic text-gray-600">
                  I
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message or attach a file..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Send Resume
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Portfolio Link
                </button>
              </div>
            </div>
          </main>
        ) : (
          <main className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <svg
                className="w-24 h-24 text-gray-300 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default Messages;
