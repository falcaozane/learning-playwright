class APiUtils{

    constructor(apiContext,loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
        data : this.loginPayload
        })

        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log("token : ",loginResponseJson.token);
        console.log("userId : ",loginResponseJson.userId);
        console.log("msg: ",loginResponseJson.message);

        return token;
    }

    async createOrder(orderPayload){
        // create order
        let response = {}
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data : orderPayload,
            headers: {
                'Authorization' : response.token,
                'Content-Type': 'application/json',
            }
        })

        const orderResponseJson = await orderResponse.json()
        console.log("orderResponseJson : ",orderResponseJson);
        console.log("orderResponseJson.orders : ",orderResponseJson.orders);
        const orderID = orderResponseJson.orders[0];
        response.orderID = orderID;
        return response;
    }
}


module.exports = {APiUtils};