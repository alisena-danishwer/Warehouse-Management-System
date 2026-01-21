const ActivityLog = require('../models/ActivityLog');

exports.getLogs = async (req, res) => {
  try {
    // Fetch all logs, newest first
    const logs = await ActivityLog.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};