const main = require("../services/ai.service.js");
const express = require("express");

module.exports.getReview = async (req, res) => {
    const code = req.body.code; // Assuming the code is sent in the request body

    if (!code) {
        return res.status(400).json({ error: "Code is required" });
        }

  
    try {
      const response = await main(code);
      res.json({ result: response });
    } catch (error) {
      console.error("Error from AI service:", error.message);
      res.status(500).json({ error: "Failed to get AI response" });
    }
  };
  