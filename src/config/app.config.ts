export default () => ({
    appName: process.env.APP_NAME || 'My-App',
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    razorpay: {
        keyId: process.env.RAZORPAY_KEY_ID,
        keySecret: process.env.RAZORPAY_KEY_SECRET,
    },
})