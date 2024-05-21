interface CustomerInterface {
  name: string;
  phone: string;
}

async function postCustomer(
  newCustomer: CustomerInterface
): Promise<CustomerInterface> {
  console.log("post-route-data", newCustomer);
  const response = await fetch(`http://localhost:8080/customers`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newCustomer),
  });
  if (!response.ok) {
    throw new Error("An error occured while updating the movie");
  }
  return await (response.json() as Promise<CustomerInterface>);
}

export { postCustomer };
