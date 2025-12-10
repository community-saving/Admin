import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Users, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard = () => {
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalloans, setTotalloans] = useState(0);
  const [pendingloans, setPendingloans] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [depositsError, setDepositsError] = useState(false);
  const [loansError, setloansError] = useState(false);
  const [usersError, setUsersError] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Track screen size for responsive charts
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to format tooltip time
  const formatTooltipTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      hour12: true,
    });
  };

  // Function to fetch users 
  useEffect(() => {
    if (!db) {
      setUsersError('Firestore instance not available');
      setLoading(false);
      return;
    }
  
    const q = query(collection(db, 'users'));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        try {
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          
          // Sort users: those with createdAt first (descending), then those without createdAt
          const sortedData = data.sort((a, b) => {
            // If both have createdAt, sort by createdAt descending
            if (a.createdAt && b.createdAt) {
              return b.createdAt.toMillis() - a.createdAt.toMillis();
            }
            // If only a has createdAt, a comes first
            if (a.createdAt) {
              return -1;
            }
            // If only b has createdAt, b comes first
            if (b.createdAt) {
              return 1;
            }
            // If neither has createdAt, maintain relative order
            return 0;
          });
          
          setUsers(sortedData);
          setTotalUsers(sortedData.length);
          setLoading(false);
          setUsersError(false);
        } catch (err) {
          console.error('Error processing users snapshot:', err);
          setUsersError('Failed to process users data');
          setLoading(false);
        }
      },
      (err) => {
        console.error('Error fetching users:', err);
        if (err.code === 'permission-denied') {
          setUsersError('Permission denied. Check Firestore rules.');
        } else {
          setUsersError('Failed to load users: ' + (err.message || 'Unknown error'));
        }
        setLoading(false);
      }
    );
  
    return () => unsub();
  }, []);

  // Custom tooltip component with responsive styling
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isMobile = screenSize.width < 768;
      return (
        <div className={`bg-white border border-gray-200 shadow-lg rounded-md ${isMobile ? 'p-2' : 'p-4'}`}>
          <p className={`font-medium text-gray-900 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            {formatTooltipTime(data.timestamp)}
          </p>
          <p className={`text-indigo-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            Deposits: ${data.deposits.toFixed(2)}
          </p>
          <p className={`text-red-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            loans: ${data.loans.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Function to generate live scrolling data
  const generateLiveScrollingData = (deposits, loans, maxPoints = 20) => {
    const combined = [];

    deposits.forEach((d) => {
      const timestamp = d.timestamp?.toDate?.() || new Date(d.timestamp);
      combined.push({
        timestamp,
        name: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        deposits: Number(d.amount) || 0,
        loans: 0,
      });
    });

    loans.forEach((c) => {
      const timestamp = c.timestamp?.toDate?.() || new Date(c.timestamp);
      combined.push({
        timestamp,
        name: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        deposits: 0,
        loans: Number(c.amount) || 0,
      });
    });

    // Sort by timestamp
    combined.sort((a, b) => a.timestamp - b.timestamp);

    // Keep only the last 'maxPoints'
    return combined.slice(-maxPoints);
  };

  useEffect(() => {
    if (!db) {
      console.error('Firestore database instance not available');
      setDepositsError(true);
      setloansError(true);
      return;
    }

    // Store raw data for live chart
    let depositsData = [];
    let loansData = [];

    // Set up real-time listener for deposits
    const depositsQuery = query(collection(db, 'deposits'), orderBy('timestamp', 'desc'));
    const unsubscribeDeposits = onSnapshot(
      depositsQuery,
      (snapshot) => {
        try {
          let sum = 0;
          depositsData = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.amount) {
              sum += parseFloat(data.amount);
            }
            depositsData.push({
              id: doc.id,
              ...data,
              timestamp: data.timestamp
            });
          });
          setTotalDeposits(sum);
          setDepositsError(false);
          
          // Update chart data with live scrolling
          const liveData = generateLiveScrollingData(depositsData, loansData);
          setChartData(liveData);
          
          // Update recent activity
          setRecentActivity(prev => {
            const newActivity = depositsData.slice(0, 3).map(deposit => ({
              id: deposit.id,
              type: 'deposit',
              userId: deposit.userId,
              amount: deposit.amount,
              timestamp: deposit.timestamp?.toDate?.() || new Date()
            }));
            return [...newActivity, ...prev].slice(0, 6);
          });
        } catch (error) {
          console.error('Error processing deposits data:', error);
          setDepositsError(true);
        }
      },
      (error) => {
        console.error('Error fetching deposits:', error);
        setDepositsError(true);
      }
    );

    // Set up real-time listener for loans
    const loansQuery = query(collection(db, 'loans'), orderBy('timestamp', 'desc'));
    const unsubscribeloans = onSnapshot(
      loansQuery,
      (snapshot) => {
        try {
          let sum = 0;
          let pendingCount = 0;
          loansData = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.amount) {
              sum += parseFloat(data.amount);
            }
            if (data.status === 'pending') {
              pendingCount += 1;
            }
            loansData.push({
              id: doc.id,
              ...data,
              timestamp: data.timestamp
            });
          });
          setTotalloans(sum);
          setPendingloans(pendingCount);
          setloansError(false);
          
          // Update chart data with live scrolling
          const liveData = generateLiveScrollingData(depositsData, loansData);
          setChartData(liveData);
          
          // Update recent activity
          setRecentActivity(prev => {
            const newActivity = loansData.slice(0, 3).map(cashout => ({
              id: cashout.id,
              type: 'cashout',
              userId: cashout.userId,
              amount: cashout.amount,
              status: cashout.status,
              timestamp: cashout.timestamp?.toDate?.() || new Date()
            }));
            return [...newActivity, ...prev].slice(0, 6);
          });
        } catch (error) {
          console.error('Error processing loans data:', error);
          setloansError(true);
        }
      },
      (error) => {
        console.error('Error fetching loans:', error);
        setloansError(true);
      }
    );

    // Clean up listeners on component unmount
    return () => {
      unsubscribeDeposits();
      unsubscribeloans();
    };
  }, []);

  // Format currency values
  const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Stats cards
  const stats = [
    {
      id: 1,
      name: 'Total Deposits',
      value: depositsError ? 'N/A' : formatCurrency(totalDeposits),
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      iconColor: 'bg-indigo-500',
    },
    {
      id: 2,
      name: 'Total loans',
      value: loansError ? 'N/A' : formatCurrency(totalloans),
      change: '+8.2%',
      changeType: 'positive',
      icon: CreditCard,
      iconColor: 'bg-red-500',
    },
    {
      id: 3,
      name: 'Pending loans',
      value: loansError ? 'N/A' : pendingloans,
      change: '+3.1%',
      changeType: 'negative',
      icon: Activity,
      iconColor: 'bg-yellow-500',
    },
    {
      id: 4,
      name: 'Total Users',
      value: usersError ? 'N/A' : totalUsers,
      change: '+5.4%',
      changeType: 'positive',
      icon: Users,
      iconColor: 'bg-green-500',
    },
  ];

  // Determine responsive chart properties based on screen size
  const getChartProps = () => {
    const isMobile = screenSize.width < 768;
    const isTablet = screenSize.width >= 768 && screenSize.width < 1024;
    
    return {
      // Responsive margins
      margin: {
        top: isMobile ? 5 : 10,
        right: isMobile ? 10 : 30,
        left: isMobile ? 5 : 20,
        bottom: isMobile ? 10 : 5,
      },
      
      // Responsive font sizes
      tickFontSize: isMobile ? 8 : (isTablet ? 10 : 12),
      
      // Responsive tick settings
      interval: isMobile ? 'preserveStartEnd' : 0,
      minTickGap: isMobile ? 10 : 15,
      
      // Responsive bar settings
      barSize: isMobile ? 10 : 15,
      
      // Animation settings (optimized for mobile)
      animationDuration: isMobile ? 500 : 800,
      
      // Grid settings (simplified on mobile)
      gridStrokeDasharray: isMobile ? '2 2' : '3 3',
    };
  };

  const chartProps = getChartProps();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${stat.iconColor}`}>
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center">
              {stat.changeType === 'positive' ? (
                <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
              )}
              <span className={`ml-1 text-xs sm:text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
              <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-500">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Bar chart */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Live Transactions</h3>
          <div className="h-64 sm:h-80 overflow-x-auto">
            <ResponsiveContainer 
              width="100%" 
              height="100%"
              minWidth={300}
            >
              <BarChart
                data={chartData}
                margin={chartProps.margin}
              >
                <CartesianGrid strokeDasharray={chartProps.gridStrokeDasharray} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: chartProps.tickFontSize }}
                  interval={chartProps.interval}
                  minTickGap={chartProps.minTickGap}
                />
                <YAxis tick={{ fontSize: chartProps.tickFontSize }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="deposits" 
                  fill="#4f46e5" 
                  name="Deposits"
                  barSize={chartProps.barSize}
                  isAnimationActive={true}
                  animationDuration={chartProps.animationDuration}
                  animationEasing="ease-in-out"
                />
                <Bar 
                  dataKey="loans" 
                  fill="#ef4444" 
                  name="loans"
                  barSize={chartProps.barSize}
                  isAnimationActive={true}
                  animationDuration={chartProps.animationDuration}
                  animationEasing="ease-in-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line chart */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Transaction Trend</h3>
          <div className="h-64 sm:h-80 overflow-x-auto">
            <ResponsiveContainer 
              width="100%" 
              height="100%"
              minWidth={300}
            >
              <LineChart
                data={chartData}
                margin={chartProps.margin}
              >
                <CartesianGrid strokeDasharray={chartProps.gridStrokeDasharray} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: chartProps.tickFontSize }}
                  interval={chartProps.interval}
                  minTickGap={chartProps.minTickGap}
                />
                <YAxis tick={{ fontSize: chartProps.tickFontSize }} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="deposits" 
                  stroke="#4f46e5" 
                  activeDot={{ r: screenSize.width < 768 ? 4 : 8 }} 
                  name="Deposits"
                  strokeWidth={screenSize.width < 768 ? 1.5 : 2}
                  isAnimationActive={true}
                  animationDuration={chartProps.animationDuration}
                  animationEasing="ease-in-out"
                />
                <Line 
                  type="monotone" 
                  dataKey="loans" 
                  stroke="#ef4444" 
                  name="loans"
                  strokeWidth={screenSize.width < 768 ? 1.5 : 2}
                  isAnimationActive={true}
                  animationDuration={chartProps.animationDuration}
                  animationEasing="ease-in-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-medium text-gray-900">Recent Activity</h3>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User ID
                </th>
                <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {activity.type === 'deposit' ? (
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-100 flex items-center justify-center">
                            <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                          </div>
                        )}
                        <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-medium text-gray-900 capitalize">{activity.type}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {activity.userId || 'N/A'}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                      {formatCurrency(activity.amount || 0)}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      {activity.type === 'deposit' ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      ) : (
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          activity.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          activity.status === 'Accepted' ? 'bg-green-100 text-green-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {activity.status || 'Pending'}
                        </span>
                      )}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {formatDate(activity.timestamp)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-500">
                    No recent activity
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;