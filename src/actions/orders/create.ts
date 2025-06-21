"use server";

type RequestCartItem = {
  id: number,
  quantity: number,
};

type RequestBody = {
  phone: string,
  cart: RequestCartItem[],
};

type CreateOrderResponse = {
  success: 1,
  error: null,
} | {
  success: 0,
  error: string,
};

type CreateOrderErrorResponse = {
  detail: {
    type: string,
    loc: string[],
    msg: string,
    input: string,
    ctx: object,
  }[],
};

export default async function createOrder(formData: FormData) {
  await new Promise(function(resolve) {
    setTimeout(resolve, 3000);
  });

  const requestBody: RequestBody = {
    phone: formData.get("phone") as string,
    cart: [],
  };

  const requestIDs = formData.getAll("products_ids[]") as string[];
  const requestQuantities = formData.getAll("products_quantities[]") as string[];

  for (let i = 0; i < requestIDs.length; i++) {
    const id = parseInt(requestIDs[i]);
    const quantity = parseInt(requestQuantities[i]);

    requestBody.cart.push({ id, quantity });
  }

  const newOrderResponse = await fetch(`${process.env.API_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (newOrderResponse.status >= 500) {
    return {
      success: 0,
      error: "Server error",
    };
  }


  if (newOrderResponse.status !== 200) {
    const responseData = await newOrderResponse.json() as CreateOrderErrorResponse;
    const result = {
      success: 0,
      error: responseData.detail[0].msg,
    };

    return result;
  }

  const responseData = await newOrderResponse.json() as CreateOrderResponse;
  return responseData;
}
