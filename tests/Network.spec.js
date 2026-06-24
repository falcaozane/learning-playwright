const { test, expect , request} = require('@playwright/test');
const {APiUtils} = require('./utils/APiUtils');

const loginPayload = {userEmail : "zanefalcao21@gmail.com", userPassword : "Zane210803#"};

const orderPayload = {orders : [{country : "India", productOrderedId : "6960eae1c941646b7a8b3ed3"}]};

const fakePayLoad = {data : [], message : "No Orders"};

let response;

test.beforeAll( async()=>{

    const apiContext = await request.newContext();

    const apiUtils = new APiUtils(apiContext, loginPayload)
    response = await apiUtils.createOrder(orderPayload);
});

test.beforeEach(()=>{

})
 

test("Place the order", async ({page})=>
{
    
    page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
 
    },response.token);
      
    await page.goto("https://rahulshettyacademy.com/client/");

    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
        async route=>{
        
        // intercepting response - API Response -> { playwright fake response } -> browser -> rendering the data on frontend
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayLoad);
        route.fulfill(
            {
                response,
                body,
            }
        )
    })

    //page.pause();

    await page.locator("nav [routerLink*='myorders']").click();
    
    page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent())

    //await page.locator("tbody").waitFor();
    //const rows = page.locator("tbody tr");
    // const rowCount = await rows.count();
    // for (let i = 0; i < rowCount; i++) {
 
    //     const rowOrderID = await rows.nth(i).locator("th").textContent();
    //     if (response.orderID.includes(rowOrderID)) {
    //         await rows.nth(i).locator("td .btn-primary").click();
    //         break;
    //     }
 
    // }
    // const orderIDDetails=await page.locator(".col-text").textContent();
    // //assertion to check if order ID is correct.
    // expect (response.orderID.includes(orderIDDetails)).toBeTruthy();
});

// verify if order created is showing in history page or not
// Precondition - create order
