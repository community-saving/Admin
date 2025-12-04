import exportToPDF from './exportToPDF';

// Test data
const testData = [
  {
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890"
    },
    totalDeposits: 5000,
    totalLoans: 2000,
    paidLoansCount: 1,
    unpaidLoansCount: 1,
    deposits: [
      {
        amount: 3000,
        timestamp: new Date('2023-01-15')
      },
      {
        amount: 2000,
        timestamp: new Date('2023-02-20')
      }
    ],
    loans: [
      {
        amount: 1000,
        timestamp: new Date('2023-03-10'),
        paymentStatus: "approved"
      },
      {
        amount: 1000,
        timestamp: new Date('2023-04-05'),
        paymentStatus: "pending"
      }
    ]
  },
  {
    user: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+0987654321"
    },
    totalDeposits: 7500,
    totalLoans: 3000,
    paidLoansCount: 2,
    unpaidLoansCount: 0,
    deposits: [
      {
        amount: 4000,
        timestamp: new Date('2023-01-10')
      },
      {
        amount: 3500,
        timestamp: new Date('2023-02-25')
      }
    ],
    loans: [
      {
        amount: 1500,
        timestamp: new Date('2023-03-15'),
        paymentStatus: "approved"
      },
      {
        amount: 1500,
        timestamp: new Date('2023-04-10'),
        paymentStatus: "approved"
      }
    ]
  }
];

// Test the exportToPDF function
const testExportToPDF = () => {
  try {
    const result = exportToPDF(testData, 2023);
    console.log("PDF export result:", result);
  } catch (error) {
    console.error("Error testing PDF export:", error);
  }
};

export default testExportToPDF;