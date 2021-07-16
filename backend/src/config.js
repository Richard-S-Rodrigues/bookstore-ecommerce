exports.ATLAS_ADMIN_PASSWORD = process.env.ATLAS_ADMIN_PASSWORD;

exports.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;


exports.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
exports.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;


exports.ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE || (15*60*1000); // 15 minutes
exports.REFRESH_TOKEN_LIFE = process.env.REFRESH_TOKEN_LIFE || (30*24*60*60*1000); // 30 days