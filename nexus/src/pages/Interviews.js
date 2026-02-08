import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RecruiterSidebar from '../components/RecruiterSidebar';

const Interviews = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [view, setView] = useState('calendar');
  const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 24)); // October 24, 2023

  const todaysInterviews = [
    {
      id: 1,
      time: '09:30 AM',
      candidate: 'Sarah Jenkins',
      position: 'Product Designer',
      category: 'PRODUCT',
      categoryColor: 'bg-teal-100 text-teal-600',
      hasRoom: true,
    },
    {
      id: 2,
      time: '11:00 AM',
      candidate: 'Michael Chen',
      position: 'Senior Frontend Dev',
      category: 'ENGINEERING',
      categoryColor: 'bg-blue-100 text-blue-600',
      linkShared: true,
    },
    {
      id: 3,
      time: '02:15 PM',
      candidate: 'Emily Watson',
      position: 'Growth Lead',
      category: 'MARKETING',
      categoryColor: 'bg-purple-100 text-purple-600',
      hasRoom: true,
    },
  ];

  const monthName = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <RecruiterSidebar />

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Today's Agenda */}
        <div className="w-96 bg-white border-r border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 mb-1">
              TODAY'S AGENDA
            </h2>
            <p className="text-gray-600">October 24, 2023</p>
          </div>

          <div className="space-y-4">
            {todaysInterviews.map((interview) => (
              <div
                key={interview.id}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-bold ${interview.categoryColor}`}
                  >
                    {interview.category}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {interview.time}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {interview.candidate}
                    </p>
                    <p className="text-sm text-gray-600">
                      {interview.position}
                    </p>
                  </div>
                </div>

                {interview.hasRoom && (
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    Enter Room
                  </button>
                )}

                {interview.linkShared && (
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 flex items-center justify-center gap-2">
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
                    Link Shared
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Calendar View */}
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Interviews</h1>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Schedule New Interview
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg font-semibold ${view === 'calendar' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Calendar View
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold ${view === 'list' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              List View
            </button>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{monthName}</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50">
                  Today
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="text-sm text-gray-600">
                  Synced with Google Calendar
                </span>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                <div
                  key={day}
                  className="bg-gray-50 p-3 text-center text-sm font-semibold text-gray-600"
                >
                  {day}
                </div>
              ))}

              {[
                25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
                29,
              ].map((date, index) => (
                <div
                  key={index}
                  className={`bg-white p-4 min-h-24 ${date === 24 ? 'bg-blue-50 border-2 border-blue-500' : ''}`}
                >
                  <p
                    className={`text-sm font-semibold mb-2 ${date === 24 ? 'text-blue-600' : date > 23 ? 'text-gray-400' : 'text-gray-900'}`}
                  >
                    {date}
                  </p>
                  {date === 3 && (
                    <div className="text-xs">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">UI Design...</span>
                      </div>
                    </div>
                  )}
                  {date === 6 && (
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  )}
                  {date === 24 && (
                    <div className="text-xs">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-blue-600 font-semibold">
                          3 Interviews
                        </span>
                      </div>
                    </div>
                  )}
                  {date === 26 && (
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Scheduled Interview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Tentative</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Interviews;
