const { default: axios } = require('axios');
const crypto = require('crypto');
const ApiInformation = require('../models/api-information');

exports.getBinanceBalance = async (req, res, next) => {
    const apiInformation = await ApiInformation.findOne({ where: { description: 'binance' } });
    const apiKey = apiInformation.api_key;
    const apiSecret = apiInformation.api_secret;

    const timestamp = Date.now();
    const queryString = `timestamp=${timestamp}`;
    const signature = encodeURIComponent(crypto.createHmac('sha256', apiSecret).update(queryString).digest('hex'));

    try {
        const balanceResponse = await axios.get(
            `https://api.binance.com/sapi/v1/asset/wallet/balance?timestamp=${timestamp}&signature=${signature}`,
            {
                headers: { 'X-MBX-APIKEY': apiKey },
            }
        );
        const btcPriceResponse = await axios.get(`https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT`);

        const btcValue = balanceResponse.data.find((x) => x.walletName === 'Spot').balance;
        const btcPrice = btcPriceResponse.data.price;
        const usdtValue = btcValue * btcPrice;

        return res.json({
            data: {
                balance: Math.round(usdtValue * 100) / 100,
                currentBtcPrice: btcPrice,
            },
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};
