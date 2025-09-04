const express = require("express");
const { OrderModel } = require("../Modal/order.module.js");
const { AuthModel } = require("../Modal/userauth.model.js");
const { ProductModel } = require("../Modal/product.module.js");
const { CartModel } = require("../Modal/Cart.module.js");
const { authorized } = require("../Middleware/authorization.js");

const dashboardController = express.Router();

// Apply authentication middleware to all routes
dashboardController.use(authorized);

// GET /dashboard/analytics - Get comprehensive dashboard analytics
dashboardController.get("/analytics", async (req, res) => {
  try {
    // Get current date and previous month for comparison
    const currentDate = new Date();
    const previousMonth = new Date();
    previousMonth.setMonth(currentDate.getMonth() - 1);

    // 1. Total Revenue Calculation
    const totalRevenueResult = await OrderModel.aggregate([
      { $match: { status: { $in: ["completed", "shipped", "delivered"] } } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          currentMonthRevenue: {
            $sum: {
              $cond: [
                { $gte: ["$createdAt", previousMonth] },
                "$totalAmount",
                0
              ]
            }
          },
          previousMonthRevenue: {
            $sum: {
              $cond: [
                { 
                  $and: [
                    { $lt: ["$createdAt", previousMonth] },
                    { $gte: ["$createdAt", new Date(previousMonth.getFullYear(), previousMonth.getMonth() - 1, 1)] }
                  ]
                },
                "$totalAmount",
                0
              ]
            }
          }
        }
      }
    ]);

    // 2. Total Orders Calculation
    const totalOrdersResult = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          currentMonthOrders: {
            $sum: {
              $cond: [
                { $gte: ["$createdAt", previousMonth] },
                1,
                0
              ]
            }
          },
          previousMonthOrders: {
            $sum: {
              $cond: [
                { 
                  $and: [
                    { $lt: ["$createdAt", previousMonth] },
                    { $gte: ["$createdAt", new Date(previousMonth.getFullYear(), previousMonth.getMonth() - 1, 1)] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    // 3. Total Users Calculation
    const totalUsersResult = await AuthModel.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          currentMonthUsers: {
            $sum: {
              $cond: [
                { $gte: ["$createdAt", previousMonth] },
                1,
                0
              ]
            }
          },
          previousMonthUsers: {
            $sum: {
              $cond: [
                { 
                  $and: [
                    { $lt: ["$createdAt", previousMonth] },
                    { $gte: ["$createdAt", new Date(previousMonth.getFullYear(), previousMonth.getMonth() - 1, 1)] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    // 4. Total Products Calculation
    const totalProductsResult = await ProductModel.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          currentMonthProducts: {
            $sum: {
              $cond: [
                { $gte: ["$createdAt", previousMonth] },
                1,
                0
              ]
            }
          },
          previousMonthProducts: {
            $sum: {
              $cond: [
                { 
                  $and: [
                    { $lt: ["$createdAt", previousMonth] },
                    { $gte: ["$createdAt", new Date(previousMonth.getFullYear(), previousMonth.getMonth() - 1, 1)] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    // 5. Recent Orders (Last 10 orders)
    const recentOrders = await OrderModel.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: 10 },
      {
        $project: {
          orderId: 1,
          userEmail: 1,
          totalAmount: 1,
          status: 1,
          createdAt: 1,
          items: { $size: "$items" }
        }
      }
    ]);

    // 6. Top Products (Most ordered products)
    const topProducts = await OrderModel.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          productName: { $first: "$items.productName" },
          totalSales: { $sum: "$items.quantity" },
          totalRevenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { totalSales: -1 } },
      { $limit: 10 },
      {
        $project: {
          productName: 1,
          totalSales: 1,
          totalRevenue: 1,
          orderCount: 1,
          averageOrderValue: { $divide: ["$totalRevenue", "$orderCount"] }
        }
      }
    ]);

    // 7. Order Status Distribution
    const orderStatusDistribution = await OrderModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // 8. Monthly Revenue Trend (Last 6 months)
    const monthlyRevenueTrend = await OrderModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1)
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          revenue: { $sum: "$totalAmount" },
          orders: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Calculate percentage changes
    const calculatePercentageChange = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    const totalRevenue = totalRevenueResult[0] || { totalRevenue: 0, currentMonthRevenue: 0, previousMonthRevenue: 0 };
    const totalOrders = totalOrdersResult[0] || { totalOrders: 0, currentMonthOrders: 0, previousMonthOrders: 0 };
    const totalUsers = totalUsersResult[0] || { totalUsers: 0, currentMonthUsers: 0, previousMonthUsers: 0 };
    const totalProducts = totalProductsResult[0] || { totalProducts: 0, currentMonthProducts: 0, previousMonthProducts: 0 };

    // Format the response
    const dashboardData = {
      success: true,
      data: {
        kpis: {
          totalRevenue: {
            value: totalRevenue.totalRevenue,
            change: calculatePercentageChange(totalRevenue.currentMonthRevenue, totalRevenue.previousMonthRevenue),
            currentMonth: totalRevenue.currentMonthRevenue,
            previousMonth: totalRevenue.previousMonthRevenue
          },
          totalOrders: {
            value: totalOrders.totalOrders,
            change: calculatePercentageChange(totalOrders.currentMonthOrders, totalOrders.previousMonthOrders),
            currentMonth: totalOrders.currentMonthOrders,
            previousMonth: totalOrders.previousMonthOrders
          },
          totalUsers: {
            value: totalUsers.totalUsers,
            change: calculatePercentageChange(totalUsers.currentMonthUsers, totalUsers.previousMonthUsers),
            currentMonth: totalUsers.currentMonthUsers,
            previousMonth: totalUsers.previousMonthUsers
          },
          totalProducts: {
            value: totalProducts.totalProducts,
            change: calculatePercentageChange(totalProducts.currentMonthProducts, totalProducts.previousMonthProducts),
            currentMonth: totalProducts.currentMonthProducts,
            previousMonth: totalProducts.previousMonthProducts
          }
        },
        recentOrders: recentOrders,
        topProducts: topProducts,
        orderStatusDistribution: orderStatusDistribution,
        monthlyTrend: monthlyRevenueTrend,
        generatedAt: new Date().toISOString()
      }
    };

    res.status(200).json(dashboardData);

  } catch (error) {
    console.error("Error fetching dashboard analytics:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard analytics",
      error: error.message
    });
  }
});

// GET /dashboard/summary - Get quick summary for dashboard cards
dashboardController.get("/summary", async (req, res) => {
  try {
    const currentDate = new Date();
    const previousMonth = new Date();
    previousMonth.setMonth(currentDate.getMonth() - 1);

    // Parallel execution of all queries for better performance
    const [
      revenueData,
      ordersData,
      usersData,
      productsData
    ] = await Promise.all([
      // Total Revenue
      OrderModel.aggregate([
        { $match: { status: { $in: ["completed", "shipped", "delivered"] } } },
        {
          $group: {
            _id: null,
            total: { $sum: "$totalAmount" },
            currentMonth: {
              $sum: {
                $cond: [
                  { $gte: ["$createdAt", previousMonth] },
                  "$totalAmount",
                  0
                ]
              }
            },
            previousMonth: {
              $sum: {
                $cond: [
                  { 
                    $and: [
                      { $lt: ["$createdAt", previousMonth] },
                      { $gte: ["$createdAt", new Date(previousMonth.getFullYear(), previousMonth.getMonth() - 1, 1)] }
                    ]
                  },
                  "$totalAmount",
                  0
                ]
              }
            }
          }
        }
      ]),
      // Total Orders
      OrderModel.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            currentMonth: {
              $sum: {
                $cond: [
                  { $gte: ["$createdAt", previousMonth] },
                  1,
                  0
                ]
              }
            },
            previousMonth: {
              $sum: {
                $cond: [
                  { 
                    $and: [
                      { $lt: ["$createdAt", previousMonth] },
                      { $gte: ["$createdAt", new Date(previousMonth.getFullYear(), previousMonth.getMonth() - 1, 1)] }
                    ]
                  },
                  1,
                  0
                ]
              }
            }
          }
        }
      ]),
      // Total Users
      AuthModel.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            currentMonth: {
              $sum: {
                $cond: [
                  { $gte: ["$createdAt", previousMonth] },
                  1,
                  0
                ]
              }
            },
            previousMonth: {
              $sum: {
                $cond: [
                  { 
                    $and: [
                      { $lt: ["$createdAt", previousMonth] },
                      { $gte: ["$createdAt", new Date(previousMonth.getFullYear(), previousMonth.getMonth() - 1, 1)] }
                    ]
                  },
                  1,
                  0
                ]
              }
            }
          }
        }
      ]),
      // Total Products
      ProductModel.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            currentMonth: {
              $sum: {
                $cond: [
                  { $gte: ["$createdAt", previousMonth] },
                  1,
                  0
                ]
              }
            },
            previousMonth: {
              $sum: {
                $cond: [
                  { 
                    $and: [
                      { $lt: ["$createdAt", previousMonth] },
                      { $gte: ["$createdAt", new Date(previousMonth.getFullYear(), previousMonth.getMonth() - 1, 1)] }
                    ]
                  },
                  1,
                  0
                ]
              }
            }
          }
        }
      ])
    ]);

    const calculatePercentageChange = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    const revenue = revenueData[0] || { total: 0, currentMonth: 0, previousMonth: 0 };
    const orders = ordersData[0] || { total: 0, currentMonth: 0, previousMonth: 0 };
    const users = usersData[0] || { total: 0, currentMonth: 0, previousMonth: 0 };
    const products = productsData[0] || { total: 0, currentMonth: 0, previousMonth: 0 };

    res.status(200).json({
      success: true,
      data: {
        totalRevenue: {
          value: revenue.total,
          change: calculatePercentageChange(revenue.currentMonth, revenue.previousMonth)
        },
        totalOrders: {
          value: orders.total,
          change: calculatePercentageChange(orders.currentMonth, orders.previousMonth)
        },
        totalUsers: {
          value: users.total,
          change: calculatePercentageChange(users.currentMonth, users.previousMonth)
        },
        totalProducts: {
          value: products.total,
          change: calculatePercentageChange(products.currentMonth, products.previousMonth)
        }
      }
    });

  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard summary",
      error: error.message
    });
  }
});

module.exports = dashboardController;
