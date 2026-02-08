import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import RecruiterSidebar from '../components/RecruiterSidebar';

const Reports = () => {
  const [dateRange, setDateRange] = useState('30');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <RecruiterSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics & Reports</h1>
            <p className="text-gray-600">
              Deep dive into your recruitment pipeline and team performance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
            </select>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 text-sm">Average Rating</span>
              <svg
                className="w-5 h-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-4xl font-bold">4.2</p>
              <span className="text-gray-500">/5.0</span>
              <span className="text-green-600 text-sm font-semibold">
                +2.4%
              </span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-3 h-3 bg-blue-500 rounded-full"></div>
              ))}
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 text-sm">Offer Acceptance</span>
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <p className="text-4xl font-bold">88%</p>
              <span className="text-red-600 text-sm font-semibold">-1.2%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: '88%' }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 text-sm">Active Requisitions</span>
              <svg
                className="w-5 h-5 text-blue-500"
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
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-4xl font-bold">24</p>
              <span className="text-gray-500 text-sm">Stable</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 text-sm">Interviews Today</span>
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-4xl font-bold">12</p>
              <span className="text-green-600 text-sm font-semibold">+12%</span>
            </div>
            <p className="text-sm text-gray-600">NEXT: SR. DESIGNER (14:00)</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Time to Hire Trends */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Time to Hire Trends</h3>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
            <div className="h-64 flex items-end justify-between gap-4">
              {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'].map((month, i) => (
                <div key={month} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${(i + 1) * 40}px` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{month}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <span className="text-2xl font-bold">32d</span>
            </div>
          </div>

          {/* Application Sources */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Application Sources</h3>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="20"
                    strokeDasharray="113 251"
                    transform="rotate(-90 50 50)"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="20"
                    strokeDasharray="71 251"
                    strokeDashoffset="-113"
                    transform="rotate(-90 50 50)"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="20"
                    strokeDasharray="50 251"
                    strokeDashoffset="-184"
                    transform="rotate(-90 50 50)"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="20"
                    strokeDasharray="25 251"
                    strokeDashoffset="-234"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-3xl font-bold">1.2k</p>
                  <p className="text-sm text-gray-500">TOTAL</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">LinkedIn</span>
                </div>
                <span className="font-semibold">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Direct</span>
                </div>
                <span className="font-semibold">28%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm">Referral</span>
                </div>
                <span className="font-semibold">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Indeed</span>
                </div>
                <span className="font-semibold">10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Hires vs Goals */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-1">Total Hires vs Goals</h3>
            <p className="text-sm text-gray-600">
              Quarterly progress tracking against hiring targets.
            </p>
          </div>
          <div className="h-64 flex items-end justify-between gap-8">
            {[
              'WEEK 01',
              'WEEK 02',
              'WEEK 03',
              'WEEK 04',
              'WEEK 05',
              'WEEK 06',
            ].map((week, i) => (
              <div key={week} className="flex-1 flex flex-col items-center">
                <div className="w-full flex gap-2 items-end">
                  <div
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{ height: `${(i + 1) * 30}px` }}
                  ></div>
                  <div
                    className="flex-1 bg-gray-300 rounded-t"
                    style={{ height: `${(i + 1) * 35}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{week}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Actual Hires</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm">Monthly Goal</span>
            </div>
          </div>
        </div>

        {/* Top Requisitions Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">
              Top Requisitions by Performance
            </h3>
            <button className="text-blue-500 font-semibold hover:text-blue-600">
              View All
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3 font-semibold">JOB TITLE</th>
                <th className="pb-3 font-semibold">HIRING MANAGER</th>
                <th className="pb-3 font-semibold">AVG. TIME TO FILL</th>
                <th className="pb-3 font-semibold">COST PER HIRE</th>
                <th className="pb-3 font-semibold">STATUS</th>
                <th className="pb-3 font-semibold">PROGRESS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4 font-semibold">Senior Product Designer</td>
                <td className="py-4 text-gray-600">Sarah Jenkins</td>
                <td className="py-4 text-gray-600">24 days</td>
                <td className="py-4 text-gray-600">$4,200</td>
                <td className="py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">
                    ON TARGET
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">75%</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 font-semibold">Fullstack Engineer</td>
                <td className="py-4 text-gray-600">Marcus T.</td>
                <td className="py-4 text-gray-600">42 days</td>
                <td className="py-4 text-gray-600">$5,150</td>
                <td className="py-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold">
                    AT RISK
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: '30%' }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">30%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-4 font-semibold">Marketing Manager</td>
                <td className="py-4 text-gray-600">Lena Rivera</td>
                <td className="py-4 text-gray-600">18 days</td>
                <td className="py-4 text-gray-600">$3,800</td>
                <td className="py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">
                    ON TARGET
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: '90%' }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">90%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Reports;
