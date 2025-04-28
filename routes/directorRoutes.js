const express = require("express");
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login'); // Redirect to login page if not authenticated
};

const router = express.Router();

const Sale = require("../models/Sale");
const Produce = require("../models/Procurement");

router.get("/directorDash", isAuthenticated, async (req, res) => {
  if (req.user.role === "director") {
   
    try {
      // Expenses for buying produce
      let totalCostBeans = await Produce.aggregate([
        { $match: { producename: "beans" } },
        { $group: {
            _id: null,
            totalQuantity: { $sum: "$tonnage" },
            totalCost: { $sum: { $multiply: ["$unitprice", "$tonnage"] } }
          }
        }
      ]);

      let totalCostGrains = await Produce.aggregate([
        { $match: { producename: "grains" } },
        { $group: {
            _id: null,
            totalQuantity: { $sum: "$tonnage" },
            totalCost: { $sum: { $multiply: ["$unitprice", "$tonnage"] } }
          }
        }
      ]);

      let totalCostMaize = await Produce.aggregate([
        { $match: { producename: "maize" } },
        { $group: {
            _id: null,
            totalQuantity: { $sum: "$tonnage" },
            totalCost: { $sum: { $multiply: ["$unitprice", "$tonnage"] } }
          }
        }
      ]);

      let totalCostCowPeas = await Produce.aggregate([
        { $match: { producename: "cowpeas" } },
        { $group: {
            _id: null,
            totalQuantity: { $sum: "$tonnage" },
            totalCost: { $sum: { $multiply: ["$unitprice", "$tonnage"] } }
          }
        }
      ]);

      let totalCostSoyBeans = await Produce.aggregate([
        { $match: { producename: "soybeans" } },
        { $group: {
            _id: null,
            totalQuantity: { $sum: "$tonnage" },
            totalCost: { $sum: { $multiply: ["$unitprice", "$tonnage"] } }
          }
        }
      ]);

      let totalCostGnuts = await Produce.aggregate([
        { $match: { producename: "gnuts" } },
        { $group: {
            _id: null,
            totalQuantity: { $sum: "$tonnage" },
            totalCost: { $sum: { $multiply: ["$unitprice", "$tonnage"] } }
          }
        }
      ]);

      totalCostBeans = totalCostBeans[0] ?? { totalQuantity: 0, totalCost: 0 };
      totalCostGrains = totalCostGrains[0] ?? { totalQuantity: 0, totalCost: 0 };
      totalCostMaize = totalCostMaize[0] ?? { totalQuantity: 0, totalCost: 0 };
      totalCostCowPeas = totalCostCowPeas[0] ?? { totalQuantity: 0, totalCost: 0 };
      totalCostSoyBeans = totalCostSoyBeans[0] ?? { totalQuantity: 0, totalCost: 0 };
      totalCostGnuts = totalCostGnuts[0] ?? { totalQuantity: 0, totalCost: 0 };

      // Revenues from selling produce
      // Fix: Need to join with the produce collection, not the sales collection
      let totalRevBeans = await Sale.aggregate([
        { $lookup: {
            from: "produces", // Collection name for Produce (make sure this is correct)
            localField: "producename",
            foreignField: "_id",
            as: "produceDetails"
          }
        },
        { $unwind: "$produceDetails" },
        { $match: { "produceDetails.producename": "beans" } },
        { $group: {
            _id: "$produceDetails.producename",
            totalQuantity: { $sum: "$tonnage" },
            totalAmountPaid: { $sum: "$amountpaid" }
          }
        }
      ]);

      let totalRevGrains = await Sale.aggregate([
        { $lookup: {
            from: "produces",
            localField: "producename",
            foreignField: "_id",
            as: "produceDetails"
          }
        },
        { $unwind: "$produceDetails" },
        { $match: { "produceDetails.producename": "grains" } },
        { $group: {
            _id: "$produceDetails.producename",
            totalQuantity: { $sum: "$tonnage" },
            totalAmountPaid: { $sum: "$amountpaid" }
          }
        }
      ]);

      let totalRevMaize = await Sale.aggregate([
        { $lookup: {
            from: "produces",
            localField: "producename",
            foreignField: "_id",
            as: "produceDetails"
          }
        },
        { $unwind: "$produceDetails" },
        { $match: { "produceDetails.producename": "maize" } },
        { $group: {
            _id: "$produceDetails.producename",
            totalQuantity: { $sum: "$tonnage" },
            totalAmountPaid: { $sum: "$amountpaid" }
          }
        }
      ]);

      let totalRevCowPeas = await Sale.aggregate([
        { $lookup: {
            from: "produces",
            localField: "producename",
            foreignField: "_id",
            as: "produceDetails"
          }
        },
        { $unwind: "$produceDetails" },
        { $match: { "produceDetails.producename": "cowpeas" } },
        { $group: {
            _id: "$produceDetails.producename",
            totalQuantity: { $sum: "$tonnage" },
            totalAmountPaid: { $sum: "$amountpaid" }
          }
        }
      ]);

      let totalRevSoyBeans = await Sale.aggregate([
        { $lookup: {
            from: "produces",
            localField: "producename",
            foreignField: "_id",
            as: "produceDetails"
          }
        },
        { $unwind: "$produceDetails" },
        { $match: { "produceDetails.producename": "soybeans" } },
        { $group: {
            _id: "$produceDetails.producename",
            totalQuantity: { $sum: "$tonnage" },
            totalAmountPaid: { $sum: "$amountpaid" }
          }
        }
      ]);

      let totalRevGnuts = await Sale.aggregate([
        { $lookup: {
            from: "produces",
            localField: "producename",
            foreignField: "_id",
            as: "produceDetails"
          }
        },
        { $unwind: "$produceDetails" },
        { $match: { "produceDetails.producename": "gnuts" } },
        { $group: {
            _id: "$produceDetails.producename",
            totalQuantity: { $sum: "$tonnage" },
            totalAmountPaid: { $sum: "$amountpaid" }
          }
        }
      ]);

      totalRevBeans = totalRevBeans[0] ?? { totalQuantity: 0, totalAmountPaid: 0 };
      totalRevGrains = totalRevGrains[0] ?? { totalQuantity: 0, totalAmountPaid: 0 };
      totalRevMaize = totalRevMaize[0] ?? { totalQuantity: 0, totalAmountPaid: 0 };
      totalRevCowPeas = totalRevCowPeas[0] ?? { totalQuantity: 0, totalAmountPaid: 0 };
      totalRevSoyBeans = totalRevSoyBeans[0] ?? { totalQuantity: 0, totalAmountPaid: 0 };
      totalRevGnuts = totalRevGnuts[0] ?? { totalQuantity: 0, totalAmountPaid: 0 };

      res.render("directorDashboard", {
        currentUser: req.session.user,
        totalCostBeans,
        totalCostGrains,
        totalCostMaize,
        totalCostCowPeas,
        totalCostSoyBeans,
        totalCostGnuts,
        totalRevBeans,
        totalRevGrains,
        totalRevMaize,
        totalRevCowPeas,
        totalRevSoyBeans,
        totalRevGnuts,
      });

    } catch (err) {
      res.status(400).send("Unable to find items in the db");
      console.error("Aggregation error:", err.message);
    }
  } else {
    res.status(403).send("Access denied. Director role required.");
  }
});

module.exports = router;